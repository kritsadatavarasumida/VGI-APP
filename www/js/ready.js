/**
 * Created by doi on 5/15/2016 AD.
 */
function onDeviceReady() {
    StatusBar.hide();
    console.log(StatusBar);
    navigator.splashscreen.hide();

    var notificationOpenedCallback = function (jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.init("95d2617c-6edb-4848-9782-eb8eeda989f2",
        {googleProjectNumber: "939514140277"},
        notificationOpenedCallback);

    // Show an alert box if a notification comes in when the user is in your app.
    window.plugins.OneSignal.enableInAppAlertNotification(true);
}


document.addEventListener('deviceready', onDeviceReady, false);