var user_id = document.getElementById("user_id").value;
createjs.Sound.registerSound("/static/may/sound/notification.mp3", "x");
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

var keys = [];
var starCountRef = firebase.database().ref('notifications/' + user_id);
starCountRef.on('child_added', function(snapshot) {
  var key = snapshot.val();
  keys.push(key);
  if(keys.length == 1){
      createjs.Sound.play("x");
//      if(confirm("Hi, You have message!\nWould you contact them?")){
//         window.location.href = "http://18.218.121.125/get_notifications";
//      }
      document.getElementById("alert").style.display = 'block';
      if (navigator.vibrate) {
	      // vibration API supported
	      navigator.vibrate(500);
      }else {
          window.navigator.vibrate(500); // vibrate for 500ms
      }
//       window.navigator.vibrate(500); // vibrate for 500ms
//     window.alert("Hi, You have messsage!");
  }
});

function getChildObj (obj) {
    var obj2;
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            obj2 = obj[p];
        }
    }
    return obj2;
}


//setTimeout(function () {
//
//}, 10000)