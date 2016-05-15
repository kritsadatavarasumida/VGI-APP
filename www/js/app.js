/**
 * Created by doi on 5/15/2016 AD.
 */
if (page_name == 'home') {
    var formData = "";
    $.ajax({
        url: serverURL + "news-home.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });
}

if (page_name == 'product') {
    amplitude.logEvent('Enter Live Catalog');
    var page_live_catalog = 1;
    var formData = "pid=" + page_live_catalog;
    $.ajax({
        url: serverURL + "get_icons_by_pid.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });
}
