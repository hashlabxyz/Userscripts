// ==UserScript==
// @name        Clickable Sticky Man, YouTube, Clovers awards
// @namespace   Hash G.
// @description http://hackforums.net/showthread.php?tid=5252169
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.2
// @grant       GM_getValue
// ==/UserScript==


if ($("img[src='/uploads/awards/sticky-bro.png'], img[src='/uploads/awards/instagrammy.png'], img[src='/uploads/awards/YouTube.png']").length > 0) {
    var url;
    $("img[src='/uploads/awards/sticky-bro.png'], img[src='/uploads/awards/instagrammy.png'], img[src='/uploads/awards/YouTube.png']").each(function() {
        url = $(this).attr("title");
        $(this).wrap("<a href='" + url + "' target='_blank'></a>")
    });
}

if ($("img[src*='shamrock.png']").length > 0) {
    var url;
    $("img[src*='shamrock.png']").each(function() {
        var tid = $(this).attr("title").replace(/.*thread ([0-9]+).$/ig, "$1");
        url = "http://hackforums.net/showthread.php?tid=" + tid;
        $(this).wrap("<a href='" + url + "' target='_blank'></a>");
    });
}