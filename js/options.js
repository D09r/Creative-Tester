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

var oProxy = {}, count = 0, proxyProfile = {}, total;
var id = {};
var auth = {};
var timer = {};

/**
* Save New Proxy Profile
*
*/
$('#set').click(function () {
	try {
		id.a = document.getElementById('proxyName').value;
		id.a = id.a[0].toUpperCase() + id['a'].slice(1);
		id.b = document.getElementById('proxyScheme').value;
		id.c = document.getElementById('proxyServer').value;
		id.d = document.getElementById('proxyPort').value;
		id.e = document.getElementById('proxyBypassList').value;
		id.e = id['e'].toLowerCase();
		oProxy[id.a] = id;
		//console.log(oProxy[id.a]);
		if ((id.a && id.b && id.c && id.d) == "" || (id.a && id.b && id.c && id.d) == null) {
			//alert("Please Fill All Required Field");
		} else {
			chrome.storage.sync.set(oProxy, function () {});
		}
		
		//document.getElementById('proxyForm').setAttribute("method", "post");
		//trigger event to GA
//		ga('send', 'event', 'ProxyProfiles', 'sumbit', 'Add/Edit Manual Proxy Profile', {transport: 'beacon'});	
	}
	
	catch (err) {
		console.log("Error (Add/Edit Proxy Profile): ", err);
	}
    
});

/**
* Delete Proxy Profile
*
*/
function delProxyProfile (delIt) {
	$('#delProxy').click(function () {
		chrome.storage.sync.remove(delIt);
	});
}
   
/**
* Loads Proxy Profiles Table 'proTab'
*
*/
function myDiv(t1, t2, t3, t4, t5) {
    //$('#tabEmptyTr').hide();
    var tr = document.createElement('tr');
    tr.setAttribute("class", "row");
    
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');    
    
    td1.setAttribute("id", "" + t1 + "");
    td1.setAttribute("title", 'click to edit ' + t1 + ' proxy profile');
    td1.setAttribute("style", "padding-left:0.2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;");
    td2.setAttribute("class", "oP");
    td2.setAttribute("title", 'click to edit ' + t1 + ' proxy profile');
    td2.setAttribute("style", "padding-left:0.1em;text-overflow:clip;overflow:hidden;white-space:nowrap;");
    td3.setAttribute("class", "oP");
    td3.setAttribute("title", 'click to edit ' + t1 + ' proxy profile');
    td3.setAttribute("style", "padding-left:0.1em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;");
    td4.setAttribute("class", "oP");
    td4.setAttribute("title", 'click to edit ' + t1 + ' proxy profile');
    td4.setAttribute("style", "padding-left:0.1em;text-overflow:clip;overflow:hidden;white-space:nowrap;");
    td5.setAttribute("class", "oP");
    td5.setAttribute("title", 'BypassList: ' + t5);
    td5.setAttribute("style", "padding-left:0.1em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;");
    
    td1.innerText = t1;
    td2.innerText = t2;
    td3.innerText = t3;
    td4.innerText = t4;
    td5.innerText = t5;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    
    document.getElementById('proTab').appendChild(tr);
}

/**
* Refresh Current Tab
*
*/
function refresh(reloadChk) {
    if (reloadChk == true) {
        chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.reload(tab.id);
        });
    }
}

function tabEmpty () {
	var tr0 = document.createElement('tr');
	var td0 = document.createElement('td');
	tr0.setAttribute('id','tabEmptyTr');
	td0.setAttribute('id','tabEmptyTd');
	td0.setAttribute('colspan','5');
	td0.setAttribute('align','center');
	td0.innerText = "Hey!! Looks like you haven't created any manual proxy profile, click 'Add Proxy' to create one.";
	tr0.appendChild(td0);
	document.getElementById('proTab').appendChild(tr0);
}

document.body.onload = function () {
    
    /**
    * Loads i18n locales in Options UI
    *
    */
    document.getElementById('menuListGeneral').innerHTML = chrome.i18n.getMessage("menuListGeneral");
    document.getElementById('menuListProxyProfiles').innerHTML = chrome.i18n.getMessage("menuListProxyProfiles");
    document.getElementById('menuListHelp').innerHTML = chrome.i18n.getMessage("menuListHelp");
    document.getElementById('menuListAbout').innerHTML = chrome.i18n.getMessage("menuListAbout");
    document.getElementById('autoReload').innerHTML = chrome.i18n.getMessage("autoReload");
    document.getElementById('autoTimeout').innerHTML = chrome.i18n.getMessage("autoTimeout");
    document.getElementById('turnNotify').innerHTML = chrome.i18n.getMessage("turnNotify");
    document.getElementById('persistentAuth').innerHTML = chrome.i18n.getMessage("persistentAuth");
    document.getElementById('feedbackTitle').innerHTML = chrome.i18n.getMessage("feedbackTitle");
    document.getElementById('feedbackLink').innerHTML = chrome.i18n.getMessage("feedbackLink");
    
    /**
    * Switch Frames between Proxy Profiles Table and New Proxy Profile
    *
    */
    $('#newProxyProfile').click(function () {
        $("#proTab").hide(800, 'swing');
        $('#newProxyProfile').hide();
		document.getElementById('proxyName').disabled = false;
		document.getElementById('delProxy').disabled = true;
		document.getElementById('delProxy').style.cursor = 'not-allowed';
        $('#newPPContainer').show(600, 'swing');
    });
    
    $("#newPPClose").click(function () {
        $('#newPPContainer').hide(200, 'swing');
        $("#proTab").show(800, 'swing');
        $('#newProxyProfile').show();
		document.getElementById('proxyForm').reset();
    });
        
    /**
    * Load User Settings
    *
    * * Refresh Current Page, Notifications, Persistent Authentication, TimeOut
    *
    */
    chrome.storage.sync.get(null, function (i) {
        
        if (i.reloadStatus) {
            if (i.reloadStatus != true) {
                document.getElementById('reloadTabChk').checked = false;
            } else {
                document.getElementById('reloadTabChk').checked = true;
            }    
        } else if (i.reloadStatus == undefined) {
            oProxy.reloadStatus = true;
            chrome.storage.sync.set(oProxy, function () {});
            document.getElementById('reloadTabChk').checked = true;
        }
        
        if (i.notifyStatus) {
            if (i.notifyStatus != true) {
                document.getElementById('notifyChk').checked = false;
            } else {
                document.getElementById('notifyChk').checked = true;
            }
        } else if (i.notifyStatus == undefined) {
            oProxy.notifyStatus = true;
            chrome.storage.sync.set(oProxy, function (){});
            document.getElementById('notifyChk').checked = true;
        }
		
		/*
		if (i.proxyProfile) {
            if (i.proxyProfile.total == 0) {
				tabEmpty();
            }
        } else if (i.proxyProfile == undefined) {
			proxyProfile.total = 0;
            oProxy.proxyProfile = proxyProfile;
            chrome.storage.sync.set(oProxy, function (){
				tabEmpty();
			});
        }
		*/
        
        if (i.auth) {
            if (i.auth.z0 != true) {
                document.getElementById("oAuthFrameChk").checked = false;
            } else {
                document.getElementById("oAuthFrameChk").checked = true;
                $('#oAuthFrame').show(1000);
                document.getElementById('username').placeholder = i.auth.z1;
                document.getElementById('username').title = "Type Proxy Username! (Should be Minimum of 4 characters)";
                document.getElementById('password').placeholder = "password";
                document.getElementById('password').value = i.auth.z2;
                document.getElementById('password').style.cursor = "not-allowed";
                document.getElementById('usrPwdSaveBtn').style.cursor = "not-allowed";
            }
        }
        
        
        if (i.timer) {
            if (i.timer.status == true) {
            document.getElementById("timerFrameChk").checked = true;
            $('#timerFrame').show(1000);
            switch (i.timer.t) {
                case 600000:
                    document.getElementById("timer10").selected = true;
                    break;
                case 1200000:
                    document.getElementById("timer20").selected = true;
                    break;
                case 1800000:
                    document.getElementById("timer30").selected = true;
                    break;
                case 3600000:
                    document.getElementById("timer60").selected = true;
                    break;
                default:
                    break;
            }
            document.getElementById("timerOptions").selected = i.timer.t;
        }   
        }
    });
            
    /**
    * Loads Manual Proxy Profiles
    *
    */
    chrome.storage.sync.get(null, function(items) {
        
        for (key in items) {
            if ((key.length > 2) && (key != 'myUA') && (key != 'setUA') && (key != 'proxyProfile') && (key != 'auth') && (key != 'timer') && (key != 'notifyStatus') && (key != 'reloadStatus') && (key != 'rules') && (key != 'mode') && (key != 'activeProxy')) {
                var n = {};
                n.i = key;
                var s1 = items[n.i].a;
                if (items[n.i].b == 'quic') {
                    var s2 = 'ftp';
                } else {
                    var s2 = items[n.i].b;
                }
                var s3 = items[n.i].c;
                var s4 = items[n.i].d;
                var s5 = items[n.i].e;
                if (s5 == undefined) {
                    s5 = '';
                }
                myDiv(s1,s2,s3,s4,s5);
				count++;
            }
        }
		
		console.log("Manual Proxy Profile: ", count);
		var proxyProfile = {};
		proxyProfile.total = count;
		
		if (items.proxyProfile == undefined) {
				proxyProfile.active = 'direct';
				oProxy.proxyProfile = proxyProfile;
				chrome.storage.sync.set(oProxy, function (){
					tabEmpty();
				});
			} else if (proxyProfile.total == 0) {
				tabEmpty();
            }
        
        /**
        * Edit Proxy Profiles
        *
        */
        $('.row').click(function(){
            var tempProfile = this.innerText;
            tempProfile = tempProfile.split("	");
            pN = document.getElementById('proxyName');
			pN.value = tempProfile[0];
            pN.disabled = true;
			pN.style.cursor = 'help';
			pN.title = "You can't edit existing proxy 'profile name'; only proxy server, port, type and bypasslist can be edit.";
            switch (tempProfile[1]) {
                case 'http':
                    document.getElementById("http").selected = true;
                    break;
                case 'https':
                    document.getElementById("https").selected = true;
                    break;
                case 'ftp':
                    document.getElementById("ftp").selected = true;
                    break;
                case 'socks4':
                    document.getElementById("socks4").selected = true;
                    break;
                case 'socks5':
                    document.getElementById("socks5").selected = true;
                    break;
                default:
                    break;
            }
            document.getElementById('proxyServer').value = tempProfile[2];
            document.getElementById('proxyPort').value = tempProfile[3];
            document.getElementById('proxyBypassList').value = tempProfile[4];
            $("#proTab").hide(1000,'swing');
            $('#newProxyProfile').hide();
			var dP = document.getElementById('delProxy');
			dP.disabled = false;
			dP.title = "Delete this proxy profile";
			dP.style.cursor = "pointer";
            $('#newPPContainer').show(1000,'swing');
			$('#delProxy').click(function () {
				//delProxyProfile(tempProfile[0]);
				chrome.storage.sync.remove(tempProfile[0]);
//				ga('send', 'event', 'DeleteProxyProfile', 'click', 'Delete Proxy Profile', {transport: 'beacon'});
			})
			
//        ga('send', 'event', 'ProxyProfiles', 'click', 'Edit Proxy Profiles', {transport: 'beacon'});
        });
    });
 
    /**
    * Alert User about Changes Saved
    * * alertSaved
    *
    */
    function alertSaved(aUser) {
        switch(aUser) {
            case 1:
                document.getElementById('alertSaveReload').style.visibility = "visible";
                setTimeout(function() {
                    alertClosed(1);
                }, 2000);
                break;
            case 2:
                document.getElementById('alertSaveTime').style.visibility = "visible";
                setTimeout(function() {
                    alertClosed(2);
                }, 2000);
                break;
            case 3:
                document.getElementById('alertNotify').style.visibility = "visible";
                setTimeout(function() {
                    alertClosed(3);
                }, 2000);
                break;
            case 4:
                document.getElementById('alertSaveAuth').style.visibility = "visible";
                setTimeout(function() {
                    alertClosed(4);
                }, 2000);
                break;
            default:
                break;                
        }
    }
    
    /**
    * Alert User of Changes Saved
    * * alertClosed
    *
    */
    function alertClosed(aUsrCls) {
        switch(aUsrCls) {
            case 1:
                document.getElementById('alertSaveReload').style.visibility = "hidden";
                break;
            case 2:
                document.getElementById('alertSaveTime').style.visibility = "hidden";
                break;
            case 3:
                document.getElementById('alertNotify').style.visibility = "hidden";
                break;
            case 4:
                document.getElementById('alertSaveAuth').style.visibility = "hidden";
                break;
            default:
                break;
        }
    }

    /**
    * TimeOut Div #timerFrame
    *
    */
    $('#timerFrameChk').click(function(){
        this.checked?$('#timerFrame').show(1000):$('#timerFrame').hide(1000);
    });
    
    /**
    * Persistent Proxy Authentication Div #oAuthFrame
    *
    */
    $('#oAuthFrameChk').click(function(){
        this.checked?$('#oAuthFrame').show(1000):$('#oAuthFrame').hide(1000);
    });
    
    /**
    * Persistent Proxy Authentication Form Conditional
    *
    */
    $('#username').keyup(function(){
        var value = this.value;
            if (value && value.length > 3) {
                document.getElementById("password").disabled = false;
                document.getElementById("password").style.cursor = "text";
                document.getElementById("password").value = "";
                $('#password').keyup(function(){
                    var value = this.value;
                    if (value && value.length > 4) {
                        document.getElementById("usrPwdSaveBtn").disabled = false;
                        document.getElementById("usrPwdSaveBtn").style.cursor = "pointer";
                    } else {
                        document.getElementById("usrPwdSaveBtn").disabled = true;
                        document.getElementById("usrPwdSaveBtn").style.cursor = "not-allowed";
                    }
                });
            } else {
                document.getElementById("password").disabled = true;
                document.getElementById("usrPwdSaveBtn").disabled = true;
                document.getElementById("password").style.cursor = "not-allowed";
                document.getElementById("usrPwdSaveBtn").style.cursor = "not-allowed";
            }
    });
    
    /**
    * Set Persistent Proxy Authentication
    *
    */
    $('#usrPwdSaveBtn').click(function(){
        auth.z0 = true;
        auth.z1 = document.getElementById('username').value;
        auth.z2 = document.getElementById('password').value;
        oProxy['auth'] = auth;
        chrome.storage.sync.set(oProxy, function() {});
        alertSaved(4);
//        ga('send', 'event', 'Authentication', 'submit', 'Persistent Proxy Authentication', {transport: 'beacon'});
    });
    
    /**
    * Set Refresh Current Page
    *
    */
    function saveReload (active) {
        var active, reloadStatus;
        oProxy.reloadStatus = active;
        chrome.storage.sync.set(oProxy, function() {
            alertSaved(1);         
        });
//        ga('send', 'event', 'Refresh', 'click', 'Refresh Current Tab on Proxy Profile Changes');
    }
    
    /**
    * Set TimeOut Options
    *
    */
    function saveTimer (active, getTime) {
        var active, getTime;
        timer['status'] = active;
        timer['t'] = getTime;
        oProxy['timer'] = timer;
        chrome.storage.sync.set(oProxy, function() {
            alertSaved(2);
        });
//        ga('send', 'event', 'TimeOut', 'click', 'Set TimeOut to disable Custom Proxy');
    }
    
    /**
    * Set Notifications
    *
    */
    function saveNotify (active) {
        var active, notifyStatus;
        oProxy.notifyStatus = active;
        chrome.storage.sync.set(oProxy, function() {
            alertSaved(3);         
        });
//        ga('send', 'event', 'Notification', 'click', 'Turn On/Off Notifications');
    }
    
    /**
    * Set Proxy Authentication Credentials
    *
    */
    function saveAuth (z0, z1, z2) {
        auth.z0 = z0;
        auth.z1 = z1;
        auth.z2 = z2;
        oProxy['auth'] = auth;
        chrome.storage.sync.set(oProxy, function() {
        alertSaved(4);
        });
    }
    
    /**
    * Clear Proxy Authentication Credentials
    *
    */
    $('#oAuthFrameChk').change(function(){
        if (document.getElementById('oAuthFrameChk').checked != true) {
            document.getElementById('username').placeholder = "username";
            document.getElementById('password').placeholder = "password";
            saveAuth(false,null,null);
        }
    });
    
    /**
    * Clear TimeOut Options
    *
    */
    $('#timerFrameChk').change(function(){
        if (document.getElementById('timerFrameChk').checked != true) {
            document.getElementById("defTimer").selected = true;
            saveTimer(false,null);
            alertSaved(2);
        }
    });
    
    /**
    * Set TimeOut to Disable Custom Proxy Profile
    *
    */
    $('#timerOptions').change(function(){
        var t0 = document.getElementById("timer10").selected;
        var t1 = document.getElementById("timer20").selected;
        var t2 = document.getElementById("timer30").selected;
        var t3 = document.getElementById("timer60").selected;
        if (t0 == true) {
            saveTimer(true,600000);
        } else if (t1 == true) {
                saveTimer(true,1200000);
        } else if (t2 == true) {
                saveTimer(true,1800000);
        } else if (t3 == true) {
                saveTimer(true,3600000);
        } else {
                saveTimer(false,null);
        }    
    });
    
        $('#reloadTabChk').change(function(){
        if (document.getElementById('reloadTabChk').checked != true) {
            saveReload(false);
        } else {
            saveReload(true);
        }
    });
    
    /**
    * Set/Clear Notifications Settings
    *
    */
    $('#notifyDiv').change(function(){
        if (document.getElementById('notifyChk').checked != true) {
            saveNotify(false);
        } else {
            saveNotify(true);
        }
    });
    
    /**
    * Export Custom Proxy Profiles in a JSON file
    *
    */
    chrome.storage.sync.get(null, function(items) {
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
        $('<a href="data:' + data + '" download="Feed Proxy.json">Export Proxy Profiles</a>').appendTo('#backup');
    });
    
    /**
    * Feedback
    *
    */
    $('.feedback').click(function(){
//        ga('send', 'event', 'Feedback', 'click', 'Feedback', {transport: 'beacon'});
        chrome.tabs.create({
            url: 'https://chrome.google.com/webstore/detail/creative-tester-live-http/ibbejlanbkoaepocgcebajilofpnappm/reviews',
            active: true,
            pinned: false
        });
    });
    
    /**
    * FAQ section
    *
    */
    $('#faq1Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq1Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ1 - create a custom proxy profile');
    });
    $('#faq2Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq2Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ2 - edit custom proxy profile');
    });
    $('#faq3Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq3Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ3 - disable proxy or direct mode');
    });
    $('#faq4Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq4Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ4 - enable system proxy mode');
    });
    $('#faq5Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq5Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ5 - export proxy profiles');
    });
    $('#faq6Ques').click(function(){
        $('.faqAnswers').hide(1000);
        $('#faq6Ans').show(1000);
//        ga('send', 'event', 'FAQ', 'click', 'FAQ6 - live http headers');
    });
     
    // Google Universal Analytics
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://ssl.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-74793124-4', 'auto');
//    ga('set', 'checkProtocolTask', function(){});
//    ga('require', 'displayfeatures');
//    ga('send', 'pageview', '/options.html');

}

/**
* Tracking Object Values Changes
* * For Backend Testing
*
*/
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
    });