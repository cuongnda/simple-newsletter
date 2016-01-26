var config = {};

config.mandrill = {};
config.mandrill.key = process.env.MANDRILL_API_KEY;
config.mandrill.newsletter_signup_template_name = "test-template";
module.exports = config;