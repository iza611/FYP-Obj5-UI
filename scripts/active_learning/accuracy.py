from numpy import load, append, save
from tensorflow.random import set_seed
from tensorflow.keras.callbacks import EarlyStopping

from interface import get_queriesId, get_labels, get_saveDir
from classifier import get_model


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
    acc_saved = load(save_directory + '/accuracy.npy')
    loss_saved = load(save_directory + '/loss.npy')

    acc_updated = append(acc_saved, acc)
    loss_updated = append(loss_saved, loss)

    save(save_directory + '/accuracy.npy', acc_updated)
    save(save_directory + '/loss.npy', loss_updated)
