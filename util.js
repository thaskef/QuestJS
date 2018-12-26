"use strict";

// ============  Utilities  =======================================

// Should all be language neutral

// Stores the current player object
var player;


const SUCCESS = 1;
const SUCCESS_NO_TURNSCRIPTS = 2;
const FAILED = -1;

const ERR_QUEST_BUG = 21;   // A bug in Quest I need to sort out
const ERR_GAME_BUG = 22;    // A bug in the game the creator needs to sort out
const ERR_PARSER = 23;      // Player is typing something unintelligible
const ERR_PLAYER = 24;      // Player is typing something not allowed
const ERR_TP = 25;
const DBG_PARSER = 21;      // Debug message from the parser
const DBG_UTIL = 22;        // Debug message from util

const DSPY_DISPLAY = 10;    // Item accessible and in lists and inventories
const DSPY_LIST_EXCLUDE = 9;// Item accessible and in inventories, but not lists
const DSPY_INV_EXCLUDE = 8; // Item accessible and in lists, but not inventories
const DSPY_SCENERY = 5;     // Item exist and accessible, but not mentioned at all
const DSPY_HIDDEN = 2;      // Item exists here, but not accessible (inc turnscripts)
const DSPY_NOT_HERE = 1;    // Item does not exist yet, but is ready to
const DSPY_DELETED = 0;     // Item no longer exists



// ============  Random Utilities  =======================================

// Returns a random number from 1 to n
function randomInt(n) {
  return Math.floor(Math.random() * n);
};

// Returns true percentile out of 100 times, false otherwise
function randomChance(percentile) {
  return randomInt(100) <= percentile;
};



// ============  String Utilities  =======================================

// Returns the string with the first letter capitalised
function sentenceCase(str) {
  return str.replace(/[a-z]/i, function (letter) {
    return letter.toUpperCase();
  }).trim();
};

// If isMultiple is true, returns the item name to be prefixed to the command response
function prefix(item, isMultiple) {
  if (!isMultiple) { return ""; }
  return sentenceCase(item.name) + ": ";
}

// Creates a string that lists the items by name
function formatList(itemArray, mappingFunc, lastJoiner) {
  if (!lastJoiner) { lastJoiner = " and"; }
  var s = itemArray.map(function(el) {
    if (typeof el == "string") {
      return el;
    }
    else if (mappingFunc) {
      return mappingFunc(el);
    }
    else {
      return el.alias;
    }
  }).join(", ");

  var lastIndex = s.lastIndexOf(",");
  if (lastIndex === -1) { return s; }

  return s.substring(0, lastIndex) + lastJoiner + s.substring(lastIndex + 1);
};


// Gets an array of strings, extracting each regex match from this string.
String.prototype.scan = function (re) {
  var s = this;
  var m, r = [];
  while (m = re.exec(s)) {
    s = s.replace(m[0], "");
    r.push(m[0]);
  }
  return r;
};








// ============  Object Utilities  =======================================





function getPlayer() {
  return world.data.find(function(item) {
    return item.player;
  });
};




// Gets the current room object
function getCurrentRoom() {
  return getObject(player.loc);
};

// Gets the command with the given name
function getCommand(name) {
  var found = commands.find(function(el) {
    return el.name == name;
  });
  return found;
};


function itemNameWithThe(item) {
  if (item.properName) {
    return item.alias;
  }
  return "the " + item.alias;
}

function itemNameWithA(item) {
  if (item.indefArticle) {
    return item.indefArticle + " " + item.alias;
  }
  if (item.properName) {
    return item.alias;
  }
  if (item.pronouns == PRONOUNS.plural) {
    return "some " + item.alias;
  }
  if (/^[aeiou]/i.test(item.alias)) {
    return "an " + item.alias;
  }
  return "a " + item.alias;
}





// ============  Scope Utilities  =======================================

// Scope functions
function isPresent(item) {
  return (isHere(item) || isHeldOrWorn(item)) && item.display >= DSPY_SCENERY;
};
function isHeldOrWorn(item) {
  return item.loc == player.name && item.display >= DSPY_SCENERY;
};
function isHeld(item) {
  return (item.loc == player.name) && !item.worn && item.display >= DSPY_SCENERY;
};
function isHere(item) {
  return item.loc === player.loc && item.display >= DSPY_SCENERY;
};
function isHereListed(item) {
  return item.loc === player.loc && item.display >= DSPY_LIST_EXCLUDE;
};
function isWorn(item) {
  return (item.loc == player.name) && item.worn;
};

// Requires an extra parameter, so used like this:
// scope(isInside, container);
function isInside(item) {
  return item.loc == this.name;
};


// Is the given item in the location named
// or in an open container in that location?
// Includes "Ubiquitous" items, but not "not here" items
function isReachable(item) {
  if (item.loc == player.loc || item.loc == player.name || item.loc === "Ubiquitous") { return true; }
  if (!item.loc || item.display >= DSPY_SCENERY) { return false; }
  container = getObject(item.loc);
  if (!container.container) { return false; }
  if (container.closed) { return false; }
  return isVisible(container);
}

// Is the given item in the location named
// or in an open or transparent container in that location?
// Includes "Ubiquitous" items, but not "not here" items
// This is the fallback for the parser scope
function isVisible(item) {
  if (item.loc == player.loc || item.loc == player.name || item.loc === "Ubiquitous") { return true; }
  if (!item.loc || item.display >= DSPY_SCENERY) { return false; }
  container = getObject(item.loc);
  if (!container.container) { return false; }
  if (container.closed && !container.transparent) { return false; }
  return isVisible(container);
}

// To use, do something like this:
// var listOfOjects = scope(isHeld);
// Hopefully this works too
// var listOfOjects = scope(isInside, container.loc);
function scope(fn, p) {
  return world.data.filter(fn, p);
};


// For dubugging only!!!
function _scopeReport(o) {
  if (typeof o == "string") {
    o = getObject(o, true);
  }
  s = "<b>" + o.name + "</b><br/>";
  s += "held: " + isHeld(o) + "<br/>";
  s += "here: " + isHere(o) + "<br/>";
  s += "held or worn: " + isHeldOrWorn(o) + "<br/>";
  s += "present: " + isPresent(o) + "<br/>";
  s += "reachable here: " + isReachable(o, player.loc) + "<br/>";
  s += "visible here: " + isVisible(o, player.loc) + "<br/>";
  s += "reachable held: " + isReachable(o, player.name) + "<br/>";
  s += "visible held: " + isVisible(o, player.name) + "<br/>";
  debugmsg(DBG_UTIL, s);
}



// ============  Debugging Utilities  =======================================

// Lists the properties of the given object
// Useful for debugging only
function listProperties(obj) {
  return Object.keys(obj).join(", ");
};


// To inspect an object use JSON.stringify(car)





