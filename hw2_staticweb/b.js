var c=0;
var state=9;
/***
state:
9 for not start
0 for choose 0 card
1 for choose 1 card
2 for pause
***/
var table = [];
var lastcard;
var score;
var time_id;
var passstate;

function ini(){
    clearTimeout(time_id);
    score = 0;
    c=0;
    var pic = 0;
    var isimg = [];
    for (var i=0; i<12; ++i)
        isimg[i] = false;
    while(pic<12){
        var n = Math.floor(Math.random() * 12) + 1;
        if(n>12) n=12;
        if(isimg[n]) continue;
        isimg[n] = true;
        ++pic;
        addimage(Math.floor((pic+1)/2)+".jpg",n);
        table[n] = Math.floor((pic+1)/2);
    }
    for(var i=1;i<13;++i)
        setTimeout('delimage('+i+')',2000);
    setTimeout('timedCount()',2000);
    state = 0;
    document.getElementById('pausebtn').innerHTML = "pause";
}

function timedCount()
{
    if(state == 9) return;
    document.getElementById('timeshower').innerHTML="Time: " + c;
    c=c+1;
    time_id = setTimeout("timedCount()",1000);
}

function addimage(thisImg,toDiv) {
    document.getElementById('imageDiv'+toDiv).innerHTML = '<img src="image/' + thisImg + '" style="width:100%; height:100%" />';
}

function delimage(thisImg) {
    document.getElementById('imageDiv'+thisImg).innerHTML = null;
}

$(document).ready(function() {
    alert('ready');
    
    $("#startbtn").click(function() {
        if(state!=9) return;
        ini();
    });
    
    $("#restartbtn").click(function() {
        if(state==9) return;
        ini();
    });
    
    $("#passbtn").click(function() {
        if(state==9) return;
        clearTimeout(time_id);
        for(var i=1;i<13;++i)
            addimage(table[i]+".jpg",i);
        state=9;
    });
    
    $("#pausebtn").click(function() {
        if(state==9) return;
        if(state==2){
            timedCount();
            state = passstate;
            document.getElementById('pausebtn').innerHTML = "pause";
        }
        else{
            clearTimeout(time_id);
            passstate = state;
            state = 2;
            document.getElementById('pausebtn').innerHTML = "resume";
        }
    });
    
    $(".card").click(function() {
        if(state != 0 && state != 1) return;
        var divnum = event.target.id.match(/\d+/);
        addimage(table[divnum]+".jpg",divnum);
        if(state == 0){
            lastcard = divnum;
            state = 1;
        }
        else if(state ==1){
            if(table[lastcard] == table[divnum]){
                score++;
                if(score == 6){
                    clearTimeout(time_id);
                    state = 9;
                    return;
                }
            }
            else{
                setTimeout('delimage('+lastcard+')',500);
                setTimeout('delimage('+divnum+')',500);
            }
            state = 0;
        }
    });
    
    $(".cardfirst").click(function() {
        if(state != 0 && state != 1) return;
        var divnum = event.target.id.match(/\d+/);
        addimage(table[divnum]+".jpg",divnum);
        if(state == 0){
            lastcard = divnum;
            state = 1;
        }
        else if(state == 1){
            if(table[lastcard] == table[divnum]){
                score++;
                if(score == 6){
                    clearTimeout(time_id);
                    state = 9;
                    return;
                }
            }
            else{
                setTimeout('delimage('+lastcard+')',500);
                setTimeout('delimage('+divnum+')',500);
            }
            state = 0;
        }
    });
    
});