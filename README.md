# Private or Incognito Browsing Detector / Paywall
Javascript code to Detect Private and Incognito Browsing Mode. You can implement a Paywall System by detecting private or incognito browsing.

## Implementing a Paywall System for Private or Incognito Browsing Mode
You can implement a Paywall System with Javascript blocking the Private or Incognito browsing in your Website using this code.  

This detector can identify Bots Browsing your application and you can turn on/turn off this detection.  
**With Bot detector on, when Googlebot visit your page you don't block it!**

## How to use

### Installation
You can include the `/dist/BrowsingModeDetector.js` or `/dist/BrowsingModeDetector.gz` via `<script>` tag direct on your application or via npm:

`npm i js-detect-incognito-private-browsing -S`

### Implementing behaviour based on Browsing Mode:   
Passing a callback to `BrowsingModeDetector.do()` method you can implement the needed behaviour testing the returned value:

```
var myCallback = function (browsingInIncognitoMode, BrowsingModeDetectorInstance) {
    console.log('Is private?', browsingInIncognitoMode);
    console.log('Browsing Mode:', BrowsingModeDetectorInstance.getBrowsingMode());
  
    if (browsingInIncognitoMode) {
        // Incognito, Private mode detected
        return;
    }
  
    // Normal mode detected
};
  
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector.do(myCallback);
```

### Advanced use of callbacks:   

You can use a default callback combined with specific callbacks for each browsing method:

```
var callbackWhenNormalMode = function () {
    console.log('callbackWhenNormalMode called');
};
  
var callbackWhenIncognitoOrPrivateMode = function () {
    console.log('callbackWhenIncognitoOrPrivateMode');
};
  
var defaultCallback = function (browsingInIncognitoMode) {
    console.log('This callback will be called either private or normal mode detected, optional though. Is private or incognito?', browsingInIncognitoMode);
};
  
var BrowsingModeDetector = new BrowsingModeDetector();
BrowsingModeDetector
    .setCallbackForNormalMode(callbackWhenNormalMode)
    .setCallbackForIncognitoOrPrivateMode(callbackWhenIncognitoOrPrivateMode)
    .do(defaultCallback); // optional if callbacks are given for normal and private modes
```

Possible callbacks arrangements:

- Only Default Callback using `.do(callback)` method
- Callback for Normal Mode `.setCallbackForNormalMode(callback)` combined with Private Mode `.setCallbackForIncognitoOrPrivateMode(callback)`
- Default Callback combined with Normal Mode and Private/Incognito Mode Callbacks

On callbacks you can use the `.getBrowsingMode()` if necessary, because a instance of BrowsingModeDetector is 
passed for all callback functions:

```
var callbackWhenNormalMode = function (BrowsingModeDetectorInstance) {
    console.log('callbackWhenNormalMode called when', BrowsingModeDetectorInstance.getBrowsingMode());
};
  
var callbackWhenIncognitoOrPrivateMode = function (BrowsingModeDetectorInstance) {
    console.log('callbackWhenIncognitoOrPrivateMode called when', BrowsingModeDetectorInstance.getBrowsingMode());
};
  
var defaultCallback = function (browsingInIncognitoMode, BrowsingModeDetectorInstance) {
    console.log('Is private or incognito?', browsingInIncognitoMode);
  
    if (BrowsingModeDetectorInstance.getBrowsingMode() === BrowsingModeDetectorInstance.BROWSING_NORMAL_MODE) {
        console.log('Do something if is NORMAL_MODE!');
    } else {
        console.log('Do something if is INCOGNITO_PRIVATE_MODE!');
    }
};
```

Note that will be passed a BrowsingModeDetector instance for each user defined callback and for default callback to
`.do(callback)` method will be passed as first param of callback a boolean value meaning browsing in incognito mode 
when `true` and a BrowsingModeDetector instance as second param of callback.

### Ignoring (or not) browsing mode for Bots:
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

## Examples:
For a complete example with JS and HTML see the `/example/index.html` file.

## Compiling the code:
Clone this repo and you can use npm and webpack to compile the code.
Install the requirements:   

```
git clone https://github.com/Maykonn/js-detect-incognito-private-browsing-paywall
npm install
``` 

In your dev environment you can run (will compile the code and open the example app at localhost:8080/):
```
npm run start
```

Build the code to production at `/dist` directory (minify, uglify, remove comments, logs, etc):
```
npm run build
```

The `npm run build` command will generate two file at /dist directory, BrowsingModeDetector.gz and BrowsingModeDetector.js.

## Contributing:

You can contribute cloning this repository from github [clicking here](https://github.com/Maykonn/js-detect-incognito-private-browsing-paywall).
So, you just need to create a new branch using a name related to the new functionality which you'll create.   
And after finish your code, you just need to create a pull request which will be revised, merged to master(if the code 
doesn't break the lib) branch and published a new release of this library. 
