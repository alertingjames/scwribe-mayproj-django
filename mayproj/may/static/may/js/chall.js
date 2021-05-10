var sender_id = document.getElementById("sender_id").value;
var user_id = document.getElementById("user_id").value;
var sender_name = document.getElementById("sender_name").value;
var sender_email = document.getElementById("sender_email").value;
var user_name = document.getElementById("user_name").value;
var user_email = document.getElementById("user_email").value;
var final_span = document.getElementById("final_span");
var interim_span = document.getElementById("interim_span");
var submitBtn = document.getElementById("submitBtn");
var chat_log = document.getElementById("chat_log");
var online = document.getElementById("online");
var st = document.getElementById("st");
var startTalking = false;


firebase.database().ref('notifications/' + sender_id + '/' + user_id).remove();

firebase.database().ref('status/' + user_id + '_' + sender_id).remove();
firebase.database().ref('status/' + user_id + '_' + sender_id).push().set({
    sender: sender_name,
    time: new Date().getTime(),
    online: 'online'
});

function submit(){
    var messageText = final_span.innerHTML + " " + interim_span.innerHTML;
    var time = new Date().getTime();
    if (messageText.length > 1){
        firebase.database().ref('messages/' + sender_id + '_' + user_id).push().set({
            sender: sender_name,
            message: messageText,
            time: time,
            online: 'online'
        });
        firebase.database().ref('messages/' + user_id + '_' + sender_id).push().set({
            sender: sender_name,
            message: messageText,
            time: time,
            online: 'online'
        });
        firebase.database().ref('notifications/' + user_id + '/' + sender_id).remove();
        firebase.database().ref('notifications/' + user_id + '/' + sender_id).push().set({
            sender: sender_name,
            message: messageText,
            time: time,
            sender_id: sender_id
        });
        firebase.database().ref('status/' + user_id + '_' + sender_id).remove();
        firebase.database().ref('status/' + user_id + '_' + sender_id).push().set({
            sender: sender_name,
            time: new Date().getTime(),
            online: 'online'
        });
        final_span.innerHTML = "";
        interim_span.innerHTML = "";
    }else {
//        window.alert("Please speak something...");
    }
}

var starCountRef = firebase.database().ref('messages/' + sender_id + '_' + user_id);
starCountRef.on('child_added', function(snapshot) {
  var new_post = snapshot.val();
  var mes = new_post.message;

  if (mes.length > 0){
      var time = new_post.time;
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

  var ul = document.getElementById("list");
  if (new_post.sender == sender_name){
       var li = document.createElement("div");
       li.style.color = 'white';
       li.style.fontSize = '16';
       li.style.paddingRight = '10';
       li.style.paddingLeft = '10';
       li.style.paddingTop = '10';
       li.style.paddingBottom = '10';
       li.style.backgroundColor = '#2390f6';
       li.style.maxWidth = "300";
       li.style.display = 'inline-block';
       li.innerHTML = mes;
       li.style.textAlign = 'left';
       var ul2 = document.createElement("div");

       ul2.append(li);
       ul2.style.textAlign = 'right';
       ul.appendChild(ul2);

       var lli = document.createElement("div");
       lli.style.color = 'black';
       lli.style.fontSize = '12';
       lli.style.display = 'inline-block';
       lli.innerHTML = timeStr;
       lli.style.textAlign = 'left';
       var ull2 = document.createElement("div");

       ull2.append(lli);
       ull2.style.textAlign = 'right';

       ul.appendChild(ull2);
  }else {
       var li = document.createElement("div");
       li.style.textAlign = 'left';
       li.style.color = 'black';
       li.style.fontSize = '16';
       li.style.paddingRight = '10';
       li.style.paddingLeft = '10';
       li.style.paddingTop = '10';
       li.style.paddingBottom = '10';
       li.style.backgroundColor = '#e0d0f6';
       li.style.maxWidth = "300";
       li.style.display = 'inline-block';
       li.innerHTML = mes;

       if(startTalking){
          var msg = new SpeechSynthesisUtterance(mes);
          window.speechSynthesis.speak(msg);
       }

       var ul3 = document.createElement("div");

       ul3.append(li);
       ul.appendChild(ul3);

       var llli = document.createElement("div");
       llli.style.textAlign = 'left';
       llli.style.color = 'black';
       llli.style.fontSize = '12';

       llli.style.display = 'inline-block';
       llli.innerHTML = timeStr;
       var ull3 = document.createElement("div");

       ull3.append(llli);
       ul.appendChild(ull3);

       online.innerHTML = new_post.online;
       st.innerHTML = new_post.online;
       st.style.display = 'inline-block';

   //    hear(mes);
  }
  chat_log.scrollTop = chat_log.scrollHeight;
  }

  chat_log.scrollTop = chat_log.scrollHeight;
  startTalking = true;

});

var starCountRef = firebase.database().ref('status/' + sender_id + '_' + user_id);
starCountRef.on('child_added', function(snapshot) {
  var new_status = snapshot.val();
  var onoff = new_status.online;
      if(new_status.sender != sender_name){
          if (onoff == 'offline'){
              var time = new_status.time;
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
                online.innerHTML = 'Last seen at ' + timeStr;
                st.innerHTML = 'Offline';
                st.style.display = 'inline-block';
          }else {
              online.innerHTML = onoff;
              st.innerHTML = onoff;
              st.style.display = 'inline-block';
          }
      }
});










