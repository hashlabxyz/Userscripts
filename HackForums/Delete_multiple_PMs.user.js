// ==UserScript==
// @name        Delete multiple PMs
// @namespace   Hash G.
// @author      Hash G.
// @include     *hackforums.net/private.php*
// @require     http://code.jquery.com/jquery-2.2.4.min.js
// @version     0.1.0
// @grant       GM_getValue
// @grant       GM_setValue  
// ==/UserScript==

console.log(location.href.match(/.*\&page=.*/i));

var pages = GM_getValue("pages", 0);
console.log(pages);
if (pages > 0 && location.href.match(/\&page=/i)) {
    $(".checkbox").each(function() {
        $(this).click();
    });
    pages--;
    GM_setValue("pages", pages);
    $("input[value='Delete']").click();
} else if (pages > 0) {
    var href = $(".pagination_last").attr("href");
    window.location.replace("http://hackforums.net/" + href);
}

$("a[href='private.php?action=export']").after(" | <a id='delete' href='#'>Delete PMs</a>");

$("#delete").on("click", function() {
    var number = prompt("Number of PAGES you wish to delete? (20 PMs per page)");

    GM_setValue("pages", number);
    var href = $(".pagination_last").attr("href");
    window.location.replace("http://hackforums.net/" + href);
});