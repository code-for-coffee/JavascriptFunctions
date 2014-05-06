//console.log("[Worker]: jsEssentialsUploader.js has started");
onmessage = function(event) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            postMessage(200);
        } else {
            postMessage(500);
        }
    }
    //console.log(event.data.Count);
    for (var i = 0; i < event.data.Count; i++) {
        xhr.open("POST", event.data.Server, false);
        xhr.send(event.data.Content[i]);
    }

}