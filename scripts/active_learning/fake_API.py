from numpy import load, array, full
from os import getcwd, listdir
from sys import argv, stdout
import requests

from data import Data

# <-------------- * Python Shell * --------------> #

def get_imgDir():
    imgDir = argv[1]
    return imgDir
    # return '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/ena24'

def get_lblDir():
    lblDir = argv[2]
    return lblDir
    return '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json'

def get_stage():
    stage = argv[3]
    return stage
    # return 'finish'

def get_noQueries():
    noQueries = argv[4]
    noQueries = int(noQueries)
    return noQueries
    # return 3

def get_encoderPath():
    encoderPath = argv[5]
    return encoderPath


# <-------------- * Local * --------------> #

def get_data():
    input_embeddings = get_inputEmbeddings()
    inputX = get_inputX()
    outputY = get_outputY()
    input_annotation_id = get_inputAnnotationId()
    dataset = Data(input_embeddings, inputX, outputY, input_annotation_id)
    return dataset

def get_inputEmbeddings():
    save_location = get_saveDir()
    input_embeddings = load(save_location+"/input_embeddings.npy")
    return input_embeddings

def get_inputX():
    save_location = get_saveDir()
    inputX = load(save_location+"/inputX.npy")
    return inputX

def get_outputY():
    save_location = get_saveDir()
    outputY = load(save_location+"/outputY.npy")
    return outputY

def get_inputAnnotationId():
    save_location = get_saveDir()
    img_ids = load(save_location+"/input_annotations_ids.npy")
    return img_ids

def get_accuracies():
    save_location = get_saveDir()
    accuracy = load(save_location + "/accuracy.npy")
    # return accuracy
    return [0.01, 8.3, 13.2, 20.1, 22.2, 35.3, 48.5, 36.2, 55.3, 53.5, 57.1, 56.9]

def get_loss():
    save_location = get_saveDir()
    loss = load(save_location + "/loss.npy")
    # return loss
    return [56.9, 57.1, 53.5, 55.3, 48.5, 36.2, 35.3, 22.2, 20.1, 13.2, 8.3, 0.01]

# <-------------- * Server * --------------> #

def get_saveDir():
    return '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/UI Obj5/test/react-to-electron-2/save tmp'

def post_queriesIds(ids):
    return

def post_queriesAnnotationIds(input_annotation_id):
    return

def get_queriesId():
    query_ids = array([[1, 4, 5]])
    dim = query_ids.shape[0] * query_ids.shape[1]
    query_ids = query_ids.reshape(dim)
    return query_ids

def get_labels():
    labels = array([[22, 22, 6]])
    dim = labels.shape[0] * labels.shape[1]
    labels = labels.reshape(dim)
    return labels

def get_labelsGiven():
    dataset = get_data()
    query_ids = get_queriesId()
    labels = get_labels()
    labels_given = full(dataset.train_dataset_size, -1)
    for i, label in list(zip(query_ids,labels)):
        labels_given[i] = label
    return labels_given

def post_species_dictionary(species):
    print('post species')
    print('species:')
    print(species)
    return

def get_species_name():
    species = ['Virginia Opossum', 'American Black Bear']
    return species

def get_species_id():
    species = [6, 22]
    return species
