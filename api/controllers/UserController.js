
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

        user.following = false;
        if (req.session.userId) {
            // check if user is following this user
            let currentUser = await User.findOne({
                id: req.session.userId,
            }).populateAll();
            let followingUser = await UserProfile.findOne({
                id: currentUser.userProfile[0].id,
            }).populate('followingList', {
                id: user.id,
            });
            user.following = followingUser.followingList.length > 0 ? true : false;
        }

        user.pageName = 'viewUserProfile';

        return res.view('pages/view-user', user);
    },

    followUser: async function(req, res) {
        let userId = req.param('userId', null);
        
        if (!userId || !req.session.userId || userId == req.session.userId) {
            sails.log.info('No user ID');
            return res.notFound();
        }

        let currentUser = await User.findOne({
            id: req.session.userId,
        }).populateAll();

        let userToFollow = await User.findOne({
            id: userId,
        }).populateAll();

        if (!currentUser) {
            sails.log.info('No current user logged in');
            return res.notFound();
        }

        if (!userToFollow) {
            sails.log.info('No user exists with ID ' + userId);
            return res.notFound();
        }

        await UserProfile.addToCollection(currentUser.userProfile[0].id, 'followingList').members([userToFollow.id]);
        await UserProfile.addToCollection(userToFollow.userProfile[0].id, 'followerList').members([currentUser.id]);

        return res.redirect('/user/' + userToFollow.id);
    },

    unfollowUser: async function(req, res) {
        let userId = req.param('userId', null);
        
        if (!userId || !req.session.userId || userId == req.session.userId) {
            return res.notFound();
        }

        let currentUser = await User.findOne({
            id: req.session.userId,
        }).populateAll();

        let userToFollow = await User.findOne({
            id: userId,
        }).populateAll();

        if (!currentUser) {
            return res.notFound();
        }

        if (!userToFollow) {
            return res.notFound();
        }

        await UserProfile.removeFromCollection(currentUser.userProfile[0].id, 'followingList').members([userToFollow.id]);
        await UserProfile.removeFromCollection(userToFollow.userProfile[0].id, 'followerList').members([currentUser.id]);

        return res.redirect('/user/' + userToFollow.id);
    },
};