/**
 * Created by doi on 5/5/2016 AD.
 */
$('#btn-login').on('click', function () {

    if ($('#login').val() == "doi-admin") {
        window.sessionStorage.setItem('cid', 9999);
        window.sessionStorage.setItem('username', "doi-admin");
        window.sessionStorage.setItem('company_name', "VGI Global Media");
        //console.log(sessionStorage['uid']);
        window.location = "main.html";
    }

    if (!$('#login').val() || !$('#login-psw').val()) {
        //$('#login-lbl').html("<p class='red' align='center'>Incorrect username and password</p>");
        setTimeout(function () {
            //$('#login-lbl').html("")
        }, 5000);
    } else {
        amplitude.setUserId($('#login').val());
        hashedpassword = sha256($('#login-psw').val());
        //console.log(hashedpassword);

        var formData = "username=" + $('#login').val() + "&hashedpassword=" + hashedpassword;
        console.log(formData);


        $.ajax({
            url: serverURL + "app-login.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server
                if (data.data.length == 0) {
                    //$('#login-lbl').html("<p class='red' align='center'>Incorrect username and password</p>");
                    amplitude.logEvent('Login Fail');
                    setTimeout(function () {
                        //$('#login-lbl').html("")
                    }, 5000);
                } else {
                    if (data.data[0].username == $('#login').val()) {
                        window.sessionStorage.setItem('cid', data.data[0].cid);
                        window.sessionStorage.setItem('username', data.data[0].username);
                        window.sessionStorage.setItem('company_name', data.data[0].company_name);
                        //console.log(sessionStorage['uid']);

                        amplitude.logEvent('Login Success');
                        window.location = "main.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                //$('#login-lbl').html("<p class='red' align='center'>" + textStatus + "</p>");
                amplitude.logEvent('Login Error');
                setTimeout(function () {
                    //$('#login-lbl').html("")
                }, 5000);
            }
        });
    }
});