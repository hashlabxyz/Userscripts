// ==UserScript==
// @name        User info on k
// @namespace   Hash G.
// @description http://hackforums.net/showthread.php?tid=5289343
// @include     http://hackforums.net/forumdisplay.php?fid=*
// @include     http://hackforums.net/search.php?action=results&sid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==

$("table tr td div[class*='author'] a[href*='member.php?action=']").hover(function() {
    $(this).attr("data-user-link-bs", $(this).attr("href"));
}, function() {
    $(this).removeAttr("data-user-link-bs");
});

$("body").on("keypress", function(e) {
    if (e.which === 107)
        doScan($("a[data-user-link-bs]").attr("data-user-link-bs"));
});

function doScan(link) {
    $.get(link, function(data) {

        var rank = "Regular";

        if ($(data).find("img[src*='3p1c.png']").length > 0)
            rank = "3p1c"

        if ($(data).find("img[src*='ub3r.png']").length > 0)
            rank = "Ub3r"

        if ($(data).find("img[src*='l33t.png']").length > 0)
            rank = "L33t"


        var rep = $(data).find("td[class='trow2'] strong[class*='reputation']").html();

        $("#rank" + link.substr(52)).html(rank);
        $("#rep" + link.substr(52)).html(rep);
        $("a[data-user-link-bs]").removeAttr("data-user-link-bs");
    });

    $("a[href*='" + link + "']").append("</a><a href='#'> -- Rank: <span id='rank" + link.substr(52) + "'><img style='width: 0.5%' src='http://i.imgur.com/xkPshHT.gif'></span>. Rep: <span id='rep" + link.substr(52) + "'><img style='width: 0.5%' src='http://i.imgur.com/xkPshHT.gif'></span>.</a>")
}