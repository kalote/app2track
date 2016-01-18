var notLoading = $(".btnEditInfo").html(),
    socialNotLoading = $(".btnEditSocialInfo").html(),
    userId = $("input[name=userId]").val(),
    csrf = $("input[name=_csrf]").val();

$(function(){
  //update user information form
  $("#edit-form").validate({
    errorClass: "help-block has-error",
    errorElement: "div",
    rules: {
      name: {
        required: true,
        maxlength: 50
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Name is required.",
        maxlength: "The name cannot be more than 50 characters."
      },
      email: "Please enter a valid email address"
    },
    submitHandler: function(form){
      $(".btnEditInfo").html("<span class='fa fa-spinner'></span>&nbsp;<span>Updating your information...</span>");
      $.ajax({
        xhrFields: {
          withCredentials: true
        },
        headers: {
          "X-CSRF-Token": csrf
        },
        url: "/user/update/"+userId,
        method: "POST",
        data: $(form).serializeObject()
      }).done(function (sailsResponse){
        window.location = '/user/find/'+sailsResponse.id;
      }).fail(function onError(sailsResponse){
        // Handle known error type(s)
        var emailAddressAlreadyInUse = sailsResponse.status == 409;

        if (emailAddressAlreadyInUse) {
          toastr.error('That email address has already been taken, please try again.', 'Error');
          return;
        }
      }).always(function (){
        $(".btnEditInfo").html(notLoading);
      });
    }
  });

  //Social form
  $("#edit-settings-form").on("submit", function(e){
    e.preventDefault();
    $(".btnEditSocialInfo").html("<span class='fa fa-spinner'></span>&nbsp;<span>Saving your social settings...</span>");
    $.ajax({
      headers: {
        "X-CSRF-Token": csrf
      },
      url: "/user/settings/update/"+userId,
      method: "POST",
      data: $(this).serializeObject()
    }).done(function (sailsResponse){
      window.location = '/user/settings/'+sailsResponse.id;
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      return;
    }).always(function (){
      $(".btnEditSocialInfo").html(notLoading);
    });
  });
})
