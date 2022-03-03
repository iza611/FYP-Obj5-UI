from sklearn.model_selection import train_test_split
from numpy.random import seed
from numpy.testing import assert_array_equal
from numpy import empty, array, concatenate
import sys

class Data:
    def __init__(self, input_embeddings, inputX, outputY, input_annotation_id):
        self.input_embeddings = input_embeddings
        self.inputX = inputX
        self.outputY = outputY
        self.input_annotation_id = input_annotation_id
        
        self.input_embeddings_dim = self.get_dim(input_embeddings)
        self.inputX_dim = self.get_dim(inputX)
        
        self.input_embeddings = self.reshape_inputs_to_1D(self.input_embeddings, self.input_embeddings_dim)
        self.inputX = self.reshape_inputs_to_1D(self.inputX, self.inputX_dim)
        
        self.split_to_train_and_test()
        self.split_to_train_and_test_annotation_id()
        
        assert_array_equal(self.output_train, self.output_train_annotation_id)
        assert_array_equal(self.output_test, self.output_test_annotation_id)
        
        self.train_dataset_size = self.input_train.shape[0]
    
    def get_dim(self, input):
        dim = input.shape[1] * input.shape[2] * input.shape[3]
        return dim
        
    def reshape_inputs_to_1D(self, input, dim):
        input_reshaped = input.reshape((len(input), dim))
        return input_reshaped

    def split_to_train_and_test(self):
        seed(7)
        self.input_train, self.input_test, self.output_train, self.output_test = train_test_split(self.input_embeddings, self.outputY, test_size=0.2)
        
    def split_to_train_and_test_annotation_id(self):
        seed(7)
        self.input_train_annotation_id, self.input_test_annotation_id, self.output_train_annotation_id, self.output_test_annotation_id = train_test_split(self.input_annotation_id, self.outputY, test_size=0.2)
        
    def save_for_training(self, query_ids, labels):
        self.input_train_labelled = self.input_embeddings[query_ids]
        self.output_train_labelled =  labels
        