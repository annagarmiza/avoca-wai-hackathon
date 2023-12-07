from flask import Flask,request, jsonify
from flask_cors import CORS
import image_processing
import requests
import utils
import numpy as np
import cv2
import urllib.request

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'I\'m Alive!'


@app.route('/getProductSuggestions', methods=['GET'])
def process_image():
    image_url = request.args.get('image_url')
    
    # Fetch image data from the provided URL
    img_data = get_image_content(image_url)

    if img_data:
        # Initialize model and data (called once)
        image_processing.initialize_model_and_data()

        # Find closest neighbors
        similar_images = image_processing.find_nearest_neigbors(img_data)

        # Construct JSON response
        json_response = construct_json_response_images(similar_images)
        
        return jsonify(json_response)
    else:
        return jsonify({'success': False, 'message': 'Failed to process image'})

   
def get_image_content(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})  # Add user agent if needed
        with urllib.request.urlopen(req) as response:
            img_data = response.read()
            return img_data
    except Exception as e:
         print(f"An error occurred: {e}")
         return None

def construct_json_response_images(file_list):
    json_response = []

    for file in file_list:
        slice_path = file.rsplit('\\', 1)[-1]
        image_info = utils.find_info_from_image(slice_path)

        json_response.append(image_info)
    
    return json_response



if __name__ == '__main__':
    app.run(debug=True)