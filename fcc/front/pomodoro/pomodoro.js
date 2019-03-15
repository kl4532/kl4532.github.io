var min  = document.getElementById("slength").value;
var sec = 0;
var idTime;
var on = false; // false - clock is not running, true - clock is running
var check = 0; // param for checking currernt mode -> session or break
function stop(){
	clearInterval(idTime); // pause the clock
	on=false;
}
function start(){
	if(!on) // if clock is not running
	{
		idTime = setInterval(timeCut, 1000); // running interval -> substract second from timer
		on = true;
	}else { // if clock is running
		stop();
	}
}
function timeCut() {
	if(min == 0 && sec == 0){ // when countdown reach 0
			check++;
			change(); // change the mode - session->break or break->session
		}
	if(sec<10 && sec>0){ // when sec < 10 -> add 0 in front
		document.getElementById("out").innerHTML= min +":"+ "0"+sec;
		sec--; // decrease time
	}else{
			if(sec==0){
				sec="00";
			}
			document.getElementById("out").innerHTML= min +":"+ sec;
			sec--; // decrease time
			if(sec<0 && min>=0){
				min--;
				sec=59;
			}
		}
}
function add(id){ // add time
		document.getElementById(id).value++;
		min=document.getElementById("slength").value;
		sec=0;
}
	function sub(id) // sub time
	{
		var currVal=document.getElementById(id).value;
		if(currVal>1) // prevent from substrac from 1 -> the lowest possible value
		{
			document.getElementById(id).value--;
		}
		min=document.getElementById("slength").value;
		sec=0;
}
function change()
{
	if(check%2 !== 0 ){ // odd value -> set time and color for break
		document.getElementById("out").style.backgroundColor ="blue";
		min=document.getElementById("blength").value;
		sec=0;
	}else // even value -> set time and color for session
	{
		document.getElementById("out").style.backgroundColor ="red";
		min=document.getElementById("slength").value;
		sec=0;
	}
}
