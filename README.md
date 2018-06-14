# Javascript Private or Incognito Browsing Detector / Paywall
Javascript code to Detect Private and Incognito Browsing Mode. You can implements a Paywall System   
by detecting private or incognito browsing.

## Tips to Implement a Paywall System for Private or Incognito Browsing Mode
You can implements a Paywall System with Javascript blocking the Private or Incognito browsing in your Website using this code.  

This detector can identify Bots Browsing your application and you can turn on/turn off this detection.  
**With Bot detector on, when Googlebot visit your page you don't block it!**

## How to use

Passing a callback to `detectPrivateBrowsing` method you can implement the needed behaviour testing  
the `isPrivate` value:

```
var myCallback = function (isPrivate) {
    console.log('Is private or incognito?');
    console.log(isPrivate);
  
    if (isPrivate) {
        // ... implements the desired behaviour when is in private/incognito mode
        // ... why not a paywall screen?
    }
};

var ignoreBotBrowsing = true;
detectPrivateBrowsing(myCallback, ignoreBotBrowsing);
```

For a complete example with JS and HTML see the `example.html` file.

If you have a Website, probably you want to ignore the detection for Bots passing `true` or omitting the second parameter of  
`detectPrivateBrowsing` method. If you pass `false`, the code will return that the Bot is browsing in private/incognito mode.