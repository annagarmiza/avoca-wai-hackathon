import pickle
import tensorflow
import numpy as np
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import tensorflow as tf
from numpy.linalg import norm
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50,preprocess_input
from sklearn.neighbors import NearestNeighbors
from PIL import Image
import io


feature_list = None
filenames = None
model = None

def initialize_model_and_data():
    global feature_list, filenames, model
    
    if feature_list is None and filenames is None and model is None:
        feature_list = np.array(pickle.load(open('embeddings.pkl', 'rb')))
        filenames = pickle.load(open('filenames.pkl', 'rb'))

        model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
        model.trainable = False

        model = tf.keras.Sequential([
            model,
            GlobalMaxPooling2D()
        ])

def find_nearest_neigbors(img_data):
    img = Image.open(io.BytesIO(img_data)) 
    img_resized = img.resize((224,224))
    img_array = image.img_to_array(img_resized)
    expanded_img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    neighbors = NearestNeighbors(n_neighbors=6,algorithm='brute',metric='euclidean')
    neighbors.fit(feature_list)

    distances,indices = neighbors.kneighbors([normalized_result])

    print(indices)
    return fromIndicesToFileList(indices[0][1:4])

def load_filenames():
    with open('filenames.pkl','rb') as f:
        return pickle.load(f)

def fromIndicesToFileList(indices_list):

    filenames = load_filenames()
    image_filenames = [filenames[idx] for idx in indices_list]
    return image_filenames


def get_model_and_data():
    return model, feature_list, filenames