var kiezDAO;
var projectCount=1;
var imgPath = "";

String.prototype.toTitleCase = function () {
    var i, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0; i < lowers.length; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function (txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0; i < uppers.length; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

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
        var goal = $("#fundingGoal").val();
         console.log(goal);
        var funded = 1/goal * 100;
        var backers = 1;
        var addfireurl = 'https://4kiez.firebaseio.com/zips/';

        addDAO = new Firebase(addfireurl);
        
        console.log (imgPath);
        
        addDAO.child (zip).push ({name : name, description : description, imgPath : imgPath, goal: parseInt (goal), funded : 0, backers : backers });

        window.location = "http://www.4kiez.de/projects.html?zip=" + zip;
    });
    
    if (zipCode == null) {
        location.href = "index.html";
    }
    else {
        console.log (fireurl);        

        kiezDAO.once('value', function(data){
            console.log("here!");
            console.log(data);
            if (data.val() == null){
                $("#spinner").remove();
                $("#project_tagline").html ("There are no projects for " + zipCode);
                $("#vote-text").html("It seems there are no projects in your Zip - why don't you create the first one?")
            }
        });

        kiezDAO.on('child_added',function (snapshot, prevSnapShot) {
            var msgData = snapshot.val();
            $("#vote-text").html ("There are "+ projectCount + " projects for " + zipCode);
            console.log (msgData);
            $("#project_list").append (renderProjects(snapshot));
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


function renderProjects(snapshot) {
    data = snapshot.val ();
    var image = data.imgPath ? data.imgPath : "http://placehold.it/120x120";
    var fundingProgress = '<div class="progress progress-success progress-striped progress-thick"><div class="bar" style="width: 80%"></div></div>';
    var paypalForm = '<script src="javascripts/paypal-button.min.js?merchant=farhadarb@gmail.com" data-button="donate" data-name="' + snapshot.name () + '" data-quantity="1" data-amount="1" data-currency="EUR" data-shipping="0" data-tax="0" data-callback="http://fourkiez.cloudcontrolled.com/paypalCallback" data-env="sandbox"></script>';

    var accordionInner = '<div class=\'row\'><div class=\'span3\'><img src=\"'+image+'\" class=\'img-polaroid big-image\'/></div><div class=\'span6\'><h1>'+data.name.toTitleCase()+'</h1><h4>'+data.description+'</h4></div><div class=\'span1\'>'+ fundingProgress + paypalForm+'</div></div>';

    var smallDesc = data.description.substr(0,150);
    if (data.description.length > 150){
        smallDesc+="...";
    }
    $("#spinner").remove();
    var code;
    var status = "";
    
    if (data.funded == data.goal) {
        status = "<span class=\'badge badge-success'>Fully funded: " + parseInt(data.funded) + " EUR !</span><br/>";
    }
    else {
        status = "<span class=\'badge badge-warning\'>Already funded: " + parseInt(data.funded) + " EUR</span><br/>";
    }
    
    code = '<div class=\'row\'><div class=\'span12\'><div class=\'accordion\' id=\'accordion' + projectCount + "\'><div class=\'accordion-group \'><div class=\'accordion-heading\'><div class=\'container\'><div class=\'row accordion-toggle\'><div class=\'span2\'><img src=\'" + image + "\' class=\'img-polaroid\' style=\'width:120px;height:120px;\'></div><div class=\'span9\'><h2>" + data.name.toTitleCase() + "</h2><p><span class=\'badge badge-info\'>Funding Goal: " + parseInt(data.goal) + " EUR</span><br>" + status + smallDesc + "</p><br><a class=\'btn pull-right pagination-centered\' data-toggle=\'collapse\' data-parent=\'#accordion" + projectCount + "\' href=\'#collapse" + projectCount + "\'> Read More</a></div></div></div></div><div id=\'collapse" + projectCount + "\' class=\'accordion-body collapse\'><div class=\'accordion-inner\'>" + accordionInner + "</div></div></div></div>";

    projectCount++;
    return code;
}
