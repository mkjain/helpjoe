var kiezDAO;
var projectCount=1;
var imgPath = "";

$(document).ready (function () {
    console.log ("running the projecth script");
    
    var zipCode = getQueryVariable("zip");
    
    var fireurl = 'https://4kiez.firebaseio.com/zips/' + zipCode;

    kiezDAO = new Firebase(fireurl);
    
    $("#uploadImage").click (function () {
        filepicker.setKey('ApwLQtdpTM6omKwCw8DyQz');
                
        filepicker.pickAndStore({mimetype:"image/*"},
             {location:"S3"}, function(fpfiles){
                 console.log(JSON.stringify(fpfiles));
                  imgPath = (fpfiles[0]).url;
        },function (errors) {
                console.log(errors);
        });
     });
     
     $("#createNewItem").click(function () {
        var zip = $("#inputZIP").val ();
        var name = $("#inputName").val ();
        var description = $("#inputDescription").val ();
        
         var addfireurl = 'https://4kiez.firebaseio.com/zips/';

        addDAO = new Firebase(addfireurl);
        
        console.log (imgPath);
        
        addDAO.child (zip).push ({name : name, description : description, vote : 0, imgPath : imgPath}); 

        window.location = "http://www.4kiez.de/projects.html?zip=" + zip;
    });
    
    if (zipCode == null) {
        location.href = "index.html";
    }
    else {
        console.log (fireurl);

        kiezDAO.on('child_added',function (snapshot) {
            var msgData = snapshot.val();
            $("#project_tagline").html ("There are "+ projectCount + " projects for " + zipCode);
            console.log(msgData);
            $("#project_list").append (renderProjects(msgData));
        });
    }
});


//$("#uploadImage").click (function () {
//    console.log ("uploadImage");
//    filepicker.setKey('ApwLQtdpTM6omKwCw8DyQz');
//
//    filepicker.pickAndStore({mimetype:"image/*"},
//        {location:"S3"}, function(fpfiles){
//            console.log (imgPath);
//            imgPath = fpfiles[0].url;
//        },function (errors) {
//            console.log(errors);
//
//        });
//});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}


function renderProjects(data) {
    var image = data.imgPath ? data.imgPath : "http://placehold.it/120x120";
    var accordionInner = "";

    var smallDesc = data.description.substr(0,150);
    if (data.description.length > 150){
        smallDesc+="...";
    }
    $("#spinner").remove();
    var code = "<div class=\'row\'><div class=\'accordion\' id=\'accordion"+projectCount+"\'><div class=\'accordion-group\'><div class=\'accordion-heading\'><div class=\'container\'><div class=\'row accordion-toggle\'><div class=\'span2\'><img src=\'"+image+"\' class=\'img-polaroid\' style=\'width:120px;height:120px;\'></div><div class=\'span9\'><h2>"+data.name+"</h2><p>"+smallDesc+"</p><br><a class=\'well pull-right pagination-centered\' data-toggle=\'collapse\' data-parent=\'#accordion"+projectCount+"\' href=\'#collapse"+projectCount+"\'> Read More</a></div></div></div></div><div id=\'collapse"+projectCount+"\' class=\'accordion-body collapse\'><div class=\'accordion-inner\'>"+accordionInner+"</div></div></div>";
    projectCount++;
    return code;
}
