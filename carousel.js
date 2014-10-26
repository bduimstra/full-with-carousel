/*global $:false */

'use strict';

function Carousel(container) {
	this.$container = container;
}

Carousel.prototype.buildCarousel = function() {
	var $slideContainer = $('<div />', {'class' : 'slide-container'}),
		$slides = this.$container.find('.slide'),
		$arrow = $('<div />', {'class' : 'nav-arrow'}),
		currentSlide = 1;
	
	$slides.each(function() {
		$slideContainer.append($(this));
	});

	this.$container.prepend($slideContainer);
	
	$slideContainer.css({
		'width': $slides.width() * $slides.length + 'px'
	});

	$slides.css({
		'width' : $(window).width()
	});

	$slideContainer.append($arrow.clone(true)).append($arrow.clone(true));

	$('.carousel').on('click', '.nav-arrow', function() {
		if ($(this).is(':first-of-type')) {
			if (currentSlide === 1) {
				$slideContainer.stop(true, true).animate({
					'margin-left' : -($slides.length - 1) * $slides.width()
				}, 600);

				currentSlide = $slides.length;
			} else {
				$slideContainer.stop(true, true).animate({
					'margin-left' : parseInt($slideContainer.css('margin-left')) + $slides.width() + 'px'
				}, 600);

				currentSlide--;
			}
		} else {
			if (currentSlide === $slides.length) {
				$slideContainer.stop(true, true).animate({
					'margin-left' : '0px'
				}, 600);

				currentSlide = 1;
			} else {
				$slideContainer.stop(true, true).animate({
					'margin-left' : parseInt($slideContainer.css('margin-left')) - $slides.width() + 'px'
				}, 600);

				currentSlide++;
			}
		}
	});
};

Carousel.prototype.init = function() {
	this.buildCarousel();
};