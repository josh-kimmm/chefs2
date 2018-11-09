/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    /**
     * foreign key: UserProfile
     * one to one association
     */
    userProfile: {
      model: 'UserProfile',
    },

    email: {
      type: 'string',
      unique: true,
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    firstName: {
      type: 'string',
      required: true,
    },

    lastName: {
      type: 'string',
      required: true,
    },
  },

};

