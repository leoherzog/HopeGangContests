!function ($) {
    $(function(){
	    // $('#current, #rules, #past').carousel({});
	    $('#rules, #past').carousel({});

	    var $root = $('html, body');
	    $('a').click(function() {
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
    $("#rules .rslides, #past .rslides").responsiveSlides({
        pager: true,
        nav: true,
        pause: true
    });
});