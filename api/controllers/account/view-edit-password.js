module.exports = {


  friendlyName: 'View edit password',


  description: 'Display "Edit password" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-password'
    }

  },


  fn: async function (inputs, exits) {

    return exits.success({
      user: await User.findOne(this.req.me.id),
    });

  }


};
