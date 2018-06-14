# Javascript Private or Incognito Browsing Detector
Javascript code to detect Private and Incognito Browsing (with Bot detector, for example, if Googlebot visiting  
your page you don't need to knows if is a private browsing, is a bot).

## How to use

Passing a callback to `detectPrivateBrowsing` method you can implement the needed behaviour testing  
the `isPrivate` value:

```
var myCallback = function (isPrivate) {
    console.log('Is private or incognito?');
    console.log(isPrivate);
  
    if (isPrivate) {
        // ... implements the desired behaviour when is in private/incognito mode
    }
};

var ignoreBotBrowsing = true;
detectPrivateBrowsing(myCallback, ignoreBotBrowsing);
```

For a complete example with JS and HTML see the `example.html` file.

If you have a website, probably you want to ignore Bots Browsing mode passing `true` to second parameter of     
`detectPrivateBrowsing` method. If you pass `false` or omit the second param, the code will return that the Bot is  
browsing in private/incognito mode.