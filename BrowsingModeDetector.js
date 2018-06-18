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
     * @param callback optional
     */
    this.do = function (callback) {
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
                return (typeof callback === 'undefined' ? this : callback(_browsingInIncognitoMode));
            }
        );
    };

    this.isIE10OrLater = function (user_agent) {
        var ua = user_agent.toLowerCase();
        if (ua.indexOf('msie') === 0 && ua.indexOf('trident') === 0) {
            return false;
        }

        var match = /(?:msie|rv:)\s?([\d\.]+)/.exec(ua);
        if (match && parseInt(match[1], 10) >= 10) {
            return true;
        }

        return false;
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
    }

    /**
     * @param {BrowsingModeDetector} BrowsingModeDetector
     * @returns {*}
     * @private
     */
    var _resolve = function (BrowsingModeDetector) {
        if (window.webkitRequestFileSystem) {
            return new WebkitBrowser(BrowsingModeDetector);
        } else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
            return new FirefoxBrowser(BrowsingModeDetector);
        } else if (BrowsingModeDetector.isIE10OrLater(window.navigator.userAgent)) {
            return new IE10OrLaterBrowser(BrowsingModeDetector);
        } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
            return new SafariBrowser(BrowsingModeDetector);
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
            console.log(e);
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
 * @returns {FirefoxBrowser}
 * @constructor
 */
var FirefoxBrowser = function (BrowsingModeDetector) {
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
 * @returns {IE10OrLaterBrowser}
 * @constructor
 */
var IE10OrLaterBrowser = function (BrowsingModeDetector) {
    this.BrowsingModeDetector = BrowsingModeDetector;

    this.detectBrowsingMode = function () {
        this.BrowsingModeDetector.setBrowsingInNormalMode();

        try {
            if (!window.indexedDB) {
                this.BrowsingModeDetector.setBrowsingInIncognitoMode();
            }
        } catch (e) {
            this.BrowsingModeDetector.setBrowsingInIncognitoMode();
        }
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
        try {
            window.localStorage.setItem('i', 'o');
        } catch (e) {
            this.BrowsingModeDetector.setBrowsingInIncognitoMode();
        }

        if (typeof this.BrowsingModeDetector.getBrowsingMode() === 'undefined') {
            this.BrowsingModeDetector.setBrowsingInNormalMode();
            window.localStorage.removeItem('i');
        }
    };

    return this;
};