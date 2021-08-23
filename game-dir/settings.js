"use strict"

settings.title = "No Compass"
settings.author = "The Pixie"
settings.version = "0.1"
settings.thanks = []
settings.warnings = "No warnings have been set for this game."
settings.playMode = "dev"

settings.compassPane = false
//settings.noAskTell = false
settings.noTalkTo = false

settings.setup = function() {
  let html = '<div></div>'
  createPaneBox(2, "Go to", html, 'directions')
  settings.updateCustomUI()
}

settings.updateCustomUI = function() {
  let html = ''
  for (const ex of currentLocation.dests) {
    const dest = w[ex.name]
    html += '<div style="margin-bottom: 10px;"><p class="item" onclick="runCmd(\'go to ' + ex.name + '\')">' + dest.headingAlias + '</p></div>'
  }
  const el = document.querySelector('#directions')
  if (el) el.innerHTML = html
}

settings.roomCreateFunc = function(o) {
  if (o.dests) {
    for (const ex of o.dests) {
      ex.origin = o
      ex.dir = 'to ' + (o.dirAlias ? o.dirAlias : o.alias)
    }
  }
}

settings.inventoryPane.push(
  {name:'On Phone To', alt:'onPhoneTo', test:function(item) { return item.name === player.onPhoneTo  } }
)

settings.afterEnter = function() {
  if (player.onPhoneTo && w[player.onPhoneTo].loc === player.loc) {
    w.phone.hangUp()
  }
}