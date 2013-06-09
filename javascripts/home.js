var kiezDAO;
var authClient;
var imgPath;    
    
$(document).ready (function () {
    console.log ("running the startup script");
    
    $("#GoAction").click (function () {
            console.log ("Changing location");
            window.location.href = "projects.html?zip=" + $("#inputZIP").val (); 
     });
     
     $("#inputZIP").keydown(function(event){
         console.log(event.keyCode);
        if(event.keyCode == 13){
            console.log ("enter");
            window.location.href = "projects.html?zip=" + $("#inputZIP").val (); 
        }
    });
    
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


