var posxA = [0,13,8,13,87,92,87];
var posyA = [0,15,50,85,15,50,85];
var posxB = [0,40,27,18,18,27,40,60,73,82,82,73,60];
var posyB = [0,5,17,35,65,83,95,5,17,35,65,83,95];
var posxC = [0,49,39,32,28,32,39,49,59,66,70,66,59];
var posyC = [0,15,23,35,49,63,73,81,73,63,49,35,23];
var calcx, calcy;
var start = false;

window.onload = function () {

    var div1 = document.getElementById("sugar");
    function getXY(eve) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return {x : scrollLeft + eve.clientX,y : scrollTop + eve.clientY };
    }
    document.onmousemove = function (ev) {
        if(start) return;
        var oEvent = ev || event;
        var pos = getXY(oEvent);
        $("#sugar").stop();
        $("#said").stop();
        $(".circleA").stop();
        $(".circleB").stop();
        $(".circleC").stop();
        $("#sugar").animate({
            left: (pos.x-150) + "px",
            top: (pos.y-100) + "px"
        },30);
        $("#said").animate({
            left: (pos.x+50) + "px",
            top: (pos.y-220) + "px"
        },30);
        
        $(".circleA").animate({
            left: pos.x + "px",
            top: pos.y + "px"
        },30);
        $(".circleB").animate({
            left: pos.x + "px",
            top: pos.y + "px"
        },30);
        $(".circleC").animate({
            left: pos.x + "px",
            top: pos.y + "px"
        },30);
        
    }; 
    document.oncontextmenu = function(){return false};
};

function showbtn(){
    $(".gamebtn").animate({
        opacity: 1
    });
}

$(document).ready(function() {
    $("#sugar").click(function() {
        if(start) return;
        start = true;
        for(var i=1;i<=3;++i){
            $("#circleA"+i).animate({
                left: posxA[i]+'%',
                top: posyA[i]+'%'
            },500);
            $("#circleB"+i).animate({
                left: posxB[i]+'%',
                top: posyB[i]+'%'
            },500);
            $("#circleC"+i).animate({
                left: posxC[i]+'%',
                top: posyC[i]+'%'
            },500);
        }
        for(var i=4;i<=6;++i){
            calcx = ( posxA[i] * 0.01 * $(window).width()) - 50 + "px";
            calcy = ( posyB[i] * 0.01 * $(window).height()) - 40 + "px";
            $("#circleA"+i).animate({
                left: calcx,
                top: posyA[i]+'%'
            },500);
            $("#circleB"+i).animate({
                left: posxB[i]+'%',
                top: calcy
            },500);
            $("#circleC"+i).animate({
                left: posxC[i]+'%',
                top: posyC[i]+'%'
            },500);
        }
        for(var i=7;i<=9;++i){
            calcx = ( posxB[i] * 0.01 * $(window).width()) - 40 + "px";
            $("#circleB"+i).animate({
                left: calcx,
                top: posyB[i]+'%'
            },500);
            $("#circleC"+i).animate({
                left: posxC[i]+'%',
                top: posyC[i]+'%'
            },500);
        }
        for(var i=10;i<=12;++i){
            calcx = ( posxB[i] * 0.01 * $(window).width()) - 40 + "px";
            calcy = ( posyB[i] * 0.01 * $(window).height()) - 40 + "px";
            $("#circleB"+i).animate({
                left: calcx,
                top: calcy
            },500);
            $("#circleC"+i).animate({
                left: posxC[i]+'%',
                top: posyC[i]+'%'
            },500);
        }
        $("#sugar").css("opacity","0");
        $("#title").css("opacity","0");
        $("#said").css("opacity","0");
        setTimeout('showbtn()',500);
    });
});