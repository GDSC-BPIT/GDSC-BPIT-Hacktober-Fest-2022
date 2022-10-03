import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from matplotlib import image
import numpy as np

MODEL_PATH = "model"

def get_labels_list(txt_file):
    """
    Returned List will have the names of the output classes 
    on same index as their labels.
    """
    
    def cleaner(label):
        label = label.split('-')[-1]
        label = label.replace('_', ' ').replace('\n', '').title()
        return label
    
    with open(txt_file, 'r') as f:
        labels_list = f.readlines()
        
    labels_list = list(map(cleaner, labels_list))
        
    return labels_list

def inception_pp(img):
    img_tensor = tf.cast(img, tf.float32)
    img_tensor = layers.Resizing(299, 299, 'bicubic')(img_tensor)
    img_tensor = tf.clip_by_value(img_tensor, 0., 255.)
    
    inp = keras.applications.inception_v3.preprocess_input(img_tensor)
    inp = tf.expand_dims(inp, 0)
    return inp

def predict_breed(img_path: str, model_path: str):
    "Function to predict dog breed in an image."
    img = image.imread(img_path)
    img = inception_pp(img)
    pred = keras.models.load_model(model_path)(img, training = False).numpy()
    prob = np.amax(pred)
    label = np.argmax(pred[0])
    breed = get_labels_list(model_path + "/labels.txt")[label]
    
    return breed, prob


if __name__ == "__main__":
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    
    print("\nThis is a Dog Breed classifier. This program can recognize a dog's breed by looking at its image.")
    path = input("Enter image path: ")
    
    breed, prob = predict_breed(path, MODEL_PATH)
    prob *= 100
    
    print(f"\nThis dog is a {breed}.")
    print(f"Confidence = {prob:.2f}%")    