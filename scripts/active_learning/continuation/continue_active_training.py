import sys
from numpy import where, load, append, save, array
from numpy.random import choice
from tensorflow.random import set_seed
from tensorflow.keras.callbacks import EarlyStopping
from os.path import exists

from fake_API import get_noQueries, get_queriesId, get_labels, get_saveDir
from classifier import get_model

# step 1 - calculate accuracy after last round
def calculate_accuracy(dataset):
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
    
    loss, acc = model.evaluate(dataset.input_test, dataset.output_test)
    
    save_directory = get_saveDir()
    if(exists(save_directory + '/accuracy.npy') and exists(save_directory + '/loss.npy')):
        acc_saved = load(save_directory + '/accuracy.npy')
        loss_saved = load(save_directory + '/loss.npy')
        
        acc_updated = append(acc_saved, acc)
        loss_updated = append(loss_saved, loss)
        
        save(save_directory + '/accuracy.npy', acc_updated)
        save(save_directory + '/loss.npy', loss_updated)
    else:
        acc = array(acc)
        loss = array(loss)
        
        save(save_directory + '/accuracy.npy', acc)
        save(save_directory + '/loss.npy', loss)

# step 2 - get query ids for the next round

# def simple_query(n_queries, labels_given):
#     query_ids = choice(where(labels_given==-1)[0], n_queries, replace=False)
#     return query_ids
    
# def get_queries(input_embeddings, inputX, outputY, img_ids):
#     dataset = Data(input_embeddings, inputX, outputY, img_ids)
#     # model = get_model(dataset.input_embeddings_dim)
#     # labels = Labels(dataset.train_dataset_size)
    
#     n_queries = get_noQueries()
#     labels_given = get_labelsGiven()
#     # labels_given = fromstring(labels_given, dtype=float, sep=',')
    
#     queries_id = simple_query(n_queries, labels_given)
#     print(queries_id)
#     queries_img_id = []
    
#     for i in range(len(queries_id)):
#         query_id = queries_id[i]
#         query_img_id = dataset.input_train_img_ids[query_id]
#         queries_img_id.append(query_img_id)
        
#     print(queries_img_id)
#     sys.stdout.flush()