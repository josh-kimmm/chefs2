
module.exports= {
    viewUserProfile: async function(req, res) {
        let userId = req.param('userId', null);
        if (!userId) {
            return res.notFound();
        }

        let user = await User.findOne({
            id: userId,
        }).populateAll();
        let userProfileId = user.userProfile[0].id;
        user.userProfile = await UserProfile.findOne({
            id: userProfileId,
        }).populateAll();

        if (!user) {
            return res.notFound();
        }

        user.pageName = 'viewUserProfile';

        return res.view('pages/view-user', user);
    },

    showEditDietaryPreferencesPage: async function(req, res) {
        if (!req.session.userId) {
            return res.notFound();
        }

        let userId = req.session.userId;
        let userProfile = UserProfile.find({
            user: userId,
        }).populateAll();

        return res.view('pages/account/edit-dietary-preferences', {
            pageName: 'userDietaryPreferences',
            dietaryPreferences: userProfile.dietaryPreferences ? userProfile.dietaryPreferences.split(',') : []
        });
    },

    processEditDietaryPreferencesPage: async function(req, res) {
        if (!req.session.userId) {
            return res.notFound();
        }

        let userId = req.session.userId;
        let userProfile = UserProfile.find({
            user: userId,
        }).populateAll();

        let vegan = req.param('vegan');
        let vegetarian = req.param('vegetarian');

        let dietaryPreferences = [];
        if (vegan) dietaryPreferences.push('vegan')

        return res.redirect('/account/dietary-preferences');
    },
};