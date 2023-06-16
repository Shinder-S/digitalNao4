let rec;
    if(!("webkitSpeechRecognition" in window)) {
        alert("Sorry, you don't use custom API");
    } else {
        rec = new webkitSpeechRecognition();
        rec.lang = "es-en";
        rec.continuous = true;
        rec.interim = true;
        rec.addEventListener("result", begin);
    }

function begin(event){
    for(i = event.resultIndex; i < event.results.length; i++){
        document.getElementById('number').innerHTML = event.results[i][0].transcript;
    }
}

rec.start();