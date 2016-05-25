// ==UserScript==
// @name        Userbar Picker
// @namespace   Hash G.
// @author      Hash G.
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var profileLink = $("#panel a[href*='member.php?action=profile&uid']").attr("href");

$(".post_author").each(function() {

    if ($(this).find("a[href='" + profileLink + "'] span[class*='group']").length > 0) {

        $(this).find("img").not("[src*='http://hackforums.net/images/modern_bl/star']").not("[alt*='line']").wrap("<a class='pickUserbar' style='cursor: pointer;'></a>");

        if (GM_getValue("userbarURL") && GM_getValue("userbarURL") !== "") {
            var userbarURL = GM_getValue("userbarURL");
            $(this).find("img").not("[src*='http://hackforums.net/images/modern_bl/star']").not("[alt*='line']").attr("src", userbarURL);
        }
    }
});

$(".pickUserbar").on("click", function() {
    var userbarURL = prompt("Userbar's direct link? (empty to set default userbar)");
    GM_setValue("userbarURL", userbarURL);

    $(".post_author").each(function() {

        if ($(this).find("a[href='" + profileLink + "'] span[class*='group']").length > 0) {

            if (GM_getValue("userbarURL") && GM_getValue("userbarURL") !== "") {
                var userbarURL = GM_getValue("userbarURL");
                $(this).find("img").not("[src*='http://hackforums.net/images/modern_bl/star']").not("[alt*='line']").attr("src", userbarURL);
            }
        }
    });
});