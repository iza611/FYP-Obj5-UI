import sys
from numpy import save, load, where, array, sort, full, reshape, concatenate, argsort, log
from numpy.random import choice
from tensorflow.keras.models import load_model
import json
from keras.models import load_model

from start.data_prep import get_input_and_output
from API import get_imgDir, get_lblDir, get_saveDir, get_noQueries, post_queriesIds, post_queriesAnnotationIds, get_encoderPath, get_labelsGiven, post_species
from classifier import get_model


def data_prep():
    input_location = get_imgDir()
    output_location = get_lblDir()
    save_location = get_saveDir()

    inputX, outputY, img_ids = get_input_and_output(
        input_location, output_location)

    save(save_location+"/inputX.npy", inputX)
    save(save_location+"/outputY.npy", outputY)
    save(save_location+"/input_annotations_ids.npy", img_ids)

    inputX_loaded = load(save_location+"/inputX.npy")
    outputY_loaded = load(save_location+"/outputY.npy")
    img_ids_loaded = load(save_location+"/input_annotations_ids.npy")

    return inputX, outputY, img_ids


def embeddings_prep(inputX):
    path = get_encoderPath()
    encoder = load_model(path)
    input_embeddings = encoder.predict(inputX)

    save_location = get_saveDir()
    save(save_location+"/input_embeddings.npy", input_embeddings)

    return input_embeddings


def simple_query(no_queries, labels_given):
    query_ids = choice(where(labels_given == -1)[0], no_queries, replace=False)
    return query_ids


def margin_query(n_queries, model, input, labels_given):
    unlabelled = where(array(labels_given) == -1)[0]
    unlabelled = sort(unlabelled)
    unlabelled_input = input[unlabelled]

    probs = model.predict(unlabelled_input)
    probs_sorted = sort(probs, axis=1)

    no_predictions_per_img = probs_sorted.shape[1]
    probs_margin = probs_sorted[:, no_predictions_per_img-1] - \
        probs_sorted[:, no_predictions_per_img-2]  # (ostatni - przedostatni)

    input_size = unlabelled_input.shape[0]
    unlabelled = reshape(unlabelled, (input_size, 1))
    probs_margin = reshape(probs_margin, (input_size, 1))
    probs_indexed = concatenate((unlabelled, probs_margin), axis=1)

    probs_indexed_sorted = probs_indexed[argsort(probs_indexed[:, 1])]
    highest_uncertain = probs_indexed_sorted[:n_queries][:, 0]
    highest_uncertain = highest_uncertain.astype(int)

    return highest_uncertain


def get_queries(dataset, initial):
    model = get_model(dataset.input_embeddings_dim)
    # labels_given e.g. [-1 22 -1 -1 22  6 -1 -1]
    if (initial):
        labels_given = full(dataset.train_dataset_size, -1)
        loss, acc = model.evaluate(dataset.input_test, dataset.output_test)
        acc = array(acc)
        loss = array(loss)
        save_directory = get_saveDir()
        save(save_directory + '/accuracy.npy', acc)
        save(save_directory + '/loss.npy', loss)
    else:
        labels_given = get_labelsGiven()

    # query
    no_queries = get_noQueries()
    queries_id = simple_query(no_queries, labels_given)
    # queries_id = margin_query(
    #     no_queries, model, dataset.input_train, labels_given)
    queries_annotation_id = []

    # get img_ids
    for i in range(len(queries_id)):
        query_id = queries_id[i]
        query_img_id = dataset.input_annotation_id[query_id]
        queries_annotation_id.append(query_img_id)

    # send
    post_queriesIds(queries_id)
    post_queriesAnnotationIds(queries_annotation_id)
    print(queries_id)
    print(queries_annotation_id)


def species_prep():
    labels_directory = get_lblDir()
    file = open(labels_directory)
    data = json.load(file)

    species_names = []
    species_ids = []

    for i in range(len(data["categories"])):
        species_names.append(data["categories"][i]["name"])
        species_ids.append(data["categories"][i]["id"])

    post_species(species_names, species_ids)
