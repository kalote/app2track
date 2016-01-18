$(function(){
  var notLoading = $(".loginSubmit").html();
  //form submission
  $(".form-login").on("submit", function(e){
    e.preventDefault();
    //Set the loading state (i.e. show loading spinner)
    $(".loginSubmit").html("<span class='fa fa-spinner'></span>&nbsp;<span>Logging in...</span>");
    //CSRF header
    $.ajax({
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      xhrFields: {
        withCredentials: true
      },
      url: "/login",
      method: "POST",
      data: $(".form-login").serializeObject()
    }).done(function (){
      //Refresh the page now that we've been logged in.
      window.location = '/';
    }).fail(function onError(sailsResponse){
      //Handle known error type(s).
      //Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

      toastr.error('An unexpected error occurred, please try again.', 'Error', {
        closeButton: true
      });
      return;
    }).always(function (){
      //Put back the "log in" text in submit button
      $(".loginSubmit").html(notLoading);
    });
  });
});
