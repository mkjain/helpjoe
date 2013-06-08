var kiezDAO;

$(document).ready (function () {
    console.log ("running the startup script");
    
    kiezDAO = new Firebase('https://4kiez.firebaseio.com/zips/10932');
    
    kiezDAO.push ({item : {name : "test",votes : 0}});
});

function addItem (zip,name,description,votes) {
        
}
