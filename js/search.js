function view (data){
    let canvas = document.getElementById("paint");    
    let ctx = canvas.getContext("2d");    
    let newImg = document.createElement("img");
    newImg.src = data;
    document.body.appendChild(newImg);    
}