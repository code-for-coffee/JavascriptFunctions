var formdata = new FormData();                          // our FormData() object
var fileInput = document.getElementById('fileInput');   // our input form

worker = new Worker("../content/themes/base/js/uploadWorker.js");
    worker.onmessage = function(e)  {
        console.log(e.data);
            }
        } else {
            alert("Critical server error. Details: " + e.data);
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
    console.log("Error: Could not post file to worker.");
    console.log(e);
}