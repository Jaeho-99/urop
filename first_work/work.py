import json
from selenium import webdriver
import os

def arr2obj(arr):
    obj = {}
    for e in arr:
        obj[e[0]] = e[1]
    return obj

if os.path.exists('work.json'):
    fp = open('work.json', 'r')
    obj = json.loads(fp.read())
    fp.close()

    fp = open('workobj.json', 'w')
    obj = list(map(arr2obj, obj))
    fp.write(json.dumps(obj, ensure_ascii=False))
    fp.close()
else:
    driver = webdriver.Firefox()
    driver.implicitly_wait(3)
    driver.get('https://www.bookshopmap.com/map?order=popular_index')

    fp = open('work.js', 'r')
    js = fp.read()
    fp.close()
    
    driver.execute_script(js)