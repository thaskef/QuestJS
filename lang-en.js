// Language support
const CMD_IGNORED_WORDS = ["", "the", "a", "an"];
const CMD_JOINER_REGEX = /\,|\band\b/;
const CMD_ALL_REGEX = /^(all|everything)$/;
const CMD_ALL_EXCLUDE_REGEX = /^((all|everything) (but|except)\b)/;
const CMD_GO = "go to |goto |go |head |"

const CMD_ECHO = true;
const CMD_NOT_KNOWN_MSG = "I don't even know where to begin with that.";
const CMD_OBJECT_UNKNOWN_MSG = "Not finding any object '%'.";
const CMD_DISAMBIG_MSG = "Which do you mean?";
const CMD_NO_MULTIPLES = "You cannot use multiple objects with that command.";
const CMD_NOTHING = "Nothing there to do that with.";
const CMD_NO_ATT_ERROR = "It does not work like that.";
const CMD_NOT_THAT_WAY = "You can't go that way.";
const CMD_UNSUPPORTED_DIR = "Unsupported type for direction";
const CMD_GENERAL_OBJ_ERROR = "So I kind of get what you want to do, but not what you want to do it with.";
const CMD_PANE_CMD_NOT_FOUND = "I don't know that command - and obviously I should as you just clicked it. Please alert the game author about this bug."
const CMD_PANE_ITEM_NOT_FOUND = "I don't know that object - and obviously I should as it was listed. Please alert this as a bug in Quest."
const CMD_DONE = "Done";




CMD_NOT_CONTAINER = function(item) {
  return sentenceCase(itemNameWithThe(item)) + " is not a container";
};



CMD_NOT_CARRYING = function(item) {
  return "You're not carrying " + item.pronouns.objective + ".";
};
CMD_WEARING = function(item) {
  return "You're wearing " + item.pronouns.objective + ".";
};
CMD_NOT_HERE = function(item) {
  return sentenceCase(item.pronouns.subjective) + "'s not here.";
};
CMD_NOT_WEARING = function(item) {
  return "You not wearing " + item.pronouns.objective + ".";
};
CMD_CANNOT_TAKE = function(item) {
  return "You can't take " + item.pronouns.objective + ".";
};
CMD_CANNOT_WEAR = function(item) {
  return "You can't wear " + item.pronouns.objective + ".";
};
CMD_CANNOT_OPEN = function(item) {
  return "You can't open " + item.pronouns.objective + ".";
};
CMD_CANNOT_CLOSE = function(item) {
  return "You can't close " + item.pronouns.objective + ".";
};
CMD_CANNOT_READ = function(item) {
  return "Nothing worth reading there.";
};
CMD_CANNOT_EAT = function(item) {
  return pronounVerb(item, "'be") + " not something you can eat.";
};

CMD_ALREADY_HAVE = function(item) {
  return "You already have " + item.pronouns.objective + ".";
};
CMD_ALREADY_WEARING = function(item) {
  return "You're already wearing " + item.pronouns.objective + ".";
};
CMD_ALREADY = function(item) {
  return sentenceCase(item.pronouns.subjective) + " already " + conjugate(item, "be") + ".";
};
CMD_LOCKED = function(item) {
  return sentenceCase(item.pronouns.subjective) + " " + conjugate(item, "'be") + " locked.";
};
CMD_LOCKED_EXIT = "That way is locked.";


CMD_TAKE_SUCCESSFUL = function(item) {
  return "You take " + itemNameWithThe(item) + ".";
};
CMD_DROP_SUCCESSFUL = function(item) {
  return "You drop " + itemNameWithThe(item) + ".";
};
CMD_WEAR_SUCCESSFUL = function(item) {
  return "You put on " + itemNameWithThe(item) + ".";
};
CMD_REMOVE_SUCCESSFUL = function(item) {
  return "You take " + itemNameWithThe(item) + " off.";
};
CMD_OPEN_SUCCESSFUL = function(item) {
  return "You open " + itemNameWithThe(item) + ".";
};
CMD_CLOSE_SUCCESSFUL = function(item) {
  return "You close " + itemNameWithThe(item) + ".";
};



const ERROR_NO_PLAYER = "No player object found. This will not go well...";
const ERROR_MSG_OR_RUN = "Unsupported type for msgOrRun";
const ERROR_NO_ROOM = "Failed to find room";
const ERROR_INIT_BACKGROUND = "It looks like an item has been named 'background`, but is not set as the background item. If you intended to do this, ensure the background property is set to true.";
const ERROR_INIT_REPEATED_NAME = function(name) {
  return "Attempting to use the name `" + name + "`, there there is already an item with that name in the world.";
};
const ERROR_INIT_DISALLOWED_NAME = function(name) {
  return "Attempting to use the disallowed name `" + name + "`; a name can only include letters and digits - no spaces or accented characters. Use the 'alias' attribute to give an item a name with other characters.";
};
const ERROR_USING_CREATE_OBJECT = function(name) {
  return "Attempting to use createObject with `" + name + "` after set up. To ensure games save properly you should use cloneObject to create ites during play.";
};
const ERROR_INIT_UNKNOWN_LOC = function(item) {
  return "The item `" + item.name + "` is in an unknown location (" + item.loc + ")";
};
const ERROR_INIT_UNKNOWN_EXIT = function(dir, room, loc) {
  return "The exit `" + dir + "` in room '" + room.name + "' is to an unknown location (" + loc + ")"
};




const DEFAULT_DESCRIPTION = "It's just scenery.";

const PRONOUNS = {
  thirdperson:{subjective:"it", objective:"it", possessive: "its", poss_adj: "its", reflexive:"itself"},
  male:{subjective:"he", objective:"him", possessive: "his", poss_adj: "his", reflexive:"himself"},
  female:{subjective:"she", objective:"her", possessive: "hers", poss_adj: "her", reflexive:"herself"},
  plural:{subjective:"they", objective:"them", possessive: "theirs", poss_adj: "their", reflexive:"theirselves"},
  firstperson:{subjective:"I", objective:"me", possessive: "mine", poss_adj: "my", reflexive:"myself"},
  secondperson:{subjective:"you", objective:"you", possessive: "yours", poss_adj: "your", reflexive:"yourself"},
};



// Change the abbrev values to suit your game (or language)
const EXITS = [
  {name:'northwest', abbrev:'NW'}, 
  {name:'north', abbrev:'N'}, 
  {name:'northeast', abbrev:'NE'}, 
  {name:'in', abbrev:'In'}, 
  {name:'up', abbrev:'U'},
  
  {name:'west', abbrev:'W'}, 
  {name:'Look', abbrev:'Lk', nocmd:true}, 
  {name:'east', abbrev:'E'}, 
  {name:'out', abbrev:'Out'}, 
  {name:'down', abbrev:'Dn'}, 

  {name:'southwest', abbrev:'SW'}, 
  {name:'south', abbrev:'S'}, 
  {name:'southeast', abbrev:'SE'}, 
  {name:'Wait', abbrev:'Z', nocmd:true}, 
  {name:'Help', abbrev:'?', nocmd:true}, 
];



helpScript = function() {
  metamsg("This is an experiment in using JavaScript (and a little jQuery) to create a text game.");
  if (PANES != "None") {
    if (COMPASS) {
      metamsg("Use the compass rose at the top to move around. Click 'Lk' to look at you current location, 'Z' to wait or '?' for help.");
    }
    metamsg("To interact with an object, click on it, and a set of possible actions will appear under it. Click on the appropriate action.");
  }
  if (TEXT_INPUT) {
    metamsg("Type commands in the command bar to interact with the world. To move, use the eight compass directions (or just 'n', 'ne', etc.). Up/down and in/out may be options too. You can also LOOK, HELP or WAIT. Other commands are generally of the form GET HAT or PUT THE BLUE TEAPOT IN THE ANCIENT CHEST. Experiment and see what you can do!");
    metamsg("You can use ALL and ALL BUT with some commands, for example TAKE ALL, and PUT ALL BUT SWORD IN SACK. You can also use pronouns, so LOOK AT MARY, then TALK TO HER. The pronoun will refer to the last subject in the last successful command, so after PUT HAT AND FUNNY STICK IN THE DRAWER, 'IT' will refer to the funny stick (the hat and the stick are subjects of the sentence, the drawer was the object). ");
    metamsg("You can use the up and down arrows to scroll back though your previous commands - especially useful if you realise you spelled something wrong. You can use [SHIFT] with the arrow keys to move north, south, east or west.");
  }
  return SUCCESS_NO_TURNSCRIPTS;
};


const CONJUGATIONS = {
  i:[
    { name:"be", value:"am"},
    { name:"_be", value:"'m"},
  ],
  you:[
    { name:"be", value:"are"},
    { name:"_be", value:"'re"},
  ],
  we:[
    { name:"be", value:"are"},
    { name:"_be", value:"'re"},
  ],
  they:[
    { name:"be", value:"are"},
    { name:"_be", value:"'re"},
  ],
  it:[
    { name:"be", value:"is"},
    { name:"have", value:"has"},
    { name:"can", value:"can"},
    { name:"mould", value:"moulds"},
    { name:"*ould", value:"ould"},
    { name:"must", value:"must"},
    { name:"can't", value:"can't"},
    { name:"won't", value:"won't"},
    { name:"cannot", value:"cannot"},
    { name:"@n't", value:"n't"},
    { name:"'ve", value:"'s"},
    { name:"'be", value:"'s"},
    { name:"*ay", value:"ays"},
    { name:"*oy", value:"oys"},
    { name:"*ey", value:"eys"},
    { name:"*y", value:"ies"},
    { name:"*ss", value:"sses"},
    { name:"*s", value:"sses"},
    { name:"*sh", value:"shes"},
    { name:"*ch", value:"ches"},
    { name:"*o", value:"oes"},
    { name:"*x", value:"xes"},
    { name:"*z", value:"zes"},
    { name:"*", value:"s"},
  ],
};




conjugate = function(item, verb) {
  var gender = item.pronouns.subjective;
  if (gender == "he" || gender == "she") { gender = "it" };
  arr = CONJUGATIONS[gender.toLowerCase()];

  if (!arr) {
    errormsg(ERR_QUEST_BUG, "No conjugations found: CONJUGATIONS_" + gender.toLowerCase());
    return verb;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == verb) {
      return arr[i].value;
    }
  }
  
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i].name;
    var value = arr[i].value;
    if (name.startsWith("@") && verb.endsWith(name.substring(1))) {
      return conjugate(item, verb.substring(0, verb.length - name.length + 1)) + value;
    }
    else if (name.startsWith("*") && verb.endsWith(name.substring(1))) {
      return item, verb.substring(0, verb.length - name.length + 1) + value;
    }
  }
  return verb;
};


pronounVerb = function(item, verb, capitalise) {
  s = item.pronouns.subjective + " " + conjugate(item, verb);
  s = s.replace(" '", "'");  // yes this is a hack!
  return capitalise ? sentenceCase(s) : s;
};

nounVerb = function(item, verb, capitalise) {
  s = item.name + " " + conjugate(item, verb);
  return capitalise ? sentenceCase(s) : s;
};

