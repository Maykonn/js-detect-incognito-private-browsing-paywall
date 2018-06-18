/**
 * BrowsingModeDetector
 *
 * @returns {BrowsingModeDetector}
 * @constructor
 * @author Maykonn Welington Candido <maykonn@outlook.com>
 */
var BrowsingModeDetector = function () {
    var _ignoringBots = true;
    var _browsingInIncognitoMode;
    var _callbackForNormalMode;
    var _callbackForIncognitoOrPrivateMode;

    this.BROWSING_NORMAL_MODE = 'NORMAL_MODE';
    this.BROWSING_INCOGNITO_PRIVATE_MODE = 'INCOGNITO_PRIVATE_MODE';

    /**
     * @returns {BrowsingModeDetector}
     */
    this.ignoringBots = function () {
        _ignoringBots = true;
        return this;
    };

    /**
     * @returns {BrowsingModeDetector}
     */
    this.notIgnoringBots = function () {
        _ignoringBots = false;
        return this;
    };

    this.getBrowsingMode = function () {
        console.log('_browsingInIncognitoMode', _browsingInIncognitoMode);
        return (_browsingInIncognitoMode ? this.BROWSING_INCOGNITO_PRIVATE_MODE : this.BROWSING_NORMAL_MODE);
    };

    this.setBrowsingInIncognitoMode = function () {
        _browsingInIncognitoMode = true;
    };

    this.setBrowsingInNormalMode = function () {
        _browsingInIncognitoMode = false;
    };

    /**
     * @param callback optional
     */
    this.isBotBrowsing = function (callback) {
        var userAgentToTest = window.navigator.userAgent;
        var isBot = /googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis/i.test(userAgentToTest);
        return (typeof callback === 'undefined' ? isBot : callback(isBot));
    };

    /**
     * @param callback
     * @returns {BrowsingModeDetector}
     */
    this.setCallbackForNormalMode = function (callback) {
        _callbackForNormalMode = callback;
        return this;
    };

    /**
     * @param callback
     * @returns {BrowsingModeDetector}
     */
    this.setCallbackForIncognitoOrPrivateMode = function (callback) {
        _callbackForIncognitoOrPrivateMode = callback;
        return this;
    };

    /**
     * @param defaultCallback optional
     */
    this.do = function (defaultCallback) {
        if (
            typeof defaultCallback !== 'function' &&
            (typeof _callbackForNormalMode !== 'function' || typeof _callbackForIncognitoOrPrivateMode !== 'function')
        ) {
            throw 'Default callback or specific callbacks are required';
        }

        if (_ignoringBots && this.isBotBrowsing()) {
            return _browsingInIncognitoMode = false;
        }

        (new BrowserFactory())
            .browser(this)
            .detectBrowsingMode();

        this.retry(
            function () {
                return typeof _browsingInIncognitoMode !== 'undefined';
            },
            function () {
                if (_browsingInIncognitoMode && typeof _callbackForIncognitoOrPrivateMode === 'function') {
                    _callbackForIncognitoOrPrivateMode();
                } else if (!_browsingInIncognitoMode && typeof  _callbackForNormalMode === 'function') {
                    _callbackForNormalMode();
                }

                if (typeof defaultCallback !== 'undefined') {
                    defaultCallback(_browsingInIncognitoMode)
                }
            }
        );
    };

    this.retry = function (ready, callback) {
        var iteration = 0;
        var maxRetry = 50;
        var interval = 10;
        var isTimeout = false;

        var id = window.setInterval(
            function () {
                if (ready()) {
                    window.clearInterval(id);
                    callback(isTimeout);
                }
                if (iteration++ > maxRetry) {
                    window.clearInterval(id);
                    isTimeout = true;
                    callback(isTimeout);
                }
            },
            interval
        );
    };

    return this;
};


/**
 * @returns {BrowserFactory}
 * @constructor
 */
var BrowserFactory = function () {
    var _browser;

    this.browser = function (BrowsingModeDetector) {
        if (typeof _browser === 'object') {
            return _browser;
        }

        return _browser = _resolve(BrowsingModeDetector);
    };

    /**
     * @param {BrowsingModeDetector} BrowsingModeDetector
     * @returns {*}
     * @private
     */
    var _resolve = function (BrowsingModeDetector) {
        if (window.webkitRequestFileSystem) {
            return new WebkitBrowser(BrowsingModeDetector);
        } else if ('MozAppearance' in document.documentElement.style) {
            return new MozillaBrowser(BrowsingModeDetector);
        } else if (/constructor/i.test(window.HTMLElement)) {
            return new SafariBrowser(BrowsingModeDetector);
        } else if (window.PointerEvent || window.MSPointerEvent) {
            return new IE10EdgeBrowser(BrowsingModeDetector);
        } else {
            return new OtherBrowser(BrowsingModeDetector);
        }
    };

    return this;
};


/**
 * @param {BrowsingModeDetector} BrowsingModeDetector
 * @returns {WebkitBrowser}
 * @constructor
 */
var WebkitBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        var self = this;

        var callbackWhenWebkitRequestFileSystemIsON = function () {
            self.BrowsingModeDetector.setBrowsingInNormalMode();
        };

        var callbackWhenWebkitRequestFileSystemIsOFF = function (e) {
            self.BrowsingModeDetector.setBrowsingInIncognitoMode();
        };

        window.webkitRequestFileSystem(
            window.TEMPORARY,
            1,
            callbackWhenWebkitRequestFileSystemIsON,
            callbackWhenWebkitRequestFileSystemIsOFF
        );
    };

    return this;
};

/**
 * @param {BrowsingModeDetector} BrowsingModeDetector
 * @returns {MozillaBrowser}
 * @constructor
 */
var MozillaBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        var db;
        var self = this;

        var callbackWhenIndexedDBWorking = function (e) {
            if (typeof self.BrowsingModeDetector.getBrowsingMode() === 'undefined') {
                self.BrowsingModeDetector.retry(
                    function () {
                        return db.readyState === 'done';
                    },
                    function (isTimeout) {
                        if (isTimeout) {
                            return callbackWhenIndexedDBNotWorking(e);
                        }

                        if (db.result) {
                            self.BrowsingModeDetector.setBrowsingInNormalMode();
                        }
                    }
                );
            }
        };

        var callbackWhenIndexedDBNotWorking = function (e) {
            // On Firefox ESR versions, actually IndexedDB don't works.
            self.BrowsingModeDetector.setBrowsingInIncognitoMode();
        };

        db = indexedDB.open("i");
        db.onsuccess = callbackWhenIndexedDBWorking;
        db.onerror = callbackWhenIndexedDBNotWorking;
    };

    return this;
};

/**
 * @param {BrowsingModeDetector} BrowsingModeDetector
 * @returns {SafariBrowser}
 * @constructor
 */
var SafariBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        // iOS 11
        // From gist discussion: https://gist.github.com/cou929/7973956#gistcomment-2272103
        try {
            window.openDatabase(null, null, null, null);
        } catch (e) {
            this.BrowsingModeDetector.setBrowsingInIncognitoMode();
        }

        // Older Safari
        try {
            if (localStorage.length) {
                this.BrowsingModeDetector.setBrowsingInNormalMode();
            } else {
                localStorage.i = 1;
                localStorage.removeItem('i');
                this.BrowsingModeDetector.setBrowsingInNormalMode();
            }
        } catch (e) {
            // From: https://gist.github.com/jherax/a81c8c132d09cc354a0e2cb911841ff1
            // Safari only enables cookie in private mode
            // if cookie is disabled then all client side storage is disabled
            // if all client side storage is disabled, then there is no point
            // in using private mode
            if (navigator.cookieEnabled) {
                this.BrowsingModeDetector.setBrowsingInIncognitoMode();
            } else {
                this.BrowsingModeDetector.setBrowsingInNormalMode();
            }
        }
    };

    return this;
};

/**
 * @param {BrowsingModeDetector} BrowsingModeDetector
 * @returns {IE10EdgeBrowser}
 * @constructor
 */
var IE10EdgeBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        if (!window.indexedDB) {
            this.BrowsingModeDetector.setBrowsingInIncognitoMode();
        }
    };

    return this;
};

/**
 * @param {BrowsingModeDetector} BrowsingModeDetector
 * @returns {OtherBrowser}
 * @constructor
 */
var OtherBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        this.BrowsingModeDetector.setBrowsingInNormalMode();
    };

    return this;
};