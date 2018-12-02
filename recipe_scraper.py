from urllib2 import urlopen as ureq
import bs4
from bs4 import BeautifulSoup
import requests
import io
import json

# Change csrf in security.js to false to use the script. Remember to change it back to true.

# create a set to make sure there are no duplicate recipe entries
recipe_set = set()
prepTimes = []

url2 = 'https://tasty.co/topic/one-pot'
uclient2 = ureq(url2) # opens up connection, grabs web page
page_html = uclient2.read() 
uclient2.close() # close the client
parent_page = BeautifulSoup(page_html, 'html.parser') # html parsing

# Put links to recipe pages in a list
links_container = parent_page.findAll('a',{'class':'feed-item analyt-unit-tap'}) 


# First 20 links are on the page. The rest are loaded after clicking "Show more"
for i in range(20):
	# Parse page from <a> tag
	#print(links_container[i].get("href"))
	url_child = links_container[i].get('href') 
	ch_client = ureq(url_child) # opens up connection, grabs web page
	source = ch_client.read() # read the page
	ch_client.close() # close client
	child_page = BeautifulSoup(source, 'html.parser') # parse html
	obj_name = links_container[i].get('data-vars-object-name')
	more_links = child_page.findAll('a',{'data-vars-content-name':obj_name})
	
	# navigate to recipe page from more_links array
	for j in range( len(more_links) ):
		recipe_url = more_links[j].get('href')
		rclient = ureq(recipe_url)
		recipe_page = rclient.read()
		rclient.close()
		recipe = BeautifulSoup(recipe_page, 'html.parser')
		# add recipe to recipe_set
		if recipe.h1 not in recipe_set:
			recipe_set.add(recipe.h1)
			data = {}

			data['recipeName'] = recipe.h1.text

			# get all of the ingredients
			ingredientsToPost = []
			ingredients = recipe.findAll('div',{'class':'ingredients__section'})
			for ingredient in ingredients:
				for li in ingredient.findAll('li'):
					whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ')
					ingredientName = ' '.join(''.join([i for i in li.get_text().partition(',')[0] if i in whitelist]).split())
					ingredientMeasurements = ['cups ', 'tablespoons ', 'cloves ', 'pinches ', 'lbs ', 'teaspoons ', 'heads ', 'bunches ', 'slices ', 'sprigs ', 'packages ', 'links ', 'ozs ', 'oz ', 'cup ', 'tablespoon ', 'clove ', 'pinch ', 'lb ', 'teaspoon ', 'head ', 'bunch ', 'slice ', 'sprig ', 'package ', 'link ']
					for measurement in ingredientMeasurements:
						if measurement in ingredientName:
							ingredientName = ingredientName.partition(measurement)[2]
					if ingredientName[-2:] == ' g' or ingredientName[-2:] == ' L':
						ingredientName = ingredientName[:-2]
					if ingredientName[-3:] == ' mL':
						ingredientName = ingredientName[:-3]
					print ingredientName
					toPost = {
						'ingredientName': ' '.join(ingredientName.split()),
					}
					r = requests.post('http://localhost:1337/create-ingredient', data=toPost)
					ingredientsToPost.append(json.loads(r.content)['id'])

			data['ingredients'] = ingredientsToPost

			# get the instructions, separate by ||
			instructions = recipe.findAll('ol', {'class':'prep-steps'})[0]
			instructionsArray = []
			for step in instructions.findAll('li'):
				instructionsArray.append(step.get_text())
			data['instructions'] = '||'.join(instructionsArray)
			
			# cooking method is one-pot cause it's in the one-pot category on Tasty
			data['cookingMethod'] = 'one-pot'
			
			# get the prep time if exists
			prep = recipe.findAll('div', {'class':'prep'})[0].findAll('div')[0].findAll('div')
			if len(prep) > 0:
				data['prepTime'] = prep[0].findAll('h3')[0].get_text()
				if data['prepTime'] not in prepTimes:
					prepTimes.append(data['prepTime'])

			# get the diet type from the lag list
			data['dietType'] = 'vegetarian' if len(recipe.findAll('a', {'class':'tag-list--item', 'data-vars-object-name':'vegetarian'})) > 0 else ''
			data['dietType'] = 'vegan' if len(recipe.findAll('a', {'class':'tag-list--item', 'data-vars-object-name':'vegan'})) > 0 else ''

			video = recipe.findAll('amp-ima-video', {'id':'tasty-video-desktop'})[0]
			data['image'] = video['data-poster']

			r = requests.post('http://localhost:1337/create-recipe', data=data)


url = 'https://tasty.co/topic/easy-dinner'
uclient = ureq(url) # opens up connection, grabs web page
page_html = uclient.read() 
uclient.close() # close the client
parent_page = BeautifulSoup(page_html, 'html.parser') # html parsing

# Put links to recipe pages in a list
links_container = parent_page.findAll('a',{'class':'feed-item analyt-unit-tap'}) 


# First 20 links are on the page. The rest are loaded after clicking "Show more"
for i in range(20):
	# Parse page from <a> tag
	#print(links_container[i].get("href"))
	url_child = links_container[i].get('href') 
	ch_client = ureq(url_child) # opens up connection, grabs web page
	source = ch_client.read() # read the page
	ch_client.close() # close client
	child_page = BeautifulSoup(source, 'html.parser') # parse html
	obj_name = links_container[i].get('data-vars-object-name')
	more_links = child_page.findAll('a',{'data-vars-content-name':obj_name})
	
	# navigate to recipe page from more_links array
	for j in range( len(more_links) ):
		recipe_url = more_links[j].get('href')
		rclient = ureq(recipe_url)
		recipe_page = rclient.read()
		rclient.close()
		recipe = BeautifulSoup(recipe_page, 'html.parser')
		# add recipe to recipe_set
		if recipe.h1 not in recipe_set:
			recipe_set.add(recipe.h1)
			data = {}

			data['recipeName'] = recipe.h1.text

			# get all of the ingredients
			ingredientsToPost = []
			ingredients = recipe.findAll('div',{'class':'ingredients__section'})
			for ingredient in ingredients:
				for li in ingredient.findAll('li'):
					whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ')
					ingredientName = ' '.join(''.join([i for i in li.get_text().partition(',')[0] if i in whitelist]).split())
					ingredientMeasurements = ['cups ', 'tablespoons ', 'cloves ', 'pinches ', 'lbs ', 'teaspoons ', 'heads ', 'bunches ', 'slices ', 'sprigs ', 'packages ', 'links ', 'ozs ', 'oz ', 'cup ', 'tablespoon ', 'clove ', 'pinch ', 'lb ', 'teaspoon ', 'head ', 'bunch ', 'slice ', 'sprig ', 'package ', 'link ']
					for measurement in ingredientMeasurements:
						if measurement in ingredientName:
							ingredientName = ingredientName.partition(measurement)[2]
					if ingredientName[-2:] == ' g' or ingredientName[-2:] == ' L':
						ingredientName = ingredientName[:-2]
					if ingredientName[-3:] == ' mL':
						ingredientName = ingredientName[:-3]
					print ingredientName
					toPost = {
						'ingredientName': ' '.join(ingredientName.split()),
					}
					r = requests.post('http://localhost:1337/create-ingredient', data=toPost)
					ingredientsToPost.append(json.loads(r.content)['id'])

			data['ingredients'] = ingredientsToPost

			# get the instructions, separate by ||
			instructions = recipe.findAll('ol', {'class':'prep-steps'})[0]
			instructionsArray = []
			for step in instructions.findAll('li'):
				instructionsArray.append(step.get_text())
			data['instructions'] = '||'.join(instructionsArray)
			
			# get the cooking method by searching through instructions. if contains 'oven', then cooking
			# method is 'bake'
			data['cookingMethod'] = 'oven' if 'oven' in data['instructions'] else ''
			
			# get the prep time if exists
			prep = recipe.findAll('div', {'class':'prep'})[0].findAll('div')[0].findAll('div')
			if len(prep) > 0:
				data['prepTime'] = prep[0].findAll('h3')[0].get_text()
				if data['prepTime'] not in prepTimes:
					prepTimes.append(data['prepTime'])

			# get the diet type from the lag list
			data['dietType'] = 'vegan' if len(recipe.findAll('a', {'class':'tag-list--item', 'data-vars-object-name':'vegan'})) > 0 else ''
			data['dietType'] = 'vegetarian' if len(recipe.findAll('a', {'class':'tag-list--item', 'data-vars-object-name':'vegetarian'})) > 0 else ''

			video = recipe.findAll('amp-ima-video', {'id':'tasty-video-desktop'})[0]
			data['image'] = video['data-poster']

			r = requests.post('http://localhost:1337/create-recipe', data=data)