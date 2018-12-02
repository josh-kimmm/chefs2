
module.exports= {
    viewUserProfile: async function(req, res) {
        let userId = req.param('userId', null);
        if (!userId) {
            return res.notFound();
        }

        let user = await User.findOne({
            id: userId,
        }).populateAll();

        if (typeof user == 'undefined' || !user) {
            return res.notFound();
        }

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
        let user = await User.findOne(userId).populateAll();
        let userProfile = user.userProfile[0];

        return res.view('pages/account/edit-dietary-preferences', {
            user: user,
            pageName: 'userDietaryPreferences',
            dietaryPreferences: userProfile.dietaryPreferences ? userProfile.dietaryPreferences.split(',') : []
        });
    },

    processEditDietaryPreferencesPage: async function(req, res) {
        if (!req.session.userId) {
            return res.notFound();
        }

        let vegan = req.param('vegan');
        let vegetarian = req.param('vegetarian');

        let dietaryPreferences = [];
        if (vegan) dietaryPreferences.push('vegan');
        if (vegetarian) dietaryPreferences.push('vegetarian');

        let user = (await User.findOne(req.session.userId).populateAll()).userProfile[0];
        await UserProfile.update(user, {
            dietaryPreferences: dietaryPreferences.join(','),
        });

        return res.redirect('/account/dietary-preferences');
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

        let communityRecipes = await CommunityRecipe.find({
            select: 'id',
            where: {
                savedBy: userToFollow.id,
            },
        });
        await CommunityRecipe.addToCollection(communityRecipes.map((obj) => obj.id), 'userProfile').members([currentUser.id]);

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
        let communityRecipes = await CommunityRecipe.find({
            select: 'id',
            where: {
                savedBy: userToFollow.id,
            },
        });
        await CommunityRecipe.removeFromCollection(communityRecipes.map((obj) => obj.id), 'userProfile').members([currentUser.id]);

        return res.redirect('/user/' + userToFollow.id);
    },

    showCommunityPage: async function(req, res) {
        if (!req.session.userId) {
            return res.notFound();
        }

        let user = await User.findOne(req.session.userId).populateAll();

        console.log((await UserProfile.findOne(user.userProfile[0].id).populateAll()).followingList)
        console.log(await CommunityRecipe.find().where({
            savedBy: ((await UserProfile.findOne(user.userProfile[0].id).populateAll()).followingList).map((obj) => obj.id),
        }).populateAll())

        return res.view('pages/community', {
            pageName: 'community',
            recipes: await CommunityRecipe.find().where({
                savedBy: ((await UserProfile.findOne(user.userProfile[0].id).populateAll()).followingList).map((obj) => obj.id),
            }).populateAll(),
        });
    }
};