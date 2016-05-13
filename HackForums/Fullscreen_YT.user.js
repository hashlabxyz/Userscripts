// ==UserScript==
// @name        Fullscreen YT
// @namespace   Hash G.
// @author      Hash G.
// @include     http://hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @version     0.1.0
// @grant       GM_getValue
// ==/UserScript==

$("iframe[src*='http://www.youtube.com/embed']").attr("allowfullscreen", "on");