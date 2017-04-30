/**
 * Created by doi on 5/15/2016 AD.
 */
function onDeviceReady() {
    StatusBar.hide();
    //console.log(StatusBar);
    navigator.splashscreen.hide();
    window.sessionStorage.setItem('OS', device.platform);

    var notificationOpenedCallback = function (jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.init("95d2617c-6edb-4848-9782-eb8eeda989f2",
        {googleProjectNumber: "920648280015"},
        notificationOpenedCallback);

    // Show an alert box if a notification comes in when the user is in your app.
    window.plugins.OneSignal.enableInAppAlertNotification(true);
    window.plugins.OneSignal.sendTag("userID", sessionStorage['username']);

// write log to console
    ImgCache.options.debug = true;
    ImgCache.options.usePersistentCache = true;

// increase allocated space on Chrome to 50MB, default was 10MB
    //ImgCache.options.chromeQuota = 50*1024*1024;

    //ImgCache.init(function () {
    //    console.log('ImgCache init: success!');

    // from within this function you're now able to call other ImgCache methods
    // or you can wait for the ImgCacheReady event

    //}, function () {
    //    console.log('ImgCache init: error! Check the log for errors');
    //});


}


document.addEventListener('deviceready', onDeviceReady, false);

