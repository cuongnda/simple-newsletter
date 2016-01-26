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

    res.render('confirmation', {username: username});
});

module.exports = router;
