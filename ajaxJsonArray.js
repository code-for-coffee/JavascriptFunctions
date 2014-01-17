
function ajaxJsonArray() {
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
