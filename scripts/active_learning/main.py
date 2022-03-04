import sys

from start.start_active_training import data_prep, embeddings_prep, get_queries, species_prep
from continuation.continue_active_training import calculate_accuracy
from finish.finish_active_training import calculate_and_save_results
from fake_API import get_stage, get_data, get_saveDir
from data import Data

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
    save_dir = get_saveDir()
    
    calculate_accuracy(dataset)
    calculate_and_save_results(dataset, save_dir)