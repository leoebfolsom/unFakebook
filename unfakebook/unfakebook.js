// BEGIN DOCUMENT READY
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);
// END DOCUMENT READY

var getClosestUFB = function ( elem, selector ) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }
  // Get closest match
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
};

var clearOnEqualUFB = function () {
  var pTags = document.querySelectorAll('a,span,p,div');
  var searchText = ["ABCnews.com.co","Bloomberg.ma","cnn-trending.com","DrudgeReport.com.co","MSNBC.com.co","MSNBC.website","usatoday.com.co","washingtonpost.com.co","Celebtricity","Cream BMP","Empire News","Empire Sports","The Enduring Vision","Firebrand Left","Global Associated News","Huzlers","Indecision Forever","The Last Line of Defense","LinkBeef","KMT 11 News","National Report","Newslo","News Mutiny","React 365","Rile News","Stuppid","The Boston Tribune","The News Nerd","Conservative Frontline","Denver Guardian","International Report","Naha Daily","News Hound","United Media Publishing","InfoWars","Natural News","Prntly","Red Flag News","Activist Post","American News","Before It's News","Civic Tribune","Daily Buzz Live","DC Gazette","Disclose TV","Empire Herald","Gummy Post","Liberty Writers News","Media Mass","News Examiner","News Breaks Here","The News Buzz Daily","NewsWatch33","Now 8 News","Real News Right Now","The Reporterz","World Truth TV","yournewswire.com"];
  for (var i = 0; i < pTags.length; i++) {
    var elem = pTags[i];
    var content = String(pTags[i].innerHTML).toLowerCase();
    for (var j = 0; j < searchText.length; j++) {
      if (content.indexOf(searchText[j]) >= 0 ) {
        var closestElem = getClosestUFB(elem, "[data-fte^='1']");
        if (closestElem!= null) {
          closestElem.parentNode.remove();
        }
      }
    }
  }
};
//TODO remove next line before publishing
clearOnEqualUFB();

docReady(function() {
  clearOnEqualUFB();
  document.addEventListener("scroll", clearOnEqualUFB);
});