// This is the worker that receives the files as base64 strings
// and uploads them via xmlhttprequest().

console.log("[worker] uploadWorker.js starting");

var files = new Array();
var documentIDArray = new Array();
var documentCount = new Array();
var fileName = new Array();
var docID = 0;

/* FormData() Polyfill */
(function () {
    var debug = true;
    if (debug === true) {
        (this == undefined ? self : this)['FormData'] = FormData;
        var ___send$rw = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype['send'] = function (data) {
            if (data instanceof FormData) {
                if (!data.__endedMultipart) data.__append('--' + data.boundary + '--\r\n');
                data.__endedMultipart = true;
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
                data = new Uint8Array(data.data).buffer;
            }
            // Invoke original XHR.send
            return ___send$rw.call(this, data);
        };

        var ___open$rw = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype['open'] = function () {
            // console.log(arguments);
            // Invoke original XHR.open
            return ___open$rw.apply(this, arguments);
        };

        function FormData() {
            var myself = this;
            // Force a Constructor        
            if (!(this instanceof FormData)) return new FormData();
            this.boundary = '------WebKitFormBoundary' + Math.random().toString(36);
            var internal_data = this.data = [];
            this.args = arguments;

            var internal_data_string = this.data_string = [];
            this.__append = function (inp) {
                var i = 0, len;
                if (typeof inp === 'string') {
                    internal_data_string.push(inp);
                    for (len = inp.length; i < len; i++) {
                        internal_data.push(inp.charCodeAt(i) & 0xff);
                    }
                } else if (inp && inp.byteLength) {/*If ArrayBuffer or typed array */
                    if (!('byteOffset' in inp))   /* If ArrayBuffer, wrap in view */
                        inp = new Uint8Array(inp);
                    for (len = inp.byteLength; i < len; i++)
                        internal_data.push(inp[i] & 0xff);
                }
            };
        }
        FormData.prototype['append'] = function (name, value, filename) {
            if (this.__endedMultipart) {
                this.data.length -= this.boundary.length + 6;
                this.__endedMultipart = false;
            }
            var valueType = Object.prototype.toString.call(value),
                part = '--' + this.boundary + '\r\n' +
                    'Content-Disposition: form-data; name="' + name + '"';

            if (/^\[object (?:Blob|File)(?:Constructor)?\]$/.test(valueType)) {
                return this.append(name,
                                new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)),
                                filename || value.name);
            } else if (/^\[object (?:Uint8Array|ArrayBuffer)(?:Constructor)?\]$/.test(valueType)) {
                part += '; filename="' + (filename || 'render.png').replace(/"/g, '%22') + '"\r\n';
                part += 'Content-Type: image/png\r\n\r\n';
                this.__append(part);
                this.__append(value);
                part = '\r\n';
            } else {
                part += '\r\n\r\n' + value + '\r\n';
            }
            this.__append(part);
        };
    };
})();
/* End FormData() Polyfill */

onmessage = function (e) {
    files.push(e.data.file);
    docID++;
    documentIDArray.push(docID);
    documentCount.push(e.data.count);
    fileName.push(e.data.filename);
    console.log("[worker] Received file #" + docID + "(of " + e.data.count + "). Queuing for upload. File is: " + e.data.file);
    uploadFiles();
}
function uploadFiles() {
    var data = new FormData();
    for (i = 0; i < files.length; i++) {
        data.append('DocumentStr', files[i]);
        data.append('DocumentID', documentIDArray[i]);
        data.append('DocumentCount', documentCount[i]);
        data.append('DocumentFileName', fileName[i]);
        var xhr = new XMLHttpRequest();
        var xhrResponse = function (status, response) {
            postMessage(response);
        }
        var stateChangeMonitor = function () {
            switch (xhr.readyState) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4: 
                    //console.log(xhr.status, xhr.responseText);
                    if (xhrStatus = 500) {
                        xhrResponse(xhr.status, "Status: " + xhr.responseText); 
                    } else {
                        xhrResponse(xhr.status, xhr.responseText);
                    }
                    break;
                default:
                    //console.log(xhr.status, xhr.responseText);
                    break;
            }
        }
        xhr.open('POST', '/path/to/upload', true); 
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.onreadystatechange = stateChangeMonitor;
        try {
            xhr.send(data);
            console.log("[worker] Uploading Document #" + documentIDArray[i]);
        } catch (e) {
            postMessage("Error: " + e);
        } 
        var currentDocumentInUpload = documentIDArray[i];
        files.splice(i, 1);
        documentIDArray.splice(i, 1);
        documentCount.splice(i, 1);
        fileName.splice(i, 1);
    }
}