// ==UserScript==
// @name        Hide Ignored users
// @namespace   Hash G.
// @description Totally hide posts of users added to your Ignore list.
// @include     *hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==

$("table[id*='ignored_post_']").remove();