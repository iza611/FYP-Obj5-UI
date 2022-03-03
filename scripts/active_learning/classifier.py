from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.random import set_seed

def get_model(dim):
    set_seed(7)
    
    model = Sequential()
    model.add(Dense(256, activation='relu', kernel_initializer='he_uniform', input_shape=(dim,)))
    model.add(Dense(128, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(50, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(23, activation='softmax'))
    
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    return model
