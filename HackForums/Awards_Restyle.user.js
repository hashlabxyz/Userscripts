// ==UserScript==
// @name        Awards Restyling
// @description http://hackforums.net/showthread.php?tid=5220688
// @namespace   Hash G.
// @author      Hash G.
// @include     http://hackforums.net/myawards.php
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==

var title, description, img, link;
var css = ".awardCard { width: 20%; padding: 15px; margin: 15px; display: inline-block; border: 1px solid #4F3A6B;} #myAwards { background-color: #333333; }";

$("body").append("<style>" + css + "</style>");
$("form[action='myawards.php'] tr:eq(1)").remove();
$("form[action='myawards.php']").after("<div id='myAwards'></div>");

$("form[action='myawards.php'] tr:gt(0)").each(function(i) {
    
    link = $(this).find("a[href*='myawards.php?awid=']").attr("href");
    title = $(this).find("a[href*='myawards.php?awid=']").html();
    description = $(this).find("td:eq(1)").html();
    img = $(this).find("img").attr("src");
    
    $("#myAwards").append("<div class='awardCard'><a href='" + link + "'><strong>" + title + "</strong></a><img style='float:right;' src='" + img + "' alt='" + title + "'><br><br>" + description + "</div>");
    $(this).remove();
    
});