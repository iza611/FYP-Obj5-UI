from numpy import save
from tensorflow.keras.models import load_model
import json
from keras.models import load_model
import cv2
import json
import numpy as np

from interface import get_imgDir, get_lblDir, get_saveDir, get_encoderPath, post_species


def species_prep():
    labels_directory = get_lblDir()
    file = open(labels_directory)
    data = json.load(file)

    species_names = []
    species_ids = []

    for i in range(len(data["categories"])):
        species_names.append(data["categories"][i]["name"])
        species_ids.append(data["categories"][i]["id"])

    post_species(species_names, species_ids)


def data_prep():
    input_location = get_imgDir()
    output_location = get_lblDir()
    save_location = get_saveDir()

    inputX, outputY, img_ids = get_input_and_output(
        input_location, output_location)

    save(save_location+"/inputX.npy", inputX)
    save(save_location+"/outputY.npy", outputY)
    save(save_location+"/input_annotations_ids.npy", img_ids)

    return inputX, outputY, img_ids


def embeddings_prep(inputX):
    path = get_encoderPath()
    encoder = load_model(path)
    input_embeddings = encoder.predict(inputX)

    save_location = get_saveDir()
    save(save_location+"/input_embeddings.npy", input_embeddings)

    return input_embeddings


###


def get_category_ids_and_image_ids(output_location):
    file = open(output_location)
    data = json.load(file)

    category_ids = []
    img_ids = []

    for a in range(len(data["annotations"])):
        category_ids.append(data["annotations"][a]["category_id"])
        img_ids.append(data["annotations"][a]["id"])

    category_ids = np.array(category_ids)

    return category_ids, img_ids


def transform_imgs_to_numpy_array(ids, input_location):
    all_images = []
    no_ids = len(ids)

    for x, i in zip(range(no_ids), ids):
        image = cv2.imread("%s/%s.jpg" % (input_location, i))
        # print('%d/%d preparing image %s' % (x+1, no_ids, i))

        RGB_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        resized_image = cv2.resize(
            RGB_image, (128, 128), interpolation=cv2.INTER_AREA)
        all_images.append(resized_image)

    all_images_np_array = np.array(all_images)

    return all_images_np_array


def get_input_and_output(input_location, output_location):
    output, img_ids = get_category_ids_and_image_ids(output_location)
    input = transform_imgs_to_numpy_array(img_ids, input_location)

    return input, output, img_ids
