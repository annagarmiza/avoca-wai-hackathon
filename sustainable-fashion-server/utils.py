import pandas as pd
import json

def find_info_from_image(image_local_name):
    #import json list
    with open("ratings.json","r") as file:
        json_array = json.load(file)
    # Load the Excel file into a pandas DataFrame
    df = pd.read_excel('fashion_scrape.xlsx', engine='openpyxl')  # Replace 
    
    # Find the row where 'ImageLocalName' matches the provided image_local_name
    matching_row = df[df['ImageLocalName'] == image_local_name]
    
    # If a matching row is found, create an object with specific fields
    if not matching_row.empty:
        row_data = matching_row.iloc[0]  # Extract the data from the first matching row

        # check rating id against ratings.json
        ratingId = int(row_data['ratingId'])
        
        # Create an object with specific fields and their corresponding values from the row
        info_object = {
            'name': row_data['Name'],
            'image_url': row_data['Image'],
            'product_url': row_data['URL'],
            'image_local_name': row_data['ImageLocalName'],
            'brand': row_data['Brand'],
            'brand_url': row_data['BrandUrl'],
            'rating': json_array[ratingId - 1]['rating'],
            'values': json_array[ratingId - 1]['values']
        }
        
        return info_object
    else:
        return None  # Return None if no matching row is found
    
# # Usage:
# image_name_to_search = '20231201001428_a2197109_row4094.jpg'
# # Replace 'your_image_name.jpg' with the image name
# result_object = find_info_from_image(image_name_to_search)

# if result_object:
#     print("Object created:")
#     print(result_object)
# else:
#     print("Image not found in the Excel file.")