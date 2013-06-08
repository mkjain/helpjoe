var kiezDAO;
var authClient;

$(document).ready (function () {
    console.log ("running the startup script");
    
    fireurl =  'https://4kiez.firebaseio.com';
    kiezDAO = new Firebase(fireurl);
    
    authClient = new FirebaseAuthClient(kiezDAO);
    
    $("#CreateAccount").click (function () {
        console.log ("Creating an account");
        var pass = $("#createPassword").val ();
        var repass = $("#createRepeatPassword").val ();
        var user = $("#createUsername").val ();
        
        

        if (pass == repass) {
            authClient.createUser (user,pass,function (error,user) {
                if (!error) {
                    console.log (user + pass);
                }
            });
        }
        else {
            alert ("The passwords you entered did not match!");
        }
    });
    
    $("#GoAction").click (function () {
        window.location = "http://www.4kiez.de/projects.html?zip=" + $("#inputZIP").val ();    
    });

});


