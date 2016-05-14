/**
 * Created by doi on 5/14/2016 AD.
 */
function onDeviceReady() {
    StatusBar.hide();
    console.log(StatusBar);
    navigator.splashscreen.hide();
}


document.addEventListener('deviceready', onDeviceReady, false);
