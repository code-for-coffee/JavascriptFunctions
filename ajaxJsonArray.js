// Example of how to send a List<JSON> objects bound to most MVC frameworks
// All we're doing in this example is building two arrays, adding some stuff 
// to them, and creating 2 JSON Objects inside of a single array.
// Most MVC frameworks will see this as a List of Models. 

function ajaxJsonArray() {
    var GroupA = new Array();
    var GroupB = new Array();
    // todo: fill these arrays!
    var arrayLength = GroupA.length;
    var tempArray = new Array();
    for (x = 0; x <= arrayLength; x++) {
        tempArray.push({ GroupA: itemGroupA[x], GroupB: itemGroupB[x] });
    }
    var theData = { ListObject: tempArray };
    $.ajax({
        type: "POST",
        url: "home/upload",
        traditional: true,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(theData),
        success: function (data) { alert("SUCCESS"); }
    });
}
