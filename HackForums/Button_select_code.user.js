// ==UserScript==
// @name        HF selectCode()
// @namespace   Hash G.
// @description Select what is inside the [code] tag.
// @include     http://www.hackforums.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==


if ($('code').length > 0) {
  $('code').each(function(i) { 
	$(this).attr('id', 'codeBlock'+(i+1));
	$(this).after('<a class="button" onClick="selectCode('+(i+1)+')">Select code</a>');
  });
}


function selectCode(number) {
    var text = document.getElementById("codeBlock" + number), range, selection;    
    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
exportFunction(selectCode, unsafeWindow, {defineAs: "selectCode"});