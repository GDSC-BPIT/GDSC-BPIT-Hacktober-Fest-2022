from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from urllib.parse import urlparse, urljoin
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import requests
import hashlib
from nltk.tokenize import RegexpTokenizer
import mysql.connector
import requests
import hashlib
from datetime import datetime
import time
from elasticsearch import Elasticsearch
import PyPDF2
import fitz
import io
from PIL import Image
import pytesseract


def valid_url(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

# -------------------TextExtraction------------------------------


class TextExtraction():
    """This class is to extract all the text from a given URL of website and remove stop words"""

    def __init__(self, URL):
        self.URL = URL
        self.tokenized_words = []
        self.tokenized_words_without_stopwords = []
        self.raw_text = ''

    def html_content(self):
        try:
            html_content = requests.get(self.URL).text

            # Parse the html content
            soup = BeautifulSoup(html_content, "html.parser")
            return soup
        except:
            return ''

    # to get all the text from html page
    def GetText(self):
        soup = self.html_content()
        if soup != '':
            self.raw_text = soup.getText().replace(
                '\x80', '').replace('\x98', '').replace('\x99', '').replace('\x93', '')

        return self.raw_text

    # filtering out the stop words
    def Filter(self, text):
        # storing stop words
        stop_words = set(stopwords.words('english'))

        # removing stopwords from tokenized words
        self.tokenized_words = RegexpTokenizer(r'\w+').tokenize(text)
        self.tokenized_words_without_stopwords = list(
            set(self.tokenized_words)-set(stop_words))

        return self.tokenized_words_without_stopwords


# ----------------------------- Hashing ----------------------------------------
class hashing():
    """Returns hashcode for given string"""

    def __init__(self):
        pass

    def hash(self, text):
        try:
            result = hashlib.md5(text.encode())
            result = result.hexdigest()
            print("Done Hash - ", result)
            return result
        except:
            print("Couldn't hash")


# -----------------------search_engine class to insert in ElasticSearch---------------------------
class search_engine():
    def __init__(self, url, words, id):
        self.index = 'searchengine'
        self.url = url
        self.words = words
        self.id = id
        self.document = {'url': self.url, 'filtered_words': self.words}

# --------------------- Elasticsearch ------------------------------------


class ElasticSearch():
    """docstring for Indexing."""

    def __init__(self, host, user, pwd):
        self.host = host
        self.user = user
        self.pwd = pwd
        self.es = ''

    def createClient(self):
        self.es = Elasticsearch(hosts=[self.host],
                                basic_auth=(self.user, self.pwd))
        print('connected with elastic search')

    def checkIndex(self, index_name):
        return self.es.indices.exists(index=index_name)

    def createIndex(self, index_name):
        try:
            self.es.indices.create(index=index_name)
            print("index created")
        except:
            print("index can't be created")

    def insertIntoIndex(self, obj):
        try:
            self.es.index(index=obj.index, document=obj.document, id=obj.id)
            print("inserted into elasticsearch")
        except:
            print("can't insert URL")
        # print(es.indices.get_mapping(index=obj.index))

    def updateIndex(self, obj):
        # try:
        print(obj.document)
        print("-----------------------------------------------")
        self.es.update(body={"doc": obj.document},
                       index=obj.index, id=obj.id, refresh='wait_for')

        print("Index Updated")
        # except:
        # print("Couldn't update index")

    def refreshIndex(self, index):
        self.es.indices.refresh({index: 'searchengine'})


class PDF():
    """From pdfs text and text from images is extracted"""

    def __init__(self):
        self.text = ''
        self.filename = ''

    def download_file(self, url):
        response = requests.get(url)
        file = open("test.pdf", 'wb')
        file.write(response.content)
        file.close()

    def pdf_reading(self):
        self.filename = 'test.pdf'
        pdfFileObj = open(self.filename, 'rb')
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        for i in range(pdfReader.numPages):
            pageObj = pdfReader.getPage(i)
            self.text += pageObj.extractText()
        pdfFileObj.close()

    def img_reading(self):
        file = self.filename
        pdf_file = fitz.open(file)
        for page_index in range(len(pdf_file)):
            page = pdf_file[page_index]
            image_list = page.get_images()
            for image_index, img in enumerate(image_list, start=1):
                xref = img[0]
                base_image = pdf_file.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                image = Image.open(io.BytesIO(image_bytes))
                file = image
                self.text += pytesseract.image_to_string(file, lang='eng')
        return self.text


# --------------------------------SQL--------------------------------
class SQL():
    """docstring for SQL."""

    def __init__(self, Host, User, pwd, Port):
        self.my_cursor = ''
        self.mydb = ''
        self.host = Host
        self.User = User
        self.pwd = pwd
        self.Port = Port

    # connecting to SQL host="127.0.0.1", user="root", password="root", port='3306'
    def connect_SQL_Server(self):
        self.mydb = mysql.connector.connect(
            host=self.host,
            user=self.User,
            password=self.pwd,
            port=self.Port,
            use_pure=True
        )
        self.my_cursor = self.mydb.cursor(prepared=True)
        print("connected sql")

    # checking database existance

    def check_database(self, database):
        self.my_cursor.execute("SHOW DATABASES")
        if (database,) not in self.my_cursor:
            return False
        return True

    def create_database(self, database):
        try:
            query = 'create database {}'.format(database)
            self.my_cursor.execute(query)
        except:
            print('Error creating database')

    # connecting to database

    def connect_database(self, database_name):
        self.mydb = mysql.connector.connect(
            host=self.host,
            user=self.User,
            password=self.pwd,
            database=database_name
        )
        self.my_cursor = self.mydb.cursor()

    def check_table(self, table_name):
        self.my_cursor.execute("SHOW TABLES")

        if (table_name,) not in self.my_cursor:
            return False
        return True

    def create_table(self, table_name, attributes):
        """attributes -> string"""
        try:
            query = "CREATE TABLE {} {}".format(table_name, attributes)
            self.my_cursor.execute(query)
            self.mydb.commit()
        except:
            print("Cannot create table")

    def insert(self, table_name, values):
        try:
            query = "INSERT INTO {} VALUES {}".format(table_name, values)
            self.my_cursor.execute(query)
            self.mydb.commit()
            print("inserted into sql")
        except:
            print("Can't be inserted sql values")

    def update(self, table_name, conditions, sets):
        """ table_name --> table name in string, conditionValues --> dict, setValues --> dict"""
        try:
            set_columns = []
            condition_columns = []

            for attribute in sets:
                set_columns.append('{} = %s'.format(attribute))
            set_columns = ','.join(set_columns)

            for attribute in conditions:
                condition_columns.append('{} = %s'.format(attribute))
            condition_columns = ','.join(condition_columns)

            query = "UPDATE {} set {} where {} ".format(
                table_name, set_columns, condition_columns)
            v = list(sets.values()) + list(conditions.values())
            print(v, "\n-----------------------------")
            self.my_cursor.execute(query, v)
            self.mydb.commit()
            print("SQL updated")
        except:
            print("Can't be updated")

    def select(self, table_name, attributes):
        try:
            attributes = ','.join(attributes)
            query = "SELECT {} FROM {}".format(attributes, table_name)
            self.my_cursor.execute(query)
            # self.mydb.commit()
        except:
            print("ERROR in selecting")

    def executeQuery(self, query, values):
        try:
            self.my_cursor.execute(query, values)
        except:
            print("ERROR in executeQuery")
