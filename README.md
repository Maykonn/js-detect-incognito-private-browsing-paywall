# Javascript Private or Incognito Browsing Detector / Paywall
Javascript code to Detect Private and Incognito Browsing Mode. You can implement a Paywall System by detecting private or incognito browsing.

## Implementing a Paywall System for Private or Incognito Browsing Mode
You can implement a Paywall System with Javascript blocking the Private or Incognito browsing in your Website using this code.  

This detector can identify Bots Browsing your application and you can turn on/turn off this detection.  
**With Bot detector on, when Googlebot visit your page you don't block it!**

## How to use

### Implementing behaviour based on Browsing Mode:   
Passing a callback to `BrowsingModeDetector.do()` method you can implement the needed behaviour testing the returned value:

```
var myCallback = function (browsingInIncognitoMode) {
    console.log('Is private or incognito?');
    console.log(browsingInIncognitoMode);
  
    if (browsingInIncognitoMode) {
        // Incognito, Private mode detected
    }
};
  
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.do(myCallback);
```

You can use a default callback combined with specific callbacks for each browsing method:

```
var callbackWhenNormalMode = function () {
    console.log('callbackWhenNormalMode called');
};
  
var callbackWhenIncognitoOrPrivateMode = function () {
    console.log('callbackWhenIncognitoOrPrivateMode called');
};
  
var defaultCallback = function(browsingInIncognitoMode) {
    console.log('This callback will be called either private or normal mode detected, optional though. Is private or incognito?', browsingInIncognitoMode);
};
  
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector
    .setCallbackForNormalMode(callbackWhenNormalMode)
    .setCallbackForIncognitoOrPrivateMode(callbackWhenIncognitoOrPrivateMode)
    .do(defaultCallback); // optional if callbacks are given for normal and private modes
```

Possible callbacks arrangements:

- Only Default Callback
- Default Callback combined with Normal Mode and Private/Incognito Mode Callbacks
- Callback for Normal Mode and Callback for Private Mode

### Ignoring (or not) browsing mode for Bots
If you have a Website, probably you want to ignore if Bots are browsing:
```
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.do(myCallback); 
// or BrowsingModeDetector.ignoringBots().do(myCallback);
```

Or testing for Bots too(e.g: if Googlebot browse your site, the detector will return that browsing mode is private):
```
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.notIgnoringBots().do(myCallback);
```

### Bot Browsing Detection:
You can test if is a Bot browsing in two ways:
```
var isBot = BrowsingModeDetector.isBotBrowsing();
console.log('Is Bot:', isBot);
```

Or passing a callback to isBotBrowsing method:
```
var isBot = BrowsingModeDetector.isBotBrowsing(function(isBot) {
    console.log('Is Bot:', isBot);
});
```

### Examples:
For a complete example with JS and HTML see the `example.html` file.