const TabGroup = require('electron-tabs');

const VIDEO = 'https://www.youtube.com/watch?v=PJRag0rYQt8';

var tabGroup = new TabGroup({
  newTab: {
    src: VIDEO,
    title: 'Video'
  }
});

tabGroup.addTab({
  title: 'Video',
  src: VIDEO,
  active: true
});

function killTabs() {
  var tabs = tabGroup.getTabs().slice();
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    tab.close();
  }
}
