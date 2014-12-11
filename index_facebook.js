/* =============================================================
	Config
============================================================= */ 

var myApp = '852976671421334';
var albumNow = '1530024997270481'; // id of the 'current' album
var albumOld = '1530187357254245'; // id of the 'past submission' album

/* =============================================================
	Includes
============================================================= */ 

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* =============================================================
	Actions
============================================================= */ 

function showLoginAPP() {
	$('.divCheckingFacebook').hide();
	$('.divButtonFacebook').fadeIn(200);
}

function loginAPP() {
	FB.login(loginCallback,{scope: 'user_groups, user_photos'});
}

function logoutAPP() {
	FB.api('/me/permissions', 'delete', function(response) {
    	location.reload();
	});
}

/* =============================================================
	Flux
============================================================= */ 

function getStatusCallback(response) {
	console.log('getStatusCallback',response);
    if (response.status === 'connected') getData(response);
    else showLoginAPP();
}

function loginCallback(response) {
	console.log('loginCallback',response);
	if (response.status == 'connected') {
		$('.divButtonFacebook').hide();
		$('.divLoadingAlbum').show();
		getData(response);
	}
	if (response.status == 'not_authorized') location.href = 'notlogged.html';
}

/* =============================================================
	Requesting
============================================================= */ 

function getData(response) {
	$('.divCheckingFacebook').hide();
	$('.divLoadingAlbum').show();
	console.log('getData()');
    aToken = response.authResponse.accessToken;
    sigRequest = response.authResponse.signedRequest;
	getPictures(albumNow,'#current');
	getPictures(albumOld,'#past');
}

function getPictures(idGallery,selector) {
	console.log('getPictures('+idGallery+','+selector+')');
	FB.api("/"+idGallery+"/photos?signed_request="+sigRequest+"&access_token="+aToken, function (response) {		
		if (response && !response.error) {
			$(selector+' .divLoadingAlbum').hide();
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
		} else {
			$(selector+' .divLoadingAlbum').show().html(response.error.message);
		}
	});
}

/* =============================================================
	Init
============================================================= */ 

window.fbAsyncInit = function () {
    FB.init({appId: myApp, xfbml: true, version: 'v2.2'});
    FB.getLoginStatus(getStatusCallback);
};

