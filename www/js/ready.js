/**
 * Created by doi on 5/15/2016 AD.
 */
function onDeviceReady() {
    StatusBar.hide();
    console.log(StatusBar);
    navigator.splashscreen.hide();
}


document.addEventListener('deviceready', onDeviceReady, false);