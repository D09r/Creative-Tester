chrome.extension.sendRequest({action:"foo",url:document.location.href},function(b){
                              if(b && b!=""){
                                  console.log(b);
                                document.addEventListener("beforeload", function(e){
                                        navigator.__defineGetter__('userAgent', function(){
                                            return b;
                                        });
                                  Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return (b.append_to_default_ua?navigator.userAgent+" "+b.setUA:setUA); } });
                                  Object.defineProperty(window.navigator, 'vendor', { get: function(){ return b.vendor; } });
                                  if (b.platform) {
                                    Object.defineProperty(window.navigator, 'platform', { get: function(){ return b.platform; } });
                                  }
                                },true);
                                var a=document.createElement("script");
                                a.type="text/javascript";
                                a.innerText+="Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return '" + (b.append_to_default_ua?navigator.userAgent+' '+b.setUA:b) + "'; } });";
                                a.innerText+="Object.defineProperty(window.navigator, 'vendor', { get: function(){ return '" + (b.vendor) + "'; } });";
                                if(b.platform){
                                  a.innerText+="Object.defineProperty(window.navigator, 'platform', { get: function(){ return '" + (b.platform) + "'; } });";
                                }
                                document.documentElement.insertBefore(a, document.documentElement.firstChild)
                              }
                            });