from urllib.request import urlopen as ureq
from bs4 import BeautifulSoup as soup
import requests

url = 'https://tasty.co/topic/easy-dinner'
uclient = ureq(url) # opens up connection, grabs web page
page_html = uclient.read() 
uclient.close() # close the client
parent_page = soup(page_html, 'html.parser') # html parsing

# Put links to recipe pages in a list
links_container = parent_page.findAll("a",{'class':'feed-item analyt-unit-tap'}) 

# First 20 links are on the page. The rest are loaded after clicking "Show more"
for i in range(20):
	# Parse page from <a> tag
	#print(links_container[i].get("href"))
	url_child = links_container[i].get('href')
	ch_client = ureq(url_child)
	source = ch_client.read()
	ch_client.close()
	child_page = soup(source, 'html.parser')
	obj_name = links_container[i].get('data-vars-object-name')
	more_links = child_page.findAll("a",{'data-vars-content-name':obj_name})
	
	for j in range( len(more_links) ):
		recipe_url = more_links[j].get('href')
		rclient = ureq(recipe_url)
		recipe_page = rclient.read()
		rclient.close()
		recipes = soup(recipe_page, 'html.parser')
		# print out recipe on the page
		with open('recipe_output.txt', 'a', encoding='utf-8') as f_out:
			#f_out.write(str(recipes.h1))
			f_out.write(str(recipes.get('h1')))
			f_out.write('\n')
			f_out.close()

# prints entire page into a file
#with open('recipe_output.txt', 'w', encoding='utf-8') as f_out:
#    f_out.write(parent_page.prettify())
