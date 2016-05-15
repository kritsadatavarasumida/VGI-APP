/**
 * Created by doi on 5/15/2016 AD.
 */

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

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
            //console.log(data);
            //console.log(data.data.length);
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html = "";
                html = '<div class="product half">';
                html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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

if (page_name == 'list') {
    var param1 = getUrlVars()["pid"];
    var formData = "pid=" + param1;
    $.ajax({
        url: serverURL + "get-icons-by-pid.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            //console.log(data.data.length);
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html = "";
                html = '<div class="product half">';
                html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                html += '</div>';
                $('#product3').append(html);
            }
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });

    $.ajax({
        url: serverURL + "get-banners-by-pid.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            //console.log(data.data.length);
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html = "";
                html = '<div class="swiper-slide">';
                html += '<img src="' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                html += '</div>';
                $('#banners').append(html);
            }
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);

        }
    });

}

if (page_name == "vdo") {
    $('#btn-back').on('click', function () {
        window.history.go(-1);
    });
}