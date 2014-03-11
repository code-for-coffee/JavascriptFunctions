function questions(serverPath, remoteQuestionList, remoteAnswerList) {

    // arrays to store our data
    this.listOfIDs = [];
    listOfIDs = this.listOfIDs;
    this.listOfAnswers = [];
    listOfAnswers = this.listOfAnswers;
    // remote server information
    this.serverPath = serverPath;
    this.remoteQuestionList = remoteQuestionList;
    this.remoteAnswerList = remoteAnswerList;

    // get a collection of input types by IDs and place them into blank array
    this.getListOfIDs = function () {
        listOfIDs.splice(0, listOfIDs.length);
        $("body [id]").each(function () {
            listOfIDs.push($(this).attr("id"));
        })
    }

    // get a collection of answers by ID and place them into blank array
    this.getListOfAnswers = function () {
        listOfAnswers.splice(0, listOfAnswers.length);
        for (var i = 0; i < listOfIDs.length; i++) {
            var idConstructor = "#" + listOfIDs[i];
            listOfAnswers.push($(idConstructor).val());
        }
    }

    // upload questions and answers to remote server
    this.uploadData = function () {
        if (!serverPath) { console.log("No remote path defined."); return false; }
        if (!remoteQuestionList) { console.log("No remote question variable defined."); return false; }
        if (!remoteAnswerList) { console.log("No remote answer variable defined."); return false; }
        $.ajax({
            type: "POST",
            url: serverPath,
            data: JSON.stringify({ remoteQuestionList: listOfIDs, remoteAnswerList: listOfAnswers }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) { console.log(data); },
            failure: function (error) { alert(error); }
        });
    }
    
}