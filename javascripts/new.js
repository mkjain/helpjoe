var kiezDAO;

$(document).ready (function () {
    console.log ("running the new script");
    
     fireurl =  'https://4kiez.firebaseio.com/zips';
     kiezDAO = new Firebase(fireurl);

    $("#createNewItem").click(function () {
        var zip = $("#inputZIP").val ();
        var name = $("#inputName").val ();
        var description = $("#inputDescription").val ();        
        var imgPath = "";
        
           var input = document.getElementById("upload-file");
           
            if (!input.value) {
                console.log("Choose a png to store to S3");
            } else {
                filepicker.setKey('ApwLQtdpTM6omKwCw8DyQz');
                filepicker.store(input, function(FPFile){
                        console.log("Store successful");
                        
                        var imgPath = FPFile.url;
                        
                        filepicker.convert (FPFile, {width: 200, height: 200},
                        function(newFPFile){
                            console.log(newFPFile.url);
                            result.src = newFPFile.url;
                        });
                        
                        kiezDAO.child (zip).push ({name : name, description : description, vote : 0, imgPath : imgPath}); 
                        
                        window.location = "http://www.4kiez.de/projects.html?zip=" + zip;
                    }, function(FPError) {
                        console.log(FPError.toString());
                    }, function(progress) {
                        console.log("Loading: "+progress+"%");
                    }
               );
            }
        
        //
        
        //
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