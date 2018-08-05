Use this example to reproduce `webview` bug in Electron 2.0.x https://github.com/electron/electron/issues/13939

To reproduce:
1. git clone https://github.com/maxosprojects/electron-webviews-bug
2. npm install
3. npm start
4. Wait for the page to load completely and video to start playing.
5. Close the app.
6. Check _Task Manager_, _Processes_ tab, _Background Processes_ section
Electron should be hanging in there.

Expected:
1. Electron app is removed from the process list when window is closed.
2. App folder can be removed.

Observed:
1. The app goes to _Background processes_ and remains there indefinitely. Any new copies of the app remain there too, consuming CPU and memory.
2. `app.makeSingleInstance` does not detect those background processes and the app starts as usual.
3. App folder cannot be removed.

Workaroud:
Remove all `webview` elements from DOM prior to shutting down the app, e.g. BrowserWindow to listen on `close` event, prevent it with `e.preventDefault()`, detach all `webview` elements from DOM and then close the app.

To apply the workaround in this example you can open DevTools (from the menu or Ctrl+Shift+I) and run `killTabs()` in the console.
