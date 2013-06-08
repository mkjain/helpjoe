var kiezDAO;
var authClient;

$(document).ready (function () {
    console.log ("running the startup script");
    
    fireurl =  'https://4kiez.firebaseio.com';
    kiezDAO = new Firebase(fireurl);
    
    authClient = new FirebaseAuthClient(kiezDAO,function (error,user) {
        if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // user is logged out
      }
    });
    
     $("#GoAction").click (function () {
        window.location = "projects.html?zip=" + $("#inputZIP").val ();    
    });
    
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
                else {
                    console.log (error);
                }
            });
        }
        else {
            alert ("The passwords you entered did not match!");
        }
    });
    
   
});


