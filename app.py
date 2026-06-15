# app.py
from flask import Flask, render_template, request, jsonify
import leafmap.foliumap as leafmap
import pandas as pandas
import numpy as numpy
import os
import json

app = Flask(__name__)

#SUBMITTED_DATA_FILE = os.path.join(app.root_path, 'data', 'pending_submissions.json') # THIS IS FOR FORM SUBMISSION

#in_csv = "data/NbS_locations.csv" # THIS IS ALL THE PROJECT DATA FROM THE PDF (NOW USING VALIDATION AND FORM IN UBERI WIX WEBSITE)
#bz_boundaries = "data/bz_boundaries.geojson"
##location_lat_long = "data/LocationPositions.csv" # This is a list of the cities/towns/villages along with the district they are in and their latitude and longitude


@app.route('/')
def index():
    return render_template("index.html")

# @app.route('/submit')
# def loadSubmit():
#     return render_template('submit.html')

# @app.route('/submission-management')
# def loadManager():
#     return render_template('submission-management.html')


# FOR SAVING SUBMITTED FILE - This may need to be done with JQuery in the future
# @app.route('/submit-pending-project', methods=['POST'])
# def handle_pending_submission():
#     try:
#         new_project = request.get_json()
#         if not new_project:
#             return jsonify({"error": "No data received"}), 400

#         if os.path.exists(SUBMITTED_DATA_FILE):
#             with open(SUBMITTED_DATA_FILE, 'r', encoding='utf-8') as f:
#                 try:
#                     current_data = json.load(f)
#                     if not isinstance(current_data, list):
#                         current_data = []
#                 except json.JSONDecodeError:
#                     current_data = []
#         else:
#             current_data = []
#             os.makedirs(os.path.dirname(SUBMITTED_DATA_FILE), exist_ok=True)

#         new_project['project_id'] = len(current_data) + 1
#         current_data.append(new_project)

#         with open(SUBMITTED_DATA_FILE, 'w', encoding='utf-8') as f:
#             json.dump(current_data, f, indent=4, ensure_ascii=False)

#         return jsonify({"message": "Submission saved successfully!"}), 200

#     except Exception as e:
#         print(f"Server Error: {str(e)}")
#         return jsonify({"error": "Internal server processing error"}), 500

if __name__ == '__main__':
     app.run(debug=True)