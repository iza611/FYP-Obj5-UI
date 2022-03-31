from prep import species_prep, data_prep, embeddings_prep
from data import Data
from query import get_queries
from accuracy import calculate_accuracy
from results import calculate_and_save_results
from interface import get_stage, get_data, get_saveDir

stage = get_stage()

if stage == 'start':
    species_prep()
    inputX, outputY, img_ids = data_prep()
    input_embeddings = embeddings_prep(inputX)

    dataset = Data(input_embeddings, inputX, outputY, img_ids)
    get_queries(dataset, initial=True)

if stage == 'continue':
    dataset = get_data()

    calculate_accuracy(dataset)
    get_queries(dataset, initial=False)

if stage == 'finish':
    dataset = get_data()

    calculate_accuracy(dataset)
    calculate_and_save_results(dataset)
