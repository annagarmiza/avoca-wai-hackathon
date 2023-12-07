# AVOCA - Submission for the Women in AI Hackathon 2023
Sustainable Canadian Fashion Chrome Extension powered by AI 🍁👖🌿 Discover eco-conscious alternatives to mainstream fashion through our app's curated collection.

AVOCA is a Chrome extension coupled with a Python AI backend that transforming sustainable fashion choices. Powered by CNN and Nearest Neighbors algorithms, it suggests eco-conscious options from sustainable Canadian fashion brands (based on [fashion transparency index 2023](https://www.fashionrevolution.org/about/transparency/)) using scrapped product data. This tool employs AI to offer personalized, sustainable fashion recommendations based on product features.

# Main Functionality: 
- Users receive notifications when browsing non-sustainable fashion brands or products.
- Users can access detailed sustainability information for identified non-sustainable brands/products.
- Users receive recommendations for sustainable alternatives to non-sustainable fashion products.
- Users can access brand ratings, core values, and source URLs for products.

## Set up
### Server Side 
1) Create a virtual environment `python -m venv venv`
2) Activate the virtual environment (Linux/Mac) `source venv/bin/activate`  
   Activate the virtual environment (Windows) `venv\Scripts\activate`
3) Install dependencies `pip install -r requirements.txt`
4) Run the server `python server.py`  
5) Your application is running on `http://127.0.0.1:5000`

### Chrome Extension
1) Go to chrome://extensions/ in Chrome
2) Toggle on "Developer mode" in the top right corner
3) Click "Load unpacked" and select the extension code folder
4) Access and interact with the extension via its icon in the Chrome toolbar
5) For updates, refresh the extension from Chrome. To remove, return to chrome://extensions/ and disable/remove the extension

### Scraped product images
[Zip File](https://www.dropbox.com/scl/fi/krwaal4ptccb052wwjwbr/drp_fashion_img_sus_canada_brands.zip?rlkey=7f4vct30f37t813fczbkd3j0c&dl=0)

## Collaborators 
- Aemlia Wong ([GitHub](https://github.com/ameliastwong)) - Lead Product Manager
- Karen Swyszcz - Lead Product Manager
- Anna Garmiza ([GitHub](https://github.com/annagarmiza)) - Lead Developer
