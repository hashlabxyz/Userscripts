// ==UserScript==
// @name        WYSIWYG Editor
// @namespace   Hash G.
// @description Adds a What you see is what you get editor to HF

// @include     *hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @require     http://cdn.wysibb.com/js/jquery.wysibb.min.js

// @downloadURL https://github.com/hashlabxyz/Userscripts/raw/master/HackForums/Live_editor.user.js
// @version     0.1.9

// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$("body").append("<link rel='stylesheet' type='text/css' href='http://cdn.wysibb.com/css/default/wbbtheme.css' /><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'><style>.wysibb-text, .wysibb-toolbar-container, #wbbmodal { color: #282828 !important; } .fa-2x { font-size: 1.5em; margin-top: 6px; } .fa-skype { padding-left: 4px; } .wysibb-text-editor a { color: #8A8A8A; }.wysibb-text-editor a:hover { text-decoration: underline; cursor: pointer; color: #8A8A8A !important; } .wbb-emotes .wbb-list .option { display: inline-block; }</style>");

wbbdebug = false;

var settings = {
    
    useHotkeys: GM_getValue("useHotkeys", false),
    useAutocorrect: GM_getValue("useAutocorrect", false),
    customButtons: GM_getValue("customButtons", "bold,italic,underline,strike,hr,|,img,video,skype,ig,link,|,bullist,numlist,|,fontcolor,fontsize,fontfamily,|,justifyleft,justifycenter,justifyright,|,emotes,quote,code,pmme,spoiler,removeformat"),
    
    HTML: '<tr><td class="thead" colspan="2"><strong>Live Editor settings</strong></td><tr><td class="tcat">Use Hotkeys</td><td class="tcat"><input type="checkbox" name="useHotkeys" /></td></tr><tr><td class="tcat">Use autocorrect</td><td class="tcat"><input type="checkbox" name="useAutocorrect" /></td></tr></tr>',
    
    
    initForm: function() {
        $("#quick_reply_form table thead tr").after(settings.HTML);
        $("a[href='#settings']").html("Save settings");
        
        if (settings.useHotkeys)
            $("input[type='checkbox'][name='useHotkeys']").attr("checked", "checked");
        
        if (settings.useAutocorrect)
            $("input[type='checkbox'][name='useAutocorrect']").attr("checked", "checked");
        
    },
    
    saveForm: function() {
        $("#quick_reply_form table thead tr input:checked").each(function() {
            GM_setValue($(this).attr("name"), true);
        });
        
        $("#quick_reply_form table thead tr input:not(:checked)").each(function() {
            GM_setValue($(this).attr("name"), false);
        });         
        
        $("#quick_reply_form table thead tr:gt(0)").remove();
        $("a[href='#settings']").html("Live Editor Settings");
    }
}

var wbbOpt = {
    hotkeys: settings.useHotkeys, 
    showHotkeys: settings.useHotkeys,
    
    buttons: settings.customButtons,
    allButtons: {
        video: {
            transform: {
                '<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/{SRC}" frameborder="0" allowfullscreen></iframe></div>':'[video=youtube]https://www.youtube.com/watch?v={SRC}[/video]'
            }
        },
        img : {
            transform : {
                '<img src="{SRC}" />':"[img]{SRC}[/img]",
                '<img src="{SRC}" width="{WIDTH}" height="{HEIGHT}"/>':"[img={WIDTH}x{HEIGHT}]{SRC}[/img]"
            }
        },
        bullist : {
            transform : {
                '<ul>{SELTEXT}</ul>':"[list]{SELTEXT}[/list]",
                '<li>{SELTEXT}</li>':"[*]{SELTEXT}\n"
            }
        },
        numlist : {
            transform : {
                '<ol>{SELTEXT}</ol>':"[list=1]{SELTEXT}[/list]",
                '<li>{SELTEXT}</li>':"[*]{SELTEXT}\n"
            }
        },
        justifyleft: {
            transform: {
                '<p style="text-align:left">{SELTEXT}</p>': '[align=left]{SELTEXT}[/align]'
            }
        },
        justifyright: {
            transform: {
                '<p style="text-align:right">{SELTEXT}</p>': '[align=right]{SELTEXT}[/align]'
            }
        },
        justifycenter: {
            transform: {
                '<p style="text-align:center">{SELTEXT}</p>': '[align=center]{SELTEXT}[/align]'
            }
        },
        fs_verysmall: {
            transform: {
                '<span style="font-size: x-small;">{SELTEXT}</span>':'[size=x-small]{SELTEXT}[/size]'
            }
        },
        fs_small: {
            transform: {
                '<span style="font-size: small;">{SELTEXT}</span>':'[size=small]{SELTEXT}[/size]'
            }
        },
        fs_normal: {
            transform: {
                '<span style="font-size: medium;">{SELTEXT}</span>':'[size=medium]{SELTEXT}[/size]'
            }
        },
        fs_big: {
            transform: {
                '<span style="font-size: large;">{SELTEXT}</span>':'[size=large]{SELTEXT}[/size]'
            }
        },
        fs_verybig: {
            transform: {
                '<span style="font-size: x-large;">{SELTEXT}</span>':'[size=x-large]{SELTEXT}[/size]'
            }
        },
        code: {
            buttonHTML: '<i class="fa fa-code fa-2x"></i>', 
            transform : {
                '<pre>{SELTEXT}</pre>':"[code]{SELTEXT}[/code]"
            }
        },
        pmme: {
            title: "Insert a PM Me link",
            buttonHTML: "<i class='fa fa-envelope fa-2x'></i>",
            modal: {
                title: "PM Me link",
                width: "600px",
                tabs: [
                  {
                    input: [ 
                      {param: "SUBJECT",title:"Enter subject of the PM"},
                      {param: "LINKTEXT",title:"Enter the link's text"}
                    ]
                  }
                ],
            },
            transform: {
                '<span class="pmme">PM_ME:{SUBJECT}:{LINKTEXT}</span>':'[pmme={SUBJECT}]{LINKTEXT}[/pmme]'
            }
        },
        spoiler: {
            title: "Insert a spoiler",
            buttonHTML: "<i class='fa fa-folder-open-o fa-2x'></i>",
            transform : {
                '<span class="spoiler">SPOILER_START<br>{SELTEXT}SPOILER_END</span>':'[sp]{SELTEXT}[/sp]'
            }
        },
        quote: {
            transform : { 
                '<blockquote><cite>AUTHOR Wrote: POST_ID</cite>{SELTEXT}</blockquote>':"[quote='AUTHOR' pid='PID']{SELTEXT}[/quote]"
            }
        },
        skype: {
            title: "Skype",
            buttonHTML: "<i class='fa fa-skype fa-2x'></i>",
            modal: {
                title: "Skype button",
                width: "600px",
                tabs: [
                  {
                    input: [ 
                      {param: "USERNAME",title:"Enter skype username"}
                    ]
                  }
                ],
            },
            transform: {
                '<span class="skype"><span class="bitButton"><a href="skype:{USERNAME}?chat"><img src="images/skype.gif"> {USERNAME}</a></span></span>':'[skype]{USERNAME}[/skype]'
            }
        },
        ig: {
            title: "Add Instagram",
            buttonHTML: "<i class='fa fa-instagram fa-2x'></i>",
            modal: {
                title: "Instagram link",
                width: "600px",
                tabs: [
                  {
                    input: [ 
                      {param: "LINK",title:"Instagram Link to photo/video"}
                    ]
                  }
                ],
            },
            transform: {
                '<iframe src="{LINK}embed" height="710" width="612" frameborder="0"></iframe>':"[ig]{LINK}[/ig]"
            }
        },
        hr: {
            title: "Insert a divider",
            buttonHTML: "<i class='fa fa-ellipsis-h fa-2x'></i>",
            transform: {
                '<hr>':"[hr]"
            }
        },
		emotes: {
			type: 'select',
            title: "Add emotes",
			options: "emote_pinch,emote_victoire,emote_hehe,emote_oui,emote_pleure,emote_ohmy,emote_blink,emote_superman,emote_nono,emote_biggrin,emote_sad,emote_unsure,emote_glare,emote_roflmao,emote_devlish,emote_rolleyes,emote_cool,emote_gratte,emote_confused,emote_bh,emote_ninja,emote_blush,emote_lipssealed,emote_yeye,emote_non,emote_smile,emote_whistle,emote_sleep,emote_evilgrin,emote_omg,emote_tongue,emote_mad,emote_huh,emote_thumbsup,emote_wacko,emote_pirate"
		},
        emote_pinch: {
            transform: {
                '<img src="images/smilies/pinch.gif">':':pinch:'
            }
        },
        emote_victoire: {
            transform: {
                '<img src="images/smilies/victoire.gif">': ':victoire:'
            }
        }, 
        emote_hehe: {
            transform: {
                '<img src="images/smilies/hehe.gif">': ':hehe:'
            }
        }, 
        emote_oui: {
            transform: {
                '<img src="images/smilies/oui.gif">': ':oui:'
            }
        }, 
        emote_pleure: {
            transform: {
                '<img src="images/smilies/bebe-pleure.gif">': ':bebe-pleure:'
            }
        }, 
        emote_ohmy: {
            transform: {
                '<img src="images/smilies/ohmy.gif">': ':ohmy:'
            }
        }, 
        emote_blink: {
            transform: {
                '<img src="images/smilies/blink.gif">': ':blink:'
            }
        }, 
        emote_superman: {
            transform: {
                '<img src="images/smilies/superman.gif">': ':superman:'
            }
        }, 
        emote_nono: {
            transform: {
                '<img src="images/smilies/nono.gif">': ':nono:'
            }
        }, 
        emote_biggrin: {
            transform: {
                '<img src="images/smilies/biggrin.gif">': ':biggrin:'
            }
        }, 
        emote_sad: {
            transform: {
                '<img src="images/smilies/sad.gif">': ':sad:'
            }
        }, 
        emote_unsure: {
            transform: {
                '<img src="images/smilies/unsure.gif">': ':unsure:'
            }
        }, 
        emote_glare: {
            transform: {
                '<img src="images/smilies/glare.gif">': ':glare:'
            }
        }, 
        emote_roflmao: {
            transform: {
                '<img src="images/smilies/roflmao.gif">': ':roflmao:'
            }
        }, 
        emote_devlish: {
            transform: {
                '<img src="images/smilies/devlish.gif">': ':devlish:'
            }
        }, 
        emote_rolleyes: {
            transform: {
                '<img src="images/smilies/rolleyes.gif">': ':rolleyes:'
            }
        }, 
        emote_cool: {
            transform: {
                '<img src="images/smilies/cool.gif">': ':cool:'
            }
        }, 
        emote_gratte: {
            transform: {
                '<img src="images/smilies/gratte.gif">': ':gratte:'
            }
        }, 
        emote_confused: {
            transform: {
                '<img src="images/smilies/confused.gif">': ':confused:'
            }
        },
        emote_bh: {
            transform: {
                '<img src="images/smilies/blackhat.gif">': ':blackhat:'
            }
        }, 
        emote_ninja: {
            transform: {
                '<img src="images/smilies/ninja.gif">': ':ninja:'
            }
        }, 
        emote_blush: {
            transform: {
                '<img src="images/smilies/blush.gif">': ':blush:'
            }
        }, 
        emote_lipssealed: {
            transform: {
                '<img src="images/smilies/lipssealed.gif">': ':lipssealed:'
            }
        }, 
        emote_yeye: {
            transform: {
                '<img src="images/smilies/yeye.gif">': ':yeye:'
            }
        }, 
        emote_non: {
            transform: {
                '<img src="images/smilies/non.gif">': ':non:'
            }
        }, 
        emote_smile: {
            transform: {
                '<img src="images/smilies/smile.gif">': ':smile:'
            }
        }, 
        emote_whistle: {
            transform: {
                '<img src="images/smilies/whistle.gif">': ':whistle:'
            }
        }, 
        emote_sleep: {
            transform: {
                '<img src="images/smilies/sleep.gif">': ':sleep:'
            }
        }, 
        emote_evilgrin: {
            transform: {
                '<img src="images/smilies/evilgrin.gif">': ':evilgrin:'
            }
        }, 
        emote_omg: {
            transform: {
                '<img src="images/smilies/omg.gif">': ':omg:'
            }
        }, 
        emote_tongue: {
            transform: {
                '<img src="images/smilies/tongue.gif">': ':tongue:'
            }
        }, 
        emote_mad: {
            transform: {
                '<img src="images/smilies/mad.gif">': ':mad:'
            }
        }, 
        emote_huh: {
            transform: {
                '<img src="images/smilies/huh.gif">': ':huh:'
            }
        }, 
        emote_thumbsup: {
            transform: {
                '<img src="images/smilies/thumbsup.gif">': ':thumbsup:'
            }
        }, 
        emote_wacko: {
            transform: {
                '<img src="images/smilies/wacko.gif">': ':wacko:'
            }
        }, 
        emote_pirate: {
            transform: {
                '<img src="images/smilies/pirate.gif">': ':pirate:'
            }
        },
    }
}

$(document).ready(function() {
    $("#message").wysibb(wbbOpt);
    
    $("#quick_reply_form table thead td").append("<a class='smalltext float_right' href='#settings'>Live Editor Settings</a>");
    
    if (settings.useAutocorrect === false) {
        $(".wysibb-text-editor").attr("autocomplete", "off");
        $(".wysibb-text-editor").attr("autocorrect", "off");
        $(".wysibb-text-editor").attr("autocapitalize", "off");
        $(".wysibb-text-editor").attr("spellcheck", "false");
    }
    
    $("a[href='#settings']").on("click", function(e) {
        e.preventDefault();
        
        if ($("input[type='checkbox'][name='useHotkeys']").length === 0) {
            settings.initForm();
        } else {
            settings.saveForm();
        }
        
        return false;
    });
    
    $("body").on("keydown", function(e) {
        if (e.key === "Tab" || e.keyCode === "9" || e.which === "9") {
            $("#quick_reply_submit").focus();
        }
    });
    
    $("#quick_reply_submit").on("click", function() {
        $("#posts").bind("DOMNodeInserted", function(e) {
            if (e.target.tagName === "DIV") {
                $("#message").val("");
                $(".wysibb-text-editor").empty();
            }
        });
    });
});