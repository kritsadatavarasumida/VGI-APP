/**
 * Created by doi on 5/15/2016 AD.
 */
if (page_name == 'home') {
    $.ajax({
        url: serverURL + "news-home.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(JSON.stringify(data.data));
            //data - response from server

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });
}