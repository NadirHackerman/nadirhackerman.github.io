function animation() {
  if($('#errorAlert').css('display') === 'none') {
	$('#errorAlert').slideToggle("slow");
  }
  $('#actionButton').removeClass('btn-danger');
  $('#actionButton').addClass('disabled');
}