var kiezDAO;
var projectCount=1;

$(document).ready (function () {
    console.log ("running the projecth script");
    
    var zipCode = getQueryVariable("zip");
    
    if (zipCode == null) {
        location.href = "index.html";
    }
    else {

    
        var fireurl = 'https://4kiez.firebaseio.com/zips/' + zipCode;

        kiezDAO = new Firebase(fireurl);

        kiezDAO.on ('child_added',function (snapshot) {
            var msgData = snapshot.val();
            $("#project_tagline").html ("There are "+ projectCount + " projects for " + zipCode);

            $("#project_list").append (renderProjects(msgData));
        });
    }
    
    
    
});

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

function addItem (zip,name,description,votes) {

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