#import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pandas as pd
from scipy.spatial import distance
from flask import Flask, request, jsonify
from flask_cors import CORS

nltk.download('stopwords')
nltk.download('punkt_tab')

app = Flask(__name__)
CORS(app)
clubs_df = pd.read_csv("data_USE.csv")
#path= r'C:\Users\akhil\Documents\dvhs_clubs\club_finder_logic\saved_model'
path= r'.\saved_model'
path="https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(path)
stop_words = set(stopwords.words('english'))


def similarity(embedding_string, embedded_input):
    stripped_embedding = embedding_string.strip("[]").split()
    float_embedded = np.array([float(i) for i in stripped_embedding])
    return 1-distance.cosine(float_embedded,embedded_input)

@app.route("/clubs", methods=['POST'])
def find_clubs():
    #query = input("Enter a club's name\n")
    #query = ""
    query = request.json.get("data").get("text")
    print("query: " + query + " : end Query")
    query = word_tokenize(query)
    filtered_query = ' '.join([word for word in query if word.lower() not in stop_words])
    embedded_query = model([filtered_query])[0].numpy()

    clubs_df['similarity'] = clubs_df['description_embeddings'].apply(
        lambda element : similarity(element, embedded_query)
    )
    top5 = clubs_df.sort_values("similarity", ascending=False).head(5)
    top5_list = [
        {
            "name": row["name"],
            "description_summary": row["description_summary"],
            "description": row["description"],
            "contact": row["contact"],
            "meeting": row["meeting"]
        }
        for _, row in top5.iterrows()
    ]
    return jsonify(top5_list)
    #return None

#find_clubs()
app.run(port=8501)
