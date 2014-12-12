!function ($) {
    $(function(){
	    // $('#current, #rules, #past').carousel({});
	    $('#rules').carousel({});

	    var $root = $('html, body');
	    $('a.toplink').click(function() {	    	
		    var href = $.attr(this, 'href');
		    $root.animate({
			    scrollTop: $(href).offset().top
		    }, 800, function () {
			    window.location.hash = href;
		    });
		    return false;
	    });
    })
}(window.jQuery)

$(function () {
    //$(".rslides").responsiveSlides({
    $("#rules .rslides").responsiveSlides({
        pager: true,
        nav: true,
        pause: true,
        namespace: "centered-btns"
    });
});