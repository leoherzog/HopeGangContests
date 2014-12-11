(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function () {
    FB.init({
        appId: '259817854185940',
        //appId: '852976671421334',
        xfbml: true, version: 'v2.2'
    });

    aToken = null;

	function getStatusCallback(response) {
		console.log('getStatusCallback',response);
	    if (response.status === 'connected') {
	    	aToken = response.authResponse.accessToken;
	    	getAlbuns();
	    }
	    else FB.login(loginCallback,{scope: 'user_photos,user_groups'});
	}

	function loginCallback(response) {
		console.log('loginCallback',response);
		if (response.status == 'connected') getAlbuns();
		if (response.status == 'not_authorized') location.href = 'notlogged.html';
	}

	function getAlbuns() {
		console.log('getAlbuns()');
		var groupID = 295111260612878;	

		var currentID = '320773888046615';
		var pastID    = '314117022045635';

		getPictures('10151358357091755','#current');
		return;

		FB.api("/"+groupID+"/albums", function (response) {
			console.log(response);
			if (response && !response.error) {
				for (i in response.data) {
					var album = response.data[i];
					getPictures(album.id);
				}
			}
		});
	}

	function getPictures(idGallery,selector) {
		FB.api("/"+idGallery+"/photos", function (response) {
			if (response && !response.error) {
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

