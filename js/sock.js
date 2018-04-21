var Socket = function() {
    window.socket = this;

    this.port = chrome.extension.connect({name:"popupToBackground"});

    chrome.extension.onConnect.addListener(function(port) {
        if(port.name == "backgroundToPopup") {}
            else if(port.name == "popupToBackground") {
            window.socket.port = chrome.extension.connect({name:"backgroundToPopup"});
        }
        else {
            return;
        }

        port.onMessage.addListener(function(msg) {
            try {
                window[msg.namespace][msg.literal][msg.method].apply(this, msg.args);
            }
            catch(error) {
                // your failed action goes here.
            }
        });
    });
};