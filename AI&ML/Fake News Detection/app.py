from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd 
import string
import re
from sklearn.feature_extraction.text import TfidfVectorizer

import nltk
nltk.download('stopwords')

model = pickle.load(open('model_SVM.pkl','rb'))
app = Flask(__name__)

def clean(text):
    # Remove URLs
    tweet =  re.sub(r'http\S+', '', text)
    # Remove mentions
    tweet = re.sub(r'@\w+', '', tweet)
    # Remove all the special characters
    tweet = re.sub(r'\W', ' ', tweet)
    # Convert to lower case
    tweet = tweet.lower()
    return tweet

# Remove stop words
# the stopwords are regarding hurricanes and water bodies related news
def remove_stopwords(text):
  #defining the list of stopwords
    event_words = ['hurricane', 'sochi',
                   'soldier', 'hurricanesandy', 
                   'liberty', 'bringbackourgirls', 'jersey', 'manhattan','flood',
                   'nj', 'new', 'nyc', 'ny', 'york', 'statue',
                   'statueofliberty', 'shark', 'newyork', 
                   'tomb',  'mh370', 'sandy', 'huracán', 'boston',  
                   'columbianchemicals',
                    'flooding', 'cuba']
    
    twitter = ['via', 'photo', 'rt']
    en_stop_words = nltk.corpus.stopwords.words('english')
    sp_stop_words = nltk.corpus.stopwords.words('spanish')
    stopword = en_stop_words + sp_stop_words + twitter + event_words
    text= ' '.join([word for word in text.split() if word not in stopword])
    return text

Tfidf_vect = pickle.load(open("tfidf.pkl", 'rb'))

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    testNews = request.form['message']
    testNews = clean(testNews)
    testNews=remove_stopwords(testNews)
    
    testNews_to_raw=pd.Series(testNews)
    
    getting_matrix_tf=Tfidf_vect.transform(testNews_to_raw)
    svm_prediction=model.predict(getting_matrix_tf)
    return render_template('index.html', prediction_text = "The news is "+svm_prediction[0])
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)
