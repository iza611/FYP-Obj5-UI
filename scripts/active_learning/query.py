from numpy import where, array, random, empty, argmax, amin, delete
from sklearn.manifold import TSNE
from tqdm import tqdm
from scipy.spatial import distance
from numpy import save, where, array, sort, full, reshape, concatenate, argsort
from numpy.random import choice

from interface import get_saveDir, get_noQueries, post_queriesIds, post_queriesAnnotationIds, get_encoderPath, get_labelsGiven, post_species
from classifier import get_model


def get_queries(dataset, initial):
    model = get_model(dataset.input_embeddings_dim)
    # labels_given e.g. [-1 22 -1 -1 22  6 -1 -1]
    if (initial):
        labels_given = full(dataset.train_dataset_size, -1)
        loss, acc = model.evaluate(dataset.input_test, dataset.output_test)
        acc = array(acc)
        loss = array(loss)
        save_directory = get_saveDir()
        save(save_directory + '/accuracy.npy', acc)
        save(save_directory + '/loss.npy', loss)
    else:
        labels_given = get_labelsGiven()

    # query
    no_queries = get_noQueries()
    queries_id = kcenter_query(no_queries, dataset.input_train, labels_given)
    queries_annotation_id = []

    # get img_ids
    for i in range(len(queries_id)):
        query_id = queries_id[i]
        query_img_id = dataset.input_annotation_id[query_id]
        queries_annotation_id.append(query_img_id)

    # send
    post_queriesIds(queries_id)
    post_queriesAnnotationIds(queries_annotation_id)
    print(queries_id)
    print(queries_annotation_id)


def simple_query(no_queries, labels_given):
    query_ids = choice(where(labels_given == -1)[0], no_queries, replace=False)
    return query_ids


def kcenter_query(n_queries, input, labels_given):
    labelled = where(array(labels_given) != -1)[0]
    all_data_points = TSNE(n_components=3, learning_rate='auto',
                           init='random').fit_transform(input)
    no_data_points = all_data_points.shape[0]

    if len(labelled) == 0:
        c1 = random.randint(no_data_points)
        centers_idx = [c1]
    else:
        centers_idx = labelled
        centers_idx = list(centers_idx)

    distances_to_closest_centers = calculate_distances(
        centers_idx, all_data_points)

    for _ in range(n_queries):
        max_dist_idx = find_max_dist(distances_to_closest_centers)
        centers_idx.append(max_dist_idx)

        distances_to_closest_centers = calculate_distances(
            centers_idx, all_data_points)

    new_center_idx = remove_old_idx(centers_idx, labelled)

    return new_center_idx


def calculate_distances(centers_idx, data_points):
    no_points = data_points.shape[0]
    no_centers = len(centers_idx)
    distances_to_all_centers = empty((no_points, no_centers))

    for point_idx in tqdm(range(no_points)):
        for n in range(no_centers):
            center_idx = centers_idx[n]
            distances_to_all_centers[point_idx, n] = distance.euclidean(
                data_points[point_idx],
                data_points[center_idx])

    distances_to_closest_centers = amin(distances_to_all_centers, axis=1)

    return distances_to_closest_centers


def find_max_dist(distances_to_closest_centers):
    max_dist_idx = argmax(distances_to_closest_centers)

    return max_dist_idx


def remove_old_idx(centers_idx, labelled):
    no_old_centers = len(labelled)
    new_center_idx = array(centers_idx)
    for n in range(no_old_centers):
        old_center = labelled[n]
        new_center_idx = delete(new_center_idx,
                                where(new_center_idx == old_center))

    return new_center_idx
