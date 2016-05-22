/**
 * Created by doi on 5/15/2016 AD.
 */

$('#username').html(sessionStorage['username']);
$('#company_name').html(sessionStorage['company_name']);
$('#avatar').html(sessionStorage['company_logo']);

$('#btn-live').on('click', function () {

    window.location = "product.html";
    //console.log(1);
});

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

$(window).bind("load", function () {
    if (page_name == 'home') {
        var formData = "";
        $.ajax({
            url: serverURL + "list-news.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                //data - response from server
                for (var i = 0; i < data.data.length; i++) {
                    html = decodeURIComponent(data.data[i].createdon).replace(/\+/g, ' ') + ": " + decodeURIComponent(data.data[i].content).replace(/\+/g, ' ') + "<br>";
                    $('#annoucement').append(html);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);

            }
        });

        $('#btn-live').on('click', function () {

            window.location = "product.html";
            //console.log(1);
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
                $('#product3').html("");
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product half">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://104.199.155.2/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                    html += '</div>';
                    $('#product3').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);

            }
        });
        $('#btn-product-back').on('click', function () {
            window.history.go(-1);
            return false;
        });
    }

    if (page_name == 'list') {

        $('#btn-list-back').on('click', function () {
            window.history.go(-1);
            return false;
        });

        var param1 = getUrlVars()["pid"];
        amplitude.logEvent('Page ID:' + param1);
        var formData = "pid=" + param1;

        $.ajax({
            url: serverURL + "get-icons-by-pid.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                $('#product3').html("");
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product half">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://104.199.155.2/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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
                console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://104.199.155.2/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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

        $('#btn-vdo-back').on('click', function () {
            window.history.go(-1);
            return false;
        });

        $('#test-btn').on('click', function () {
            var myVideo = document.getElementById('my-video');

            if (typeof(myVideo.webkitEnterFullscreen) != "undefined") {
                // This is for Android Stock.
                myVideo.webkitEnterFullscreen();
            } else if (typeof(myVideo.webkitRequestFullscreen) != "undefined") {
                // This is for Chrome.
                myVideo.webkitRequestFullscreen();
            } else if (typeof(myVideo.mozRequestFullScreen) != "undefined") {
                myVideo.mozRequestFullScreen();
        }
        })
    }

    if (page_name == "listbox") {

        $('#btn-box-back').on('click', function () {
            window.history.go(-1);
            return false;
        });

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
                    html = '<div class="product three">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://104.199.155.2/streammgmt/images/icon/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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
                    html += '<img src="http://104.199.155.2/streammgmt/images/icon/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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

    if (page_name == "listrow") {

        $('#btn-row-back').on('click', function () {
            window.history.go(-1);
            return false;
        });

        var param1 = getUrlVars()["pid"];
        amplitude.logEvent('Page ID:' + param1);
        var formData = "pid=" + param1;
        $.ajax({
            url: serverURL + "get-icons-by-pid.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                $('#product3').html("");
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product rowp">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://104.199.155.2/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" height="100px"  alt=""></a>';
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
                console.log(data);
                console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://104.199.155.2/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
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
});