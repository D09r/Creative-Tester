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

var count = 0;
var p1,p2,p3,p4,p5,g1,g2,g3,g4,g5,s0,s1,s2;
var n = {};
var oProxy = {};
var config = {};
var myUA, ua, uaString;

/**
 * Loads Proxy Profile List
 *
 */
function myDiv(t1, t2, t3, i) {
    var div = document.createElement('div');
    var td0 = document.createElement('img');
    var td1 = document.createElement('span');
    //td1.className = "item";
    td0.for = "proxies";
    td1.for = "proxies";
    div.className = "item";
    div.setAttribute("id", "proxyItems");
    td1.setAttribute("id", i);
    td1.setAttribute("title", "Proxy server: " + t2 +':'+ t3);
    switch (activeProxy) {
		case t1:
			td0.setAttribute("src", "../img/fi/tick-circle.png");
			break;
		/*
		case 'direct':
			if (i == 0) {
				var noP = document.getElementById('noProxy');
				var dm = document.createElement('img');
				dm.for = "noProxy";
				dm.setAttribute("src", "../img/fi/tick-circle.png");
				noP.insertBefore(dm,menuPopNoProxy);	
			}
		break;
		*/
		case 'system':
			document.getElementById('sysProxyImg').setAttribute("src", "../img/fi/tick-circle.png");
			document.getElementById('sysProxy').setAttribute('title','System proxy was active!');
			td0.setAttribute("src", "../img/fi/inactive.png");
			break;
		
		default:
			td0.setAttribute("src", "../img/fi/inactive.png");
			break;
	}
	
    td1.innerText = t1;
    div.appendChild(td0);
    div.appendChild(td1);
        
    if (i == 0) {
	document.getElementById("separatorOptionsCustom").setAttribute("class","separator");
    }
    document.getElementById("proxies").appendChild(div);
}

/**
 * Close Popup Window
 *
 */
function closePop() {
    window.close();
}

/**
 * Refresh current page upon proxy profile changes
 *
 */
function refresh() {
	chrome.tabs.getSelected(null, function (tab) {
		chrome.tabs.reload(tab.id);
	});
}

//notification.proxy.changes
function notifyMe(profile, name, host, port) {
    if (Notification.permission == "denied") {
		Notification.requestPermission();
	} else {
		switch (profile) {
			case direct:
				var notification = {
					type: 'basic',
                    title: 'Proxy Disabled!',
                    message: 'Traffic through direct connection mode',
                    iconUrl: '../img/fi/mars128.png'
				};
                chrome.notifications.create("s", notification, function () {});
                break;
            case sys:
                var notification = {
                    type: 'basic',
                    title: 'System Proxy Enabled!',
                    message: 'Traffic through system proxy mode',
                    iconUrl: '../img/fi/mars128.png'
                };
                chrome.notifications.create("s", notification, function () {});
                break;
             case custom:
                var notification = {
                	type: 'basic',
                	title: name+' Proxy Profile Enabled!',
                	message: host+':'+port,
                	iconUrl: '../img/fi/mars128.png'
                };
                chrome.notifications.create("s", notification, function () {});
                break;
             default:
                var notification = new Notification('Chrome Proxy Settings Changed!', {
                   	icon: '../img/fi/mars128.png',
                    body: "Hey! Look like some other extension conflict with proxy settings."
                });
				break;
            }
        }
}

/**
* Set Direct Connection (No Proxy Profile)
* config.mode = 'direct';
*
*/
function direct() {
    var config = {
        mode: 'direct'
    };
    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {
    });
    
	oProxy.proxyProfile.active = "direct";
    chrome.storage.sync.set(oProxy, function() {});
	
    chrome.storage.sync.get(null, function (items) {
        if (items.notifyStatus != false) {
            notifyMe(direct);
        } if (items.reloadStatus != false) {
            refresh();
        }
    });
    
    chrome.browserAction.setBadgeText({text: ""});
    chrome.browserAction.setTitle({title: "Proxy Disabled!"});
    
	closePop();
	
//    ga('send', 'event', 'NoProxy', 'click', 'BrowserAction - No Proxy', {transport: 'beacon'});
    
}

/**
* Set System Proxy Profile
* config.mode = 'system';
*
*/
function sys() {
    var config = {
        mode: 'system'
    };
    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {
				chrome.browserAction.setBadgeBackgroundColor({
                        color: [51, 153, 51, 100]
                    });
				chrome.browserAction.setBadgeText({text: "S"});
				chrome.browserAction.setTitle({title: "System proxy enabled!"});
    });
    
    oProxy.proxyProfile.active = "system";
    chrome.storage.sync.set(oProxy, function() {});
    
    chrome.storage.sync.get(null, function (items) {
        if (items.notifyStatus != false) {
            notifyMe(sys);
        } if (items.reloadStatus != false) {
            refresh();
        }
    });
    
	closePop();
	
//    ga('send', 'event', 'SystemProxy', 'click', 'BrowserAction - System Proxy', {transport: 'beacon'});
    
    
}

/**
* Notify User about TimeOut to Turn Off Custom Proxy
* and Switching to Direct Connection
*
*/
function timeout () {
    var notification = {
                        type: 'progress',
                        title: 'Switch to Direct Mode! (No Proxy)',
                        message: 'This page will reload in 10 seconds',
                        iconUrl: '../img/fi/mars128.png',
                        progress:90
                    };
                    chrome.notifications.create("s", notification, function(){});
    window.setTimeout(direct, 10000);
}

/**
* Timer function to trigger timeout function
* to Turn Off Custom Proxy
*
*/
function timer (getT) {
    switch (getT) {
        case 600000:
            window.setTimeout(timeout, 590000);
            break;
        case 1200000:
            window.setTimeout(timeout, 1180000);
            break;
        case 1800000:
            window.setTimeout(timeout, 1780000);
            break;
        case 3600000:
            window.setTimeout(timeout, 3580000);
            break;
        default:
            break;
    }
}

/**
* Handling WebRequest of Proxy Authentication
*
*/
function oAuth(token0,token1) {
    var token0,token1;
    console.log(token0,token1);
    chrome.webRequest.onAuthRequired.addListener(
        function(details, callbackFn) {
            console.log("onAuthRequired!", details, callbackFn);
            callbackFn({
                authCredentials: {username: ''+token0+'', password: ''+token1+''}
            });
        },
        {urls: ["<all_urls>"]},
        ['asyncBlocking']
    );
}

/**
* Set Custom Proxy Profile
* config.mode = 'fixed_servers';
* 
*/
function custom (g1,g2,g3,g4,g5) {
    var exceptionList = g5.split(/(?:,| |;)+/); //convert variable g5 from 'string' to array
    var rules = {};
    var singleProxy = {};
    
    oProxy.proxyProfile.active = g1;
    chrome.storage.sync.set(oProxy, function() {});
    
    config["mode"] = 'fixed_servers';
    rules["singleProxy"] = {scheme: "http", host: "proxy", port: 80}; //dummy.values
    rules["singleProxy"].scheme = g2;
    rules["singleProxy"].host = g3;
    rules["singleProxy"].port = +g4;    
    rules["bypassList"] = exceptionList;
    config["rules"] = rules;
    console.log(config);
  
    chrome.proxy.settings.set(
            {value: config, scope: 'regular'},
            function() {
				chrome.browserAction.setBadgeBackgroundColor({
                        color: [51, 153, 51, 100]
                    });
//                chrome.browserAction.setIcon({
//                  path : "../img/fi/ba-mars32.png"
//                });
				chrome.browserAction.setBadgeText({text: "P"});
				chrome.browserAction.setTitle({title: g1+" proxy profile enabled! Server: "+g3+':'+g4});
        });
	
	
    chrome.storage.sync.get(null, function (items) {
        if (items.notifyStatus != false) {
            notifyMe(custom,g1,g3,g4);
        }
        if (items.reloadStatus != false) {
            refresh();
        }
        if (items.auth.z0 != false) {
            var tok0, tok1;
            tok0 = items.auth.z1;
            tok1 = items.auth.z2;
            oAuth(tok0,tok1);
        }
        if (items.timer.status != false) {
            var t = items.timer.t;
            timer(t);
        }
        
    });
	
	closePop();
		
//    ga('send', 'event', 'CustomProxy', 'click', 'BrowserAction - Custom Proxy', {transport: 'beacon'});
}

/**
* Get Proxy Profile details of User Chosen on Popup Window
* 
*/
function playProxy (getProxy) {
    chrome.storage.sync.get(null, function(items) {
        for (key in items) {
            if (key == getProxy) {
                n.i = key;
                p1 = items[n.i].a;
                p2 = items[n.i].b;
                p3 = items[n.i].c;
                p4 = items[n.i].d;
                p5 = items[n.i].e;
                console.log("playProxy:",p1,p2,p3,p4,p5);
                custom(p1,p2,p3,p4,p5);
            }
        }
    });
}

/**
 * Open \options.html page in New Tab
 *
 */
function optionsTab () {
    chrome.tabs.create({
        url: 'options.html',
        active: true,
        pinned: false
    });
//    ga('send', 'event', 'Settings', 'click', 'BrowserAction - Settings', {transport: 'beacon'});
}

/**
 * Open \creative-tester.html page in New Tab
 *
 */
function httpHeaderTab () {
    chrome.tabs.create({
        url: 'ct/creative-tester.html',
        active: true,
        pinned: false
    });
//    ga('send', 'event', 'CreativeTester', 'click', 'BrowserAction - Creative Tester', {transport: 'beacon'});
}

/**
 * Open \options.html#newProxyProfile page in New Tab
 *
 */
function newProfileTab () {
    chrome.tabs.create({
        url: 'options.html#proxyProfiles',
        active: true
    });
//    ga('send', 'event', 'NewProxyProfile', 'click', 'BrowserAction - New Proxy Profile', {transport: 'beacon'});
}

/**
* Add EventListener for 'Click' action on Popup Window
*  * Settings Page (\options.html)
*  * Direct Connection (No Proxy)
*  * System Proxy
*  * New Proxy Profile Page (\options.html#newProxyProfile)
*
*/
function switchProxy () {
    //if (Notification.permission !== "granted")
        //window.webkitNotifications.requestPermission();
      //  Notification.requestPermission();
    document.querySelector('#website').addEventListener('click', function () {
        chrome.tabs.create({
        url: 'https://chrome.google.com/webstore/detail/creative-tester-live-http/ibbejlanbkoaepocgcebajilofpnappm',
        active: true
        });
//        ga('send', 'event', 'Website', 'click', 'BrowserAction - Website', {transport: 'beacon'});
    });
    document.querySelector('#help').addEventListener('click', function () {
        chrome.tabs.create({
        url: 'https://chrome.google.com/webstore/detail/creative-tester-live-http/ibbejlanbkoaepocgcebajilofpnappm/support',
        active: true
        });
//        ga('send', 'event', 'Help', 'click', 'BrowserAction - Help', {transport: 'beacon'});
    });
    document.querySelector('#httpHeader').addEventListener('click', httpHeaderTab);
    document.querySelector('#settings').addEventListener('click', optionsTab);
    document.querySelector('#noProxy').addEventListener('click', direct);
    document.querySelector('#sysProxy').addEventListener('click', sys);
    document.querySelector('#newPPPop').addEventListener('click', newProfileTab);
}

/*
function offlineStatus() {
        console.log("offline");
        var notification = {
                        type: 'basic',
                        title: "There is no Internet connection!",
                        message: "",
                        iconUrl: '../img/fp/fp-128.png',
                    };
        chrome.notifications.create("s", notification, function() {});
}


function onlineStatus () {
        console.log("online");
        var notification = {
                        type: 'basic',
                        title: 'Online!',
                        message: '',
                        iconUrl: '../img/fp/fp-128.png',
                    };
                    chrome.notifications.create("s", notification, function() {});
}*/

/**
 Set User Agents
 *
 */
function userAgent(ua) {
    switch (ua) {
        case 'uaNoOverride':
            chrome.storage.sync.get(null, function(i) {
                uaString = i.myUA;
                });
            break;
        case 'uaAndroid4':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
            break;
        case 'uaAndroid2':
            uaString = "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
            break;
        case 'uaIOS9iPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1";
            break;
        case 'uaIOS8iPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4";
            break;
        case 'uaIOS9iPad':
            uaString = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1";
            break;
        case 'uaIPod':
            uaString = "Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3";
            break;
        case 'uaWinPh8u':
            uaString = "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537";
            break;
        case 'uaWinPh8':
            uaString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)";
            break;
        case 'uaWinPh7':
            uaString = "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG; GW910)";
            break;
        case 'uaCr49Mac':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36";
            break;
        case 'uaCr47Win':
            uaString = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36";
            break;
        case 'uaCr47iPad':
            uaString = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.70 Mobile/13B143 Safari/601.1.46";
            break;
        case 'uaCr49iPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/49.0.2623.109 Mobile/13E238 Safari/601.1.46";
            break;
        case 'uaCr47AndTab':
            uaString = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.76 Safari/537.36";
            break;
        case 'uaCr47AndMob':
            uaString = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.76 Mobile Safari/537.36";
            break;
        case 'uaCr33Ubu':
            uaString = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/33.0.1750.152 Chrome/33.0.1750.152 Safari/537.36";
            break;
        case 'uaFF45Mac':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:45.0) Gecko/20100101 Firefox/45.0";
            break;
        case 'uaFF45Win':
            uaString = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0";
            break;
        case 'uaFF45iPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) FxiOS/3.0 Mobile/13E238 Safari/601.1.46";
            break;
        case 'uaFF45AndTab':
            uaString = "Mozilla/5.0 (Android 5.1.1; Tablet; rv:45.0) Gecko/45.0 Firefox/45.0";
            break;
        case 'uaFF45AndMob':
            uaString = "Mozilla/5.0 (Android 5.1.1; Mobile; rv:45.0) Gecko/45.0 Firefox/45.0";
            break;
        case 'uaFF42Ubu':
            uaString = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:42.0) Gecko/20130331 Firefox/42.0";
            break;
        case 'uaEdge':
            uaString = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240";
            break;
        case 'uaIE11':
            uaString = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko";
            break;
        case 'uaIE10':
            uaString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)";
            break;
        case 'uaIE9':
            uaString = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
            break;
        case 'uaIE8':
            uaString = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";
            break;
        case 'uaIE7':
            uaString = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)";
            break;
        case 'uaIE6':
            uaString = "Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 5.2)";
            break;
        case 'uaSafMac':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17";
            break;
        case 'uaSafWin':
            uaString = "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27";
            break;
        case 'uaSafiPad':
            uaString = "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
            break;
        case 'uaSafiPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E238 Safari/601.1";
            break;
        case 'uaOpr33Mac':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36 OPR/33.0.1990.115";
            break;
        case 'uaOpr33Win':
            uaString = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36 OPR/33.0.1990.43";
            break;
        case 'uaOpr12Mac':
            uaString = "Opera/9.80 (Macintosh; Intel Mac OS X 10.9.1) Presto/2.12.388 Version/12.16";
            break;
        case 'uaOpr12Win':
            uaString = "Opera/9.80 (Windows NT 6.1) Presto/2.12.388 Version/12.16";
            break;
        case 'uaiPh4':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaiPh5':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaiPh6':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36";
            break;
        case 'uaiPh6P':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaNexus7':
            uaString = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36";
            break;
        case 'uaNexus6':
            uaString = "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaNexus6P':
            uaString = "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaNexus5':
            uaString = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaNexus4':
            uaString = "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaSamGalS6Edge':
            uaString = "Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925F Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36";
            break;
        case 'uaSamGalS5':
            uaString = "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaSamGalS3':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
            break;
        case 'uaSamGalNote3':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
            break;
        case 'uaSamGalNote2':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
            break;
        case 'uaLGOpL70':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.23 Mobile Safari/537.36";
            break;
        case 'uaMSLumia950':
            uaString = "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263";
            break;
        case 'uaMSLumia550':
            uaString = "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263";
            break;
        case 'uaMSLumia520':
            uaString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)";
            break;
        case 'uaBBz30':
            uaString = "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+";
            break;
        case 'uaBBbb10':
            uaString = "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1+ (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1+";
            break;
        case 'uaBB9910':
            uaString = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11+";
            break;
        case 'uaIPadMini':
            uaString = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaIPad':
            uaString = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaNexus10':
            uaString = "Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36";
            break;
        case 'uaNexus9':
            uaString = "Mozilla/5.0 (Linux; Android 6.0; Nexus 9 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Safari/537.36";
            break;
        case 'uaBBPB':
            uaString = "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+";
            break;
        case 'uaKindleFireHDX':
            uaString = "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true";
            break;
        case 'uaWinTabGeneric':
            uaString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch)";
            break;
        case 'uaSamGalTabS2':
            uaString = "Mozilla/5.0 (Linux; Android 5.0; SM-T810 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.133 Safari/537.36";
            break;
        case 'uaBBPlayBook21':
            uaString = "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+";
            break;
        case 'uaXboxOne':
            uaString = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Xbox; Xbox One)";
            break;
        case 'uaPS3355':
            uaString = "Mozilla/5.0 (PLAYSTATION 3; 3.55)";
            break;
        case 'uaPS3200':
            uaString = "Mozilla/5.0 (PLAYSTATION 3; 2.00)";
            break;
        case 'uaPSPort2':
            uaString = "Mozilla/4.0 (PSP (PlayStation Portable); 2.00)";
            break;
        case 'uaNin':
            uaString = "Mozilla/5.0 (Nintendo WiiU) AppleWebKit/534.52 (KHTML, like Gecko) NX/2.1.0.8.21 NintendoBrowser/1.0.0.7494.US";
            break;
        case 'uaArchos':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.2.2; fr-fr; ARCHOS GAMEPAD2 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";
            break;
        case 'uaQuya':
            uaString = "Mozilla/5.0 (Linux; U; Android OUYA 4.1.2; en-us; OUYA Build/JZO54L-OUYA) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";
            break;
        case 'uaSamSmartTV':
            uaString = "Mozilla/5.0 (SMART-TV; Linux; Tizen 2.3) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.0 TV Safari/538.1";
            break;
        case 'uaSonySmartTV':
            uaString = "Opera/9.80 (Linux armv7l; InettvBrowser/2.2 (00014A;SonyDTV115;0002;0100) KDL42W650A; CC/GRC) Presto/2.12.362 Version/12.11";
            break;
        case 'uaGoogBot21':
            uaString = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
            break;
        case 'uaGoogBot21SmartPh':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
            break;
        case 'uaBingBot2':
            uaString = "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)";
            break;
        case 'uaYahooSlurp':
            uaString = "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)";
            break;
        case 'uaYandBot3':
            uaString = "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)";
            break;
        case 'uaSamGearVR':
            uaString = "Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925K Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile VR Safari/537.36";
            break;
        case 'uaKFireDesktop':
            uaString = "Mozilla/5.0 (Linux; U; en-us; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true";
            break;
        case 'uaKFireMob':
            uaString = "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Mobile Safari/535.19 Silk-Accelerated=true";
            break;
        case 'uaMeeGoNokN9':
            uaString = "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13";
            break;
        default:
            //uaString = navigator.userAgent;
            break;
    }
    
//    navigator.__defineGetter__('userAgent', function(){
//        return uaString;
//    });
//    
//    var listenerIsActive = true,
//        requestFilter = {urls: [ "<all_urls>" ]},
//        extraInfoSpec = ['requestHeaders','blocking'],
//        handler = function( details ) {
//            var headers = details.requestHeaders,
//                blockingResponse = {};
//            if( !listenerIsActive ) {
//                return {requestHeaders: details.requestHeaders};
//            }
//            for( var i = 0, l = headers.length; i < l; ++i ) {
//                if( headers[i].name == 'User-Agent' ) {
//                    headers[i].value = uaString;
//                    break;
//                }
//            }
//            
//            blockingResponse.requestHeaders = headers;
//            return blockingResponse;
//        };
//    chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
    return uaString;
//    ga('send', 'event', 'UserAgent', 'select', 'User Agent', {transport: 'beacon'});
}

document.body.onload = function () {
    /**
    * Loads Proxy Profiles in Popup Window
    *
    */
	try {
		chrome.storage.sync.get(null, function(items) {
			activeProxy = items.proxyProfile.active;
			//console.log(items.proxyProfile.active);
			for (key in items) {
				if ((key.length > 2) && (key != 'myUA') && (key != 'setUA') && (key != 'proxyProfile') && (key != 'auth') && (key != 'timer') && (key != 'notifyStatus') && (key != 'reloadStatus') && (key != 'rules') && (key != 'mode') && (key != 'activeProxy')) {
					n.i = key;
					//console.log(count,":", n.i);
					var s0 = items[n.i].a;
					var s1 = items[n.i].c;
					var s2 = items[n.i].d;
					myDiv(s0, s1, s2, count);
					count++;
				}
			}
			console.log("Manual Proxy Profile: ", count);
			chrome.storage.sync.remove("activeProxy");
			var proxyProfile = {};
			//proxyProfiles.count = count;
			proxyProfile.total = count;
			proxyProfile.active = 'direct';
			oProxy.proxyProfile = proxyProfile;
			chrome.storage.sync.set(oProxy, function () {});

			/**
			 * Add EventListener for 'Click' action on Proxy Profile List
			 *
			 */
			var y = [];
			var pVal = {};
			var x = document.getElementById('proxies');
			var y = x.querySelectorAll('span');

			for (ex = 0; ex < y.length; ex++) {
				pVal[ex] = y[ex].innerText;
					y[ex].addEventListener('click', function() {
						var myId = this.id;
						var myProxy = pVal[myId];
						console.log("myId:", myId);
						console.log("myProxy:", pVal[myId]);
						playProxy(myProxy);
				});  
			}
            
            chrome.storage.sync.get('setUA', function(i) {
                console.log(i.setUA.id);
                console.log(i.setUA.setUA);
                $('select[id="uaList"]').val(i.setUA.id);
            });
		});	
	}
	
	catch (err) {
		console.log("Load Manual Proxy Profiles (popup): ", err);
	}
    
    switchProxy();
    
    /**
    * Select User Agents
    * 
    */
    $('#uaList').change(function(){
        var uaSelect = this.value;
//        userAgent(uaSelect);
        
        var setUA = {}, setUADiv = {};
			//proxyProfiles.count = count;
			//setUA.setUA = uaSelect;
        setUA.setUA = userAgent(uaSelect);
        setUA.id = uaSelect;
        setUADiv.setUA = setUA;
        console.log(setUADiv.setUA);
			chrome.storage.sync.set(setUADiv, function () {
                chrome.extension.getBackgroundPage().setUA = setUA.setUA;
//                if (uaSelect == 'uaNoOverride') {
//                    chrome.browserAction.setBadgeText({text: ""});
//                } else {
//                    chrome.browserAction.setBadgeBackgroundColor({
//                        color: [51, 153, 51, 100]
//                    });
//				    chrome.browserAction.setBadgeText({text: "UA"});   
//                }
                refresh();
                closePop();
            });
//        console.log(chrome.extension.getBackgroundPage().console);
        
        document.addEventListener('DOMContentLoaded', function () {
           var bg = chrome.extension.getBackgroundPage();
            var myURL = bg.myURL;
          console.log(myURL)
            chrome.extension.getBackgroundPage().setUA = setUA.setUA;
            console.log(chrome.extension.getBackgroundPage().setUA);
        });
        /*
        chrome.browserAction.setBadgeBackgroundColor({
                        color: [0, 0, 255, 40]
                    });
        chrome.browserAction.setBadgeText({text: "UA"});
        */
    });
        
    
    
    /**
    * Check Internet Connection is Available or Unavailable
    *
    *
    window.addEventListener('offline', function () {
        console.log("offline");
        chrome.browserAction.setBadgeBackgroundColor({
                        color: [255, 0, 0, 200]
                    });
        chrome.browserAction.setBadgeText({text: "Offline"});
    });
    
    window.addEventListener('online', function () {
        console.log("online");
        chrome.browserAction.setBadgeText({text: ""});
    });
    */
    
    /**
    * Loads i18n locales in Options UI
    *
    */
    document.getElementById('menuPopSettings').innerHTML = chrome.i18n.getMessage("menuPopSettings");
    document.getElementById('menuPopNoProxy').innerHTML = chrome.i18n.getMessage("menuPopNoProxy");
    document.getElementById('menuPopSysProxy').innerHTML = chrome.i18n.getMessage("menuPopSysProxy");
    document.getElementById('menuPopNewProfile').innerHTML = chrome.i18n.getMessage("menuPopNewProfile");
    
    /**
    * Set User-Agent
    *
    */
    var myUA = navigator.userAgent;
    oProxy['myUA'] = myUA;
    chrome.storage.sync.set(oProxy, function() {});
    
    // Google Universal Analytics
//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://ssl.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-74793124-4', 'auto', {'alwaysSendReferrer': true});
//    ga('set', 'checkProtocolTask', function(){});
//    ga('require', 'displayfeatures');
//    ga('send', 'pageview', '/popup.html');
	
}