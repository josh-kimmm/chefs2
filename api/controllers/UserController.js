
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
};