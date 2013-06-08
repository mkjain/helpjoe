var kiezDAO;

$(document).ready (function () {
    console.log ("running the new script");
    
     fireurl =  'https://4kiez.firebaseio.com/zips';
     kiezDAO = new Firebase(fireurl);

    $("#createNewItem").click(function () {
        var zip = $("#inputZIP").val ();
        var name = $("#inputName").val ();
        var description = $("#inputDescription").val ();      
        
        kiezDAO.child (zip).push ({name : name, description : description, vote : 0}); 
        
        window.location = "file:///home/farhad/NetBeansProjects/4kiez/helpjoe/projects.html?zip=" + zip;
    });
});