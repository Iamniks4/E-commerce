var mongodb = require('mongodb');

exports.up = async function(db, next){
    var users = db.collection('users');
    await users.updateMany({}, {$set:{ "isEmailVerified": true }});
    next();
};

exports.down = function(db, next){
    next();
};
