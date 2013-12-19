function updateSelectList(objToDependOn, objToUpdate, controller, ajaxVariable, dataReceived) {

    var ajaxValue = $(objToDependOn).val();

    $.ajax({
        url: controller + "?" + ajaxVariable + "=" + ajaxValue,
        type: "POST",
        data: ajaxValue,
        success: function (data) {
            $(objToUpdate).empty();
            $.each(data, function (index, dataReceived) {
                $(objToUpdate).append("<option value='" + dataReceived.Value + "'>" + dataReceived.Text + "</option>");
            })
        }
    });
}