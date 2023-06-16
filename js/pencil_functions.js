// Pencil tool
function pencil (){
    canvas.onmousedown = function (e){
        curX = e.clientX - canvas.offsetLeft;
        curY = e.clientY - canvas.offsetTop;
        hold = true;

        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };

    canvas.onmousemove = function (e){
        if(hold){
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            draw();
        }
    };

    canvas.onmouseout = function(e){
        hold = false;
    };

    canvas.onmouseout = function(e){
        hold = false;
    }

    function draw(){
        ctx.lineTo(curX, curY);
        ctx.stroke();
        canvas_data.pencil.push({"startX": prevX, "startY": prevY, "endX": curX, "endY": curY, "thick": ctx.lineWidth, "color": ctx.strokeStyle});
    }
}