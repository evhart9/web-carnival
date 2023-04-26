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
      var leaderboardHtml = '<table><thead><tr><th>Username</th><th>Tickets</th></tr></thead><tbody>';
      $.each(data.leaderboard, function(index, user) {
        leaderboardHtml += '<tr><td>' + user.username + '</td><td>' + user.tickets + '</td></tr>';
      });
      leaderboardHtml += '</tbody></table>';

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
