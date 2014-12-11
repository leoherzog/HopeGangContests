var myApp = '852976671421334';
var albumNow = '320773888046615'; // id of the 'current' album
var albumOld = '314117022045635'; // id of the 'past submission' album

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function removeAPP() {
	FB.api('/me/permissions', 'delete', function(response) {
    	location.reload();
	});
}

window.fbAsyncInit = function () {
    FB.init({
        appId: myApp,
        xfbml: true, version: 'v2.2'
    });

    aToken = null;

	function getStatusCallback(response) {
		console.log('getStatusCallback',response);
	    if (response.status === 'connected') getData(response);
	    else FB.login(loginCallback,{scope: 'user_photos'});
	}

	function loginCallback(response) {
		console.log('loginCallback',response);
		if (response.status == 'connected') getData(response);
		if (response.status == 'not_authorized') location.href = 'notlogged.html';
	}

	function getData(response) {
	    aToken = response.authResponse.accessToken;
	    sigRequest = response.authResponse.signedRequest;
		getPictures(albumNow,'#current');
		getPictures(albumNow,'#past');
	}


	function getPictures(idGallery,selector) {
		FB.api("/"+idGallery+"/photos?signed_request="+sigRequest+"&access_token="+aToken, function (response) {
			if (response && !response.error) {
				console.log('getPictures',response.data);
				if (selector) {
					var $ul = $(selector+' .rslides').empty();
					for (i in response.data) {
						var photo = response.data[i];
						var $li = $("<li>").appendTo($ul);
						var $img = $("<img>",{'src':photo.source}).appendTo($li);
					}
					$(selector).carousel({});
				    $(selector+' .rslides').responsiveSlides({pager: true, nav: true, pause: true});
				}
			}
		});
	}

    FB.getLoginStatus(getStatusCallback);
};

