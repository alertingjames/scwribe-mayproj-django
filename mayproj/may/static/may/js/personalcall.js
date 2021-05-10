var progressbar = document.getElementById("progressbar");
 progressbar.style.display = "block";
var incoming = false;

var global_username = '';

/*** Set up sinchClient ***/

sinchClient = new SinchClient({
	applicationKey: '95ac1dd6-a709-48ab-b977-fbdaeccbf1d6',
	capabilities: {calling: true},
	startActiveConnection: true, /* NOTE: This is required if application is to receive calls / instant messages. */
	//Note: For additional loging, please uncomment the three rows below
	onLogMessage: function(message) {
		console.log(message);
	},
});


/*** Name of session, can be anything. ***/

var sessionName = 'sinchSessionWEB-' + sinchClient.applicationKey;


/*** Check for valid session. NOTE: Deactivated by default to allow multiple browser-tabs with different users. ***/

var sessionObj = JSON.parse(localStorage[sessionName] || '{}');
if(sessionObj.userId) {
	sinchClient.start(sessionObj)
		.then(function() {
			global_username = sessionObj.userId;
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
			progressbar.style.display = "none";
		})
		.fail(function() {
			//No valid session, take suitable action, such as prompting for username/password, then start sinchClient again with login object
			loginUser();
		});
}
else {
	loginUser();
}

/*** Create user and start sinch for that user and save session in localStorage ***/
function createUser(){
    var signUpObj = {};
	signUpObj.username = sender_email;
	signUpObj.password = sender_password;

	//Use Sinch SDK to create a new user
	sinchClient.newUser(signUpObj, function(ticket) {
		//On success, start the client
		sinchClient.start(ticket, function() {
			global_username = signUpObj.username;
			//On success, show the UI
			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		}).fail(handleError);
	}).fail(handleError);
}

/*** Login user and save session in localStorage ***/

function loginUser(){
	var signInObj = {};
	signInObj.username = sender_email;
	signInObj.password = sender_password;

	//Use Sinch SDK to authenticate a user
	sinchClient.start(signInObj, function() {
		global_username = signInObj.username;
		//On success, show the UI
		progressbar.style.display = "none";
		//Store session & manage in some way (optional)
		localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
	}).fail(handleError);
}


/*** Define listener for managing calls ***/

var callListeners = {
	onCallProgressing: function(call) {
		$('audio#ringback').prop("currentTime", 0);
		$('audio#ringback').trigger("play");

		//Report call stats
	//	$('div#callLog').append('<div id="stats">Ringing...</div>');
	},
	onCallEstablished: function(call) {
		$('audio#incoming').attr('src', call.incomingStreamURL);
		$('audio#ringback').trigger("pause");
		$('audio#ringtone').trigger("pause");
        hear("Responded! Speak now");
        startTalkingF = true;
		//Report call stats
		var callDetails = call.getDetails();
//		$('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime)+'</div>');
	},
	onCallEnded: function(call) {
		$('audio#ringback').trigger("pause");
		$('audio#ringtone').trigger("pause");
		$('audio#incoming').attr('src', '');

		$('button#hangup').css("background-color", "#cc80ff");
	    $('button#answer').css("background-color", "#cc80ff");

		//Report call stats
		var callDetails = call.getDetails();

		if(call.error) {
			alert('Failure message: '+call.error.message);
		}else alert(call.getEndCause());

		if(note1 != '' || noteList.length > 0){
            document.getElementById("alert").style.display = "block";
        }
        else {
            window.location.href = '/meet/' + user_id;
        }
	}
}

/*** Set up callClient and define how to handle incoming calls ***/

var callClient = sinchClient.getCallClient();
callClient.initStream().then(function() {
	// Directly init streams, in order to force user to accept use of media sources at a time we choose
});
var call;

callClient.addEventListener({
  onIncomingCall: function(incomingCall) {
	//Play some groovy tunes
	$('audio#ringtone').prop("currentTime", 0);
	$('audio#ringtone').trigger("play");
	//Print statistics
	hear('Incoming call from ' + incomingCall.fromId);
    $('button#hangup').css("background-color", "#cc80ff");
	$('button#answer').css("background-color", "#5c0099");
	//Manage the call object
    call = incomingCall;
    incoming = true;
    call.addEventListener(callListeners);
  }
});

function call(){
	call = callClient.callUser(user_email);
	call.addEventListener(callListeners);
	$('button#hangup').css("background-color", "#5c0099");
	$('button#answer').css("background-color", "#cc80ff");
	hear("Calling... Please wait");
}

$('button#answer').click(function(event) {
	event.preventDefault();
	if(incoming){
	    try {
		    call.answer();
		    $('button#hangup').css("background-color", "#5c0099");
		    $('button#answer').css("background-color", "#cc80ff");
		    hear("Responding...");
		    startButton();
	    }
	    catch(error) {
		    handleError(error);
	    }
	}
});


/*** Hang up a call ***/

$('button#hangup').click(function(event) {
	event.preventDefault();
	console.info('Will request hangup..');
	$('button#hangup').css("background-color", "#cc80ff");
	$('button#answer').css("background-color", "#cc80ff");
	call && call.hangup();
});

/*** Log out user ***/

function calllogout(){
	//Stop the sinchClient
	sinchClient.terminate();
	//Note: sinchClient object is now considered stale. Instantiate new sinchClient to reauthenticate, or reload the page.

	//Remember to destroy / unset the session info you may have stored
	delete localStorage[sessionName];

	//Reload page.
//	window.location.reload();
}


/*** Handle errors, report them and re-enable UI ***/

var handleError = function(error) {
	progressbar.style.display = "none";
	$('button#hangup').css("background-color", "#cc80ff");
	$('button#answer').css("background-color", "#cc80ff");
	alert(error.message);
	incoming = false;
	hear("");
}