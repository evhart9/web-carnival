function addTickets() {
  // Send an AJAX request to the add tickets proxy
  $.ajax({
    type: 'POST',
    url: '../add_tickets_proxy.php',
    dataType: 'json'
  })
  .done(function(data) {
    if (data.success) {
      // Tickets were successfully added, display success message
      alert('Tickets were successfully added!');
    } else {
      // Failed to add tickets, display error message
      alert(data.error);
    }
  })
  //.fail(function(jqXHR, textStatus, errorThrown) {
    // Handle AJAX request failure
    //alert('Error: ' + errorThrown);
  //});
}
