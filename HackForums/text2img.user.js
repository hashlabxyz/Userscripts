// ==UserScript==
// @name        text2img
// @namespace   Hash G.
// @author      Hash G.
// @include     http://www.ac-web.org/forums/showthread.php?*
// @include     http://www.ac-web.org/forums/newreply.php?do=postreply&t=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.1
// @grant       GM_getValue
// ==/UserScript==


$("body").on("keyup", ".cke_source", function(e) {
    var message = $(".cke_source").val();
    var search = /(\[img\])*http(.*?)(png|jpg|jpeg|gif)/ig;

    var arr = message.match(search);

    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, 5) != "[img]") {
                message = message.replace(arr[i], "[img]" + arr[i] + "[/img]");
                $(".cke_source").val(message);
            }
        }
    }
    
});