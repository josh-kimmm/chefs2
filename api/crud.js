var fs = require ('fs')

//the path and id are just examples
var filePath = './';
var id = 0;

/*This is a test object simulating a recipe object. All functions
 *are supposed to work with arbitrary object.
 * */
var recipe = {
	recipe_id : 0,
	recipe_name : "tomato and eggs",
	ingredients : ['tomato', 'egg'],
	diet_type : "vegan",
	prep_time : 20,
	cooking_method : "just do it",
	rating : 5
}

/*The function is written to generate a json file on local disk
 *but it names the file using the word 'recipe' and its
 *id for now. We will change the way it names files later after we
 *discussed how we want to format everything.
 * */
function createObj(path, obj){
	path = path + 'recipe' + id + '.json';
	fs.writeFile(path, JSON.stringify(obj), function(err){

		//check for error
		if(err){
			console.error(err);
		}
		
		console.log('json file has been generated!')
	})
}


//test createObj
//createObj( filePath, recipe);


//Read json file
function readObj(path){
	fs.readFile(path, function(err, data){
		if(err){
			console.error(err);
		}
		
		var object = data.toString();

		console.log(object);
	})

}

//test readObj
//readObj('./recipe0.json');



//Update json file
function updateObj(path, key, value){
	
	/*flag used to check if the key exits in json file
	 * maybe redundant, but we will change it later
	 * */
	var flag = false;

	//get the json file
	fs.readFile(path, function(err, data){
	
		//check for error
		if(err){
			console.error(err);
		}
		
		//get the object from json file
		var obj =  data.toString();
		obj = JSON.parse(obj);
		
		for(var attr in obj){
			if(attr === key){
				
				//update the flag
				flag = true;

				//data type check
				if(typeof(obj['' + attr + '']) === typeof(value)){
					obj['' + attr + ''] = value;
				}else{
					return console.log("Error! Value's data type does not match");
				}
			}
		}

		//error message if we didn't find such key in json file
		if(!flag){
			return console.log("Error! No such key exits");
		}

		//update the json file
		fs.writeFile(path, JSON.stringify(obj), function(er){
		
			if(err){
				console.log(err);
			}
		
			console.log("json file has been updated!");
		})

	})

}

//test updateObj
//updateObj('./recipe0.json', 'rating', 100);

//delete json file
function delObj(path){
	fs.unlink(path, function(err){
		if(err){
			console.log(err);
		}

		console.log("file has been removed!");
	})

}

//test delObj
//delObj('./recipe0.json');


