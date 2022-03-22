from numpy import load, full, fromstring
from sys import argv
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
    # return '/Users/ozogiz01/OneDrive - StepStone Group/Documents/explore/Brunel/FYP/0000/data/data/Metadata (non-human images only).json'


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
    return accuracy
    # return [0.01, 8.3, 13.2, 20.1, 22.2, 35.3, 48.5, 36.2, 55.3, 53.5, 57.1, 56.9]


def get_loss():
    save_location = get_saveDir()
    loss = load(save_location + "/loss.npy")
    return loss
    # return [56.9, 57.1, 53.5, 55.3, 48.5, 36.2, 35.3, 22.2, 20.1, 13.2, 8.3, 0.01]


# <-------------- * Server * --------------> #


def get_saveDir():
    req = requests.get('http://localhost:8000/save/directory')
    save_directory = req.text
    return save_directory


def post_queriesIds(ids):
    data = {"queries": ids}
    req = requests.post(
        'http://localhost:8000/queries/ids', data=data)
    print(req.text)
    # post [2, 6, 0]
    return


def post_queriesAnnotationIds(input_annotation_id):
    data = {"queries": input_annotation_id}
    req = requests.post(
        'http://localhost:8000/queries/annotations', data=data)
    print(req.text)
    # post ['0a0b939d-1dfb-11ea-86a0-5cf370671a19', '0a1cbe59-1dfb-11ea-a66a-5cf370671a19', '0a1ec362-1dfa-11ea-b5c6-5cf370671a19']


def get_queriesId():
    req = requests.get('http://localhost:8000/queries/ids')
    queries_ids = req.text.replace('[', '').replace(']', '')
    queries_ids = fromstring(queries_ids, dtype=int, sep=',')
    return queries_ids


def get_labels():
    req = requests.get('http://localhost:8000/labels')
    labels = req.text.replace('[', '').replace(']', '')
    labels = fromstring(labels, dtype=int, sep=',')
    return labels


def get_labelsGiven():
    dataset = get_data()
    query_ids = get_queriesId()
    labels = get_labels()
    labels_given = full(dataset.train_dataset_size, -1)
    for i, label in list(zip(query_ids, labels)):
        labels_given[i] = label
    return labels_given


def post_species(species_names, species_ids):
    data = {"species_names": species_names, "species_ids": species_ids}
    req = requests.post(
        'http://localhost:8000/species', data=data)
    print(req.text)
    return


def get_species_name():
    req = requests.get('http://localhost:8000/species/names')
    species = req.text.replace('[', '').replace(
        ']', '').replace('\"', '').split(',')
    return species


def get_species_id():
    req = requests.get('http://localhost:8000/species/ids')
    species = req.text.replace('[', '').replace(
        ']', '').replace('\"', '').split(',')
    species = list(map(int, species))
    return species
