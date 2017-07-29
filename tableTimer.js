var config = {
	};
	firebase.initializeApp(config);
	var totalTimeInSeconds;
	var flag=true;
	var designatedStart_time = localStorage.setItem('startTime', designatedStart_time)
	var countSec;
	var myStop;
	var database = firebase.database();
	var timeref =database.ref('timerInfo/');
	var leaveTime;
	var returnTime;


document.addEventListener("visibilitychange", function(){
  if(document.hidden==true){
	var leaveTime=new Date().getTime()/1000;
	console.log(leaveTime)
  }
  else{
  	var returnTime=new Date().getTime()/1000;
console.log(returnTime);
var totalTimeInSeconds= returnTime-leaveTime;
  }
});

function startTimer(numGames){
	totalTimeInSeconds = 600*numGames;
	countSec=setInterval(function(){
		minuteTimer(totalTimeInSeconds,numGames)
	}, 1000);
}

function minuteTimer(time, uid) {
	$("#button1").unbind("click", startTenMinuteTimer);
	$("#button2").unbind("click", startTwentyMinuteTimer);
	$("#button3").unbind("click", startThirtyMinuteTimer);
		var minutes=Math.floor(time/60);
		var seconds=Math.floor(time%60);
		if(seconds<10)
		{
			seconds="0"+ seconds
		}

		if (minutes==1 && seconds<59)

		{
			if(flag)
			{
				showTimerWarning();
				document.getElementById('audio').play();
				flag=false;
			}
		}
		document.getElementById("timer" + uid).innerHTML=minutes +":" +seconds;
		if ((time < 0))
			{ clearInterval(countSec);
			 hideTimerWarning();
			 $("#button1").bind("click", startTenMinuteTimer);
			 $("#button2").bind("click", startTwentyMinuteTimer);
			 $("#button3").bind("click", startThirtyMinuteTimer);
			 document.getElementById('audio2').play();
			 return;
				}
		totalTimeInSeconds=totalTimeInSeconds-1;
}

		var onLoad=function(){
			addtodatabase(0,0,0);
			clearName();
			clearInput();
		}

function addtodatabase(h,m,t){
	database.ref('timerInfo/').set({
		hour: h,
		min: m,
		time:t
	})
}
function resetTimer(){
	document.getElementById('timer3').innerHTML='30:00';
	document.getElementById('timer2').innerHTML='20:00';
	document.getElementById('timer1').innerHTML='10:00';
}

function stop(){
	clearInterval(countSec);
	clearTimeout(myStop);
	hideTimerSections(["set1","set2","set3","stop","reservation","reservationName","change"]);
	showTimerSections(["button1","button2","button3","para","select"])
	resetTimer();
		$("#button1").bind("click", startTenMinuteTimer);
		$("#button2").bind("click", startTwentyMinuteTimer);
		$("#button3").bind("click", startThirtyMinuteTimer);
	hideTimerWarning();
	addtodatabase(0,0,0);
	clearName();
	clearInput();
		}
	var getCurrentTime= function(){
	var d= new Date();
		return {
			hours: d.getHours(),
			minutes: d.getMinutes()
		};
	 }
	var startTenMinuteTimer= function() {
		 startTimer(1);
		hideTimerSections(["button1", "button2","button3","para","select"]);
		showTimerSections(["stop","firstTimer","set1","reservation","reservationName","change"]);
		var time = getCurrentTime();
		addtodatabase(time.hours,time.minutes, 10);
		myStop= setTimeout(function(){
			hideTimerSections(["stop", "set1","reservation","reservationName","change"]);
			showTimerSections(["button1","button2","button3","para","select"]);
			addtodatabase(time.hours,time.minutes, 0);
			clearInput();
				},600000);
	};
	var startTwentyMinuteTimer=function() {
		 startTimer(2);
		hideTimerSections(["button1","button2", "button3","para","select"]);
		showTimerSections(["stop","set2","secondTimer","reservation","reservationName","change"]);
		var time = getCurrentTime();
		addtodatabase(time.hours,time.minutes, 20);
		myStop=setTimeout(function(){
			hideTimerSections(["stop", "set2","reservation","reservationName","change"]);
			showTimerSections(["button1","button2","button3","para","select"]);
			addtodatabase(time.hours,time.minutes, 0);
			clearInput();
				},1200000);
	};
	var startThirtyMinuteTimer=function()  {
		 startTimer(3);
		hideTimerSections(["button1", "button2","button3","para","select"]);
		showTimerSections(["stop","set3","thirdTimer","reservation","reservationName","change"]);
		var time = getCurrentTime();
		addtodatabase(time.hours,time.minutes, 30);
		myStop = setTimeout(function(){
			hideTimerSections(["stop", "set3","reservation","reservationName","change"]);
			showTimerSections(["button1","button2","button3","para","select"]);
			addtodatabase(time.hours,time.minutes, 0);
			clearInput();
		},1800000);
	}

	$("document").ready(function(){
		$("#button3").bind("click", startThirtyMinuteTimer);
	});
	$("document").ready(function(){
		$("#button2").bind("click", startTwentyMinuteTimer);
	});
	$("document").ready(function(){
		$("#button1").bind("click", startTenMinuteTimer);
	});

function showTimerWarning(){
	$("#timerWarningMessage").show();
	}

function hideTimerWarning(){
	$("#timerWarningMessage").hide();
	}
function hideTimerSections(idList){
	idList.forEach(function(eachId){
	$("#" + eachId).hide();
	});
	}
function showTimerSections(idList){
	idList.forEach(function(eachId){
	$("#" + eachId).show();
	});
	}
function reserveTable(){
	var r =document.getElementById("reserve").value;
	document.getElementById("reservationName").innerHTML = "Next Game Reserved By:" + r;
	clearInput();
	hideTimerSections(["reservation"])
	showTimerSections(["changeReserve"])
	}
 function clearName(){
	document.getElementById("reservationName").innerHTML = "";
 }
 function clearInput(){
	 document.getElementById("reserve").value= "";
 }
function changeReservation(){
	clearInput();
	clearName();
	hideTimerSections(["changeReserve"])
	showTimerSections(["reservation"])
}
function visibilityChange(){

}
