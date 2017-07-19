module.exports = function(models) {
    function getPepes(req, res, next) {
        var user = req.body;

        new models.User({
            deviceId: user.deviceId
        }).fetch().then(function(model) {
            if (model) {
                res.json(model.attributes)
            } else {
                encryptPassword(user.password, function(err, hash) {
                    if (err) return next(err);

                    user.token = uuid.v4();
                    user.crypted_password = hash;

                    delete user['password'];
                    delete user['password2'];

                    new models.User(user).save().then(function(model) {
                        if (register_callback) {
                            register_callback(model);
                        }
                        res.json(clean_user(model.attributes));

                    }).catch(next);
                });
            }
        });
    }

    function savePepes(req, res, next) {
        var user = req.body;

        new models.User({
            deviceId: user.deviceId
        }).fetch().then(function(model) {
            if (model) {
                res.json(model.attributes)
            } else {
                encryptPassword(user.password, function(err, hash) {
                    if (err) return next(err);

                    user.token = uuid.v4();
                    user.crypted_password = hash;

                    delete user['password'];
                    delete user['password2'];

                    new models.User(user).save().then(function(model) {
                        if (register_callback) {
                            register_callback(model);
                        }
                        res.json(clean_user(model.attributes));

                    }).catch(next);
                });
            }
        });
    }



    return {
        getPepes: getPepes,
        savePepes: savePepes
    }
}