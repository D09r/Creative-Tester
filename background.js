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

var setUA;

/**
 * Set User Agents
 *
 */
function userAgent(ua) {
    console.log("called: ", ua);
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
        case 'uaiPh5':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaiPh6':
            uaString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36";
            break;
        case 'uaiPh6P':
            uaString = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            break;
        case 'uaBBbb10':
            uaString = "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1+ (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1+";
            break;
        case 'uaBB9910':
            uaString = "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11+";
            break;
        case 'uaSamS6Edge':
            uaString = "Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925F Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36";
            break;
        case 'uaLumia625':
            uaString = "Mozilla/5.0 (Windows NT 6.2; ARM; Trident/7.0; Touch; rv:11.0; WPDesktop; Lumia 625) like Gecko";
            break;
        case 'uaNexus9':
            uaString = "Mozilla/5.0 (Linux; Android 6.0; Nexus 9 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Safari/537.36";
            break;
        case 'uaNexus7':
            uaString = "Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166  Safari/535.19";
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
            uaString = ua;
            console.log(uaString);
            break;
    }
    console.log("UA: ", uaString);
    //listenAndSetUA(uaString);
    
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
//    refresh();
    
//    ga('send', 'event', 'UserAgent', 'select', 'User Agent', {transport: 'beacon'});
}

function getUA() {
    chrome.storage.sync.get(null, function (items) {
        if (items.setUA != "") {
    //        setUA = userAgent(items.setUA);
            setUA = items.setUA;
            console.log(setUA);
            
            var requestFilter = {
            urls: [ "<all_urls>" ]
          },extraInfoSpec = ['requestHeaders','blocking'],
            handler = function( details ) {

            var headers = details.requestHeaders,
              blockingResponse = {};


        for( var i = 0, l = headers.length; i < l; ++i ) {
              if( headers[i].name == 'User-Agent' ) {
                headers[i].value = setUA;
                break;
              }
        }

            blockingResponse.requestHeaders = headers;
            return blockingResponse;
          };

        chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );     
        }
    });
}

/**
 * reload
 *
 */
//chrome.tabs.reload(function () {
//    chrome.storage.sync.get(null, function (items) {
//        if (items.setUA != "") {
//    //        setUA = userAgent(items.setUA);
//            setUA = items.setUA;
//            console.log(setUA);
//        }
//    });
//});

/**
 * clear cache
 *
 */
var clearCache = (function() {
        if (!clearRunning) {
            //if (chrome.experimental != undefined && chrome.experimental.clear != undefined) {
            if (typeof(chrome.browsingData) !== 'undefined') {
                clearRunning = true;
                var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
                var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
                
                //Chrome 19:
                chrome.browsingData.removeCache({
                      "since": oneWeekAgo
                    }, function() {
                    clearRunning = false;
                });
            } else if (!alertThrown) {
                alertThrown = true;
                alert("Your browser does not support 'chrome.browsingData.removeCache'.");
            }
        }
    });

/**
 * get user-defined UA from storage and set it on webRequest
 *
 */
chrome.storage.sync.get('setUA', function (items) {
    console.log("items: ", items.setUA.setUA);
        if (items != "") {
            setUA = items.setUA.setUA;
            
            console.log(setUA);
        navigator.__defineGetter__('userAgent', function(){
            return setUA;
        });
        var requestFilter = {urls: [ "<all_urls>" ]},
        extraInfoSpec = ['requestHeaders','blocking'],
        handler = function( details ) {
            var headers = details.requestHeaders,
                blockingResponse = {};
            for( var i = 0; i < headers.length; ++i ) {
                if( headers[i].name == 'User-Agent' ) {
                    headers[i].value = setUA;
                    break;
                }
            }
            
            blockingResponse.requestHeaders = headers;
            return blockingResponse;
        };
            
        chrome.webRequest.onBeforeRequest.removeListener(clearCache); //nocache
    chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
        }
});
    
/**
 * requestHandler - content_scripts
 *
 */
function requestHandler(request, sendResponse) {
    console.log("requestHandler: ", setUA);
//    chrome.storage.sync.get(null, function (items) {
//        if (items.setUA != "") {
//            setUA = items.setUA;
//            
//        }
//});
    switch(request.action) {
        case 'foo':
            sendResponse(setUA);
            break;
        }
}

chrome.extension.onRequest.addListener(function(request,sender,sendResponse) {
    requestHandler(request, sendResponse);
});

/**
 * onUpdated
 *
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {    
    chrome.storage.sync.get('setUA', function (i) {
        console.log(i.setUA.id);
//        console.log(i.setUA.setUA);
        if (i != "") {
            setUA = i.setUA.setUA;
        }
    });
    console.log("onUpdated: ", setUA);
});

/**
 * onCreated
 *
 */
chrome.tabs.onCreated.addListener(function(tab) {         
    chrome.storage.sync.get('setUA', function (i) {
        console.log(i.setUA.id);
//        console.log(i.setUA.setUA);
        if (i != "") {
            setUA = i.setUA.setUA;
        }
    });
    console.log("onCreated: ", setUA);
});