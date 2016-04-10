// ==UserScript==
// @name        WYSIWYG Editor
// @namespace   Hash G.
// @description Adds a What you see is what you get editor to HF
// @include     *hackforums.net/showthread.php?tid=*
// @require     http://code.jquery.com/jquery-2.2.2.min.js
// @require     http://cdn.wysibb.com/js/jquery.wysibb.min.js
// @version     0.1.2
// @grant       GM_getValue
// ==/UserScript==


$("body").append("<link rel='stylesheet' type='text/css' href='http://cdn.wysibb.com/css/default/wbbtheme.css' /><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'><style>.wysibb-text, .wysibb-toolbar-container, #wbbmodal { color: #282828 !important; } .fa-2x { font-size: 1.5em; margin-top: 6px; } .fa-skype { padding-left: 4px; }</style>");

wbbdebug = false;

var wbbOpt = {
    hotkeys: false, 
    showHotkeys: false,
    
    buttons: "bold,italic,underline,strike,|,img,video,skype,link,|,bullist,numlist,|,cp,fontsize,fontfamily,|,justifyleft,justifycenter,justifyright,|,quote,code,pmme,spoiler,removeformat",
    allButtons: {
        video: {
            transform: {
                '<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/{SRC}" frameborder="0" allowfullscreen></iframe></div>':'[video=yt]https://www.youtube.com/watch?v={SRC}[/video]'
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
                '<code>{SELTEXT}</code>':"[code]{SELTEXT}[/code]"
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
    }
}

$("#message").wysibb(wbbOpt);
$(".wysibb-text-editor").attr("autocomplete", "off");
$(".wysibb-text-editor").attr("autocorrect", "off");
$(".wysibb-text-editor").attr("autocapitalize", "off");
$(".wysibb-text-editor").attr("spellcheck", "false");