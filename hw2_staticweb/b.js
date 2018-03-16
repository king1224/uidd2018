var c=0;
var state=9;
/***
state:
9 for not start
0 for choose 0 card
1 for choose 1 card
2 for pause
10 for pass
***/
var table = [];
var lastcard;
var score;
var time_id;
var passstate;
var orix = [];
var oriy = [];

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
    if(state == 9 || state == 10) return;
    document.getElementById('timeshower').innerHTML="Time: " + c;
    c=c+1;
    time_id = setTimeout("timedCount()",1000);
}

function addimage(thisImg,toDiv) {
    document.getElementById('imageDiv'+toDiv).innerHTML = '<img id="'+thisImg+'" src="image/' + thisImg + '" style="width:100%; height:100%" />';
}

function delimage(thisImg) {
    document.getElementById('imageDiv'+thisImg).innerHTML = null;
}

function pass(){
    for(var i = 1; i <= 12; ++i){
        for(var j = i+1; j<=12 ;++j){
            if(table[i]==table[j]){
                var pos1 = $("#imageDiv"+i).offset();
                var pos2 = $("#imageDiv"+j).offset();
                var tmp = $("#RightBox").offset();
                orix[i] = pos1.left;
                orix[j] = pos2.left;
                oriy[i] = pos1.top;
                oriy[j] = pos2.top;
                var x = pos1.left-pos2.left+tmp.left;
                var y = pos1.top-pos2.top+tmp.top;
                $("#imageDiv"+j).animate({
                    left: x, top: y,
                    },500);
                break;
            }
        }
    }
    setTimeout('pass2()',1000);
}

function pass2(){
    for(var i = 1; i <= 12; ++i){
        var x = $("#imageDiv"+i).parent().width()*(0.65+0.3* (Math.floor((table[i]-1)/2)+1)) - orix[i];
        var y = $("#imageDiv"+i).parent().height()*(0.43*((table[i]-1)%2+1) - 0.25) - oriy[i];
        $("#imageDiv"+i).animate({
            left: x, top: y,
            width: '+=100px',
            height: '+=100px'
            },500);
    }
}

$(document).ready(function() {
    for(var i = 1; i <= 12; ++i){
        $("#imageDiv"+i).css({margin: (15+27*Math.floor((i-1)/4))+"vh 0px 0px " + (6+16*((i-1)%4)) + "vw"});
    }
    for(var i = 1; i <= 6 ;++i) {
        $("#pic"+i).css("background-image", "url(image/"+i+".jpg)");
    }
    $("#startbtn").click(function() {
        if(state!=9) return;
        ini();
    });
    
    $("#restartbtn").click(function() {
        if(state==9 || state == 10) return;
        ini();
    });
    
    $("#passbtn").click(function() {
        if(state==9 || state == 10) return;
        clearTimeout(time_id);
        for(var i=1;i<13;++i)
            addimage(table[i]+".jpg",i);
        state = 10;
        setTimeout('pass()',500);
    });
    
    $("#pausebtn").click(function() {
        if(state==9 || state == 10) return;
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
        if(state != 0 && state != 1 && state != 10) return;
        var divnum = event.target.id.match(/\d+/);
        if(state == 10){
            $("#introDiv"+divnum).animate({
                marginLeft: '-15vw'
            });
        }
        else{
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
                        state = 10;
                        setTimeout('pass()',500);
                        return;
                    }
                }
                else{
                    setTimeout('delimage('+lastcard+')',500);
                    setTimeout('delimage('+divnum+')',500);
                }
                state = 0;
            }
        }
    });
    
    $(".quit").click(function() {
        if(state != 10) return;
        var divnum = event.target.id.match(/\d+/);
        $("#introDiv"+divnum).animate({
            marginLeft: '75vw'
        });
    });
});