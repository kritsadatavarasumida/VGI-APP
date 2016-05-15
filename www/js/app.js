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
        url: serverURL + "get-icons-by-pid.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log(data.data.length);
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html = "";
                html = '<div class="product half">';
                html += '<a href="product-mock.html"><img src="' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                html += '</div>';
                $('#product3').append(html);
            }
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });
}
