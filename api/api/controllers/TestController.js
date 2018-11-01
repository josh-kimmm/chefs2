/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	getData: function(req, res) {

		console.log(req);

		var data = {name: 'Hello World'};
		return res.json({"data": "Hello World"});

    }

};

