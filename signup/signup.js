// Attach an event listener to the login form
$('#login-form').submit(function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  var formData = {
    username: $('#username').val(),
    password: $('#password').val()
  };

  // Send an AJAX request to the login PHP script
  $.ajax({
    type: 'POST',
    url: 'signup_proxy.php',
    data: formData,
    dataType: 'json'
  })
  .done(function(data) {
    if (data.success) {
      // Authentication was successful, redirect to home page or display success message
      window.location.href = '../index.html';
    } else {
      // Authentication failed, display error message
      alert(data.error);
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // Handle AJAX request failure
    alert('Error: ' + errorThrown);
  });
});
