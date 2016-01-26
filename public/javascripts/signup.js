$(document).ready(function () {
    $("form.signup").validate({
        rules: {
            username: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: "This field is required",
            email: {
                required: "This field is required",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        //invalidHandler: function (event, validator) {
        //    // 'this' refers to the form
        //    var errors = validator.numberOfInvalids();
        //    if (errors) {
        //        var message = errors == 1
        //            ? 'You missed 1 field. It has been highlighted'
        //            : 'You missed ' + errors + ' fields. They have been highlighted';
        //        $("div.error span").html(message);
        //        $("div.error").show();
        //    } else {
        //        $("div.error").hide();
        //    }
        //}
        submitHandler: function (form) {
            form.submit();
        }
    });

});
