/**
 * UserController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcryptjs');

var search = require('../search/Search');
var random = require('../utility/RandomGenerator');
var loader = require('../utility/GetRecipeInfo');

module.exports = {

  signup: async function(req, res) {
    let {email, password, confirmPassword, firstName, lastName} = req.allParams();

    // validate fields
    if (!email) {
      return res.json({
        'errorMessage': 'Please enter an email address.',
      });
    } else {
      let usersWithSameEmail = await User.find({
        email: email
      });
      if (usersWithSameEmail.length > 0) {
        return res.json({
          'errorMessage': 'Your email address is already taken.',
        });
      }
    }

    if (!password || !confirmPassword) {
      return res.json({
        'errorMessage': 'Please enter and confirm your password.',
      });
    } else if (password != confirmPassword) {
      return res.json({
        'errorMessage': 'Your passwords do not match.',
      });
    }

    if (!firstName) {
      return res.json({
        'errorMessage': 'Please enter a first name.',
      });
    }

    if (!lastName) {
      return res.json({
        'errorMessage': 'Please enter a last name.',
      });
    }

    // encrypt password
    let hashedPassword = bcrypt.hashSync(password, 10);
    // create the user profile
    let createdUserProfile = await UserProfile.create({}).fetch();
    // create the user
    let createdUser = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      userProfile: createdUserProfile.id,
    }).fetch();
    UserProfile.update({
      id: createdUserProfile.id,
    },
        {
          user: createdUser.id,
        });
    return res.json(createdUser);
  },

  login: async function(req, res) {
    console.log('random start');

    var recipes = search.randomPick(await loader.findAllRecipe(), 1);
    for (var i = 0; i < 1; i++) {
      console.log(recipes[i]);
    }

    console.log('random end');
    let {email, password} = req.allParams();
    let user = await User.find({
      email: email,
    });
    if (user.length === 1) {
      userFound = user[0];
      if (bcrypt.compareSync(password, userFound.password)) {
        return res.json(userFound);
      }
    }
    return res.json({
      'errorMessage': 'Email address or password is incorrect.',
    });
  },

};
