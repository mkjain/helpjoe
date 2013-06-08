var kiezDAO;

$(document).ready (function () {
    console.log ("running the new script");
    
    //fireurl = 'https://4kiez.firebaseio.com/zips/' + zipCode;
    
    //kiezDAO = new Firebase(fireurl);
    
    $("#createNewItem").click(function () {
        var zip = $("#inputZIP").val ();
        var name = $("#inputName").val ();
        var description = $("#inputDescription").val ();
    });
});