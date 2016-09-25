/**
 * Created by doi on 5/15/2016 AD.
 */


window.onerror = function (message, file, line) {
    window.external.Notify("Error in Application: " +
        message + ". Source File: " + file + ", Line: " + line);
}

$('#username').html(sessionStorage['username']);
$('#company_name').html(sessionStorage['company_name']);
//console.log('1' + sessionStorage['company_logo'])
if (sessionStorage['company_logo'] == null || sessionStorage['company_logo'] == '') {
    $('#avatar').attr('src', 'img/user.jpg');
} else {
    $('#avatar').attr('src', sessionStorage['company_logo']);
}


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
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                //data - response from server
                for (var i = 0; i < data.data.length; i++) {
                    html = decodeURIComponent(data.data[i].createdon).replace(/\+/g, ' ') + ": " + decodeURIComponent(data.data[i].content).replace(/\+/g, ' ') + "<br>";
                    $('#annoucement').append(html);
                    window.sessionStorage.setItem("news-length", data.data.length);
                }
                if (data.data.length === 0) {
                    window.sessionStorage.setItem("news-length", 0);
                    window.location = "product.html";
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
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
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                $('#product3').html("");
                console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product half">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://111.223.34.249/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" class="cached-img" alt=""></a>';
                    html += '</div>';
                    $('#product3').append(html);
                }
                //data - response from server
                $('#product3').imagesLoaded()
                    .always(function (instance) {
                        console.log('all images loaded');
                    })
                    .done(function (instance) {
                        console.log('all images successfully loaded');
                    })
                    .fail(function () {
                        console.log('all images loaded, at least one is broken');
                    })
                    .progress(function (instance, image) {
                        var result = image.isLoaded ? 'loaded' : 'broken';
                        console.log('image is ' + result + ' for ' + image.img.src);
                    });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }

            }
        });
        $('#btn-product-back').on('click', function () {
            if (sessionStorage['news-length'] == 0) {
                window.location = "index.html";
            } else {
                window.history.go(-1);
                return false;
            }
        });
    }

    if (page_name == 'list') {

        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
            var now = new Date();
            $('#linedate').html(now);
        }


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
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                $('#product3').html("");
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product half">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://111.223.34.249/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" class="cached-img" alt=""></a>';
                    html += '</div>';
                    $('#product3').append(html);
                }
                //data - response from server
                $('#product3').imagesLoaded(function ($images, $proper, $broken) {
                    // see console output for debug info
                    ImgCache.options.debug = true;
                    ImgCache.options.usePersistentCache = true;
                    ImgCache.init(function () {
                        // 1. cache images
                        for (var i = 0; i < $images.length; i++) {
                            ImgCache.cacheFile($($images[i]).attr('src'));
                        }
                        // 2. broken images get replaced
                    });
                })
                    .always(function (instance) {
                        console.log('all images loaded');
                    })
                    .done(function (instance) {
                        console.log('all images successfully loaded');
                    })
                    .fail(function () {
                        console.log('all images loaded, at least one is broken');
                    })
                    .progress(function (instance, image) {
                        var result = image.isLoaded ? 'loaded' : 'broken';
                        console.log('image is ' + result + ' for ' + image.img.src);
                    });


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }

            }
        });

        $.ajax({
            url: serverURL + "get-banners-by-pid.php",
            type: "POST",
            data: formData,
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://111.223.34.249/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" class="cached-img" alt=""></a>';
                    html += '</div>';
                    $('#banners').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }

            }
        });


    }

    if (page_name == "vdo") {

        var param1 = getUrlVars()["pid"];
        amplitude.logEvent('Page ID:' + param1);
        var formData = "pid=" + param1;
        $('#btn-vdo-back').on('click', function () {
            window.history.go(-1);
            return false;
        });

        $.ajax({
            url: serverURL + "get-banners-by-pid.php",
            type: "POST",
            data: formData,
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                $('#loading').hide();
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://111.223.34.249/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                    html += '</div>';
                    $('#banners').append(html);

                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });

        $.ajax({
            url: serverURL + "get-streams-by-pid.php",
            type: "POST",
            data: formData,
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data.data.length == 1) {
                    //if (sessionStorage['OS'] != "Android") {
                    html = '<video class="vjs-default-skin" preload="auto" controls autoplay id="my-video"width="100%" height="auto" poster="img/loader3.gif" data-setup={"aspectRatio": "16:9"}>';
                        html += '<source type="application/x-mpegurl" src="' + decodeURIComponent(data.data[0].url) + '">';
                        html += '</video>';


                    //} else {
                    //    html = '<video class="video-js" controls autoplay id="my-video" poster="img/loader3.gif" src="' + decodeURIComponent(data.data[0].url) + '" width="100%"></video>';
                    //}
                    $('#vdo-container').html(html);
                    $('#linestatus').html(decodeURIComponent(data.data[0].show_text).replace(/\+/g, ' '));

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });

    }

    if (page_name == "listbox") {
        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
            var now = new Date();
            $('#linedate').html(now);
        }
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
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product three">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://111.223.34.249/streammgmt/images/icon/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                    html += '</div>';
                    $('#product3').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });

        $.ajax({
            url: serverURL + "get-banners-by-pid.php",
            type: "POST",
            data: formData,
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://111.223.34.249/streammgmt/images/icon/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                    html += '</div>';
                    $('#banners').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });
    }

    if (page_name == "listrow") {
        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
            var now = new Date();
            $('#linedate').html(now);
        }

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
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                $('#product3').html("");
                //console.log(data);
                //console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="product rowp">';
                    html += '<a href="' + data.data[i].linkto + '.html?pid=' + data.data[i].next_page + '"><img src="http://111.223.34.249/streammgmt/images/icon/' + data.data[i].icon_url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" height="100px"  alt=""></a>';
                    html += '</div>';
                    $('#product3').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });

        $.ajax({
            url: serverURL + "get-banners-by-pid.php",
            type: "POST",
            data: formData,
            tryCount: 0,
            retryLimit: 3,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                console.log(data.data.length);
                var html = "";
                for (var i = 0; i < data.data.length; i++) {
                    html = "";
                    html = '<div class="swiper-slide">';
                    html += '<img src="http://111.223.34.249/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                    html += '</div>';
                    $('#banners').append(html);
                }
                //data - response from server


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }
                    return;
                }
                if (xhr.status == 500) {
                    //handle error
                } else {
                    //handle error
                }
            }
        });
    }
});

if (page_name == "mvdo") {

    var param1 = getUrlVars()["pid"];
    amplitude.logEvent('Page ID:' + param1);
    var formData = "pid=" + param1;
    $('#btn-vdo-back').on('click', function () {
        window.history.go(-1);
        return false;
    });

    $.ajax({
        url: serverURL + "get-banners-by-pid.php",
        type: "POST",
        data: formData,
        tryCount: 0,
        retryLimit: 3,
        success: function (data, textStatus, jqXHR) {
            $('#loading').hide();
            //console.log(data);
            //console.log(data.data.length);
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html = "";
                html = '<div class="swiper-slide">';
                html += '<img src="http://111.223.34.249/streammgmt/images/banner/' + data.data[i].url.replace(/%3A/g, ':').replace(/%2F/g, '/') + '" alt=""></a>';
                html += '</div>';
                $('#banners').append(html);

            }
            //data - response from server


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                }
                return;
            }
            if (xhr.status == 500) {
                //handle error
            } else {
                //handle error
            }
        }
    });
    var vpara = '{"aspectRatio": "16:9"}';
    console.log(vpara);
    $.ajax({
        url: serverURL + "get-streams-by-pid.php",
        type: "POST",
        data: formData,
        tryCount: 0,
        retryLimit: 3,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            //if (sessionStorage['OS'] != "Android") {
            if (data.data.length > 0) {
                html = '<video class="vjs-default-skin" preload="auto" controls autoplay id="my-video"width="100%" height="auto" poster="img/loader3.gif" >';
                html += '<source type="application/x-mpegurl" src="' + decodeURIComponent(data.data[0].url) + '">';
                html += '</video>';


                //} else {
                //    html = '<video class="video-js" controls autoplay id="my-video" poster="img/loader3.gif" src="' + decodeURIComponent(data.data[0].url) + '" width="100%"></video>';
                //}
                $('#vdo-container').html(html);
                $('#linestatus').html(decodeURIComponent(data.data[0].show_text).replace(/\+/g, ' '));

                for (var i = 1; i <= data.data.length; i++) {
                    bhtml = "<a href=# id=camera" + i + " class=mybtn>" + decodeURIComponent(data.data[i - 1].show_text).replace(/\+/g, ' ') + "</a>";
                    $('#btn-container').append(bhtml);
                    $('#camera' + i).on('click', function (url, show_text) {
                        return function () {
                            html = '<video class="vjs-default-skin" preload="auto" controls autoplay id="my-video"width="100%" height="auto" poster="img/loader3.gif" >';
                            html += '<source type="application/x-mpegurl" src="' + decodeURIComponent(url) + '">';
                            html += '</video>';
                            $('#vdo-container').html(html);
                            $('#linestatus').html(decodeURIComponent(show_text).replace(/\+/g, ' '));
                        }
                    }(data.data[i - 1].url, data.data[i - 1].show_text));
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                }
                return;
            }
            if (xhr.status == 500) {
                //handle error
            } else {
                //handle error
            }
        }
    });
}

if (page_name == "contact") {
    $('#backhome').on('click', function () {
        window.location = "product.html";
    });
}