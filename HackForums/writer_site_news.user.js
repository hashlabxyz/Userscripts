// ==UserScript==
// @name        Writer Site News
// @namespace   Hash G.
// @include     *hackforums.net
// @include     *hackforums.net/
// @include     *hackforums.net/#
// @require     https://code.jquery.com/jquery-3.1.0.min.js
// @version     0.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

$(".active").append(" - <a href='#' id='doSiteNews'>Writer - Site News</a>");

$("#doSiteNews").on("click", function() {
    totalAvgSiteStats();
    return false;
})

function totalAvgSiteStats() {

    $.get("https://hackforums.net/stats.php", function(data, status) {
        let totalSiteStats = $(data).find("td.trow1[valign='top']:eq(0)").text(),
            avgSiteStats = $(data).find("td.trow1[valign='top']:eq(1)").text();

        let totalPosts = totalSiteStats.replace(/\nPosts: (.*)\n.*\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let totalThreads = totalSiteStats.replace(/\n.*\nThreads: (.*)\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let totalMembers = totalSiteStats.replace(/\n.*\n.*\nMembers: (.*)/, "$1").replace(/,/g, "").replace("\n", "");

        let ppd = avgSiteStats.replace(/\nPosts per day: (.*)\n.*\n.*\n.*\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let tpd = avgSiteStats.replace(/\n.*\nThreads per day: (.*)\n.*\n.*\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let mpd = avgSiteStats.replace(/\n.*\n.*\nMembers per day: (.*)\n.*\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let ppm = avgSiteStats.replace(/\n.*\n.*\n.*\nPosts per member: (.*)\n.*/, "$1").replace(/,/g, "").replace("\n", "");
        let rpt = avgSiteStats.replace(/\n.*\n.*\n.*\n.*\nReplies per thread: (.*)/, "$1").replace(/,/g, "").replace("\n", "");

        alert(totalPosts + ":" + totalThreads + ":" + totalMembers + "\n"
              + ppd + ":" + tpd + ":" + mpd + ":" + ppm + ":" + rpt);
        alert(forumCountStats());
    })
}

function forumCountStats() {
    var total  = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
                  [0, 0], [0, 0], [0, 0]],
        result = "",
        lr     = "";
    var lounge,
        ranf;

    $("div[id*='tabmenu_']").each(function(tabmenu) {
        $(this).find(`table tbody[id*='cat_']
                      tr td:nth-child(3)`).each(function(i) {
            switch (tabmenu) {
                case 0:
                    total[0] = fcs_addValues(total[0], $(this).html());
                    break;
                case 1:
                    total[1] = fcs_addValues(total[1], $(this).html());
                    break;
                case 2:
                    total[0] = fcs_addValues(total[0], $(this).html());
                    break;
                case 3:
                    total[2] = fcs_addValues(total[2], $(this).html());
                    break;
                case 4:
                    total[3] = fcs_addValues(total[3], $(this).html());
                    break;
                case 5:
                    total[7] = fcs_addValues(total[7], $(this).html());
                    break;
                case 6:
                    total[8] = fcs_addValues(total[8], $(this).html());
                    break;
                case 7:
                    total[9] = fcs_addValues(total[9], $(this).html());
                    break;
                case 8:
                    total[6] = fcs_addValues(total[6], $(this).html());
                    break;
                case 9:
                    total[4] = fcs_addValues(total[4], $(this).html());
                    break;
                case 10:        // Groups
                    if (total[5][0] === 0 || total[5][1] === 0)
                        total[5] = fcs_addValues(total[5], $(this).html());
                    break;
            }
        })
    })

    // RANF & Lounge
    lounge = $("#cat_7_e > tr:nth-child(2) > td:nth-child(3)").html();
    ranf = $("#cat_1_e > tr:nth-child(2) > td:nth-child(3)").html();
    lr += lounge.replace(/(.*)<br>.*/, "$1").replace(/,/g, "") + ":";
    lr += lounge.replace(/.*<br>(.*)/, "$1").replace(/,/g, "") + ":";
    lr += ranf.replace(/(.*)<br>.*/, "$1").replace(/,/g, "") + ":";
    lr += ranf.replace(/.*<br>(.*)/, "$1").replace(/,/g, "") + ":";
    result += lr;

    for (let i = 0; i < 10; i++)
        result += total[i][0] + ":" + total[i][1] + ":";

    return result.substring(0, result.length - 1);;
}

function fcs_addValues(array, toAdd) {
    if (toAdd.charAt(0) == '<' || toAdd.charAt(0) == '-')
        return array;
    array[0] += parseInt(toAdd.replace(/(.*)<br>.*/, "$1").replace(/,/g, ""));
    array[1] += parseInt(toAdd.replace(/.*<br>(.*)/, "$1").replace(/,/g, ""));
    return array;
}
