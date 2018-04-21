/**
* * Howdy!! p1ngM3 @D09r
*
* * Creative Tester - Live HTTP Headers
* * Version 0.4.9
* * Author: Dinesh Kumar
* * https://www.linkedin.com/in/hack3r
* * Repository: https://github.com/D09r
*
*/

var d = {}, callChainData = [];
var appendURLData, id = 0, ir = 0, domainslist = [];
var refusedToLoadOnFrame = "DENY";
var flagNonSSL, flagRedirect, flagFlash, flagVideo, flagAudio, flagNotFound, flagBadRequest, flagOthers;

function gsb (hostname) {
    console.log("CALLED GSB!  :", hostname);
	var req = new XMLHttpRequest();
	req.open('GET', 'https://sb-ssl.google.com/safebrowsing/api/lookup?client=code10101001&key=AIzaSyCB41VaMpfQzbA2hBcGyo8sXa4IY8xEsU4&appver=0.0.9&pver=3.1&url='+hostname, false);
	//req.open('GET', 'https://www.google.com/transparencyreport/safebrowsing/diagnostic/index.html#url=' + url, false);
	req.send(null);
    console.log("GSB: ", req);
	if(req.status == 200) {
		var respGSB = req.response;
		try {
			console.log("GSB Verdict: ", respGSB);
		}
		
		catch (err) {
			console.log("Error (GSB): ", err);
		}
	}
}

/**
* Check the Chrome browser is in Incognito mode or not
*
*/
function chkIncognitoMode () {
    var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
//        infoIncognito.textContent = "check failed?";
//        return;
    }
    fs(window.TEMPORARY, 100, function(fs) {
//        if (Notification.permission == "denied") {
//            Notification.requestPermission();
//        } else {
//            var notifyIncognito = {
//                    type: 'basic',
////                    title: 'System Proxy Enabled!',
//                    message: 'Recommend to use Creative Tester on Chrome Incognito mode.',
//                    iconUrl: '../img/fi/mars128.png'
//                };
//            chrome.notifications.create("s", notifyIncognito, function () {});
//        }
        infoIncognito.textContent = "Recommend to use Creative Tester on Chrome Incognito mode.";
        $('#infoIncognito').show(1000);
        setTimeout(function(){ $('#infoIncognito').hide(1000);}, 6000);
    }, function(err) {
        $('#infoIncognito').css('display','none');
//        result.textContent = "it seems like you are in incognito mode";
    });
}

function callExport () {
    $('#exportIcon').click(function() {
       liveTableFn();
        $('#exportWrap').css('display','none');
    });
}

function callChaintree () {
    var tree = document.getElementById("tree");
    var lists = [ tree ];
     
      for (var i = 0; i < tree.getElementsByTagName("ul").length; i++)
        lists[lists.length] = tree.getElementsByTagName("ul")[i];

      for (var i = 0; i < lists.length; i++) {
        var item = lists[i].lastChild;
     	 
        while (!item.tagName || item.tagName.toLowerCase() != "li")
     	  item = item.previousSibling;

        item.className += " last";
      }
}

function liveTableFn() {
    $("#liveTraffic").tableExport({
        headings: true,                     // (Boolean), display table headings (th/td elements) in the <thead>
        footers: true,                      // (Boolean), display table footers (th/td elements) in the <tfoot>
        formats: ["xlsx", "csv", "txt"],     // (String[]), filetype(s) for the export
        fileName: "CT" + " - URL Components",                     // (id, String), filename for the downloaded file
        bootstrap: true,                    // (Boolean), style buttons using bootstrap
        position: "top",                 // (top, bottom), position of the caption element relative to table
        ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file
        ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file
        ignoreCSS: ".tableexport-ignore"    // (selector, selector[]), selector(s) to exclude from the exported file
    });
    
    /* default class, content, and separator for each export type */

    /* Excel Open XML spreadsheet (.xlsx) */
    $.fn.tableExport.xlsx = {
        defaultClass: "xlsx",
        buttonContent: "Export to xlsx",
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileExtension: ".xlsx"
    };

    /* Excel Binary spreadsheet (.xls) */
    $.fn.tableExport.xls = {
        defaultClass: "xls",
        buttonContent: "Export to xls",
        separator: "\t",
        mimeType: "application/vnd.ms-excel",
        fileExtension: ".xls"
    };

    /* Comma Separated Values (.csv) */
    $.fn.tableExport.csv = {
        defaultClass: "csv",
        buttonContent: "Export to csv",
        separator: ",",
        mimeType: "application/csv",
        fileExtension: ".csv"
    };

    /* Plain Text (.txt) */
    $.fn.tableExport.txt = {
        defaultClass: "txt",
        buttonContent: "Export to txt",
        separator: "  ",
        mimeType: "text/plain",
        fileExtension: ".txt"
    };
    /* default charset encoding (UTF-8) */
    $.fn.tableExport.charset = "charset=utf-8";

    /* default filename if "id" attribute is set and undefined */
    $.fn.tableExport.defaultFileName = "ProductivityReport";

    /* default class to style buttons when not using bootstrap  */
    $.fn.tableExport.defaultButton = "button-default";

    /* bootstrap classes used to style and position the export buttons */
    $.fn.tableExport.bootstrap = ["btn", "btn-default", "btn-toolbar"];

    /* row delimeter used in all filetypes */
    $.fn.tableExport.rowDel = "\r\n";
}

function safeURL(inUrl) {
    $('#frameLoader').prop("src", inUrl);
}

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}

function renderHeaderReq (r, ir) {
//    console.log("REQ: ", r);
    var flagRef;
    //modal
    
    var modal3 = document.createElement('div');
    var modal2 = document.createElement('div');
    var modal1 = document.createElement('div');
    var modalHeader = document.createElement('div');
    var modalHeadClose = document.createElement('button');
    var modalTitle = document.createElement('h4');
    var modalBody = document.createElement('div');
//    var headerGeneral = document.createElement('table');
//    var headerGeneralP = document.createElement('div');
    var br = document.createElement('br');
    var b = document.createElement('b');
    var headerReqTable = document.createElement('table');
    var headerReqTh = document.createElement('th');
    
    modalHeadClose.setAttribute('type','button');
    modalHeadClose.setAttribute('class','close');
    modalHeadClose.setAttribute('data-dismiss','modal');
    modalHeadClose.setAttribute('data-backdrop','false');
    modalHeadClose.innerText = "x";
    modalHeader.appendChild(modalHeadClose);
    
    
    
    modalTitle.innerText = "HTTP Headers";
    
    //headerGeneral.setAttribute("id","mGen"+ r.requestId);
    //headerGeneralP.innerText = "Req Id: " + r.requestId;
    
    headerReqTable.setAttribute('class','trafficTable');
    headerReqTh.setAttribute('colspan','2');
    headerReqTh.innerText = "Request HTTP Headers";
    headerReqTable.appendChild(headerReqTh);
    
    var reqHeaders = {};
    reqHeaders = r.requestHeaders;
//    console.log(reqHeaders);
    
    for (n=0; n < reqHeaders.length; n++) {
        var headerReqTr = document.createElement('tr');
        var headerReqTd1 = document.createElement('td');
        var headerReqTd2 = document.createElement('td');
        
        headerReqTd2.setAttribute("style","word-break: break-all;");
        headerReqTd1.innerText = reqHeaders[n].name;
        headerReqTd2.innerText = reqHeaders[n].value;
        
        headerReqTr.appendChild(headerReqTd1);
        headerReqTr.appendChild(headerReqTd2);
        headerReqTable.appendChild(headerReqTr);
        
        if (reqHeaders[n].name == "Content-Type") {
            cType = reqHeaders[n].value;
            cType = cType.split(';')[0];
        }
        
        if (reqHeaders[n].name == "Referer") {
            ref = reqHeaders[n].value;
            ori = r.url;
            
            var ul = document.createElement('ul');
            var li = document.createElement('li');
            li.setAttribute('id',"cc" + r.requestId);
            li.innerText = r.url;
            ul.appendChild(li);
            $('#callChain').append(ul);
            console.log("drawn by loop:referrer:: ", r.url);
            flagRef = 1;
        }
    }
    
    if (flagRef != 1) {
        var li = document.createElement('li');
//        li.setAttribute('style','line-break');
        li.setAttribute('id',"cc" + r.requestId);
        li.innerText = r.url;
        $('#callChain').append(li);
        console.log("drawn by NoReferrer", r.url);
    }
    
    headerReqTable.appendChild(modalHeader);
    
    
    modal3.setAttribute('id',r.requestId);
    modal3.setAttribute('class','modal fade bs-example-modal-lg');
    modal3.setAttribute('tabindex','-1');
    modal3.setAttribute('role','dialog');
    modal3.setAttribute('aria-labelledby','myLargeModalLabel');
    modal2.setAttribute('class','modal-dialog modal-lg');
    modal2.setAttribute('role','document');
    modal1.setAttribute('class','modal-content');
    modalHeader.setAttribute('class','modal-header');
    modalTitle.setAttribute('class','modal-title');
    modalBody.setAttribute('class','modal-body');
    modalBody.setAttribute('id',"modal"+r.requestId);
    
    
    modalHeader.appendChild(modalTitle);
    modal1.appendChild(modalHeader);
    
//    headerGeneral.appendChild(headerGeneralP);
//    modalBody.appendChild(headerGeneral);
    modalBody.appendChild(br);
    modalBody.appendChild(br);
    modalBody.appendChild(headerReqTable);
    modalBody.appendChild(br);
    modalBody.appendChild(br);
    modal1.appendChild(modalBody);
    modal2.appendChild(modal1);
    modal3.appendChild(modal2);
    $('#modal').append(modal3);
}

function renderHeaderResp (d, id) {
//    console.log("RESP: ", d);
    var type = d.type;
    if (type == 'xmlhttprequest') {
        type = 'XHR';
    }
    
    //"content-type"
    
    
    var protocol, status, cType, cLen;
    
    status = d.statusCode;
    
    
    var url = d.url;
    protocol = url.split(':')[0];
    hostname = url.split('//')[1];
    hostname = hostname.split('/')[0];
    
    var resHeaders = {};
    resHeaders = d.responseHeaders;
    
    //modal
    var headerGenTable = document.createElement('table');
    var headerGenTr1 = document.createElement('tr');
    var headerGenTr2 = document.createElement('tr');
    var headerGenTr3 = document.createElement('tr');
    
    var headerGenTd11 = document.createElement('td');
    var headerGenTd12 = document.createElement('td');
    var headerGenTd21 = document.createElement('td');
    var headerGenTd22 = document.createElement('td');
    var headerGenTd31 = document.createElement('td');
    var headerGenTd32 = document.createElement('td');
    
    var headerGenBr = document.createElement('br');
    
    headerGenTable.setAttribute('class','headerGenTable');
    headerGenTd12.setAttribute('class','headerGenTableTd');
    headerGenTd22.setAttribute('class','headerGenTableTd');
    headerGenTd32.setAttribute('class','headerGenTableTd');
    
    headerGenTd11.innerText = "Request";
    headerGenTd12.innerText = url;
    headerGenTd21.innerText = "Method";
    headerGenTd22.innerText = d.method;
    headerGenTd31.innerText = "Status";
    headerGenTd32.innerText = d.statusLine;
        
    headerGenTr1.appendChild(headerGenTd11);
    headerGenTr1.appendChild(headerGenTd12);
    headerGenTr2.appendChild(headerGenTd21);
    headerGenTr2.appendChild(headerGenTd22);
    headerGenTr3.appendChild(headerGenTd31);
    headerGenTr3.appendChild(headerGenTd32);
    headerGenTable.appendChild(headerGenTr1);
    headerGenTable.appendChild(headerGenTr2);
    headerGenTable.appendChild(headerGenTr3);
    
    headerGenTable.appendChild(headerGenBr);
    headerGenTable.appendChild(headerGenBr);
    
    $('#modal'+d.requestId).prepend(headerGenTable);
    
    var headerResTable = document.createElement('table');
    var headerResTh = document.createElement('th');
    headerResTable.setAttribute('class','trafficTable');
    headerResTh.setAttribute('colspan','2');
    headerResTh.innerText = "Response HTTP Headers";
    headerResTable.appendChild(headerResTh);
    
    
    
    for (n=0; n < resHeaders.length; n++) {
        var headerResTr = document.createElement('tr');
        var headerResTd1 = document.createElement('td');
        var headerResTd2 = document.createElement('td');
        
        headerResTd2.setAttribute("style","word-break: break-all;");
        headerResTd1.innerText = resHeaders[n].name;
        headerResTd2.innerText = resHeaders[n].value;
        
        headerResTr.appendChild(headerResTd1);
        headerResTr.appendChild(headerResTd2);
        headerResTable.appendChild(headerResTr);
        
        if (resHeaders[n].name == "Content-Type") {
            cType = resHeaders[n].value;
            cType = cType.split(';')[0];
        }
        
        if (resHeaders[n].name == "content-length") {
            cLen = resHeaders[n].value;
        }
        
//        console.log("id: ", d.parentFrameId);
        if ( (refusedToLoadOnFrame === "ALLOW") && (d.parentFrameId == '-1') && ((resHeaders[n].name == "X-Frame-Options") || (resHeaders[n].name == "x-frame-options"))) {
            if ((resHeaders[n].value == "DENY") || (resHeaders[n].value == "deny") || (resHeaders[n].value == "SAMEORIGIN") || (resHeaders[n].value == "sameorigin")) {
                refusedToLoadOnFrame = "DENY";
                
                var modal3 = document.createElement('div');
                var modal2 = document.createElement('div');
                var modal1 = document.createElement('div');
                var modalHeader = document.createElement('div');
                var modalHeadClose = document.createElement('button');
                var modalTitle = document.createElement('h4');
                var modalBody = document.createElement('div');
                var br = document.createElement('br');
                var p = document.createElement('p');
                
                modalHeadClose.setAttribute('type','button');
                modalHeadClose.setAttribute('class','close');
                modalHeadClose.setAttribute('data-dismiss','modal');
                modalHeadClose.setAttribute('data-backdrop','false');
                modalHeadClose.innerText = "x";
                modalHeader.appendChild(modalHeadClose);

                modalTitle.innerText = "X-Frame-Options = 'DENY'";
                
                modal3.setAttribute('id', 'refusedToLoadOnFrameWrap');
                modal3.setAttribute('class','modal fade bs-example-modal-lg');
                modal3.setAttribute('tabindex','-1');
                modal3.setAttribute('role','dialog');
                modal3.setAttribute('aria-labelledby','myLargeModalLabel');
                modal2.setAttribute('class','modal-dialog');
                modal2.setAttribute('role','document');
                modal1.setAttribute('class','modal-content');
                modalHeader.setAttribute('class','modal-header');
                modalTitle.setAttribute('class','modal-title');
                modalBody.setAttribute('class','modal-body');
                modalBody.setAttribute('id','refusedToLoadOnFrame');

                modalHeader.appendChild(modalTitle);
                modal1.appendChild(modalHeader);
                p.innerText = "Heads Up! This URL couldn't load on frame window, but still you can track its components and live HTTP Headers by loading it on a new tab or window on a browser."
                modalBody.appendChild(br);
                modalBody.appendChild(br);
                modalBody.appendChild(p);
                modalBody.appendChild(br);
                modal1.appendChild(modalBody);
                modal2.appendChild(modal1);
                modal3.appendChild(modal2);
                $('#modal').append(modal3);
                $('#refusedToLoadOnFrameWrap').modal('show');
            }
        }
    }
    $('#modal'+d.requestId).append(headerResTable);
    
    
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var icoDiv = document.createElement('span');
    var span = document.createElement('span');
    var ico = document.createElement('span');
    
    tr.setAttribute("class", "iURL");
    tr.setAttribute('title',"Click on this to open the HTTP Headers for this URL component.");
    //tr.setAttribute("id", i);
    tr.setAttribute("data-toggle", "modal");
    tr.setAttribute("data-target", "#"+d.requestId);
    icoDiv.setAttribute("class","btnCopy");
    icoDiv.setAttribute('title',"Click here to copy this URL and open the HTTP Headers.");
    //icoDiv.setAttribute("data-toggle","popover");
    //icoDiv.setAttribute("data-trigger","hover");
    
    ico.setAttribute("class","glyphicon glyphicon-copy");
    span.setAttribute("style","z-index: -1;word-break: break-all;");
    span.setAttribute("title", url);
    td7.setAttribute("class","divURL");
    //td6.setAttribute("style","float:left;");
    td1.innerText = d.requestId;
    td2.innerText = status;
    
    if (cLen == undefined) {
        cLen = '';
    } else {
        td3.setAttribute('title', cLen + ' bytes');
    }
    
    if (cType == undefined) {
        cType = type;
    }
    
    td3.innerText = cLen;
    td4.innerText = cType;
    td5.innerText = '';
    td6.innerText = hostname;
    span.innerText = url;
    
    var dListExist = domainslist.indexOf(hostname);
//    console.log(dListExist);
    if (dListExist == '-1') {
        domainslist.push(hostname);
        
//        gsb(hostname); //call GSB function
        var li = document.createElement('li');
        li.innerText = hostname;
        $('#dList').append(li);
    }
    
    if ((status == 301) || (status == 302) || (status == 303)) {
        if (flagRedirect == 0) {
            $('#tagsDiv').css('display','block');
            redirectTag = "<span class='redirect'>" + 'Redirect' + "</span>";
            $('#tagsDetected').append(redirectTag);
            flagRedirect = 1;
        }
        
        var span1 = document.createElement('span');
        span1.setAttribute("class", 'redirect');
        span1.innerText = status + ' Redirect';
        td5.appendChild(span1);
    }
    
    if (status == 400) {
        if (flagBadRequest == 0) {
            $('#tagsDiv').css('display','block');
            badRequestTag = "<span class='badrequest'>" + status + " Bad Request</span>";
            $('#tagsDetected').append(badRequestTag);
            flagBadRequest = 1;
        }
        
        var span0 = document.createElement('span');
        span0.setAttribute("class", 'badrequest');
        span0.innerText = status;
        td5.appendChild(span0);
    }
    
    if (status == 404) {
        if (flagNotFound == 0) {
            $('#tagsDiv').css('display','block');
            notFoundTag = "<span class='notfound'>" + status + " Not Found</span>";
            $('#tagsDetected').append(notFoundTag);
            flagNotFound = 1;
        }
        
        var span0 = document.createElement('span');
        span0.setAttribute("class", 'notfound');
        span0.innerText = status;
        td5.appendChild(span0);
    }
    
    if (protocol == 'http') {
        if (flagNonSSL == 0) {
            $('#tagsDiv').css('display','block');
            nonsslTag = "<span class='nonssl'>" + protocol + "</span>";
            $("#tagsDetected").append(nonsslTag);
            flagNonSSL = 1;
        }
        
        var span2 = document.createElement('span');
        span2.setAttribute("class", 'nonssl');
        span2.innerText = protocol;
        td5.appendChild(span2);
    }
    
    var mediaSWF = url.match(/.swf/gi);
    
    if (mediaSWF == '.swf') {
        console.log(mediaSWF);
        if (flagFlash == 0) {
            $('#tagsDiv').css('display','block');
            flashTag = "<span class='flash'>" + 'Flash' + "</span>";
            $("#tagsDetected").append(flashTag);
            flagFlash = 1;
        }
        var span3 = document.createElement('span');
        span3.setAttribute("class", 'flash');
        span3.innerText = 'Flash';
        td5.appendChild(span3);
    }
    
    if ((url.match(/.nsv/gi)) || (url.match(/.mp4/gi)) || (url.match(/.m4v/gi)) || (url.match(/.mpg/gi)) || (url.match(/.flv/gi)) || (url.match(/.webm/gi))) {
        if (flagVideo == 0) {
            $('#tagsDiv').css('display','block');
            videoTag = "<span class='video'>" + 'Video' + "</span>";
            $("#tagsDetected").append(videoTag);
            flagVideo = 1;
        }
        var span4 = document.createElement('span');
        span4.setAttribute("class", 'video');
        span4.innerText = 'Video';
        td5.appendChild(span4);
    }
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    
    icoDiv.appendChild(ico);
    td7.appendChild(icoDiv);
    td7.appendChild(span);
    tr.appendChild(td7);
    
    //tbody.appendChild(tr);
    $('#tbody').append(tr);
    
    $('[data-toggle="popover"]').popover();
    $('.divURL').mouseover(function () {
       $(this).children('span:first').css("visibility","visible");
    });
    
    $('.divURL').mouseleave(function () {
       $(this).children('span:first').css("visibility","hidden");
    });
}

$(document).ready(function () {
    
    $('[data-toggle="tooltip"]').tooltip(); //tooltip
    
    $('#ctTab').attr("style","cursor:pointer");
	$('#ctTab a:first').tab('show');
    
    
    var reqId, resId;
    var res = [];
    var req = [];
    var referer = [];
    var referer1 = [];
    
    
    //request
    chrome.webRequest.onSendHeaders.addListener(function(dReq) {
        console.log("REQUEST: ", dReq);
        ir++;
        renderHeaderReq(dReq,ir);
    }, {
        urls: ["<all_urls>"],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    }, ["requestHeaders"]);
    
    //response
    chrome.webRequest.onHeadersReceived.addListener(function(dRes) {
        console.log("RESP: ", dRes);
        id++;
        renderHeaderResp(dRes,id);
    }, {
        urls: ["<all_urls>"],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    }, ["blocking", "responseHeaders"]);
    
//    chrome.devtools.network.onRequestFinished.addListener(
//          function(request) {
//            if (request.response.bodySize > 40*1024) {
//              chrome.devtools.inspectedWindow.eval(
//                  'console.log("Large image: " + unescape("' +
//                  escape(request.request.url) + '"))');
//            }
//              console.log("devtools: ", request);
//      });
    
//    chrome.devtools.network.getHAR(function (callback) {
//        console.log("getHAR: ", callback);
//    });
    
    $("[data-fixed-placeholder]").on("focus", function(e){
        //hide the fixed placeholder
    }).on("blur", function(e){
        //show the palceholder
       //1. check if there is no text inside... then don't show it (the original placeholder is still visible)
       //2. if there is text, calculate how wide it is
       //3. wrap input box in div, make it position relative, append another div inside with the text from fixed-placeholder
       //4. position this text next to the actual text in the input box
    });
    
    var inURL, btnFrame = $('#btnFrame');
    $('#inputFrame').keypress(function(e) {
        if(e.which == 13) {
            $('#tagsDetected').children().remove(); // clear tagsDetected
//            $('#tagsDetected').empty();
            $('#tagsDiv').css('display','none'); //hide tagsDiv
            flagRedirect = flagBadRequest = flagNotFound = flagNonSSL = flagFlash = flagVideo = 0;
            $('#liveTraffic caption').remove(); // clear export buttons
            $('#exportWrap').css('display','block');
            $('#liveTraffic tbody').children().remove(); //clear liveTraffic table
            $('#callChain').children().remove(); //clear callChain
            $('#dList').children().remove(); //clear domain list
            $('#inputFrame').css('cursor','wait');
            $('#inputFrame').prop('disabled', true);
            refusedToLoadOnFrame = "ALLOW";
            
            inURL = $('#inputFrame').val();
            if (inURL !== '' || inURL !== undefined) {
                safeURL(inURL);
            } else {
                alert("Entered input is invalid! Try again.");
            }
            //$(this).remove().attr("data-toggle");
//            ga('send', 'event', 'Website', 'submit', 'Submit URL to load on Frame window', {transport: 'beacon'});
//            console.log($('#frameLoader').contents().find("html").html());
            //
            
//            $('#urlLoadIco').toggleClass('rotate');
            var animateIconClass = "iconLoadAnimate", icoLoad = $('#urlLoadIco');
            icoLoad.removeClass('glyphicon glyphicon-globe');
            icoLoad.addClass('glyphicon glyphicon-refresh');
            icoLoad.addClass(animateIconClass);
            
            // Get iframe html source code
            $.ajax({
                url: $("iframe#frameLoader").attr("src"),
                type: 'GET',
                dataType: 'html'
            }).done(function(html) {
                console.log(html);
                icoLoad.removeClass(animateIconClass);
                icoLoad.removeClass('glyphicon glyphicon-refresh');
                icoLoad.addClass('glyphicon glyphicon-globe');
                $('#inputFrame').css('cursor','text');
                $('#inputFrame').prop('disabled', false);
                
                $('#srcCodePre').text(html);
                $('pre#srcCodePre').litelighter({
                    style: 'dark',
                    language: 'html'
                });
                $('#srcCodePre').css('min-height','600px');
            });
//            $('pre#srcCodePre').litelighter('enable');
            
            
        }
    });
//    var sfUrl = "https://api.yieldmanager.com/latest/gateway.php?cid=46214673";
    
    
    new Clipboard('.btnCopy', {
        target: function(trigger) {
            return trigger.nextElementSibling;
            console.log(this.nextElementSibling);
        }
    });
    
    $('.divURL').mouseover(function () {
       $(this).children('span:first').css("visibility","visible");
    });
    
    $('.divURL').mouseleave(function () {
       $(this).children('span:first').css("visibility","hidden");
    });
    
    $('.iURL').on('click', function () {}).on('click', '.btnCopy', function (e) {e.stopPropagation();return false;});
    
    makeAllSortable();
    
    $('#liveTrafficContainer').find('a:last').remove();
    $('#liveTrafficContainer').find('a:last').remove();
    
    
//    $('#exportXLSX').click(function() {
//        liveTableFn();
////       $('#liveTraffic').tableExport({type:'xlsx',escape:'false'}); 
//    });
//    $('#exportXLS').click(function() {
//       $('#liveTraffic').tableExport({type:'xls',escape:'false'}); 
//    });
//    $('#exportCSV').click(function() {
//       $('#liveTraffic').tableExport({type:'csv',escape:'false'}); 
//    });
//    $('#exportTXT').click(function() {
//       $('#liveTraffic').tableExport({type:'txt',escape:'false'}); 
//    });
    
    callExport();
    
//     $('[data-toggle="tooltipURL"]').hover(function(){
//            $('#inputFrame').popover('show');
//        setTimeout(function() {
//            $('.popover').fadeOut('slow',function() {}); 
//        },4000);
//    });
         $('[data-toggle="tooltipExport"]').hover(function(){
                $('#exportIcon').popover('show');
            setTimeout(function() {
                $('.popover').fadeOut('slow',function() {}); 
            },5000);
        });
    
    $('ul.tree li:last-child').addClass('last');
    
    // scrollup div
    var isVisible = false;
    $('#scrollup').click(function(){
        $('html, body').animate({
        scrollTop: $('body').offset().top
        }, 'slow');
    });
    $(window).scroll(function(){
         var shouldBeVisible = $(window).scrollTop()>500;
         if (shouldBeVisible && !isVisible) {
              isVisible = true;
              $('#scrollup').show(1000);
         } else if (isVisible && !shouldBeVisible) {
              isVisible = false;
              $('#scrollup').hide(1000);
        }
    });
    
    chkIncognitoMode();

    // Google Universal Analytics
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://ssl.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-74793124-4', 'auto', {'alwaysSendReferrer': true});
//    ga('set', 'checkProtocolTask', function(){});
//    ga('require', 'displayfeatures');
//    ga('send', 'pageview', 'ct/creative-tester.html');
});