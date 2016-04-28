// ==UserScript==
// @name        Clickable Sticky Man
// @namespace   Hash G.
// @description http://hackforums.net/showthread.php?tid=5252169
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==

if ($("img[src='/uploads/awards/sticky-bro.png']").length > 0) {
    var url;
    $("img[src='/uploads/awards/sticky-bro.png']").each(function() {
        url = $(this).attr("title");
        $(this).wrap("<a href='" + url + "'></a>")
    });
}