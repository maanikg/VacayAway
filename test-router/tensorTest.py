import tensorflow as tf
from sklearn.datasets import make_blobs

# Generate some sample data
X, y = make_blobs(n_samples=1000, centers=5, random_state=42)

# Define the number of clusters
num_clusters = 5

# Initialize the KMeans model
kmeans = tf.compat.v1.estimator.experimental.KMeans(num_clusters=num_clusters)

# Define the input function
input_fn = tf.compat.v1.estimator.inputs.numpy_input_fn(
    x={"x": X},
    num_epochs=None,
    shuffle=True
)

# Train the model
kmeans.train(input_fn)

# Get the cluster assignments for each data point
cluster_assignments = list(kmeans.predict_cluster_index(input_fn))

# Print the cluster assignments
print(cluster_assignments)