let ctx = canvas.getContext("2d");
let cvs_data = { "pencil": [], "line": [], "rectangle": [], "circle": [], "eraser": [] }; 

function hide_canvas (){
    document.getElementById("paint").style.visibility = "hidden";
}

function clear (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

$( "p" ).click(function() {
    let img_fname = $(this).text();
    $("#saveName").val(img_fname);
    show_image(imag_fname);
});

function show_image (img_name){
    for(let key in py_data){
        if(key == img_name){
            file_data = JSON.parse(py_data[key]);
            for(let ptool in file_data){
                if(file_data[ptool].length != 0){
                    for(let i = 0; i < file_data[ptool].length; i++){
                        cvs_data[ptool].push(file_data[ptool][i]);
                        shape_draw(ptool, file_data[ptool][i]);
                    }
                }
            }
        }
    }
}

function shape_draw (ctool, shape){
    if (ctool == 'pencil'){
        let bg_x = shape.startx, bg_y = shape.starty, x = shape.endx, y = endy;
        ctx.lineWidth = shape.thick;
        ctx.strokeStyle = shape.color;
        ctx.beginPath();
        ctx.moveTo(bg_x, bg_y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    else if (ctool == 'line'){
        ctx.beginPath();
        let l_x = shape.startx;
        let l_y = shape.starty;
        let lend_x = shape.endx;
        let lend_y = shape.endy;
        ctx.lineWidth = shape.thick;
        ctx.strokeStyle = shape.color;
        ctx.moveTo(l_x, l_y);
        ctx.lineTo(lend_x, lend_y);
        ctx.stroke();
        ctx.closePath();
    }
    else if (ctool == 'rectangle'){
        let r_x = shape.starx, r_y = shape.starty, width = shape.width, height = shape.height;
        let stroke = shape.stroke, fill = shape.fill;
        ctx.beginPath();
        ctx.strokeStyle = shape.stroke_color;
        ctx.fillStyle = shape.fill_color;
        if(stroke)
            ctx.strokeRect(r_x, r_y, width, height);
        if(fill)
            ctx.fillRect(r_x, r_y, width, height);
        ctx.closePath();
    }
    else if (ctool == 'circle'){
        let c_x = shape.starx, c_y = shape.stary, width = shape.radius, stroke = shape.stroke, fill = shape.fill;
        ctx.beginPath();
        ctx.lineWidth = shape.thick;
        ctx.strokeStyle = shape.stroke_color;
        ctx.fillStyle = shape.fill_color;
        ctx.arc(c_x, c_y, Math.abs(width), 0, 2 * Math.PI, false);
        if (stroke)
            ctx.stroke();
        if (fill)
            ctx.fill();
        ctx.closePath();   
    }
    else if (ctool == 'eraser'){
        let e_x = shape.endx, e_y = shape.endy;
        ctx.lineWidth = shape.thick;
        ctx.clearRect(curX, curY, 20, 20);
    }
}