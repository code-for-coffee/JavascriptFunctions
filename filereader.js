var reader = new FileReader();
reader.onload = function (event) {
  // try to read whatever file has been 'readAsDataURL'
  try {
    // event target result is our base64 encoded type
    // this is whatever file has been reader during 'readAsDataURL'
    console.log("File as base 64:");
    console.log(event.target.result);
    // catch an error if one occurs...
  } catch (ex) {
    // output a warning in the DevTools console
    throw new Error("Couldn't convert file: " + ex);
  }
}
// read the file argument
reader.readAsDataURL(binaryData);
