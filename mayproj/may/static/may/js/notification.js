var me_id = document.getElementById("me_id").value;
var ul = document.getElementById("list");
var keys = [];
var starCountRef = firebase.database().ref('notifications/' + me_id);
starCountRef.on('child_added', function(snapshot) {
  var key = snapshot.val();
  if (key){
    var key2 = getChildObj(key);
    var time = key2.time;
    var date = new Date(time);

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // beware: January = 0; February = 1, etc.
    var day = date.getDate();

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var timeStr = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
//    window.alert(key2.message);
    var li = document.createElement("div");
    li.style.color = 'black';
    li.style.fontSize = '16';
    li.style.maxWidth = "auto";
    li.style.width = "auto";
    li.innerHTML = key2.sender + "<br>" + timeStr + "<br>" + key2.message;
    li.style.textAlign = 'left';
    var ul2 = document.createElement("div");
    ul2.classList.add("panel");
    var img = document.createElement("label");
    img.innerHTML='<i class="fa fa-user-circle-o" style="font-size:30px;"></i>';
    img.style.color = getRandomColor();
    ul2.appendChild(img);
    ul2.append(li);
    ul2.addEventListener('click', function (event) {
       window.location.href = "/chat_page/" + key2.sender_id + "/";
    });
    ul.appendChild(ul2);
  }else {
      var lii = document.createElement("div");
      lii.style.color = 'red';
      lii.style.fontSize = '16';
      lii.style.textAlign = 'center';
      lii.innerHTML = "No message ...";
      ul.append(lii);
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

function getRandomColor() {
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}








































