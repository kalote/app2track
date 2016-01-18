$(function(){
  var notLoading = $(".btnSignup").html();
  $("#sign-up-form").validate({
    errorClass: "help-block has-error",
    errorElement: "div",
    errorPlacement: function(error, element){
      if ($(element).attr("type") === "radio"){
        $(element).parent().parent().append(error);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      name: {
        required: true,
        maxlength: 50
      },
      gender: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      confirmation: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      }
    },
    messages: {
      name: {
        required: "Name is required.",
        maxlength: "The name cannot be more than 50 characters."
      },
      gender: "Gender is required.",
      email: "Please enter a valid email address",
      password: {
        required: "Password is required.",
        minlength: "Password must be at least 6 characters."
      },
      confirmation: {
        required: "Confirmation is required.",
        minlength: "Password must be at least 6 characters.",
        equalTo: "Password must match."
      }
    },
    submitHandler: function(form){
      $(".btnSignup").html("<span class='fa fa-spinner'></span>&nbsp;<span>Preparing your new account...</span>");
      $.ajax({
        xhrFields: {
          withCredentials: true
        },
        headers: {
          "X-CSRF-Token": $("input[name=_csrf]").val()
        },
        url: "/signup",
        method: "POST",
        data: $(form).serializeObject()
      }).done(function (sailsResponse){
        window.location = '/';
      }).fail(function onError(sailsResponse){
        // Handle known error type(s)
        var emailAddressAlreadyInUse = sailsResponse.status == 409;

        if (emailAddressAlreadyInUse) {
          toastr.error('That email address has already been taken, please try again.', 'Error');
          return;
        }
      }).always(function (){
        $(".btnSignup").html(notLoading);
      });
    }
  });
});
