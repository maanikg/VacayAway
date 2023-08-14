import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns

# uncomment below if using Jupyter
# %config InlineBackend.figure_format = 'retina'

# get data
df = pd.read_csv("../some/data/path")


def k_means_clustering(df_col_1, df_col_2, clusters, steps=100):
    """
    Takes in two dataframe columns and outputs plot of clusters.
    """
    vec_vals = []
    for i in range(len(df_col_1)):
        a = df_col_1[i]
        b = df_col_2[i]
        vec_vals.append([a, b])
    v_vals = np.array(vec_vals)
    np.random.shuffle(v_vals)

    sess = tf.Session()
    k = clusters
    points = v_vals
    data = tf.constant(points)

    # random initial centroids (points shuffled above)
    centroids = tf.Variable(data[:k, :])

    # add k dim to data and n dim to centroids to make matrices compatible
    # for array operations instead of loops
    data_expanded = tf.expand_dims(data, 0)
    centroids_expanded = tf.expand_dims(centroids, 1)

    # computes squared Euclidean distance between every point and every centroid
    # and get closest centroid for each point
    allocations = tf.argmin(
        tf.reduce_sum(tf.square(data_expanded - centroids_expanded), 2), 0
    )

    sess.run(tf.global_variables_initializer())
    c = 0  # index of centroid
    tf.equal(allocations, c)
    tf.gather(data, tf.where(tf.equal(allocations, c)))

    means = tf.concat(
        [
            tf.reduce_mean(tf.gather(data, tf.where(tf.equal(allocations, c))), 0)
            for c in range(k)
        ],
        0,
    )

    update_centroids = tf.assign(centroids, means)

    for step in range(steps):
        _, centroid_values, allocation_values = sess.run(
            [update_centroids, centroids, allocations]
        )

    clusters_df = pd.DataFrame(
        {
            df_col_1.name: points[:, 0],
            df_col_2.name: points[:, 1],
            "cluster": allocation_values,
        }
    )
    sns.lmplot(
        df_col_1.name,
        df_col_2.name,
        data=clusters_df,
        fit_reg=False,
        size=6,
        hue="cluster",
    )
    plt.show()


k_means_clustering(df["col_name_a"], df["col_name_b"], 3)
