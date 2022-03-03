import sys
from numpy import save, load, where, array, fromstring, full
from numpy.random import choice
from tensorflow.keras.models import load_model

from start.data_prep import get_input_and_output
from data import Data
from fake_API import get_imgDir, get_lblDir, get_saveDir, get_noQueries, post_queriesIds, post_queriesAnnotationIds, get_encoderPath, get_labelsGiven

def data_prep():
    input_location = get_imgDir()
    output_location = get_lblDir()
    save_location = get_saveDir()
    
    inputX, outputY, img_ids = get_input_and_output(input_location, output_location)
    
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
    query_ids = choice(where(labels_given==-1)[0], no_queries, replace=False)
    return query_ids
    
def get_queries(dataset, initial):
    # labels_given e.g. [-1 22 -1 -1 22  6 -1 -1]
    if (initial):
        labels_given = full(dataset.train_dataset_size, -1)
    else:
        labels_given = get_labelsGiven()
    
    # query
    no_queries = get_noQueries()
    queries_id = simple_query(no_queries, labels_given)
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
