// ==UserScript==
// @name        Quick Search Uid
// @namespace   Hash G.
// @author      Hash G.
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==


var button = "",
    uid = "";

$("table[id*='post_'] a.bitButton[href*='trustscan.php'][title='Trust Scan']:contains('TS')").each(function() {
    uid = $(this).attr("href").substr(18);
    form = "<form target='_blank' method='post' action='search.php' style='display:inline;padding:5px;'><input name='action' value='do_search' type='hidden'><input name='keywords' class='do_search_uid' type='hidden' value='" + uid + "'><input type='submit' class='bitButton' value='SUID' style='cursor:pointer;'></form>";

    $(this).after(form);

});