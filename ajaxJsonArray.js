
function ajaxJsonArray() {
    var arrayLength = localDataPointsY.length;
    var tempArray = new Array();
    for (x = 0; x <= arrayLength; x++) {
        tempArray.push({ DataPointY: localDataPointsY[x], DataPointTypeID: localDataPointsType[x], DataPointX: localDataPointsX[x], DataPointValue: localDataPointsValue[x] });
    }
    var theData = { PatientID: patient, FacilityID: facility, DataPointViewModels: tempArray };
    $.ajax({
        type: "POST",
        url: "home/uploadAnnotations",
        traditional: true,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(theData),
        success: function (data) { alert("SUCCESS"); }
    });
}
