// ==UserScript==
// @name        Who posted
// @description Adds a link to see the "Who Posted" window on thread.
// @namespace   Hash G.
// @include     *hackforums.net*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     0.3
// @grant       GM_getValue
// ==/UserScript==

tid = $("#content table a[id*='thread_options_'").attr("id").substr(15);
$("#content table a[id*='thread_options_'").before("<strong><a style='font-size: 12px; ' href='javascript:MyBB.whoPosted(" + tid + ");'>Who posted</a> - </strong>");