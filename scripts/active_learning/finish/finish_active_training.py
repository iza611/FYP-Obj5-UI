from tensorflow.random import set_seed
from tensorflow.keras.callbacks import EarlyStopping
from matplotlib import pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix
import seaborn as sns
from keras.models import load_model
from os.path import exists
from os import mkdir
import sys

from API import get_accuracies, get_loss, get_queriesId, get_labels, get_species_name, get_species_id, get_labelsGiven
from classifier import get_model


def calculate_and_save_results(dataset, save_dir):
    model(dataset, save_dir)

    if not exists(save_dir + "/metrics"):
        mkdir(save_dir + "/metrics")

    metrics(dataset, save_dir)

    # embeddings_projector(save_dir)


def model(dataset, save_dir):
    model = get_model(dataset.input_embeddings_dim)

    query_ids = get_queriesId()
    labels = get_labels()
    dataset.save_for_training(query_ids, labels)

    set_seed(7)
    model.fit(dataset.input_train_labelled,
              dataset.output_train_labelled,
              epochs=1000,
              batch_size=50,
              callbacks=[
                  EarlyStopping(monitor='loss',
                                min_delta=0.001,
                                patience=3,
                                restore_best_weights=True)
              ])
    model.save(save_dir + '/model')

    output_train_preds = model.predict(dataset.input_train)
    output_train_preds = reshape_array_probability_predictions_to_int_class_prediction(
        output_train_preds, output_train_preds.shape[0])
    labels_given = get_labelsGiven()

    output_train_combined = []
    for output_id in range(dataset.train_dataset_size):
        if (labels_given[output_id] != -1):
            output_train_combined.append(labels_given[output_id])

        else:
            output_train_combined.append(output_train_preds[output_id])

    output_test_preds = model.predict(dataset.input_test)
    output_test_preds = reshape_array_probability_predictions_to_int_class_prediction(
        output_test_preds, output_test_preds.shape[0])

    np.save(save_dir + '/output_train_combined.npy', output_train_combined)
    np.save(save_dir + '/output_test_preds.npy', output_test_preds)


def metrics(dataset, save_dir):
    # accuracy
    accuracy = get_accuracies()
    no_rounds = len(accuracy)
    rounds = np.arange(no_rounds)
    plt.figure(figsize=(13, 10), dpi=70)
    plt.plot(rounds, accuracy, "b", label="Training accuracy")
    # plt.plot(epochs, val_accuracy, "b", label="Validation accuracy")
    plt.title("Accuracy in each round")
    plt.legend()
    plt.savefig(save_dir + '/metrics/accuracy.png')
    plt.close()

    # loss
    loss = get_loss()
    no_rounds = len(loss)
    rounds = np.arange(no_rounds)
    plt.figure(figsize=(13, 10), dpi=70)
    plt.plot(rounds, loss, "b", label="Training loss")
    # plt.plot(epochs, val_loss, "b", label="Validation loss")
    plt.title("Training loss in each round")
    plt.legend()
    # plt.show()
    plt.savefig(save_dir + '/metrics/loss.png')
    plt.close()

    model = load_model(save_dir + '/model')
    species = np.array(get_species_id())
    number_of_species = len(species)
    species_name = get_species_name()

    # no. images
    all_occurences = []
    for specie in species:
        occurences = np.count_nonzero(dataset.outputY == specie)
        all_occurences.append(occurences)

    occurences_in_test_set = []
    for specie in species:
        occurences = np.count_nonzero(dataset.output_test == specie)
        occurences_in_test_set.append(occurences)

    # removed_empty_category = all_occurences.pop(8) #remove this empty category_id = 8
    # print(removed_empty_category)

    # all_images_count = dataset.outputY.shape[0]
    # if sum(all_occurences) == all_images_count:
    #     print("all images counted")
    # else:
    #     print("not all images counted")

    all_occurences = np.asarray(all_occurences)

    plt.figure(figsize=(13, 13), dpi=70)
    plt.bar(species_name, all_occurences)
    plt.title("Number of images")
    plt.xticks(rotation=60, ha="right")
    plt.savefig(save_dir + '/metrics/no_images.png')
    plt.close()

    # confusion matrix
    array_predictions = model.predict(dataset.input_test)
    output_predictions_reshaped = reshape_array_probability_predictions_to_int_class_prediction(
        array_predictions, array_predictions.shape[0])

    # print(dataset.output_test) # [22  6 22]
    # test_different_output = [22, 22, 6]

    conf_matrix = confusion_matrix(
        dataset.output_test, output_predictions_reshaped)
    conf_matrix_normalised = conf_matrix.astype(
        'float') / conf_matrix.sum(axis=1)[:, np.newaxis]

    plt.figure(figsize=(13, 10), dpi=70)
    heatmap = sns.heatmap(conf_matrix_normalised, annot=True,
                          fmt='.2f', xticklabels=species_name, yticklabels=species_name)
    heatmap.yaxis.set_ticklabels(
        heatmap.yaxis.get_ticklabels(), rotation=0, ha="right")
    heatmap.xaxis.set_ticklabels(
        heatmap.yaxis.get_ticklabels(), rotation=60, ha="right")
    heatmap.figure.subplots_adjust(left=0.2, bottom=0.2)
    plt.title("Confusion matrix")
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.savefig(save_dir + '/metrics/conf_matrix.png')
    plt.close()

    # sensitivity & precision
    conf_matrix = np.asarray(conf_matrix)
    columns_sum = np.sum(conf_matrix, axis=0)
    rows_sum = np.sum(conf_matrix, axis=1)
    matrix_sum = np.sum(conf_matrix)

    TP = np.empty((number_of_species,))
    FP = np.empty((number_of_species,))
    FN = np.empty((number_of_species,))
    TN = np.empty((number_of_species,))

    for cat_id in range(number_of_species):
        TP[cat_id] = conf_matrix[cat_id, cat_id]
        FP[cat_id] = columns_sum[cat_id] - TP[cat_id]
        FN[cat_id] = rows_sum[cat_id] - TP[cat_id]
        TN[cat_id] = matrix_sum - (TP[cat_id] + FP[cat_id] + FN[cat_id])

    sensitivity = np.empty((number_of_species,))

    for cat_id in range(number_of_species):
        sensitivity[cat_id] = TP[cat_id] / occurences_in_test_set[cat_id]

    plt.figure(figsize=(13, 13), dpi=70)
    plt.bar(species_name, sensitivity)
    plt.title("Sensitivity")
    plt.xticks(rotation=60, ha="right")
    # plt.show()
    plt.savefig(save_dir + '/metrics/sensitivity.png')
    plt.close()

    specificity = np.empty((number_of_species,))

    for cat_id in range(number_of_species):
        specificity[cat_id] = TN[cat_id] / (FP[cat_id] + TN[cat_id])

    plt.figure(figsize=(13, 13), dpi=70)
    plt.bar(species_name, specificity)
    plt.title("Specificity")
    plt.xticks(rotation=60, ha="right")
    # plt.show()
    plt.savefig(save_dir + '/metrics/specificity.png')
    plt.close()

    precision = np.empty((number_of_species,))

    for cat_id in range(number_of_species):
        if(TP[cat_id] + FP[cat_id] == 0):
            precision[cat_id] = 0
        else:
            precision[cat_id] = TP[cat_id] / (TP[cat_id] + FP[cat_id])

    plt.figure(figsize=(13, 13), dpi=70)
    plt.bar(species_name, precision)
    plt.title("Precision")
    plt.xticks(rotation=60, ha="right")
    # plt.show()
    plt.savefig(save_dir + '/metrics/precision.png')
    plt.close()


def embeddings_projector(save_dir):
    return

# [0. 0. 1. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.] -> 2


def reshape_array_probability_predictions_to_int_class_prediction(array_predictions, number_of_predictions):
    predictions_reshaped = []
    for pred in range(number_of_predictions):
        predictions_reshaped.append(np.argmax(array_predictions[pred]))
    predictions_reshaped = np.asarray(predictions_reshaped)
    return predictions_reshaped
