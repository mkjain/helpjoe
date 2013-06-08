var kiezDAO;

$(document).ready (function () {
    console.log ("running the startup script");
});

$("#GoAction").click (function () {
    window.location = "http://www.4kiez.de/projects.html?zip=" + $("#inputZIP").val ();    
});