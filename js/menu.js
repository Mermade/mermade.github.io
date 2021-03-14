
// Dismiss start menu when desktop clicked
$('.screen').click(function(e){
  if($(e.target).hasClass('screen')) {
    $('#start-menu-active').prop('checked', false);
  }
});

// Keep clock updated
function updateClock() {
  var now = new Date();
  //$('.start-button').text(now.toLocaleTimeString());
}
var oneMinute = 1000 * 60;
var now = new Date();
var timeUntilMinuteTick = 
    oneMinute - 
    (now.getSeconds() * 1000 + now.getMilliseconds());
setTimeout(function(){
  updateClock();
  setInterval(updateClock, oneMinute);
}, timeUntilMinuteTick);
updateClock();

// Maintain aspect ratio while resizing viewport
$(window).resize(function(){
  $('.screen').css('width', '120vh');
  $('.screen').css('height', '90vh');
  
  if($('.screen').width() >= $('.container').width()) {
    $('.screen').css('width', $('.container').width() + 'px');
    $('.screen').css('height', ($('.container').width() / 4 * 3) + 'px');
  }
});
