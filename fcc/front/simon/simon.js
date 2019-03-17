var arr = [], p_arr = []; // arr -array with correct way;  p_arr - player way array
var par,k, result=0;
var colors = ["green", "red", "blue", "yellow"];
var los, n=1, check=1, cp=0; // n=1
var con = true;
var length = 10;

function get_way(){ // draw n-sounds to repeat, n= length
	// los = Math.floor((Math.random() * 4) + 0);
		for(var i=0; i<length ;i++){
				los = Math.floor((Math.random() * 4) + 0);
				arr.push(colors[los]);
			}
}

function show_way(){
	var inc=n*length;
	var dur =700-inc; // sound duration
	mouseDown(arr[0]);

	setTimeout(function(){mouseUp(arr[0]); }, dur); // display first sound
	{//  FOR JS older than 2017
	// function doSetTimeoutDown(i)
	// {
	//   setTimeout(function(){ mouseDown(arr[i]); }, dur);
	// }
	// function doSetTimeoutUp(i)
	// {
	//   setTimeout(function(){ mouseUp(arr[i]); }, dur);
	// }
	// for(let i=1;i<n;i++)
	// {
	// 	dur+=700-inc;
	// 	 doSetTimeoutDown(i);
	// 	dur+=700-inc;
	// 	 doSetTimeoutUp(i);
	// }
}
	for(let i=1;i<n;i++) // let instead of var allow to use setTimeout in for loop
	{
		dur+=700-inc;
		setTimeout(function(){ mouseDown(arr[i]); }, dur);
		dur+=700-inc;
		setTimeout(function(){ mouseUp(arr[i]); }, dur);
	}
}

function mouseDown(id, user) {
	var audio = document.getElementById("a"+id);
	document.getElementById(id).style.background = id;
	document.getElementById(id).style.opacity = 0.4;
	audio.play("a"+id);
	if(user){p_arr.push(id)};
}

function mouseUp(id){
	var audio = document.getElementById("a"+id);
	document.getElementById(id).style.background = id;
	document.getElementById(id).style.opacity = 1;
	audio.pause("a"+id);
}

function help(){ // display all moves to user in txt
	document.getElementById('help').innerHTML = arr;
};

function gameStatus(n){
	if(p_arr[cp]==arr[cp]){ // check if user current sound is the same as in the example array
		con = true;
		cp++;
		if(cp==n) // check if user repeated all sounds
		{
			if(n==length) // check if the game is finished
			{
				reset('win')
			}else reset('good');
		}
	}else reset('wrong');
}
function reset(option)
{
	switch(option)
	{
		case 'wrong':
		if(document.getElementById("strict").checked == true) 	//strict
		{
			cp=0;
			n=1;
			p_arr =[];
			alert("wrong")
			document.getElementById("count").innerHTML = "Score: 0";
			setTimeout(function(){show_way();}, 500);
		}else
		{
			cp=0;
			p_arr =[];
			alert("wrong");
			x=n;
			x=x-1;
			document.getElementById("count").innerHTML = "Score: " + x;
			show_way();
		}
		break;

		case 'good':
		cp=0;
		p_arr =[];
		document.getElementById("count").innerHTML = "Score: " + n;
		n++;
		setTimeout(function(){ show_way(); }, 1000);
		break;

		case 'win':
		cp=0;
		p_arr =[];
		n=1;
		document.getElementById("count").innerHTML = "Score: " + n;
		alert("YOU WON!");
		arr=[];
		document.getElementById("count").innerHTML = "Score: 0";
		get_way();
		break;
	}
}
