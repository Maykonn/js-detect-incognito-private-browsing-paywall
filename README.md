# Javascript Private or Incognito Browsing Detector / Paywall
Javascript code to Detect Private and Incognito Browsing Mode. You can implement a Paywall System   
by detecting private or incognito browsing.

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
    
    var message = document.getElementById("message");
    if (browsingInIncognitoMode) {
        message.innerHTML = "Incognito/Private browsing detected!";
        return;
    }
    
    message.innerHTML = "Normal browsing";
};
  
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.do(myCallback);
```

### Ignoring (or not) browsing mode for Bots
If you have a Website, probably you want to ignore if Bots are browsing:
```
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.do(myCallback); 
// or BrowsingModeDetector.ignoringBots().do(myCallback);
```

Or not (`.do()` always will return `false` to callback):
```
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.notIgnoringBots().do(myCallback);
```

### Bot Browsing Detection:
You can test if is a Bot browsing too:
```
console.log('Is Bot:', BrowsingModeDetector.isBotBrowsing());
```

### Examples:
For a complete example with JS and HTML see the `example.html` file.