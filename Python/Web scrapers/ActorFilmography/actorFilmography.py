'''
Take the name of the actor as input and the script returns all the moves/tv shows of that actor in decreasing order of the year of release.
'''

from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup

name = input("Please enter the actor name: ")
name = '+'.join(name.split())

#Initiating the driver
driver = webdriver.Firefox(executable_path = r"")

#Getting the search query
driver.get(f"https://www.imdb.com/find?q={name}&ref_=nv_sr_sm")

# Navigating through search results and clicking appropriate links
element = driver.find_element(By.XPATH, '//*[@id="main"]/div/div[2]/table/tbody/tr[1]/td[2]/a').click()
element = driver.find_element(By.XPATH, '/html/body/div[2]/div/div[2]/div[3]/div[2]/div[3]/div[1]/div[2]/ul/li[1]/span/a').click()

#Saving the current URL and closing the window
URL = driver.current_url
driver.close()

#Getting and processing the HTML page
r = requests.get(URL)
soup = BeautifulSoup(r.content, 'html5lib')

#Finding all films section
table = soup.find('div', attrs = {'class':'filmo-category-section'}) 


movies = {}

#Filtering films from films sections with year
for row in table.findAll('div',
                         attrs = {'class':['filmo-row odd', 'filmo-row even']}):
    
    try:
        movies[row.span.text.strip()].append(row.b.text)
    except KeyError:
        movies[row.span.text.strip()] = [row.b.text]
    

#Printing fils in descending order by release date
for key, values in movies.items():
    for movie in values:
        print(f"movie name: {movie} year: {key}")