// ==UserScript==
// @name        text2img and smilies
// @namespace   Hash G.
// @author      Hash G.
// @include     http://www.ac-web.org/forums/showthread.php?*
// @include     http://www.ac-web.org/forums/newreply.php?do=postreply&t=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.2.1
// @grant       GM_getValue
// ==/UserScript==

var emotes = {
    // Syntax : text: "link",

    hehe: "http://hackforums.net/images/smilies/hehe.gif",
    blackhat: "http://hackforums.net/images/smilies/blackhat.gif",


};

setTimeout(function() {
    $("#cke_18").after("<span id='cke_ily' class='cke_toolbar'><span class='cke_toolbar_start'></span><span class='cke_toolgroup'><span class='cke_button' id='emoticons_here'></span></span></span><span class='cke_toolbar_end'></span></span>");

    for (key in emotes) {
        $("#emoticons_here").append("<a class='cke_off emote' title='" + key + "'><span class='cke_icon emote_icon'><img src='" + emotes[key] + "'></span></a>");
    }

}, 500);

$("body").on("click", ".emote", function() {
    var message = $(".cke_source").val();
    var emote_link = $(this).find("img").attr("src");
    message = message + " [img]" + emote_link + "[/img]";
    $(".cke_source").val(message);
});

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