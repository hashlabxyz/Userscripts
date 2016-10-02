// ==UserScript==
// @name        HF Enhancement Suite - v2.0
// @author      Emylbus, Hash G.
// @namespace   http://www.sublyme.net
// @description This userscript defines general enhancement tweaks that apply to the entire HackForums site.
// @include     *hackforums.net/*
// @version     0.55
// @downloadURL https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/HFES.user.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_info
// @require     https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/GM_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/GM_SuperValues.js
// ==/UserScript==

debug = false;

// CM_config settings
var vsstring = 'HF Enhancement Suite by Emylbus - v'+GM_info.script.version;
//GM_config.init(vsstring,
var configInit = {
    'citeStyle':{
        'label':'Choose your thread citing format:',
        'type':'select',
        'options': {
            'standard':'Title by User',
            'withdash': 'Title - User',
            'title': 'Title',
        },
        'default':'standard',
        'section':['','Forum']
    },
    'ratingInfo':{
        'label':'Show detailed thread rating info?',
        'type':'checkbox',
        'default':true,
    },
    'multiquote':{
        'label':'Enable multiquoting in threads?',
        'type':'checkbox',
        'default':true,
    },
    'pmfrompost':{
        'label':'Enable PM from Post?',
        'type':'checkbox',
        'default':true,
    },
    'threadpreview':{
        'label':'Enable thread previewing?',
        'type':'checkbox',
        'default':false,
    },
    'theadstyle':{
        'label':'Post Header Style:',
        'type':'select',
        'default':'none',
        'options': {
            'none' : 'None',
            'light' : 'Light',
            'dark' : 'Dark'
        }
    },
    'prettyQuote':{
        'label':'Enable fancy quotations?',
        'type':'checkbox',
        'default':false
    },
    'warnUnload':{
        'label':'Warn if page change will lose data?',
        'type':'checkbox',
        'default':false
    },
    'cleanThreads':{
        'label':'Hide Quote and Edit buttons on closed threads?',
        'type':'checkbox',
        'default':true
    },
    'quickPM':{
        'label':'Enable Quick PM?',
        'type':'checkbox',
        'default':true,
        'section':['','Private Messaging']
    },
    'trackingLink':{
        'label':'Enable links in message tracking? (L33T+ only)',
        'type':'checkbox',
        'default':false
    },
    'pmDeny':{
        'label':'Enable quick denying on PM notices? (UB3R only)',
        'type':'checkbox',
        'default': false
    },
    'prettyPM':{
        'label':'Enable pretty PMs?',
        'type':'checkbox',
        'default':true
    },
    'profileCiting':{
        'label':'Enable profile citing?',
        'type':'checkbox',
        'default':true,
        'section':['','Profile']
    },
    'usertagging':{
        'label':'Enable user tagging?',
        'type':'checkbox',
        'default':true
    },
    'banReason':{
        'label':'Show ban reason on profile? (UB3R only)',
        'type':'checkbox',
        'default':false
    },
    'staffOnline':{
        'label':'Enable checking online status of staff and moderators?',
        'type':'checkbox',
        'default':true,
        'section':['','Staff/Mod']
    },
    'showStaffLink':{
        'label':'Display "Show Staff" link?',
        'type': 'checkbox',
        'default':true,
        'section':['','Quick Links']
    },
    'showModLink':{
        'label':'Display "Show Mods" link?',
        'type':'checkbox',
        'default':true
    },
    'showGroupLink':{
        'label':'Display "Show Groups" link?',
        'type':'checkbox',
        'default':true
    },
    'showTrackingLink':{
        'label':'Display "PM Tracking" link? (L33T+ only)',
        'type':'checkbox',
        'default':false
    },
    'showBansLink':{
        'label':'Display "Show Bans" link? (UB3R only)',
        'type':'checkbox',
        'default':false
    },
    'showBuddyLink':{
        'label':'Display "Buddy List" link?',
        'type':'checkbox',
        'default':false
    },
    'showAwardList':{
        'label':'Display "Award List" link?',
        'type':'checkbox',
        'default':false
    },
    'showPaidLink':{
        'label':'Display "Paid Stickies" link?',
        'type':'checkbox',
        'default':false
    },
    'showSubscribed':{
        'label':'Display "Subscribed Threads" link?',
        'type':'checkbox',
        'default':true
    },
    'lastLink':{
        'label':'Add last post links to search pages?',
        'type':'checkbox',
        'default':true,
        'section':['','Other']
    },
    'locationhider':{
        'label':'Hide your location?',
        'type':'checkbox',
        'default':false
    },
    'removeWelcome':{
        'label':'Hide the welcome text at the top of each page?',
        'type':'checkbox',
        'default':false
    },
    'hidetwitter':{
        'label':'Hide twitter widget?',
        'type':'checkbox',
        'default':true
    },
    'groupLeaderUserList':{
        'label':'Easy member list: ',
        'type':'select',
        'options':{
            'none':'None',
            'standard':'Standard with BB List',
            'standardnolink':'Standard without BB List',
            'nolistwithlink':'Comma Deliminated with Links',
            'nolistnolink': 'Comma Deliminated without Links',
        },
        'default':'standard',
        'section':['','Group Leader']
    },
    'groupAlertHide':{
        'label':'Hide group join requests?',
        'type':'checkbox',
        'default':false,
    },
    'userBarSwitch':{
        'label':'Set your userbar (client-side change only): ',
        'type':'select',
        'options':{
            'none':'-----',
            'strange':'#@&%!',
            '143':'143',
            '3p1c':'3p1c',
            'alliance':'The Alliance',
            'blackdiamond':'Black Diamond',
            'brotherhood':'The Brotherhood',
            'complexity':'Complexity',
            'empire':'The Empire',
            'flybynight':'Fly By Night',
            'graphicmasters':'Graphic Masters',
            'guardians':'Guardians',
            'illuminati':'Illuminati',
            'infamous':'Infamous',
            'innovation':'Innovation',
            'lannisters':'Lannisters',
            'leet':'L33T',
            'legacy':'Legacy',
            'legion':'Legion',
            'redlion':'Red Lion',
            'skill':'Skill',
            'uber':'UB3R',
            'void':'Void',
            'blank':'Blank'
        },
        'default':'none',
        'section':['','Fun']
    }
};

function initConfig(){
    var configCSS, configCSS_Blue, configCSS_Purple;
    configCSS_Blue = "\
    #HFES_config {background:#333; color:#CCC; font-size:14px; } \
    #HFES_config_header {color:#FFF;} \
    #HFES_config .section_desc {background:#072948; color:#FFF; border:none; font-size:14px;} \
    #HFES_config .section_header {display:none !important;} \
    #HFES_config .config_var {text-align:left;} \
    #HFES_config .field_label {font-size:14px; font-weight:normal} \
    #HFES_config * {font-family:Verdana, Arial, Sans-Serif; font-weight:normal}\
    ";
    configCSS_Purple = "\
    #HFES_config {background:#333; color:#CCC; font-size:14px; border-radius:5px;} \
    #HFES_config_header {color:#FFF;} \
    #HFES_config .section_desc {background:#4F3A6B; color:#FFF; border:none; font-size:14px;} \
    #HFES_config .section_header {display:none !important;} \
    #HFES_config .config_var {text-align:left;} \
    #HFES_config .field_label {font-size:14px; font-weight:normal} \
    #HFES_config * {font-family:Verdana, Arial, Sans-Serif; font-weight:normal}\
    #HFES_config_buttons_holder {text-align:left}\
    ";
    
    if(GM_getValue('forumTheme', 'theme3') == 'theme5'){
        configCSS = configCSS_Blue;
    }else{
        configCSS = configCSS_Purple;
    }
    //configCSS = configCSS_Purple;
    GM_config.init({
        'id':'HFES_config',
        'title':vsstring,
        'fields':configInit,
        'css':configCSS
    });
}

initConfig();
var defaultusertags = {
    '956054':'HFES Developer',
};

var urlBase = "http://www.sublyme.net/site_media/"

var defaultfav = {
        '2':'Rules, Announcements, News and Feedback',
    };

var panelFlag = false;
var postkeyFlag = false;
var myPostKey = '';

// CSS to inject:

var emyNotice = [
    ".emy_alert {",
    "background: #333333;",
    "border-top: 1px solid #F4D639;",
    "border-bottom: 1px solid #F4D639;",
    "text-align: center;",
    "padding: 5px 20px;",
    "font-size: 11px;",
    "margin-bottom: 15px;}",
    ].join("");

var emyUpdate = [
    ".emy_update {",
    "background: #333333;",
    "border-top: 1px solid #FFF;",
    "border-bottom: 1px solid #FFF;",
    "text-align: center;",
    "padding: 5px 20px;",
    "font-size: 11px;",
    "margin-bottom: 15px;}",
    ].join("");
    
var leftUnReadBubble = [
    '.pm_left_unread {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#E3A3A3;',
    'color:#000000;',
    'float:left;',
    '}'
    ].join('');

var leftReadBubble = [
    '.pm_left_read {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#AAA3A3;',
    'color:#333333;',
    'float:left;',
    '}'
    ].join('');

var rightUnReadBubble = [
    '.pm_right_unread {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#A3E3A3;',
    'color:#000000;',
    'text-align:right;',
    'float:right;',
    '}'
    ].join('');

var rightReadBubble = [
    '.pm_right_read {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#A3AAA3;',
    'color:#333333;',
    'text-align:right;',
    'float:right;',
    '}'
    ].join('');

var fixedTable = [
    'table.fixed { table-layout:fixed; }',
    'table.fixed td { overflow: hidden; }',
    ].join('');

var tagBubble = [
    '.tag_bubble {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'padding: 1px 4px 1px 4px;',
    'background-color:#B6E5CB;', // C19CBC  F88180  F4F0ED E6E6CF FA909E FDCBC7 D0BB9F  
    'color:#000000;',
    '}'
    ].join('');

var prettyQuotes = [
    'blockquote {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'padding: 1px 4px 1px 4px;',
    'background-color:#AAA;', // C5C8BD
    'color:#111;',
    '}'
    ].join('');

var prettyCite = [
    'blockquote cite {',
    'border-bottom: 1px solid #999;',
    'color:#000',
    '}'
    ].join('');

// HFES code

function injectCSS(){
    GM_addStyle(emyNotice);
    GM_addStyle(emyUpdate);
    GM_addStyle(leftUnReadBubble);
    GM_addStyle(leftReadBubble);
    GM_addStyle(rightUnReadBubble);
    GM_addStyle(rightReadBubble);
    GM_addStyle(fixedTable);
    GM_addStyle(tagBubble);
}

function debugPrint(astr){
    if(debug == true){
        console.log("[HFES] "+astr)
    }
}

function replaceAll(str, find, replace) {
    /* I didn't write this, but it's damn useful */
  return str.replace(new RegExp(find, 'g'), replace);
}

function decodeHtmlNumeric(str) {
    /* I didn't write this, but it's damn useful */
    return str.replace( /&#([0-9]{1,7});/g, function( g, m1 ){
        return String.fromCharCode( parseInt( m1, 10 ) );
    }).replace( /&#[xX]([0-9a-fA-F]{1,6});/g, function( g, m1 ){
        return String.fromCharCode( parseInt( m1, 16 ) );
    });
}

function replaceAllMap(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    
    return str.replace(re, function(matched){
        return mapObj[matched];
    });
}
    
function trimString (str) {
    /* Also didn't write this, but it's very useful and so elegant! */
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
 * Adds and Removes links in the header.
 */
function addToMenu() {
    debugPrint("Header Links", 1);
    $(".menu ul li:eq(0)").after("<li><a href=\"/favorites.php\" class=\"navButton\">Favorites</a></li>");
    $(".menu ul").append("<li><a href=\"/showthread.php?tid=3692117\" class=\"navButton\">Support HFES</a></li>");
};
    
function uberPMDeny() {
    try{
        var pmNotice, firstPart, secondPart, pmid, denyURL;
        pmNotice = document.getElementsByClassName('pm_alert')[0].innerHTML;
        pmNotice = pmNotice.split('\n');
        firstPart = pmNotice[1];
        secondPart = pmNotice[2];
        pmid = secondPart.split('pmid=')[1].split('" style')[0];
        denyURL = "http://www.hackforums.net/private.php?action=read&pmid="+pmid+"&denyreceipt=1";
        secondPart = secondPart.split('</div>')[0]+"&nbsp;&nbsp;<small><i><a href="+denyURL+">[deny receipt]</a></i></small></div>";
        document.getElementsByClassName('pm_alert')[0].innerHTML = firstPart + "\n" + secondPart;
    }catch(err){
    }
}

function showSettings(){
    debugPrint("Opening settings window...");
    GM_config.open();
}

function addSpecialLinks(){
    
    var bodyList, buddyIndex, i, currDir, elementLink, specialLinks = [];
    
    if(document.URL.indexOf("misc.php?action=buddypopup") != -1){
        return;
    }
    
    if(GM_config.get('showSubscribed', true)){
        specialLinks.push('<a href="/usercp.php?action=subscriptions">Subscribed Threads</a>');
    }
    if(GM_config.get('showBuddyLink', true)){
        specialLinks.push('<a href="javascript:void(0);" id="buddylist">Buddy List</a>');
        //$("#buddylist").live("click", function(){MyBB.popupWindow("http://www.hackforums.net/misc.php?action=buddypopup", "buddyList", 350, 350);});
        $("#buddylist").live("click", function(){window.open('/misc.php?action=buddypopup','Buddy List','width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')});
    }
    if(GM_config.get('showStaffLink', true)){
        specialLinks.push('<a href="/showstaff.php">Show Staff</a>');
    }
    if(GM_config.get('showModLink', true)){
        specialLinks.push('<a href="/showmods.php">Show Mods</a>');
    }
    if(GM_config.get('showGroupLink', true)){
        specialLinks.push('<a href="/showgroups.php">Show Groups</a>');
    }
    if(GM_config.get('showTrackingLink', false)){
        specialLinks.push('<a href="/private.php?action=tracking">PM Tracking</a>');
    }
    if(GM_config.get('showBansLink', true) /*&& GM_config.get('accstatus') == 'uber'*/){
        specialLinks.push('<a href="/bans.php">Show Bans</a>');
    }
    if(GM_config.get('showPaidLink', false)){
        specialLinks.push('<a href="/paidstickies.php">Paid Stickies</a>');
    }
    if(GM_config.get('showAwardList', false)){
        specialLinks.push('<a href="/myawards.php">Award List</a>');
    }
    
    specialLinks.push('<a title="" href="javascript:void(0);" id="settings">HFES Settings</a>');
    
    specialLinks = specialLinks.join(" | ");
    bodyList = document.getElementById('panel').innerHTML.split('\n');//document.body.innerHTML.split('\n');
    for(i = 0; i < bodyList.length; i++){
        if(bodyList[i].indexOf('buddypopup') != -1){
            buddyIndex = i;
        }
    }
    bodyList[buddyIndex] = specialLinks;
    
    document.getElementById('panel').innerHTML = bodyList.join('\n');
    $("#settings").live("click", function(){ showSettings(); });
}

function showBuddyList(){
    window.open('http://www.hackforums.net/misc.php?action=buddypopup', 'HF Buddy List', 'height=350,width=350,resizable=0,location=0,left=0,top=0');
}

function emyMessage(){
    try{
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://sublyme.net/site_media/emymessage.html" + "?nc=" + Math.random(),
            onload: function(response){
                var emyHTML, emyMessageText, elementzLink, res, newres = [], i;
                //debugPrint("Emy Message: "+response.responseText);                
                if(GM_getValue("previousEmyMessage", "\n") == response.responseText && GM_getValue("hideEmyMsg", true)){
                    debugPrint("Not displaying Emy Message because it is the same as before and was hidden.");
                    return;
                }
                res = trimString(response.responseText);
                newres = res.split('\n');
                /*for(i=0; i < res.length-1; i++){
                    if(res[i].indexOf("<") != 0 && res[i] != "\n"){
                        newres.push(res[i]);
                    }
                }*/
                //newres.push(res[i]);
                GM_setValue("previousEmyMessage", response.responseText);
                GM_setValue("hideEmyMsg", false);
                debugPrint("Displaying new Emy Message: "+newres.join(" | "));
                hideButton = '<div class="float_right"><a href="javascript:void(0);" title="Dismiss this notice" id="hider"><img src="http://x.hackforums.net/images/modern_bl/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div>';
                emyHTML = '<br><div class="emy_alert" id="emy_msg"><div><strong>HFES Notice: </strong>'+newres.join(" | ")+hideButton+'</div></div>';
                if(response.responseText != "\n"){
                    //$("#header").append(emyHTML);
                    //$("#hider").live("click",function(){hideEmyMessage();});
                }
            },
        });
    }catch(err){
        debugPrint(err.message);
    }
}

function hideEmyMessage(){
    $(".emy_alert").fadeOut();
    GM_setValue("hideEmyMsg", true);
}

function emyUpdateMsg(){
    try{
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://sublyme.net/site_media/HFESversion.txt" + "?nc=" + Math.random(),
            onload: function(response){
                var updateHTML, emyMessageText, elementzLink, res, newres = [], i, version, changelog = '';
                res = trimString(response.responseText);
                res = res.split('\n');
                version = res[0];
                if(parseFloat(version) <= parseFloat(GM_info.script.version)){
                    debugPrint('Version is current.');
                    return;
                }
                res.shift();
                //for(i=1;i < res.length; i++){
                //    res[i-1] = res[i];
                //}
                debugPrint('----');
                debugPrint(response.responseText);
                debugPrint(res);
                debugPrint(changelog);
                debugPrint(GM_info.script.version);
                debugPrint('----');
                debugPrint("Displaying new update alert: "+res.join(" | "));
                updateHTML = '<br><a href="https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/HFES.user.js""><div class="emy_update" id="updatemsg"><div><strong>HFES Update: New Version (v'+version+') Available. Click here to update.</strong> Changelog: '+res.join(" | ")+'</div></div></a>';
                if(response.responseText != "\n"){
                    //$("#header").append(updateHTML);
                }
            },
        });
    }catch(err){
        debugPrint(err.message);
    }
}

function displayThreadRating(){
    var docSplit, tempString, i, currRate;
    docSplit = document.getElementById('content').innerHTML.split('\n');
    for(i=0; i < docSplit.length; i++){
        //debugPrint(docSplit[i]);
        if(docSplit[i].indexOf('rating_table_') != -1){
            currRate = docSplit[i].split('rating_table_')[1].split('">')[0].split('"')[0];
        }else if(docSplit[i].indexOf("Rating.build_forumdisplay") != -1){
            //alert("tete");
            tempString = docSplit[i].split("current_average: '")[1].split(" in")[0];
            if(tempString.indexOf("1 ")==0){
                tempString = tempString.replace("(s)","");
            }else{
                tempString = tempString.replace("(s)","s");
            }
            //docSplit[i+2] = docSplit[i+2]+'<span style="font-size: x-small;">'+tempString.replace(" - ","<br>")+'</span>';
            $('#rating_table_'+currRate).append('<span style="font-size: x-small;">'+tempString.replace(" - ","<br>")+'</span>');
        }
    }
    //document.getElementById('content').innerHTML = docSplit.join("\n");
}

function displayThreadRatingT(){
    var docSplit, tempString, tempScore, i;
    if($('.inline_rating').length > 0) {
        docSplit = document.getElementsByClassName("inline_rating")[0].innerHTML.split('\n');
        tempString = docSplit[2].split('>')[1].split('<')[0];
        tempScore = tempString.split(' - ')[1].split(' ')[0] + " Avg";
        tempString = tempString.split(' - ')[0];
        if(tempString.indexOf("1 Votes") == 0){
            tempString = "1 Vote";
        }
       
        tempString = '<span style="font-size: x-small;">'+tempString +" - "+tempScore+'</span>';
        $(".inline_rating").append(tempString);
    }
}

function onlineStaff(){
    var adminURL, adminDict, adminLine, docDJ, msgWithStatus, splitLine, i;
    adminDict = {};
    docDJ = document.getElementsByClassName('tborder')[0].innerHTML.split('\n');
    for(i=0; i < docDJ.length; i++){
        if(docDJ[i].indexOf("member.php") != -1){
            adminURL = docDJ[i].split('a href="')[1].split('"')[0].replace("\&amp;","\&");
            adminDict[adminURL] = i;
            try{
                GM_xmlhttpRequest({
                    method: "GET",
                    url: adminURL,
                    onload: function(response){
                        var imageHTML;
                        splitList = document.getElementsByClassName('tborder')[0].innerHTML.split('\n');
                        adminLine = splitList[adminDict[response.finalUrl]];
                        if(response.responseText.indexOf("member_profile_online") != -1){
                            imageHTML = '<img src="http://x.hackforums.net/images/modern_bl/buddy_offline.gif" alt="Online" title="Online">  ';
                        }else{
                            imageHTML = '<img src="http://x.hackforums.net/images/modern_bl/buddy_offline.gif" alt="Offline" title="Offline">  ';
                        }
                        
                        msgWithStatus = imageHTML + adminLine;
                        splitList[adminDict[response.finalUrl]] = msgWithStatus;
                        document.getElementsByClassName('tborder')[0].innerHTML = splitList.join("\n");
                    },
                });
            }catch(err){
                return;
            }
        }
    }
}

function createCiteLink(citation){
    debugPrint("Citation should be: "+citation);
    window.prompt("Press Ctrl+C to copy thread citation!", citation); // Get rid of
}

function threadCiting(){
    var author, title;
    if(document.URL.indexOf("page=") != -1){
        debugPrint("WRONG PAGE");
        wrongPageCiteHandle();
    }else{
        correctPageCite();
    }
}

function correctPageCite(){
    var author, authorURL, threadTitle, threadURL, finalCite="undefined error";
    author = $($('.post_author a[href*="member.php?action=profile"]')[0]).text();
    authorURL = $($('.post_author a[href*="member.php?action=profile"]')[0]).attr('href');
    threadTitle = $('.navigation .active').text();
    threadURL = document.URL.split('&')[0];
    
    if(GM_config.get('citeStyle') == 'title'){
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url]";
    }else if(GM_config.get('citeStyle') == 'standard'){
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url] by [url="+authorURL+"]"+author+"[/url]";
    }else{
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url] - [url="+authorURL+"]"+author+"[/url]";
    }
    createCiteLink(finalCite);
}

function wrongPageCiteHandle(){ //HOLDER5
    threadURL = document.URL.split('&')[0];
    threadTitle = $('.navigation .active').text();

    GM_xmlhttpRequest({
        method: "GET",
        url: threadURL,
        onload: function(response){
            wrongPageCiter(threadURL, threadTitle, response.responseText);
        }
    });
}

function wrongPageCiter(threadURL, threadTitle, responseText){
    var author = $($($(responseText).find(".post_author a[href*='member.php?action=profile']"))[0]).text();
    var authorURL = $($($(responseText).find(".post_author a[href*='member.php?action=profile']"))[0]).attr('href');

    if(GM_config.get('citeStyle') == 'title'){
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url]";
    }else if(GM_config.get('citeStyle') == 'standard'){
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url] by [url="+authorURL+"]"+author+"[/url]";
    }else{
        finalCite = "[url="+threadURL+"][b]"+threadTitle+"[/b][/url] - [url="+authorURL+"]"+author+"[/url]";
    }
    createCiteLink(finalCite);
}

function forumCiting(){
    window.prompt("Press Ctrl+C to copy forum citation!", citePage());
}

function citePage(){
    if(document.URL.indexOf("hid=") != -1){
        return '[url='+document.URL+'][b]'+$('.navigation .active').text()+' Help Document[/b][/url]';
    }else{
        return '[url='+document.URL.split('&')[0]+'][b]'+$('.navigation .active').text()+'[/b][/url]';
    }
}

function getThreadOP(htmlCode){ // HOLDER2
    var infoHolder, uid, author, authorString, finalHTML, inc;
     
    if(htmlCode.indexOf('<div id="content">') != -1){
        htmlCode = htmlCode.split('<div id="content">')[1];
    }else{}
    infoHolder = htmlCode.split('largetext">')[1].split('</span')[0];
    infoHolder = infoHolder.replace(" ","").replace("<strong>","").replace("</strong>","");
    
    uid = infoHolder.split('uid=')[1].split('">')[0];
    
    author = infoHolder.replace("</a>","");
    author = author.split(">");
    author = author[author.length-1];
    
    authorString = "[url=http://www.hackforums.net/member.php?action=profile&uid="+uid+"]"+author+"[/url]";
    
    return authorString;
}

function groupAlertRemover(){
    $(".pm_alert:contains('pending group membership join request')").hide();
}

function getPMOP(htmlCode){
    var infoHolder, uid, author, authorString, finalHTML, inc;
    infoHolder = htmlCode.split('largetext">')[1].split('</span')[0];
    infoHolder = infoHolder.replace(" ","").replace("<strong>","").replace("</strong>","");    
    uid = infoHolder.split('uid=')[1].split('">')[0];
    
    author = infoHolder.replace("</a>","");
    author = author.split(">");
    author = author[author.length-1];
    
    return author;
}

function addQuickMsg(){
    var msgBox, formButton, finalHtml, postKey, recipient, subject, messageToSend, pmid, postBody;
    postKey = document.getElementsByTagName('head')[0].innerHTML.split('my_post_key = "')[1].split('";')[0];
    recipient = getPMOP(document.getElementsByClassName("post_author")[0].innerHTML);
    subject = document.getElementsByClassName("thead")[1].innerHTML.split('>')[1].split('<')[0];
    if(subject.indexOf("Re:") != 0){
        subject = "Re: "+subject;
    }
    pmid = document.URL.split("pmid=")[1];
    
    postBody = '[HFES] Loading...';
    
    finalHtml = [
        '<div align="center"; background: #000;>',
        '<form action="private.php" method="POST">',
        '<textarea style="width: 75%; align:"center"; padding: 4px; margin: 0;" rows="10" cols="80" name="message" id="message" tabindex="1">'+postBody+'</textarea><br>',
        '<input type="hidden" name="action" value="do_send" />',
        '<input type="hidden" name="my_post_key" value="'+postKey+'" />',
        '<input type="hidden" name="to" id="to" value="'+recipient+'" />',
        '<input type="hidden" name="pmid" value="'+pmid+'" />',
        '<input type="hidden" name="do" value="reply" />',
        '<input type="hidden" name="subject" value="'+subject+'" />',
        '<input type="hidden" name="options[readreceipt]" value="1" />',
        '<input type="hidden" name="options[savecopy]" value="1" />',
        '<input type="submit" class="bitButton" name="submit" value="Send Quick Reply" tabindex="9" accesskey="s" title="Quick reply with the above box" />',
        '  <a href="private.php?action=send&pmid='+pmid+'&do=reply" class="bitButton" rel="nofollow" title="Open full reply mode">Full Reply Mode</a>',
        '  <a href="private.php?action=send&pmid='+pmid+'&do=forward" class="bitButton" rel="nofollow" title="Forward the message to someone">Forward Message</a>',
        '  <a href="private.php?action=delete&pmid='+pmid+'&my_post_key='+postKey+'" class="bitButton" rel="nofollow" onclick="return confirm(\'Are you sure that you want to delete this PM?\');" title="Delete this message">Delete Message</a>',
        '</form>',
        '</div>'].join('');
    
    $(".author_buttons").hide();
    $(".post_management_buttons").replaceWith(finalHtml);
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.hackforums.net/private.php?action=send&pmid="+pmid,
        onload: function(response){
            $('#message').text($($($($($($.parseHTML(response.responseText)).filter("#container")[0].children).filter("#content")[0].children).filter(".quick_keys")[0].children).filter("form")[0][4]).text());
            //debugPrint($($($($($($($($.parseHTML(response.responseText)).filter("#container")[0].children).filter("#content")[0].children).filter(".quick_keys")[0].children).filter("form")[0].children).filter("table")[0].children).filter("tbody")[0].children));
            if(GM_config.get("locationhider") && document.URL.indexOf('favorites.php') == -1){
                if(GM_config.get("locationhider") && document.URL.indexOf('favorites.php') == -1){
                    if(document.URL.indexOf("www.") != -1){
                        $.get("http://www.hackforums.net/misc.php", function(){});
                    }else{
                        $.get("http://hackforums.net/misc.php", function(){});
                    }
                
                }
            }
        }
    });
    
}

function getUser(){
    return document.getElementById('panel').innerHTML.split('uid=')[1].split('">')[1].split('</a')[0];
}

function setUserbarInThread(){
    var userInfoHTML, userInfoHTMLsplit, username, newindex;
    username = getUser();
    try{
        userInfoHTML = $('.post_author:contains("'+username+'")')[0].innerHTML;
        userInfoHTMLsplit = userInfoHTML.split('\n');
        if(userInfoHTML.indexOf('postbit_groupimage') != -1){
        // This is a little hacky way to do it, but it works! :P
            newindex = - 4;
        }else{
            newindex = - 2;
        }
        userInfoHTMLsplit[userInfoHTMLsplit.length + newindex] = '<img src="http://sublyme.net/site_media/hfuserbars/'+GM_config.get('userBarSwitch')+'.gif" alt="[HFES] '+GM_config.get('userBarSwitch')+' userbar" title="[HFES] '+GM_config.get('userBarSwitch')+' userbar">';
        userInfoHTML = userInfoHTMLsplit.join('\n');
        $('.post_author:contains("'+username+'")').html(userInfoHTML);
    }catch(err){debugPrint("Error attempting to set Userbars: "+err);}
}

function addMsgTracking(){ //TURKEYHOLD
    var docSplit, i, messageID, inner;
    $('input[name*="readcheck"]').each(function(){
        messageID = parseInt($(this).attr("name").split('[')[1].split(']')[0])+1;
        //inner = $($($($($(this)[0].parentNode)[0].parentNode)[0].children)[1].children);
        inner = $($($($($(this)[0].parentNode)[0].parentNode)[0].children)[1]);
        debugPrint(inner);
        inner.html('<a href="/private.php?action=read&pmid='+messageID+'">'+inner.html()+'</a>');
        //inner.wrap('<a href="/private.php?action=read&pmid='+messageID+'"></a>');
        //$($($($($(this)[0].parentNode)[0].parentNode)[0].children)[0].children).prepend('<a href="/private.php?action=read&pmid='+messageID+'">');
        //$($($($($(this)[0].parentNode)[0].parentNode)[0].children)[0].children).append('</a>');
    });
    
    /*//try{
        docSplit = document.body.innerHTML.split('\n');
        for(i=0;i<docSplit.length;i++){
            if(docSplit[i].indexOf("start: private_tracking") != -1){
                messageLine = docSplit[i+3].split(">")[1].split("<")[0];
                messageID = (parseInt(docSplit[i+6].split("readcheck[")[1].split("]")[0])+1).toString();
                messageLine = '<td class="trow2"><a href="/private.php?action=read&pmid='+messageID+'">'+messageLine+'</a></td>';
                docSplit[i+3] = messageLine;
            }
        }
        document.body.innerHTML = docSplit.join('\n');
    //}catch(err){debugPrint("Error attempting to add Msg Tracking links");}*/
}

function addLastLinks(){
    var docSplit, i, lastURL, prevLine, flag;
    docSplit = document.getElementById("content").innerHTML.split('\n');
    flag = false;
    for(i=0; i<docSplit.length; i++){
        if((docSplit[i].indexOf('<img src="http://x.hackforums.net/images') != -1 || docSplit[i].indexOf('http://www.hackforums.net:8080/images') != -1) && flag == false){
            prevLine = i;
            flag = true;
        }
        if(docSplit[i].indexOf("showthread.php") != -1 && docSplit[i].indexOf("pid=") == -1 && flag == true){
            try{
                lastURL = '<a href="'+docSplit[i].split('="')[1].split('">')[0]+'&action=lastpost"><img';
                docSplit[prevLine] = docSplit[prevLine].replace('<img',lastURL).replace('</td','</a></td');
                flag = false;
            }catch(err){
            }
            
        }
    }
    document.getElementById("content").innerHTML = docSplit.join("\n");
}

function groupMemberGen(leaders, members, groupName, method){
    var finalBB = [], i, delim = '|!@|';
    if(method == 'standard'){
        // Standard, for creating generic lists
        finalBB.push('[size=x-large][b]'+groupName+' Member List[/b][/size]');
        finalBB.push('[b]Leaders:[/b]');
        finalBB.push('[list]');
        for(i=0; i<leaders.length; i++){
            finalBB.push('[*] [url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[/list]');
        
        finalBB.push('[b]Members:[/b]');
        finalBB.push('[list]');
        for(i=0; i<members.length; i++){
            finalBB.push('[*] [url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[/list]');
        finalBB = finalBB.join('\n');
    }else if(method == 'standardnolink'){
        // Standard, without BB list
        finalBB.push('[size=x-large][b]'+groupName+' Member List[/b][/size]');
        finalBB.push('[b]Leaders:[/b]');
        for(i=0; i<leaders.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[b]Members:[/b]');
        for(i=0; i<members.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB = finalBB.join('\n');
    }else if(method == 'nolistnolink'){
        // No list, for use with PM's, no links
        for(i=0; i<leaders.length; i++){
            finalBB.push(leaders[i].split(delim)[1]);
        }
        for(i=0; i<members.length; i++){
            finalBB.push(members[i].split(delim)[1]);
        }
        finalBB = finalBB.join(', ');
    }else if(method == 'nolistwithlink'){
        // No list, with links
        for(i=0; i<leaders.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        for(i=0; i<members.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB = finalBB.join(', ');
    }else{
        finalBB = '';
    }
    return finalBB;
}

function listMembers(){
    var trowls, i, members = [], leaders = [], groupName, uid, delim = '|!@|', nameList, textboxHTML, tableHTML, docSplit;
    trowls = document.getElementsByClassName("tborder")[0].innerHTML.split("\n");
    for(i=0; i<trowls.length; i++){
        if(trowls[i].indexOf('action=profile') != -1){
            uid = trowls[i].split('uid=')[1].split('">')[0]+delim;
            if(trowls[i].indexOf('</a> (Leader)') != -1){
                leaders.push(uid+trimString(trowls[i].replace(/<(?:.|\n)*?>/gm, '').replace(' (Leader)','')));
                //alert(trowls[i]+" is a leader");
            }else{
                members.push(uid+trimString(trowls[i].replace(/<(?:.|\n)*?>/gm, '')));
                //alert(trowls[i]+" is a member");
            }
        }
    }
    groupName = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL).split('[b]')[1].split('[/b]')[0];
    groupName = groupName.replace(" Group Management", '');
    nameList = groupMemberGen(leaders, members, groupName, GM_config.get('groupLeaderUserList', 'standard'));
    textboxHTML = '<textarea rows="5" cols=100%>'+nameList+'</textarea>';
    tableHTML = '<table border="0" cellspacing="1" cellpadding="4" class="tborder" id="HFESlist"><tbody><tr><td class="thead" colspan="6"><strong>[HFES] Easy Member List</strong></td></tr><tr><td class="trow1">Userlist:      </td><td class="trow1">'+textboxHTML+'</td></tr></tbody></table><br><br>';

    docSplit = document.getElementById('content').innerHTML.split('\n');
    for(i=0; i< docSplit.length; i++){
        if(docSplit[i].indexOf('end: managegroup_leaders ') != -1){
            docSplit[i] = docSplit[i]+tableHTML;
            document.getElementById('content').innerHTML = docSplit.join('\n');
            return;
        }
    }
}


function prettyPMDisplay(finalArray){
    var tempHTML, bubbleList = [], i, user;
    user = getUser();
    bubbleList.push('<table class="fixed" border="0" width=95% align="center" cellpadding="3">');
    bubbleList.push('<col width=50%>');
    bubbleList.push('<col width=50%>');
    for(i=0; i<finalArray.length; i++){
        bubbleList.push('<tr>');
        if(finalArray[i][0] == user){
            if(finalArray[i][1] == 1){
                bubbleList.push('<td></td><td><div class="pm_right_unread" width="45%" align="right"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td>');
            }else{
                bubbleList.push('<td></td><td><div class="pm_right_read" width="45%" align="right"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td>');
            }
        }else{
            if(finalArray[i][1] == 1){
                bubbleList.push('<td><div class="pm_left_unread" width=45%><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td><td></td>');
            }else{
                bubbleList.push('<td><div class="pm_left_read" width="45%"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td><td></td>');
            }
        }
        bubbleList.push('</tr>');
    }
    
    document.getElementById('pid_').innerHTML = bubbleList.join('');
}

function parsePMPretty(){
    var tempArray = [], originalAuthor, authorList = [], i, docSplit, newAuthor, finalArray = [], tempvar, quoteLink;
    docSplit = document.getElementsByClassName("post_body")[0].innerHTML;
    docSplit = trimString(docSplit);
    docSplit = replaceAll(docSplit, ">", ">\n");
    docSplit = replaceAll(docSplit, "</blockquote>", "\n</blockquote>");
    docSplit = docSplit.split('\n');

    //debugPrint(docSplit);
    
    originalAuthor = getThreadOP(document.getElementsByClassName("post_author")[0].innerHTML).split(']')[1].split('[')[0];
    tempArray[tempArray.length] = [originalAuthor, 1, []];
    authorList.push(originalAuthor);
    //debugPrint("Current status of temparray: "+tempArray);
    
    for(i=0; i<docSplit.length; i++){
        if(docSplit[i].indexOf("Wrote:</cite>") != -1 && docSplit[i-1].indexOf("<cite>") != -1){
            newAuthor = docSplit[i].split(" Wrote:")[0];
            if(tempArray.length == 1 && tempArray[0][2].length > 0){
                tempvar = tempArray.pop();
                finalArray.push(tempvar);
                tempArray.push([originalAuthor, 1, []]);
            }
            tempArray.push([newAuthor, 0, []]);
            authorList.push(newAuthor);
        }else if(docSplit[i].indexOf("Quote:</cite>") != -1 && docSplit[i-1].indexOf("<cite>") != -1){
            newAuthor = 'Unattributed Quote';
            if(tempArray.length == 1 && tempArray[0][2].length > 0){
                tempvar = tempArray.pop();
                finalArray.push(tempvar);
                tempArray.push([originalAuthor, 1, []]);
            }
            tempArray.push([newAuthor, 0, []]);
            authorList.push(newAuthor);
        }else if(docSplit[i].indexOf('hr style="width: 20%;background: #000') != -1){
            tempvar = tempArray.pop();
            finalArray.push(tempvar);
            return finalArray;
        }else if(docSplit[i].indexOf("Wrote:") != -1){
            if(docSplit.length >= 2){
                if(docSplit[i-2].indexOf('span') != -1){
                    newAuthor = docSplit[i].split(' Wrote:')[0];
                    quoteLink = '/'+docSplit[i].split('="')[1].split('" ')[0].split('/')[3];
                    if(tempArray.length == 1 && tempArray[0][2].length > 0){
                        tempvar = tempArray.pop();
                        finalArray.push(tempvar);
                        tempArray.push([originalAuthor, 1, []]);
                        tempArray.push([newAuthor, 1, ['<small><i>Quoted post from <a href="'+quoteLink+'">here</a></i></small>']]);
                    }else{
                        tempArray.push([newAuthor, 0, ['<small><i>Quoted post from <a href="'+quoteLink+'">here</a></i></small>']]);
                    }
                    authorList.push(newAuthor);
                }else{
                    tempArray[tempArray.length-1][2].push(docSplit[i]);
                }
            }else{
                tempArray[tempArray.length-1][2].push(docSplit[i]);
            }
        }else if(docSplit[i].indexOf("</blockquote>") != -1){
            tempvar = tempArray.pop();
            authorList.pop();
            finalArray.push(tempvar);
        }else if(docSplit[i] != "" && docSplit[i].indexOf("<blockquote>") != 0 && docSplit[i].indexOf("<cite>") != 0 && docSplit[i].indexOf("<br>") != 0){
            if(i >= 1){
                if(docSplit[i-1].indexOf("<span") != 0 || docSplit[i-1].indexOf('style=') != -1){
                    tempArray[tempArray.length-1][2].push(docSplit[i]);
                }
            }else{
                tempArray[tempArray.length-1][2].push(docSplit[i]);
            }
        }
    }
    tempvar = tempArray.pop();
    finalArray.push(tempvar);
    return finalArray;
}

function prettyPM(){
    var finalArray;
    finalArray = parsePMPretty();
    //debugPrint(finalArray);
    prettyPMDisplay(finalArray);
}

function asc2hex(astring){
    var bstring, i,charcode;
    bstring = '';
    for(i=0; i<astring.length; i++) {
        charcode = astring.charCodeAt(i);
        if(charcode >= 32 && charcode <= 126){
            bstring += '%'+astring.charCodeAt(i).toString(16);
        }
    }
    return bstring;
}

function addPostPM(){
    var postData, i, pid, tid, message, holder, j, threadtitle, postcounter;
    postcounter = 0;
    postData = $('.tborder');
    tid = document.URL.split('tid=')[1].split('&')[0];
    for(i=1; i<postData.length; i++){
        if(postData[i].innerHTML.indexOf('id="post_') != -1 && postData[i].innerHTML.indexOf('href="private.php?action=send') != -1){
            pid = postData[i].innerHTML.split('id="post_meta_')[1].split('">')[0];
            message = '&subject=Re%3A%20Your%20Post&message=[align%3Dright][size%3Dx-small][i][This%20PM%20is%20in%20regards%20to%20[url=http://www.hackforums.net/showthread.php?tid%3D'+tid+'%26pid%3D'+pid+'%23pid'+pid+']a%20post%20you%20made[/url]][/i][/size][/align]';
            $('.author_buttons a:contains("PM")')[postcounter].href += message;
            postcounter += 1;
        }
    }
    
}

function getProfileName(){
    var namecolorString, usernameColor, usernameClass, username, profileGenerator, profileStatsHTML;
    if($(".largetext strong span").length == 3){
        namecolorString = $($(".largetext strong span")[0]);
    }else if($(".largetext strong span").length == 4){
        namecolorString = $($(".largetext strong span")[1]);
    }
    username = namecolorString.html();
    usernameClass = namecolorString.attr('class');
    if(!usernameClass){
        usernameColor = '#383838'; // Closed Accounts
    }else if(usernameClass=="group4"){
        usernameColor = '#FF66FF'; // Admins
    }else if(usernameClass == "group3"){
        usernameColor = '#9999FF';  // Staff
    }else if(usernameClass == "group9"){
        usernameColor = '#99FF00'; // L33T
    }else if(usernameClass == "group29"){
        usernameColor = '#00AAFF';  // Ub3r
    }else if(usernameClass == "group7"){
        usernameColor = 'black'; // Banned
    }else{
        usernameColor = '#EFEFEF';
    }
    profileGenerator = '[url='+document.URL+']';
    if(usernameColor != ''){
        profileGenerator = profileGenerator+'[color='+usernameColor+'][b]'+username+'[/b][/color][/url]';
    }else{
        profileGenerator = profileGenerator+'[b]'+username+'[/b][/url]';
    }
    window.prompt("Press Ctrl+C to copy profile citation!",profileGenerator);
}

function threadTagger(){
    var i, authorPosts, apHolder, tagNameHolder, tagNameKeys, uid, uidpos;
    authorPosts = document.getElementsByClassName('post_author');
    tagNameHolder = GM_SuperValue.get('usertags');
    tagNameKeys = Object.keys(tagNameHolder);
    
    for(i=0; i<authorPosts.length; i++){
        if(authorPosts[i].innerHTML.indexOf('uid=') != -1){
            uid = authorPosts[i].innerHTML.split('uid=')[1].split('">')[0];
            uidpos = tagNameKeys.indexOf(uid);
            if(uidpos != -1){
                if(tagNameHolder[uid] != ''){
                    apHolder = authorPosts[i].innerHTML.split('\n');
                    apHolder[3] = apHolder[3].replace('<br>','</span><span class="tag_bubble" >'+tagNameHolder[uid]+'</span><br>');
                    document.getElementsByClassName('post_author')[i].innerHTML = apHolder.join('\n');
                }
            }
        }
    }
}

function profileTagger(){
    var tag, uid, tagNameHolder;
    uid = document.URL.split('uid=')[1];
    tagNameHolder = GM_SuperValue.get('usertags');
    if(Object.keys(tagNameHolder).indexOf(uid) != -1 && tagNameHolder[uid] != ''){
        tag = tagNameHolder[uid];
    }else{
        tag = '<small><small><i>Click to add tag</i></small></small>'; // HOLDER
    }
    $($('.largetext strong span')[0].parentNode).append('&nbsp<span class="tag_bubble" style="font-style:normal;" id="profileTag"><small>'+tag+'</small></span>');
    $("#profileTag").live("click", function(){ tagEditor(); });
}

function tagEditor(){
    var newTag, tagNameHolder, uid;
    uid = document.URL.split('uid=')[1];
    tagNameHolder = GM_SuperValue.get('usertags');
    if(Object.keys(tagNameHolder).indexOf(uid) != -1){
        newTag = tagNameHolder[uid];
    }else{
        newTag = '';
    }
    newTag = prompt('Enter tag for user: ',newTag);
    if(newTag == null){
        return;
    }
    if(newTag != ''){
        tagNameHolder[uid] = newTag;
        GM_SuperValue.set('usertags', tagNameHolder);
    }
    if(newTag == '' || newTag == null || !newTag){
        tagNameHolder[uid] = '';
        GM_SuperValue.set('usertags', tagNameHolder);
    }
}

function repsgivenFix(){
    var index, holder, i;
    holder = document.getElementsByClassName("tfoot");  //($('.tfoot')[0].html().replace('reputation.php','repsgiven.php'));
    for(i=0; i<holder.length; i++){
        if(holder[i].innerHTML.indexOf('reputation.php') != -1){
            holder[i].innerHTML = holder[i].innerHTML.replace('reputation.php','repsgiven.php');
        }
    }
    
    holder = document.getElementsByClassName('trow1')[0].getElementsByTagName('a');
    for(i=0; i<holder.length; i++){
        holder[i].href = holder[i].href.replace('reputation','repsgiven');
    }
}
/**
 * Parse out the page title
 * @param {jQuery} pageObject - The object containing the page to parse
 * @return {Object} Returns an object with the page tile and url.
 */
var getPageTitle = function($pageObject) {
    var pageTitle = $pageObject.find('.navigation .active').text();
    try {
    	var url = $pageObject[0].URL;
    } catch(e) {
        var url = null;
    }
    
    return {"title": pageTitle, "url": url};
};

////////// Forum Favorites

/**
 * Add link to favorite forums on the forum page itself.
 */
var linkAddFavorite = function() {
    debugPrint("Adding Favorite Link", 1);
    var favList = GM_SuperValue.get('favList');
	var currFid = document.URL.split('fid=')[1].split('&')[0];
    var linkText = (currFid in favList ? "Unfavorite" : "Favorite") + " this forum";
    var adderHTML = "<a href='javascript:void(0);' id='add-fav' style='float:right; color:#888888'>"+linkText+"</a>";
    $('.navigation').append(adderHTML);
    $('#add-fav').on('click', function(event) {
        addRemoveFavoriteCallback(currFid);
    });
};

var addRemoveFavoriteCallback = function(fid) {
    debugPrint("Adding/Removing Favorite Link", 1);
    
    var favList = GM_SuperValue.get('favList');
    
    if (fid in favList) {
        delete favList[fid];
    } else {
        favList[fid] = getPageTitle($(document))['title'];
    }
    
    var linkText = (fid in favList ? "Unfavorite" : "Favorite") + " this forum";

    $('#add-fav').text(linkText);
    GM_SuperValue.set('favList', favList);
};

/**
 * List the favorite forums in the left column.
 */
var listFavorites = function(favList) {
    for (var fid in favList) {
        var forumURL = "/forumdisplay.php?fid=" + fid;
        var entryHTML = "<tr class='trow1 smalltext' data-fid='" + fid + "'><td><a href='" + forumURL + "'>" + favList[fid] + 
            "</a> <a href class='remove-fav' data-fid='" + fid + "'>(x)</a></td></tr>";
        $('#favorite-forums').append(entryHTML);
    }
    $('#favorite-forums').live('click', '.remove-fav', removeFavoriteFromFavs);
    $('#read-forums').live('click', readAllFavForums);
    //$('.remove-fav').on('click', removeFavoriteFromFavs);
};

/**
 * Callback to remove all fid entries from the favorites page as well as remove the forum from the favorites list.
 * @param {Event} event - Event param passed along to function by jQuery.
 */
var removeFavoriteFromFavs = function(event) {
    event.preventDefault();
    
    var byeFid = $(event.target).data('fid');
    $('tr[data-fid="'+byeFid+'"]').remove();
    var currFavList = GM_SuperValue.get('favList');
    delete currFavList[byeFid];
    GM_SuperValue.set('favList', currFavList);
};

/**
 * Mark all threads in all favorited forums as read.
 */

var readAllFavForums = function(event) {
    event.preventDefault();
    var favList = GM_SuperValue.get('favList');
    for (fid in favList) {
        debugPrint(fid);
        $.get("/misc.php?action=markread&fid="+fid+"&my_post_key="+postKey);
    }
};

/**
 * Replace current HTML with the Forum Favorites HTML, then initiate populating the list of threads.
 */
var initializeFavorites = function() {
    var that = this
    var favoritesURL = urlBase + "HFESpages/HFESfavorites.html";
    var postKey = "";
    
    // Get your post key.
    $.ajax({
		type: 'GET',
		url: 'forumdisplay.php?fid=2',
		success: function(response) {
			that.postKey = response.split('my_post_key = "')[1].split('";')[0];
		}
	});
    
    // Relying on GreaseMonkey's API to bypass the same origin policy boundaries. Impossible with standard ajax requests in a sandboxed userscript.
    GM_xmlhttpRequest({ 
        url: favoritesURL,
        method: "GET",
        onload: function(response) {
            document.title = "Hack Forums - Favorites";
            document.head.innerHTML += '<link type="text/css" rel="stylesheet" href="http://www.hackforums.net/cache/themes/theme5/global.css">'
            document.body.innerHTML = response.responseText;
            // Since now the DOM should be ready, let's run the rest of HFES's mods.
            start();
            
            $('#readforums').on('click', readAllFavForums);
            
            // Start populating favorites list.
            var favList = GM_SuperValue.get('favList');
            listFavorites(favList);
            
            for (var fid in favList) {
                getForumThreadsUnread(fid);
            }
        },
        onerror: function(response) {
            debugPrint("Error attempting to retreive data from " + favoritesURL);
        }
    });
};

/**
 * Grab all unread threads from a specific subforum. Passes list onto stripper.
 * @param {Number} fid - A valid forum ID.
 */
var getForumThreadsUnread = function(fid) {
    debugPrint("Favorites - Starting journey for fid="+fid);
    var fid = fid;
    $.get("/forumdisplay.php?fid=" + fid, function(response){
        var $allThreadIconsNew = $(response).find("table").last().find("img[src*='new']");
        var $panel = $(response).find('#panel');
        if($('#panel').html().indexOf('header_welcomeblock_member')  === -1) {
        	$('#panel').html($panel.html());
        }
        
        var $allUnreadThreadRows = $allThreadIconsNew.parent().parent();
        var pageTitle = getPageTitle($(response));
        stripAddThreadInfo($allUnreadThreadRows, pageTitle["title"], fid);
    });
};

/**
 * We don't want every part of the row, we also want to add some things. Let's do it here.
 * @param {jQuery} $threadRows - List of unread threads
 * @param {String} forumName - Name of the section the threads are from.
 * @param {String} fid - Forum ID
 */
var stripAddThreadInfo = function($threadRows, forumName, fid) {
    debugPrint("Favorites - Removing thread ratings and adding Forum name");
    var forumURL = "/forumdisplay.php?fid="+fid;
    $threadRows.each(function(aRow) {
        $($threadRows[aRow]).find("td[id^='rating_table']").remove(); // Remove thread ratings.
        $($threadRows[aRow]).children().eq(2).before("<td class='trow1 forumdisplay_regular'><a href='" + forumURL + "'>" + forumName + "</a></td>"); // Add forum name
        
        $($threadRows[aRow]).attr("data-fid", fid); // Add the forum id to the table row for easy row removal

    });
    renderFavoriteThreads($threadRows);
};

/**
 * Finally render the found threads to the favorites page!
 * @param {jQuery} $unreadThreads - List of unread threads.
 */
var renderFavoriteThreads = function($unreadThreads) {
    debugPrint("Favorites - Rendering unread threads to the page.");
    $('#favorite-unread-threads').append($unreadThreads);
    addLastLinks();
};

//////////


function addQuoteToMulti(buttonId){
    var tid, pid, multiData, multiDataKeys, newText, multilength;
    tid = buttonId.split('_')[2];
    pid = buttonId.split('_')[3];
    multiData = localStorage.getItem('hfes_multi_'+tid);
    
    if(!multiData){
        localStorage.setItem('hfes_multi_'+tid, JSON.stringify({'':''}));
    }
    multiData = localStorage.getItem('hfes_multi_'+tid);
    
    multiData = JSON.parse(multiData);
    multiDataKeys = Object.keys(multiData);
    multilength = multiDataKeys.length-1;
    
    if($('#'+buttonId)[0].innerHTML.indexOf('+') != -1){
        $('#'+buttonId).html('<img src="http://sublyme.net/site_media/images/loading.gif"></img> Multiquote');
        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://hackforums.net/newreply.php?tid='+tid+'&replyto='+pid,
            onload: function(response){
                try{
                    var tid, newmulti, pid;
                    tid = response.finalUrl.split('tid=')[1].split('&')[0];
                    pid = response.finalUrl.split('replyto=')[1];
                    newmulti = JSON.parse(localStorage.getItem('hfes_multi_'+tid));
                    newmulti[pid] = $($.parseHTML(response.responseText)).find('#message')[0].innerHTML;
                    localStorage.setItem('hfes_multi_'+tid, JSON.stringify(newmulti));
                    $('#hfes_multi_'+tid+'_'+pid).html('- Multiquote');
                }catch(err){debugPrint('[HFES] Err attempting to get multiquote info: '+err.message);}
            },
        });
        multilength += 1;
    }else if($('#'+buttonId)[0].innerHTML.indexOf('-') != -1){
        $('#'+buttonId).html('<img src="http://sublyme.net/site_media/images/loading.gif"></img> Multiquote');
        delete multiData[pid];
        localStorage.setItem('hfes_multi_'+tid, JSON.stringify(multiData));
        $('#'+buttonId).html('+ Multiquote');
        multilength -= 1;
    }else{
        debugPrint('[HFES] Error trying to add multiquote');
        return;
    }
    newText = 'Clear Multiquotes ('+multilength+')';
    $('#clearMulti').html(newText);
    $('#clearMulti2').html(newText);
    $('#quickMulti').html('Insert Multiquotes ('+multilength+')');
}

function addMultiQuoteButtons(){
    var postData, tid, i, pid, id, button, multiData, multiDataKeys, multilength;
    if(typeof(Storage)!="undefined"){
        if($('a[title*="Thread Closed"]').length > 0){
            return;
        }
        postData = $('#posts .tborder');
        tid = document.URL.split('tid=')[1].split('&')[0];
        multiData = localStorage.getItem('hfes_multi_'+tid);
        
        if(!multiData){
            localStorage.setItem('hfes_multi_'+tid, JSON.stringify({'':''}));
        }
        multiData = localStorage.getItem('hfes_multi_'+tid);
        multiData = JSON.parse(multiData);
        multiDataKeys = Object.keys(multiData);
        
        for(i=0; i<postData.length; i++){
            if(postData[i].outerHTML.indexOf('id="post_meta_') != -1){                
                pid = postData[i].outerHTML.split('id="post_meta_')[1].split('">')[0];
                id = 'hfes_multi_'+tid+'_'+pid;
                if(multiDataKeys.indexOf(pid) == -1){
                    button = '<a href="javascript:void(0);" class="bitButton" id="'+id+'" title="[HFES] Multiquoting" style="margin-right:5px">+ Multiquote</a>';
                }else{
                    button = '<a href="javascript:void(0);" class="bitButton" id="'+id+'" title="[HFES] Multiquoting" style="margin-right:5px">- Multiquote</a>';
                }
                
                //$('.post_management_buttons')[i-1].innerHTML = button + $('.post_management_buttons')[i-1].innerHTML;
                $($('.post_management_buttons')[i]).prepend(button);
                id = '#'+id;
                $(id).live("click", function(event){addQuoteToMulti(event.target.id);}); 
            }
        }
        multilength = multiDataKeys.length -1;
        $($('.float_right:contains("New Reply")')[0]).html('<a href="javascript:void(0);" class="bitButton" id="clearMulti">Clear Multiquotes ('+multilength+')</a>' + $($('.float_right:contains("New Reply")')[0]).html());
        $($('.float_right:contains("New Reply")')[1]).html('<a href="javascript:void(0);" class="bitButton" id="clearMulti2">Clear Multiquotes ('+multilength+')</a>' + $($('.float_right:contains("New Reply")')[1]).html());
        $($('#quickreply_e .trow1')[0]).html($($('#quickreply_e .trow1')[0]).html() + '<br><br><a href="javascript:void(0);" class="bitButton" id="quickMulti">Insert Multiquotes ('+multilength+')</a>');
        $('#clearMulti').live("click", function(){ clearMultis();});
        $('#clearMulti2').live("click", function(){ clearMultis();});
        $('#quickMulti').live("click", function(){ addMultiToQuickReply();});
        
        
    }else{
        alert('This browser does not support local storage and cannot use HFES multiquoting');
        GM_config.set('multiquote', false);
    }
}

function clearMultis(){
    var tid, multiData, multiDataKeys, i;
    tid = document.URL.split('tid=')[1].split('&')[0];
    multiData = localStorage.getItem('hfes_multi_'+tid);
    multiData = JSON.parse(multiData);
    multiDataKeys = Object.keys(multiData);
    
    for(i=0; i<multiDataKeys.length; i++){
        $('#hfes_multi_'+tid+'_'+multiDataKeys[i]).text('+ Multiquote');
        //debugPrint(multiData[multiDataKeys[i]]);
        multiData[multiDataKeys[i]] = multiData[multiDataKeys[i]].replace('-','+');
    }
    
    $('#clearMulti').html('Clear Multiquotes (0)');
    $('#clearMulti2').html('Clear Multiquotes (0)');
    $('#quickMulti').html('Insert Multiquotes (0)');
    localStorage.setItem('hfes_multi_'+tid, JSON.stringify({'':''}));
}

function addMultiToQuickReply(){
    var tid, multiData, multiDataKeys, quotes = [], i, tempquote, quotestring;
    tid = document.URL.split('tid=')[1].split('&')[0];
    multiData = localStorage.getItem('hfes_multi_'+tid);
    
    if(!multiData){
        return;
    }
    
    multiData = JSON.parse(multiData);
    multiDataKeys = Object.keys(multiData);
    
    if(multiDataKeys.length < 2){
        return;
    }
    
    for(i=0; i<multiDataKeys.length; i++){
        tempquote = multiData[multiDataKeys[i]];
        quotes.push(tempquote);
    }
    quotestring = quotes.join('\n');
    $('#message').html(quotestring);
    clearMultis();
}


function addMultiToReply(){
    var tid, multiData, multiDataKeys, quotes = [], i, tempquote, quotestring;
    tid = document.URL.split('tid=')[1].split('&')[0];
    multiData = localStorage.getItem('hfes_multi_'+tid);
    
    if(!multiData){
        return;
    }
    
    multiData = JSON.parse(multiData);
    multiDataKeys = Object.keys(multiData);
    
    if(multiDataKeys.length < 2){
        return;
    }
    
    for(i=0; i<multiDataKeys.length; i++){
        tempquote = multiData[multiDataKeys[i]];
        quotes.push(tempquote);
    }
    quotestring = quotes.join('\n');
    $('textarea').html(quotestring);
    localStorage.removeItem('hfes_multi_'+tid);
}

function threadPreviewForum(){
    var results = [], i, j;
    for(i=0; i<$('.author').length; i++){
        var reshold, url, tid, previewDict = {};
        reshold = $($($('.author')[i].parentNode.children)[0].children);
        
        if(reshold.filter('.subject_old').length > 0){
            url = reshold.filter('.subject_old')[0].href;
            tid = url.split("tid=")[1].split("&")[0];
        }else if(reshold.filter('.subject_new').length > 0){
            url = reshold.filter('.subject_new')[0].href;
            tid = url.split("tid=")[1].split("&")[0];
        }else{
            url = "";
            tid = "0";
        }
        
        $($($('.author')[i].parentNode.children)[0]).append("&nbsp;<a href='javascript:void(0);' id='preview_"+tid+"' title='Preview Thread'>+</a>");
        $('#preview_'+tid).live("click",function(res){previewThreadsForum(res);});
    }
}

function previewThreadsForum(result){
    var tid, res;
    tid = result.target.id.split("_")[1];
    //debugPrint(tid);
    
    if($('#preview_'+tid+'_fin').length <= 0){
        $('#preview_'+tid)[0].innerHTML = "<img src='http://sublyme.net/site_media/images/loading.gif'></img>";

        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://www.hackforums.net/showthread.php?tid='+tid,
            
            onload: function(response){
                var postData, previd, turkey, chicken;
                previd = "preview_"+response.finalUrl.split('tid=')[1];
                postData = $($($($(response.responseText).filter("#container")[0].children).filter("#content")[0].children).filter(".quick_keys")[0].children).filter("#posts")[0].children[1].children[0].children[2].children[0];
                $("#"+previd)[0].innerHTML = "-";
                turkey = $($($($("#"+previd)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode;
                chicken = turkey.outerHTML+"<td colspan='7' id='"+previd+"_fin' class='trow1'>"+$(postData).html()+"</td>";
                turkey.outerHTML = chicken;
            }
        });
    }else{
        if($('#preview_'+tid)[0].innerHTML == '-'){
            $('#preview_'+tid+'_fin').fadeOut();
            $('#preview_'+tid)[0].innerHTML = '+';
        }else if($('#preview_'+tid)[0].innerHTML == '+'){
            $('#preview_'+tid+'_fin').fadeIn();
            $('#preview_'+tid)[0].innerHTML = '-';
        }else{
            return;
        }
    }
}
    
function addSmileyLink(){
    $($('#clickable_smilies')[0].children).append('<tr><td style="text-align: center" colspan="3"><a href="javascript:void(0);" id="smileyPop">View All</a></td></tr>');
    $("#smileyPop").live("click", function(){window.open('/misc.php?action=smilies&hfes=true','Smiley List','width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')});
}

function addQuickSmileyLink(){
    $($('#quickreply_e tr .trow1')[0]).append('<br \><a href="javascript:void(0);" id="smileyPop">View Emoticons</a>');
    $("#smileyPop").live("click", function(){window.open('/misc.php?action=smilies&hfes=true','Smiley List','width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')});

}

function fixSmileyPage(){
    var smileyList = [
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/rofl.gif"></td><td class="trow1">Rofl</td><td class="trow1">:rofl:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/nerd.gif"></td><td class="trow1">Nerd</td><td class="trow1">:nerd:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/heart.gif"></td><td class="trow1">Heart</td><td class="trow1">:heart:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/devil.gif"></td><td class="trow1">Devil</td><td class="trow1">:devil:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/party.gif"></td><td class="trow1">Party</td><td class="trow1">:party:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/kookoo.gif"></td><td class="trow1">KooKoo</td><td class="trow1">:kookoo:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/doh.gif"></td><td class="trow1">D\'oh</td><td class="trow1">:doh:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/yawn.gif"></td><td class="trow1">Yawn</td><td class="trow1">:yawn:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/orly.gif"></td><td class="trow1">Oh Really?</td><td class="trow1">:orly:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/moo.gif"></td><td class="trow1">Cow</td><td class="trow1">:moo:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/chicken.gif"></td><td class="trow1">Chicken</td><td class="trow1">:chicken:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/oink.gif"></td><td class="trow1">Pig</td><td class="trow1">:oink:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/dog.gif"></td><td class="trow1">Dog</td><td class="trow1">:puppy:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/monkey.gif"></td><td class="trow1">Monkey</td><td class="trow1">:monkey:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/buzz.gif"></td><td class="trow1">Bee</td><td class="trow1">:buzz:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/nonono.gif"></td><td class="trow1">No No No!</td><td class="trow1">:nonono:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/pray.gif"></td><td class="trow1">Pray</td><td class="trow1">:pray:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/alien.gif"></td><td class="trow1">Alien</td><td class="trow1">:alien:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/yinyang.gif"></td><td class="trow1">Yin Yang</td><td class="trow1">:yinyang:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/bigmoney.gif"></td><td class="trow1">Big Money</td><td class="trow1">:bigmoney:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/omni.png"></td><td class="trow1">Omni</td><td class="trow1">:omni:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/beard.png"></td><td class="trow1">One Sexy Beard</td><td class="trow1">:beard:</td></tr>',
    '<tr><td class="trow1" align="center"><img src="http://sublyme.net/site_media/images/smileys/beard.png"></td><td class="trow1">One Sexy Beard</td><td class="trow1">:beard:</td></tr>',
    '<tr><td class="trow1" align="center"><b>ಠ_ಠ<b></td><td class="trow1">Look of Disapproval</td><td class="trow1">:disapprove:</td></tr>'
    ].join('');
    
    $($('#content .tborder tbody')[0]).append(smileyList);
    if(document.URL.indexOf('hfes=true') != -1){
        $('body').html($('#content .tborder')[0]);
    }
}
    
function postAddSmiley(){
    var i, posts;
    var allSmileys = {
        ":pinch:":"<img src='http://x.hackforums.net/images/smilies/pinch.gif'>",
        ":victoire:":"<img src='http://x.hackforums.net/images/smilies/victoire.gif'>",
        ":hehe:":"<img src='http://x.hackforums.net/images/smilies/hehe.gif'>",
        ":oui:":"<img src='http://x.hackforums.net/images/smilies/oui.gif'>",
        ":bebe-pleure:":"<img src='http://x.hackforums.net/images/smilies/bebe-pleure.gif'>",
        ":ohmy:":"<img src='http://x.hackforums.net/images/smilies/ohmy.gif'>",
        ":blink:":"<img src='http://x.hackforums.net/images/smilies/blink.gif'>",
        ":superman:":"<img src='http://x.hackforums.net/images/smilies/superman.gif'>",
        ":nono:":"<img src='http://x.hackforums.net/images/smilies/nono.gif'>",
        ":biggrin:":"<img src='http://x.hackforums.net/images/smilies/biggrin.gif'>",
        ":sad:":"<img src='http://x.hackforums.net/images/smilies/sad.gif'>",
        ":unsure:":"<img src='http://x.hackforums.net/images/smilies/unsure.gif'>",
        ":glare:":"<img src='http://x.hackforums.net/images/smilieslare.gif'>",
        ":roflmao:":"<img src='http://x.hackforums.net/images/smilies/roflmao.gif'>",
        ":devlish:":"<img src='http://x.hackforums.net/images/smilies/devlish.gif'>",
        ":rolleyes:":"<img src='http://x.hackforums.net/images/smilies/rolleyes.gif'>",
        ":cool:":"<img src='http://x.hackforums.net/images/smilies/cool.gif'>",
        ":gratte:":"<img src='http://x.hackforums.net/images/smiliesratte.gif'>",
        ":confused:":"<img src='http://x.hackforums.net/images/smilies/confused.gif'>",
        ":blackhat:":"<img src='http://x.hackforums.net/images/smilies/blackhat.gif'>",
        ":ninja:":"<img src='http://x.hackforums.net/images/smilies/ninja.gif'>",
        ":blush:":"<img src='http://x.hackforums.net/images/smilies/blush.gif'>",
        ":lipssealed:":"<img src='http://x.hackforums.net/images/smilies/lipssealed.gif'>",
        ":yeye:":"<img src='http://x.hackforums.net/images/smilies/yeye.gif'>",
        ":non:":"<img src='http://x.hackforums.net/images/smilies/non.gif'>",
        ":smile:":"<img src='http://x.hackforums.net/images/smilies/smile.gif'>",
        ":whistle:":"<img src='http://x.hackforums.net/images/smilies/whistle.gif'>",
        ":sleep:":"<img src='http://x.hackforums.net/images/smilies/sleep.gif'>",
        ":evilgrin:":"<img src='http://x.hackforums.net/images/smilies/evilgrin.gif'>",
        ":omg:":"<img src='http://x.hackforums.net/images/smilies/omg.gif'>",
        ":tongue:":"<img src='http://x.hackforums.net/images/smilies/tongue.gif'>",
        ":mad:":"<img src='http://x.hackforums.net/images/smilies/mad.gif'>",
        ":huh:":"<img src='http://x.hackforums.net/images/smilies/huh.gif'>",
        ":thumbsup:":"<img src='http://x.hackforums.net/images/smilies/thumbsup.gif'>",
        ":wacko:":"<img src='http://x.hackforums.net/images/smilies/wacko.gif'>",
        ":pirate:":"<img src='http://x.hackforums.net/images/smilies/pirate.gif'>",
        
        ":rofl:":"<img src='http://sublyme.net/site_media/images/smileys/rofl.gif'>",
        ":nerd:":"<img src='http://sublyme.net/site_media/images/smileys/nerd.gif'>",
        ":heart:":"<img src='http://sublyme.net/site_media/images/smileys/heart.gif'>",
        ":devil:":"<img src='http://sublyme.net/site_media/images/smileys/devil.gif'>",
        ":party:":"<img src='http://sublyme.net/site_media/images/smileys/party.gif'>",
        ":kookoo:":"<img src='http://sublyme.net/site_media/images/smileys/kookoo.gif'>",
        ":doh:":"<img src='http://sublyme.net/site_media/images/smileys/doh.gif'>",
        ":yawn:":"<img src='http://sublyme.net/site_media/images/smileys/yawn.gif'>",
        ":orly:":"<img src='http://sublyme.net/site_media/images/smileys/orly.gif'>",
        ":nonono:":"<img src='http://sublyme.net/site_media/images/smileys/nonono.gif'>",
        ":dog:":"<img src='http://sublyme.net/site_media/images/smileys/dog.gif'>",
        ":puppyeyes:":"<img src='http://sublyme.net/site_media/images/smileys/dog.gif'>",
        ":puppy:":"<img src='http://sublyme.net/site_media/images/smileys/dog.gif'>",
        ":oink:":"<img src='http://sublyme.net/site_media/images/smileys/oink.gif'>",
        ":moo:":"<img src='http://sublyme.net/site_media/images/smileys/moo.gif'>",
        ":monkey:":"<img src='http://sublyme.net/site_media/images/smileys/monkey.gif'>",
        ":chicken:":"<img src='http://sublyme.net/site_media/images/smileys/chicken.gif'>",
        ":yinyang:":"<img src='http://sublyme.net/site_media/images/smileys/yinyang.gif'>",
        ":buzz:":"<img src='http://sublyme.net/site_media/images/smileys/buzz.gif'>",
        ":alien:":"<img src='http://sublyme.net/site_media/images/smileys/alien.gif'>",
        ":pray:":"<img src='http://sublyme.net/site_media/images/smileys/pray.gif'>",
        ":bigmoney:":"<img src='http://sublyme.net/site_media/images/smileys/bigmoney.gif'>",
        ":omni:":"<img src='http://sublyme.net/site_media/images/smileys/omni.png'>",
        ":beard:":"<img src='http://sublyme.net/site_media/images/smileys/beard.png'>",
        ":disapprove:":"<b>ಠ_ಠ</b>"
    };
    posts = $('.post_body');
    for(i=0; i<posts.length; i++){
        posts[i].innerHTML = replaceAllMap(posts[i].innerHTML, allSmileys);
    }
    
}

function warnIfPostModified(){
    //debugPrint('in warnIfPostModified');
    hasText = false;
    
    $('textarea#message_new').keyup('change', function() {
        if($('textarea#message_new').val() != ''){
            hasText = true;
        }else{
            hasText = false;
        }
        warnUserOnUnload();

    });
    
    $('textarea#message').keyup('change', function() {
        if($('textarea#message').val() != ''){
            hasText = true;
        }else{
            hasText = false;
        }
        warnUserOnUnload();
    });
    
    
    for(var i = 0; i < $('form input[type="submit"]').length; i++){
        if($($('form input[type="submit"]')[i]).val().indexOf('Search Thread') == -1){
            $($('form input[type="submit"]')[i]).live('click', function() {
                hasText = false;
                warnUserOnUnload();
            });
        }
    }
}


function warnUserOnUnload(){
    if(hasText){
        window.onbeforeunload = function(event){ 
            return "HFES has indicated that you have written out a reply, leaving this page will lose your progress.";
        };
    }else{
        window.onbeforeunload = function(event){ 
        };
    }
}

function getBanReasonProfile(){
    if($('.group7').length > 0){
        var bannedUserName;
        bannedUserName = $('.group7').text();
        //$($('tbody:contains("Forum Info")')[0]).prepend('<table><tr><td class="trow1"><strong>Ban Reason:</strong></td><td class="trow1" id="ban_reason">Loading...</td></tr><tr><td class="trow1"><strong>Unban Date:</strong></td><td class="trow1" id="ban_unban">Loading...</td></tr></table>');
        $($($($('tbody:contains("Forum Info")')[0].children)[0].children)[2]).prepend('<table border="0" cellspacing="1" cellpadding="4" class="tborder"><tbody><tr><td colspan="2" class="thead"><strong>'+bannedUserName+'\'s Ban Info</strong><span style="font-size:10px; float:right; margin-top:3px;">brought to you by HFES</span></td></tr><tr><td class="trow1"><strong>Ban Reason:</strong></td><td class="trow1" id="ban_reason">Loading...</td></tr><tr><td class="trow1"><strong>Banned By:</strong></td><td class="trow1" id="ban_by">Loading...</td></tr><tr><td class="trow1"><strong>Unban Date:</strong></td><td class="trow1" id="ban_unban">Loading...</td></tr></tbody></table>');
        
        
        uid = document.URL.split('&uid=')[1].split('&')[0];
        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://www.hackforums.net/bans.php',
            
            onload: function(response){
                var banRow, banReason, banUnbanDate, banBy;
                banRow = $($($($(response.responseText).find("a[href*='"+uid+"']"))[0].parentNode)[0].parentNode)[0];
                banReason = $($(banRow)[0].children[1]).html();
                banUnbanDate = $($(banRow)[0].children[4]).text();
                banBy = $($(banRow)[0].children[2]).text();
                $('#ban_reason').html(banReason);
                $('#ban_unban').text(banUnbanDate);
                $('#ban_by').text(banBy);
            }
        });
    }
    
    if(GM_config.get("locationhider")){
        if(document.URL.indexOf("www.") != -1){
            $.get("http://www.hackforums.net/misc.php", function(){});
        }else{
            $.get("http://hackforums.net/misc.php", function(){});
        }
        
    }
}

function removeQuoteOnClosedThread(){
    //return;
    if($('.float_right a:contains("Closed")').length > 0){
        $('.post_management_buttons > .bitButton:not(:contains("Report"))').each(function(){
            $(this).hide();
        });
    }
}

function removeWelcomeText(){
    $('#container > .largetext:contains("Welcome")').remove();
}

function getTheme(){
    var themeName = $('link[href*="global.css"]')[0].href.split('themes/')[1].split('/global')[0];
    if(themeName != "theme5" && themeName != "theme3"){
        themeName = "theme3";
    }
    debugPrint('Theme found and set as '+ themeName);
    GM_setValue('forumTheme', themeName);
}

// ------------------------ Donor Perks ------------------------------------- //
function addDonorPerksThread(donorList){
    /* takes donorlist as a map as such
     * { 'uid':[userbar, somethingelse]}
     */
    var uid, i, posts, userlinks, donorKeys;
    posts = $('.post_author');
    userlinks = $('.post_author .largetext a');
    donorKeys = Object.keys(donorList);
    for(i=0; i<posts.length; i++){
        var donorStar, donorStarMsg, gilded;
        uid = userlinks[i].href.split('uid=')[1];        
        
        if(donorKeys.indexOf(uid) != -1){
            if(donorList[uid][0]=='g'){
                donorStar = "<span class='HFES_Star'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/happystar.png' title='"+donorList[uid][2]+"'></img></span>";
                if(donorList[uid][1] != ''){
                    donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
                }
                
                $(posts[i]).prepend(donorStar);
            }else if(donorList[uid][0]=='s'){
                donorStar = "<span class='HFES_Star'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/alert.png' title='"+donorList[uid][2]+"'></img></span>";
                if(donorList[uid][1] != ''){
                    donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
                }
                $(posts[i]).prepend(donorStar);
            }else if(donorList[uid][0]=='d'){
                donorStar = "<span class='HFES_Star' style='margin-right:4px'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/developer.png' title='"+donorList[uid][2]+"'></img></span>";
                if(donorList[uid][1] != ''){
                    donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
                }
                $(posts[i]).prepend(donorStar);
            }else{
            }
            //GM_addStyle('.gilded{background:#FFCC00;}');

            if(donorList[uid][3] =='gilded' || donorList[uid][3] =='gilded2'){
                var topbar;
                //$($($($($($($($(posts[i].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0]).attr('class','tborder gilded'); // #FFCC00
                topbar = $($($($($($($(posts[i].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode)[0].children)[0].children;
                $(topbar).attr('class','');
                $(topbar).attr('style','background-color:#FFCC00; color:#333'); // FFCC00  EAD902
                //$(topbar).attr('style','background-image:url("http://sublyme.net/site_media/images/goldthead.png");background-repeat: repeat; background-position: center;color:#333');
                $(topbar).attr('title','[HFES] Gilded Supporter');
            }
            
            if(donorList[uid][4] == 'g'){
                
                $($(posts[i].children).filter("strong")[0].children).attr("style","background-image:url('https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/shinyname.gif')");
                $($(posts[i].children).filter("strong")[0].children).attr("title","[HFES] Shiny Supporter");
            }                
        }
    }
}

function addDonorPerksProfile(donorList){
    var uid, i, oldbar, donorKeys, src, title;
    donorKeys = Object.keys(donorList);
    uid = document.URL.split('&uid=')[1].split('&')[0];

    if(donorKeys.indexOf(uid) != -1){
        var donorStar;
        if(donorList[uid][0]=='g'){
            donorStar = "<span class='HFES_Star'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/happystar.png' title='"+donorList[uid][2]+"'></img></span>";
            if(donorList[uid][1] != ''){
                donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
            }
            $($('.largetext strong span')[0].parentNode).prepend(donorStar);
        }else if(donorList[uid][0]=='s'){
            donorStar = "<span class='HFES_Star'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/alert.png' title='"+donorList[uid][2]+"'></img></span>";
            if(donorList[uid][1] != ''){
                donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
            }
            $($('.largetext strong span')[0].parentNode).prepend(donorStar);
        }else if(donorList[uid][0]=='d'){
            donorStar = "<span class='HFES_Star' style='margin-right:4px'><img src='https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/developer.png' title='"+donorList[uid][2]+"'></img></span>";
            if(donorList[uid][1] != ''){
                donorStar = "<a href='"+donorList[uid][1]+"'>"+donorStar+"</a>";
            }
            $($('.largetext strong span')[0].parentNode).prepend(donorStar);
        }else{
        }
        if(donorList[uid][0]=='s'){
            $($('.tborder')[0]).attr('style','background-color:#FF0000;');
        }else if(donorList[uid][3] =='gilded' || donorList[uid][3] =='gilded2'){
            var topbar;
            $($('.tborder')[0]).attr('style','background-color:#ddc700;');
            $($('.tborder')[0]).attr('style','border:1px solid #ddc700 !important;');
            //$($('.tborder')[0]).attr('title','[HFES] Gilded Supporter');
        }else{}
        
        if(donorList[uid][4] == 'g'){
            if($(".largetext strong span").length == 3){
                $($('.largetext strong span')[0]).attr("style","background-image:url('https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/shinyname.gif')");
                $($('.largetext strong span')[0]).attr("title","[HFES] Shiny Supporter");
            }else if($(".largetext strong span").length == 4){
                $($('.largetext strong span')[1]).attr("style","background-image:url('https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/images/donors/shinyname.gif')");
                $($('.largetext strong span')[1]).attr("title","[HFES] Shiny Supporter");
            }
            
        }          
    }
}

function getDonorList(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/hashlabxyz/Userscripts/master/HackForums/HFES/donors.txt"+ "?nc=" + Math.random(),
        onload: function(response){
            var reslines, templine, i, j, donorMap = {};
            reslines = response.responseText.split('\n');
            for(i=0; i<reslines.length; i++){
                templine = reslines[i].split('|');
                donorMap[templine[0]] = []
                for(j=1; j<templine.length; j++){
                    donorMap[templine[0]].push(templine[j]);
                }
            }
            //debugPrint(donorMap);
            if(document.URL.indexOf('showthread.php?tid') != -1 || document.URL.indexOf('private.php?action=read') != -1 || document.URL.indexOf('showthread.php?pid') != -1){
                addDonorPerksThread(donorMap);
            }else if(document.URL.indexOf('member.php?action=profile') != -1){
                addDonorPerksProfile(donorMap);
            }
        }
    });
            
}

function customCSS(){
    var tid = document.URL.split('tid=')[1].split('&')[0];
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://sublyme.net/site_media/hfcss/"+tid+".css"+ "?nc=" + Math.random(),
        onload: function(response){
            GM_addStyle(response.responseText);
        }
    });
}

// ---------------------------- Important Stuff ----------------------------------- //

function coreMods(){
    getTheme();
    injectCSS();
    if(GM_config.get('theadstyle') == 'dark'){
        var darkTheme = [
            ".tcat {",
            "background: #955A85 url(http://sublyme.net/site_media/images/darkthead.png) top left repeat-x;",
            "color : #DDD;",
            "}"
        ].join("");
        GM_addStyle(darkTheme);
    }else if(GM_config.get('theadstyle') == 'light'){
        var lightTheme = [
            ".tcat {",
            "background: #955A85 url(http://sublyme.net/site_media/images/lightthead.png) top left repeat-x;",
            "color : #333;",
            "}"
        ].join("");
        GM_addStyle(lightTheme);
    }else{}
    if(GM_config.get('prettyQuote')){
        GM_addStyle(prettyQuotes);
        GM_addStyle(prettyCite);
    }
    
    GM_SuperValue.set('favList', GM_SuperValue.get('favList', defaultfav));
    
    if(GM_config.get("locationhider") && document.URL.indexOf('favorites.php') == -1){
        if(GM_config.get("locationhider") && document.URL.indexOf('favorites.php') == -1){
           if(document.URL.indexOf("www.") != -1){
                $.get("http://www.hackforums.net/misc.php", function(){});
            }else{
                $.get("http://hackforums.net/misc.php", function(){});
            }
        
        }
    }
    if(GM_config.get("usertagging")){
        GM_SuperValue.set('usertags', GM_SuperValue.get('usertags', defaultusertags));
    }
    emyMessage();
    emyUpdateMsg();
    
    addSpecialLinks();
    if(GM_config.get("pmDeny")){
        debugPrint("Loading Uber PM Deny Mod...");
        uberPMDeny();
    }
    if(GM_config.get("groupAlertHide")){
        debugPrint("Removing group leader alerts...");
        groupAlertRemover();
    }
    if(GM_config.get("threadpreview")){
        debugPrint("Loading Thread Preview Mod...");
        threadPreviewForum();
    }
    if(GM_config.get('hidetwitter')){
        debugPrint("Hiding twitter widget...");
        $('iframe[src*="platform.twitter.com"]').remove();
    }
    if(document.URL.indexOf('repsgiven.php') != -1){
        repsgivenFix();
    }
    if(GM_config.get('removeWelcome')){
        debugPrint("Removing Welcome Text...");
        removeWelcomeText();
    }
}

function staffPageMods(){
    if(GM_config.get("staffOnline", true)){
        debugPrint("Loading Online Staff mod...");
        onlineStaff();
    }
}

function groupLeaderPageMods(){
    if(GM_config.get("groupLeaderUserList") != 'none'){
        debugPrint("Loading Easy Member List mod...");
        listMembers();
    }
}

function threadPageMods(){
    getDonorList();
    postAddSmiley();
    addQuickSmileyLink();
    debugPrint("Adding Thread Citer...");
    
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this thread!" href="javascript:void(0);" id="citer">[cite]</a></small>';
    $("#citer").live("click", function(){ threadCiting(); });
    if(GM_config.get("userBarSwitch") != "none"){
        debugPrint("userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("cleanThreads")){
        debugPrint("Removing Quote/Edit on closed threads");
        removeQuoteOnClosedThread();
    }
    if(GM_config.get("ratingInfo")){
        debugPrint("Loading Detailed Rating Mod...");
        displayThreadRatingT();
    }
    if(GM_config.get("usertagging")){
        debugPrint("Loading User Tagging in Thread Mod...");
        threadTagger();
    }
    if(GM_config.get("pmfrompost")){
        debugPrint("Loading PM from Post mod...");
        addPostPM();
    }
    if(GM_config.get("multiquote")){
        addMultiQuoteButtons();
    }
    if(GM_config.get("warnUnload")){
        debugPrint("Loading Warn Unload Mod...");
        warnIfPostModified();
    }
}

function replyMods(){
    if(GM_config.get("multiquote")){
        addMultiToReply();
    }
    if(GM_config.get("warnUnload")){
        debugPrint("Loading Warn Unload Mod...");
        warnIfPostModified();
    }
    addSmileyLink();
}

function newThreadMods(){
    addSmileyLink();
}

function pmMods(){
    getDonorList();
    postAddSmiley();
    if(GM_config.get("quickPM")){
        debugPrint("Loading Quick Message mod...");
        addQuickMsg();
    }
    if(GM_config.get("userBarSwitch") != "none"){
        debugPrint("userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("prettyPM")){
        debugPrint("Loading Pretty PM mod...");
        prettyPM();
    }
    if(GM_config.get("usertagging")){
        debugPrint("Loading User Tagging in PM Mod...");
        threadTagger();
    }
    if(GM_config.get("warnUnload")){
        debugPrint("Loading Warn Unload Mod...");
        warnIfPostModified();
    }
}

function sendPMMods(){
    if(GM_config.get("warnUnload")){
        debugPrint("Loading Warn Unload Mod...");
        warnIfPostModified();
    }
    addSmileyLink();
}

function trackingMods(){
    if(GM_config.get("trackingLink")){
        debugPrint("Loading Links for PM Tracking Page...");
        addMsgTracking();
    }
}

function profileMods(){
    getDonorList();
    if(GM_config.get("usertagging")){
        profileTagger();
    }
    if(GM_config.get("profileCiting")){
        $($('.largetext strong span')[0].parentNode).append('&nbsp<span class="HFES_Citer" style="font-size:x-small"><a title="Cite this user!" href="javascript:void();" id="profilegenerator">[cite]</a></span>');
        $("#profilegenerator").live("click", function(){ getProfileName(); });
    }
    if(GM_config.get("banReason")){
        getBanReasonProfile();
    }
}

function searchMods(){
    if(GM_config.get("lastLink")){
        debugPrint("Loading Last Link mod...");
        addLastLinks();
    }
}

function fMods(){
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this forum!" href="javascript:void(0);" id="fciter">[cite]</a></small>';
    $("#fciter").live("click", function(){ forumCiting(); });
    
    linkAddFavorite();
    
    if(GM_config.get("ratingInfo")){
        debugPrint("Loading Rating Info mod...");
        displayThreadRating();
    }
}

function smilePageMods(){
    fixSmileyPage();
}

function helpMods(){
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this forum!" href="javascript:void(0);" id="fciter">[cite]</a></small>';
    $("#fciter").live("click", function(){ forumCiting(); });
}

function main(){
    debugPrint("Loading core mods...");
    coreMods();
    addToMenu();
    if(document.URL.indexOf("misc.php?action=smilies") != -1){
        smilePageMods();
    }
    if(document.URL.indexOf("showstaff.php") != -1 || document.URL.indexOf("showmods.php") != -1){
        debugPrint("Loading staff page mods...");
        staffPageMods();
    }
    if(document.URL.indexOf("showthread.php") != -1){
        debugPrint("Loading thread page mods...");
        threadPageMods();
    }
    if(document.URL.indexOf("private.php?action=read") != -1){
        debugPrint("Loading Private Message mods...");
        pmMods();
    }
    if(document.URL.indexOf("private.php?action=send") != -1){
        sendPMMods();
    }
    if(document.URL.indexOf("forumdisplay.php") != -1){
        debugPrint("Loading Forum mods...");
        fMods();
    }
    if(document.URL.indexOf("private.php?action=tracking") != -1){
        trackingMods();
    }
    if(document.URL.indexOf("search.php?action=results") != -1){
        searchMods();
    }
    if(document.URL.indexOf("hfgrouptest") != -1 || document.URL.indexOf("managegroup.php") != -1){
        groupLeaderPageMods();
    }
    if(document.URL.indexOf("member.php?action=profile") != -1){
        profileMods();
    }
    if(document.URL.indexOf("newreply.php?tid=") != -1){
        replyMods();
    }
    if(document.URL.indexOf("newthread.php?fid=") != -1){
        newThreadMods();
    }
    if(document.URL.indexOf("misc.php?action=help") != -1){
        helpMods();
    }
}

var start = function() {
    $(function() {
        main();
	});
};

if (document.URL.indexOf("favorites.php") !== -1) {
    // Try to make the favorites page start to load as quickly as possible.
    // We also want to control when start() runs on the favorites page.
    initializeFavorites();
} else {
    start();
}
