// ==UserScript==
// @name        text2img
// @namespace   Hash G.
// @author      Hash G.
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==


$("#message").on("keyup", function(e) {
    var message = $(this).val();
    var search = /(\[img\])*http(.*?)(png|jpg|jpeg|gif)/ig;

    var arr = message.match(search);

    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, 5) != "[img]") {
                message = message.replace(arr[i], "[img]" + arr[i] + "[/img]");
                $("#message").val(message);
            }
        }
    }
    
});