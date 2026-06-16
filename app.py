# app.py
from flask import Flask, render_template, request, jsonify
import leafmap.foliumap as leafmap
import pandas as pandas
import numpy as numpy
import os
import json

app = Flask(__name__)
@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
     app.run(debug=True)