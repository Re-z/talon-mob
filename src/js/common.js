$(document).ready(function() {

	//show-hide menu
	$('.js-menu-trig').on('click', function () {
		$(this).toggleClass('is-active');
		$('.js-menu').toggle();
	});

	//moving the track in section
	$('.js-section-left').on('click', function(){
		$(this).siblings().removeClass('is-active').end().addClass('is-active');
		$('.section__track').css('background-position-x', '-300px')
	});
	$('.js-section-right').on('click', function(){
		$(this).siblings().removeClass('is-active').end().addClass('is-active');
		$('.section__track').css('background-position-x', '300px')
	});

	////open-show page in aside section
	//$('.aside__list').on('click', 'a',  function(){
	//	var data = $(this).data('index');
	//	var page = '[data-page=' + data + ']';
	//	$(page).siblings().hide().end().show();
	//	$('.js-aside-buy').show();
	//	$('.js-menu-trig').removeClass('is-active')
	//});
	//
	//// open show page in menu
	//$('.menu__nav').on('click', 'a',  function(){
	//	var data = $(this).data('index');
	//	var page = '[data-page=' + data + ']';
	//	$(page).siblings().hide().end().show();
	//	$('.js-menu-trig').removeClass('is-active')
	//	$('.js-aside-buy').hide();
	//});

	//open-show recall
	$('.js-content-more').on('click', function(){
		$('.js-recall').slideToggle()
	});

	//open-show choosing list
	$('.js-brand-target, .js-model-target').on('click', function(e){
		if (!$(e.target).hasClass('find-btn')) {
			$('.choice__list').removeClass('is-visible');
			$('.js-brand-target, .js-model-target').show();
			$(this).hide().siblings('.choice__list').addClass('is-visible');
			$('.choice__content').addClass('is-opened');
		}
	});

	//retrieving data
	$('.js-brand-list').on('click', 'li', function () {
		var selectedText = $(this).text();
		$(this).siblings().removeClass('is-active').end().addClass('is-active');
		$('.js-brand-list').removeClass('is-visible');
		$('.js-brand-value').text(selectedText).addClass('is-active');
		$('.js-brand-text').text('BRAND').addClass('orange');
		$('.js-brand-input').attr('data-value', (selectedText));
		$('.js-find-brand').remove();
		$('.js-brand-target').show().append('<button class="find-btn js-find-brand">FIND TRACKS</button>')
		$('.choice__content').removeClass('is-opened');
	});

	$('.js-model-list').on('click', 'li', function () {
		var selectedText = $(this).text();
		$(this).siblings().removeClass('is-active').end().addClass('is-active');
		$('.js-model-list').removeClass('is-visible');
		$('.js-model-value').text(selectedText).addClass('is-active');
		$('.js-model-text').text('MODEL').addClass('orange');
		$('.js-model-input').attr('data-value', (selectedText));
		$('.js-find-model').remove();
		$('.js-model-target').show().append('<button class="find-btn js-find-model">FIND TRACKS</button>')
		$('.choice__content').removeClass('is-opened');
	});


	//open-hide choice section
	$('.js-choice-trig').on('click', function () {
		$('.js-choice').show();
	});
	$('.js-choice-close').on('click', function () {
		$('.js-choice').hide();
	});

	//add active class on soc. icons and preventDefault link event
	$('.js-pic-block').click(function () {
		if(!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			event.preventDefault();
		}
	});





});