var kiezDAO;
var imgPath = "";

$(document).ready (function () {
    console.log ("running the new script");
    
     fireurl =  'https://4kiez.firebaseio.com/zips';
     kiezDAO = new Firebase(fireurl);
     
     $("#uploadImage").click (function () {
        console.log ("uploadImage");
        filepicker.setKey('ApwLQtdpTM6omKwCw8DyQz');
                
        filepicker.pickAndStore({mimetype:"image/*"},
             {location:"S3"}, function(fpfiles){                            
                  imgPath = FPFile.url;
        });
                  
     });

    $("#createNewItem").click(function () {
        var zip = $("#inputZIP").val ();
        var name = $("#inputName").val ();
        var description = $("#inputDescription").val ();
        
        kiezDAO.child (zip).push ({name : name, description : description, vote : 0, imgPath : imgPath}); 

        window.location = "http://www.4kiez.de/projects.html?zip=" + zip;
    });
    
    
    
    $("#uploadImage").click(function () {
        var zip = $("#inputZIP").val ();
        
        filepicker.setKey('ApwLQtdpTM6omKwCw8DyQz');
        filepicker.pickAndStore({mimetype:"image/*"},
                {location:"S3"},{path : zip + ".png"}, function(fpfiles){
           console.log(JSON.stringify(fpfiles));
        });
    });
});