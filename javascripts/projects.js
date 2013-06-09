var kiezDAO;
var projectCount=1;

$(document).ready (function () {
    console.log ("running the projecth script");
    
    var zipCode = getQueryVariable("zip");
    
    if (zipCode == null) {
        location.href = "index.html";
    }
    else {
        $("#project_tagline").html ("There are"+ projectCount + "projects for " + zipCode);
    
        var fireurl = 'https://4kiez.firebaseio.com/zips/' + zipCode;

        kiezDAO = new Firebase(fireurl);

        kiezDAO.on ('child_added',function (snapshot) {
            var msgData = snapshot.val();

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
//    var collapsed = "in";
//    if (projectCount>1){
//        collapsed="";
//    }
    var code = "<div class=\'row\'><div class=\'accordion\' id=\'accordion"+projectCount+"\'><div class=\'accordion-group\'><div class=\'accordion-heading\'><div class=\'container\'><div class=\'row accordion-toggle\'><div class=\'span2\'><img src=\'http://placehold.it/120x120\' class=\'img-circle\'></div><div class=\'span9\'><h2>"+data.name+"</h2><p>"+data.description+"</p><a class=\'label pull-right\' data-toggle=\'collapse\' data-parent=\'#accordion"+projectCount+"\' href=\'#collapse"+projectCount+"\'>. . .</a></div></div></div></div><div id=\'collapse"+projectCount+"\' class=\'accordion-body collapse\'><div class=\'accordion-inner\'>"+data.description+"</div></div></div>";
    projectCount++;
//    var code = '<div class=\'row-fluid\' id=\'main_content_wrap\'><div class=\'span3\'></div><div class=\'span6\'><div class=\'row\'><div class=\'span8\'> <h4><strong><a href=\'#\'>' + data.name + '</a></strong></h4>\n</div>\n</div>\n<div class=\'row\'>\n<div class=\'span2\'>\n<a href=\'#\' class=\'thumbnail\'>\n<img src=\'http://placehold.it/260x180\' alt=\'\'>\n</a>\n</div>\n<div class=\'span6\'>\n<p>' + data.description + '</p>\n<p><i class="icon-thumbs-up"></i><a class=\'btn btn-success\' href=\'#\'>Support this prject</a></p>\n</div>\n</div>\n<div class=\'row\'>\n<div class=\'span8\'>\n<p></p>\n<p>\n<i class=\'icon-user\'></i> by <a href=\'#\'>John</a>\n| <i class=\'icon-calendar\'></i> Sept 16th, 2012\n| <i class=\'icon-thumbs-up\'></i> <a href=\'#\'>' + data.vote + ' Votes</a>\n| <i class=\'icon-share\'></i> \n| <i class=\'icon-tags\'></i> Tags : <a href=\'#\'><span class=\'badge badge-info\'>Snipp</span></a>\n<a href=\'#\'><span class=\'badge badge-info\'>Bootstrap</span></a>\n<a href=\'#\'><span class=\'badge badge-info\'>UI</span></a>\n<a href=\'#\'><span class=\'badge badge-info\'>growth</span></a>\n</p>\n</div>\n</div>\n</div>\n<div class=\'span3\'></div>\n' + '</div>';
    
    return code;
}