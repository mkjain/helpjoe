var kiezDAO;

$(document).ready (function () {
    console.log ("running the projecth script");
    
    zipCode = getQueryVariable("zip");
    
    $("#project_tagline").html (zipCode);
    
    fireurl = 'https://4kiez.firebaseio.com/zips/' + zipCode;
    
    kiezDAO = new Firebase(fireurl);
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

function renderProjects() {
    
}