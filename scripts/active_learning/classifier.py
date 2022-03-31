from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, Conv2D, MaxPool2D, Flatten
from tensorflow.random import set_seed
from tensorflow.keras import Input, Model


def get_model(dim):
    set_seed(7)

    # model = Sequential()
    # model.add(Dense(256, activation='relu', kernel_initializer='he_uniform', input_shape=(dim,)))
    # model.add(Dense(128, activation='relu', kernel_initializer='he_uniform'))
    # model.add(Dense(50, activation='relu', kernel_initializer='he_uniform'))
    # model.add(Dense(23, activation='softmax'))

    # model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    model_input = Input(shape=(4096, ))
    model = Dropout(0.5)(model_input)
    model = Dense(512, activation='relu')(model)
    model = Dropout(0.5)(model)
    model = Dense(dim, activation='sigmoid')(model)

    model = Model(model_input, model, name="model")
    model.summary()

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    return model
