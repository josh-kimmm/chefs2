from urllib.request import urlopen as ureq
import bs4
from bs4 import BeautifulSoup
import requests

url = 'https://tasty.co/topic/easy-dinner'
uclient = ureq(url) # opens up connection, grabs web page
page_html = uclient.read() 
uclient.close() # close the client
parent_page = BeautifulSoup(page_html, 'html.parser') # html parsing

# Put links to recipe pages in a list
links_container = parent_page.findAll('a',{'class':'feed-item analyt-unit-tap'}) 

# create a set to make sure there are no duplicate recipe entries
recipe_set = set()

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
			# write recipe into a file
			with open('recipe_output.txt', 'a', encoding='utf-8') as f_out:
			
				f_out.write(str(recipe.h1.text))
				f_out.write('\n')
				
				# Ingredients & Preparation section; only has one entry - divs[0]
				divs = recipe.findAll('div',{'class':'ingredients-prep clearfix col md-col-7 xs-flex xs-flex-column md-flex-row xs-flex-order-2 md-flex-order-1'})
				#f_out.write(str(divs[0].h2.text) + ' ') # "Ingredients"
				#f_out.write(str(divs[0].findAll('p',{'class':'xs-text-2 xs-mb2'})[0].text)) # "for n servings"
				
				sibs = divs[0].contents
				#print('sibs length: '+str(len(sibs)))
				
				for i in range(len(sibs)):
					#print('sibs['+str(i)+']:'+'\n')
					if isinstance(sibs[i], bs4.element.Tag):
					# sibs[1]: <div class="col md-col-4 xs-mx2 xs-mt2 md-mt0 xs-flex-order-2 md-flex-order-1">
						#print('sib[i]: '+str(sibs[i]))
						child = sibs[i].contents
						if len(child) > 0:
							#print('== len(child): ' + str(len(child)) + ' ==')
							#print(child)
							for x in range(len(child)):
								if isinstance(child[x],bs4.element.Tag):
									#print('x: '+str(x))
									f_out.write(' '.join((child[x].get_text()).split())) # {'class':'xs-text-5 extra-bold caps xs-mb1'}
									f_out.write('\n')
									'''
									if len(child[x].contents) > 0:
										#print(child[x].contents[0])
										for o in range(len(child[x].contents)):
											if isinstance(child[x].contents[o],bs4.element.Tag):
												#print('o: '+str(o))
												#print(' '.join((child[x].content[o].get_text()).split()))
												#print(child[x].content[o].get_text())
												if len(child[x].contents[o].contents) > 0:
													for j in range(len(child[x].contents[o].contents)):
														if isinstance(child[x].contents[o].contents[j],bs4.element.Tag):
															#print(' '.join((child[x].contents[o].contents[j].get_text().split())))
												else:
													print(' '.join((child[x].contents[o].get_text()).split()))
									else:
										print(' '.join((child[x].get_text()).split()))
						else:
							print(str(sibs[i]))'''
				f_out.write('\n')
			f_out.close()
			
#for x in recipe_set:
#	print(x)
			
'''
# write recipe into a file
with open('recipe_output.txt', 'a', encoding='utf-8') as f_out:
        f_out.write(str(recipe.h1))
        f_out.write('\n')
        f_out.close()
'''

# prints entire page into a file
#with open('recipe_output.txt', 'w', encoding='utf-8') as f_out:
#    f_out.write(parent_page.prettify())

 
