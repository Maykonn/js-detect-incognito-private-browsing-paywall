# Javascript Private or Incognito Browsing Detector / Paywall
Javascript code to Detect Private and Incognito Browsing Mode. You can implement a Paywall System by detecting private or incognito browsing.

## Tips to Implement a Paywall System for Private or Incognito Browsing Mode
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

You can have the same result, implemented in a different way:
```
var BrowsingModeDetector = new BrowsingModeDetector();
if(BrowsingModeDetector.do().getBrowsingMode() === BrowsingModeDetector.BROWSING_INCOGNITO_PRIVATE_MODE) {
    console.log('PRIVATE MODE DETECTED');
    // Do something...
}
```

Note that when you pass a callback to `.do(callback)` method the return will be the callback, and when a callback is not
given to `.do()` method the return will be a instance of `BrowsingModeDetector` object.

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