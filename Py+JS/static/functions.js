let canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");
let width = canvas.width
let height = canvas.height;
let curX, curY, prevX, prevY;
let hold = false;
ctx.lineWidth = 2;
let fill_value = true;
let stroke_value = false;
let canvas_data = {"pencil": [], "line": [], "rectangle": [], "circle": [], "eraser": []}

//With this we select the color of the palette
function color(color_value){
    ctx.strokeStyle = color_value;
    ctx.fillStyle = color_value;
}

//Function to change the background color of the canvas
function changeBackgroundColor() {
    canvas.color.backgroundColor = this.value;
}

function add_pixel(){
    ctx.lineWidth += 1;
}

//Reduce pixel
function reduce_pixel(){
    if(ctx.lineWidth == 1){
        ctx.lineWidth = 1;
    } else{
        ctx.lineWidth -= 1;
    }
}

function fill(){
    fill_value = true;
    stroke_value = false;
}

function outline(){
    fill_value = false;
    stroke_value = true;
}

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas_data = { "pencil": [], "line": [], "rectangle": [], "circle": [], "eraser": [] }
}

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

//Line tool

function line(){
    
    canvas.onmousedown = function (e) {
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };

    canvas.onmousemove = function linemove(e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(curX, curY);
            ctx.stroke();
            canvas_data.line.push({"startX": prevX, "startY": prevY, "endX": curX, "endY": curY, "thick": ctx.lineWidth, "color": ctx.strokeStyle});
            ctx.closePath();
        }
    };

    canvas.onmouseup = function (e){
        hold = false;
    };

    canvas.onmouseout = function (e){
        hold = false;
    };
}

//Rectangle tool

function rectangle(){
            
    canvas.onmousedown = function (e){
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };
            
    canvas.onmousemove = function (e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft - prevX;
            curY = e.clientY - canvas.offsetTop - prevY;
            ctx.strokeRect(prevX, prevY, curX, curY);
            if (fill_value){
                ctx.fillRect(prevX, prevY, curX, curY);
            }
            canvas_data.rectangle.push({ "starx": prevX, "stary": prevY, "width": curX, "height": curY, "thick": ctx.lineWidth, "stroke": stroke_value, "stroke_color": ctx.strokeStyle, "fill": fill_value, "fill_color": ctx.fillStyle });
            
        }
    };
            
    canvas.onmouseup = function(e){
        hold = false;
    };
            
    canvas.onmouseout = function(e){
        hold = false;
    };
}

// circle tool
        
function circle(){
            
    canvas.onmousedown = function (e){
        img = ctx.getImageData(0, 0, width, height);
        prevX = e.clientX - canvas.offsetLeft;
        prevY = e.clientY - canvas.offsetTop;
        hold = true;
    };
            
    canvas.onmousemove = function (e){
        if (hold){
            ctx.putImageData(img, 0, 0);
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            ctx.beginPath();
            ctx.arc(Math.abs(curX + prevX)/2, Math.abs(curY + prevY)/2, Math.sqrt(Math.pow(curX - prevX, 2) + Math.pow(curY - prevY, 2))/2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
            if (fill_value){
               ctx.fill();
            }
            canvas_data.circle.push({ "starx": prevX, "stary": prevY, "radius": curX - prevX, "thick": ctx.lineWidth, "stroke": stroke_value, "stroke_color": ctx.strokeStyle, "fill": fill_value, "fill_color": ctx.fillStyle });
        }
    };
            
    canvas.onmouseup = function (e){
        hold = false;
    };
            
    canvas.onmouseout = function (e){
        hold = false;
    };
}

// eraser tool
        
function eraser(){
    
    canvas.onmousedown = function(e){
        curX = e.clientX - canvas.offsetLeft;
        curY = e.clientY - canvas.offsetTop;
        hold = true;
            
        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };
        
    canvas.onmousemove = function(e){
        if(hold){
            curX = e.clientX - canvas.offsetLeft;
            curY = e.clientY - canvas.offsetTop;
            draw();
        }
    };
        
    canvas.onmouseup = function(e){
        hold = false;
    };
        
    canvas.onmouseout = function(e){
        hold = false;
    };
        
    function draw(){
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        canvas_data.pencil.push({ "startx": prevX, "starty": prevY, "endx": curX, "endy": curY, "thick": ctx.lineWidth, "color": ctx.strokeStyle });
    }    
}

//Function to save a snapshot of the canvas
function save() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); // Get URL canvas image
    link.download = 'canvas.png'; 
    link.click();
}

//Function to change the background image
function changeBackgroundImage() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        backgroundImage = new Image();
        backgroundImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
        backgroundImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

colorPicker.addEventListener('input', changeColor);
imagePicker.addEventListener('change', changeBackgroundImage);
brushSizePicker.addEventListener('input', changeBrushSize);
backgroundColorPicker.addEventListener('input', changeBackgroundColor);
saveBtn.addEventListener('click', save);