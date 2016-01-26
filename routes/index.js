var express = require('express');
var mandrill = require('mandrill-api/mandrill');
var config = require('../config.js');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {});
});

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var mandrill_client = new mandrill.Mandrill(config.mandrill.key);
    var template_name = config.mandrill.newsletter_signup_template_name;
    var merge_vars = [{
        "name": "USER_NAME",
        "content": username
    }, {
        "name": "USER_EMAIL",
        "content": email
    }
    ];
    var message = {
        "to": [{
            "email": email,
            "name": username,
            "type": "to"
        }],
        "global_merge_vars": merge_vars
    };
    //Send email async to prevent blocking
    var async = true;

    mandrill_client.messages.sendTemplate({
        "template_name": template_name,
        "template_content": [],
        "message": message,
        "async": async
    }, function (result) {
        //TODO: Log success status if needed. This should be system log, console.log is just for debugging
        console.log(result);
    }, function (e) {
        //TODO: Log error status if needed. This should be system log, console.log is just for debugging
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    //Save user data to database
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(config.sqlitedb.path);
    //TODO: Check for exist, maybe?
    var query = "INSERT INTO newsletter_subscriber (username, email) VALUES ('" + username + "','" + email + "');";
    db.run(query);

    //Code below is just for demo purpose
    db.each("SELECT rowid AS id, username, email FROM newsletter_subscriber", function (err, row) {
        console.log(row.id + ": " + row.username + ", " + row.email);
    });

    db.close();
    res.render('confirmation', {username: username});
});

module.exports = router;
