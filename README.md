# LBWhite-heater-estimator

Progressive Web Application (PWA) based tool for heater sizing the L.B. White heater product line.

## Introduction

An HTML5 Offline Web PWA for calculating tent and room volumes, btu requirements and L.B. White Heater recommendations.


## Testing 

### Application Website

The testing website for this project is now at: [L.B. White Heater Estimator](https://jconlon.github.io/LBWhite-heater-estimator/)

### How to Reload New Version in Browsers

You will have to clear the stored data from the old version in the browser first.  Goto the test site noted above, then for each browser follow these steps. 

[Firefox](https://support.mozilla.org/en-US/kb/storage)

[Chrome - developer tools](https://developers.google.com/web/tools/chrome-devtools/open) > Application (in the menu bar) > Clear Storage > Clear site data

### Unit Conversion Website

For calculating temperature increment conversions as well as other unit conversions a good website is: [convert-me.com](https://www.convert-me.com/en/convert/temperature-inc/?u=dcelsiusi&v=5)

### Unit Testing

```js/HeaterCalc-test.js``` is a Unit Test for the ```js/HeaterCalc.js``` main calculator engine.  It utilizes a node based library [tape](https://github.com/substack/tape)

## Creating Touch Icons
------------

### Android

On Android there’s a few different ways to achieve this. 

Thanks to philwilson.org for both these methods. See: [Setting a home screen icon for your website on iOS and Android devices](http://www.zen.co.uk/blog/setting-a-home-screen-icon-for-your-website-on-ios-and-android-devices/)

#### Method A
1. Bookmark the page you want to add to a home screen
2. Go to the home screen you want to add the link/bookmark to
3. Long-press in an empty space to bring up the “Add to Home Screen” menu
4. Select “Shortcuts”
5. Select “Bookmark”
6. Choose the bookmark you’ve just created

#### Method B

Depending on your device and version of Android, this may work:

1. Bookmark the page you want to add to a home screen
2. Open the browser “bookmarks” screen
3. Long-press the bookmark you want
4. Select “Add to Home screen”

#### Method C Chrome on Android

New in Chrome M31 Beta, you can set up your web app to have an application shortcut icon added to a device's homescreen, and have the app launch in full-screen "app mode" using Chrome for Android’s "Add to homescreen" menu item.  See: [Add to Home Screen](https://developer.chrome.com/multidevice/android/installtohomescreen)
And: [](http://www.cnet.com/how-to/create-a-shortcut-to-a-web-app-using-chrome-beta-on-android/)

### IOS
Using an iOS device to add a website bookmark to the home screen is very simple. Visit the website you want to bookmark then click the icon that looks like a box with an arrow jumping out of it (this also lets you tweet, print or mail the page you’re on). Click ‘Add to Home Screen’.
See: [Setting a home screen icon for your website on iOS and Android devices](http://www.zen.co.uk/blog/setting-a-home-screen-icon-for-your-website-on-ios-and-android-devices/)

### Windows Phone

To pin a website

1. Open the website you want to pin.

2. Tap MoreMore icon, then tap Pin to Start.

See: [Pin Things to Start](http://www.windowsphone.com/en-us/how-to/wp7/start/pin-things-to-start)
Questions
------------

For questions see the issues section of this repository or contact John Conlon (jconlon@verticon.com)

Thanks.
