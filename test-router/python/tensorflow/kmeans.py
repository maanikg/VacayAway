import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

num_points = 100
dimensions = 2
points = np.random.uniform(0, 1000, [num_points, dimensions])

plt.figure()
for i, cluster in enumerate(points):
    x = points[i][0]
    y = points[i][1]
    plt.scatter(x, y, c="b", marker="o")
plt.show(block=False)


def input_fn():
    return tf.compat.v1.train.limit_epochs(
        tf.convert_to_tensor(points, dtype=tf.float32), num_epochs=1
    )


num_clusters = 2
kmeans = tf.compat.v1.estimator.experimental.KMeans(
    num_clusters=num_clusters, use_mini_batch=True
)

# train
num_iterations = 10
previous_centers = None
for _ in range(num_iterations):
    kmeans.train(input_fn)
    cluster_centers = kmeans.cluster_centers()
    # if previous_centers is not None:
    #     print("delta:", cluster_centers - previous_centers)
    previous_centers = cluster_centers
    # print("score:", kmeans.score(input_fn))
    # print("cluster centers:", cluster_centers)

# map the input points to their clusters
cluster_indices = list(kmeans.predict_cluster_index(input_fn))
clusters = [[] for _ in range(num_clusters)]
for i, point in enumerate(points):
    cluster_index = cluster_indices[i]
    center = cluster_centers[cluster_index]
    clusters[cluster_index].append(point)
    # print("point:", point, "is in cluster", cluster_index, "centered at", center)

plt.figure()
colors = ["r", "g", "b", "c", "m"]
for i, cluster in enumerate(clusters):
    x = [p[0] for p in cluster]
    y = [p[1] for p in cluster]
    plt.scatter(x, y, c=colors[i % len(colors)], marker="o")
plt.show()
#   The `SavedModel` saved by the `export_saved_model` method does not include the
#   cluster centers. However, the cluster centers may be retrieved by the
#   latest checkpoint saved during training. Specifically,
#   ```
#   kmeans.cluster_centers()
#   ```
#   is equivalent to
#   ```
#   tf.train.load_variable(
#       kmeans.model_dir, KMeansClustering.CLUSTER_CENTERS_VAR_NAME)
