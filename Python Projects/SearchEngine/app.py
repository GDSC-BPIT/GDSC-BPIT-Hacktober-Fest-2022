
from flask import Flask, render_template, request

import json
from elasticsearch import Elasticsearch

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    if 'sinput' in request.form:
        search_input = request.form.get('sinput')
        elastic_search = Elasticsearch(hosts=["http://localhost:9200"],
                                       http_auth=('elastic', 'elastic'))
        print(search_input)

        result = elastic_search.search(index="search_engine",
                                       body={
                                           'size': 10,
                                           "query": {

                                               "match": {
                                                   "filtered_words": {
                                                       "query": search_input,
                                                       "minimum_should_match": 3,
                                                       "fuzziness": "AUTO"
                                                   }
                                               }

                                           }
                                       })

        urls_list = []
        for i in range(len(result['hits']['hits'])):
            urls_list.append(
                result['hits']['hits'][i]['_source']['url'].strip('\n'))

        urls_dict = {'all_urls': urls_list}
        print(urls_dict)
        return render_template('search.html', urls=urls_dict)
    else:
        return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
