// Uploading files via worker
// This is the code that'd be used to send files from the DOM to the worker


var formdata = new FormData();                          // our FormData() object
var fileInput = document.getElementById('fileInput');   // our input form

worker = new Worker("uploadWorker.js");
worker.onmessage = function(e)  {
    console.log(e.data);
        }
    } else {
        console.log("[worker] Critical error. Details: " + e.data);
    }
}

try {
    var newReader = new FileReader();
    newReader.onload = function (event) {
        worker.postMessage({ file: event.target.result, id: lastDocumentID, count: fileInput.files.length, filename: currDocumentName });
        //worker.postMessage(event.target.result);
    }
    newReader.readAsDataURL(fileInput.files[i]);
} catch (e) {
    console.log("[worker] Error: Could not post file to worker.");
    console.log(e);
}