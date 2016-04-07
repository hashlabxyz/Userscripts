// ==UserScript==
// @name        CTRL+S Shortcut
// @namespace   Hash G.
// @description http://hackforums.net/showthread.php?tid=5207086
// @include     *hackforums.net/showthread.php?tid=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @version     0.2
// @grant       GM_getValue
// ==/UserScript==

$(document).on("keydown", function(e){
    if (e.ctrlKey && e.which === 83) {
        if ($("#message").val() === "") {
			$(document).scrollTop(10000);
			$("#message").focus();
		} else {
			$("#quick_reply_submit").click();
		}
        e.preventDefault();
        return false;
    }
});