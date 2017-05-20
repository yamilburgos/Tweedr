var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options);

// SET UP THE DATABASE
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

function getTweeds(req, res, next){
    db.any("SELECT * FROM posts")
    .then((data) => { res.status(200).json({ data }); })
    .catch((err) => { return next(err); });
}

function createTweed(req, res, next){
    console.log(req.body.post);
    var post = req.body.post;
    db.none("INSERT INTO posts(posts)" + "VALUES($1)", post)
    .then((data) => { res.status(200).json({ status: 'Tweed Created.', data }); })
    .catch((err) => { return next(err); });
}

module.exports = {
    getTweeds, // GET
    createTweed, // CREATE
};