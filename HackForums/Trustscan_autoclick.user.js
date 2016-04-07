// ==UserScript==
// @name        Trustscan AutoClick
// @namespace   Hash G.
// @description http://hackforums.net/showthread.php?tid=5217976
// @include     *hackforums.net*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.1
// @grant       GM_getValue
// ==/UserScript==

if (location.href.match(/trustscan.php/i)) {
	$("a[href*='disputedb.php']").attr("href", $("a[href*='disputedb.php']").attr("href") + "&ref=hgusc-tsdb");
} else if (location.href.match(/hgusc-tsdb/i)) {
	$("input.button[value='Search']").click();
}