$(document).ready(function() {
  // Send an AJAX request to the leaderboard proxy script
  $.ajax({
    type: 'GET',
    url: 'leaderboard_proxy.php',
    dataType: 'json'
  })
  .done(function(data) {
    if (data.success) {
      // Build HTML for leaderboard table
      var leaderboardHtml = '<div class="places">';
      var classLetter = 'a';
      var userNum = 1;
      $.each(data.leaderboard, function(index, user) {
        var classLabel = 1;
        leaderboardHtml += '<div class=\"' + classLetter + classLabel + '\">' + userNum + '.</div>';
        classLabel = classLabel + 1;
        leaderboardHtml += '<div class=\"' + classLetter + classLabel + '\">' + user.username + '</div>';
        classLabel = classLabel + 1;
        leaderboardHtml += '<div class=\"' + classLetter + classLabel + '\">' + user.tickets + '</div>';

        classLetter = String.fromCharCode(classLetter.charCodeAt(0) + 1);
        userNum = userNum + 1;
      });
      leaderboardHtml += '</div>';

      // Display leaderboard table on HTML page
      $('#leaderboard-container').html(leaderboardHtml);
    } else {
      // Display error message
      alert(data.error);
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // Handle AJAX request failure
    alert('Error: ' + errorThrown);
  });
});
