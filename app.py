# app.py
from flask import Flask, render_template
import leafmap.foliumap as leafmap
import pandas as pandas
import numpy as numpy
import os
import json

app = Flask(__name__)

#Read CSV and turn it into GeoJSON format
in_csv = "data/NbS_locations.csv"
out_geojson = "data/NbS_locations.geojson" ## UNUSED ?????
bz_boundaries = "data/bz_boundaries.geojson"

@app.route('/')
def index():

    dataframe = pandas.read_csv(in_csv)

    #Disperses markers ~50 meters on long/lat so there is no overlap
    mask = dataframe.duplicated(subset=["latitude","longitude"], keep = False)
    dataframe.loc[mask,"latitude"] += numpy.random.uniform(-0.0005, 0.0005,size=mask.sum())
    dataframe.loc[mask,"longitude"] += numpy.random.uniform(-0.0005, 0.0005,size=mask.sum())

    m = leafmap.Map(
        draw_control=False,
        scale_control=False,
        fullscreen_control=False,
        center=[17.097111994309312, -88.71966058916018],
        zoom=8
        )

    popups = []
    for index, row in dataframe.iterrows():
        html = f"""
            <div style='font-family: Arial; width: 200px;'>
            <h4 style='margin: 0 0 5px 0; color: #7a0808;'>{row['project_title']}</h4>
            <p style='margin: 0;'><b>District:</b> {row['district']}</p>
            <p style='margin: 0;'><b>Location:</b> {row['location']}</p>
            </div>
            """
        popups.append(html)

    # Add the list of HTML strings to your dataframe
    dataframe['Project Info'] = popups

    m.add_points_from_xy(
        dataframe,
        x="longitude", 
        y="latitude", 
        color_column = "district",
        layer_name="NbS_Clusters",
        max_cluster_radius=80,
        popup=["Project Info"],
        popup_label_num=0,
        disableClusteringAtZoom=13,
        icon_names=['circle']
    )

    m.add_geojson(
        bz_boundaries, 
        layer_name="districts",
        popup_keep_highlighted=False,
        info_mode=None
    )

    #Save map to static folder
    m.to_html("static/map.html")
    
    return render_template("index.html")

@app.route('/submit')
def about():
    return render_template('submit.html')

@app.route('/project-data')
def getJSON():
    file_path = './data/nbs_projects.json'
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data

def on_marker_click(**kwargs):
    print("Marker clicked! Details:", kwargs)

if __name__ == '__main__':
    app.run(debug=True)