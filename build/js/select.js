$('.js-select').each(function () {

	var this_ = $(this),
		numberOfOptions = this_.children('option').length,
		className = this_.attr('class').replace('js-select', ''),
		delay = 200;

	// Wrap the select element in a div
	this_.wrap('<div class="select '+ className +'"></div>');

	// Insert a styled div to sit over the top of the hidden select element
	this_.after('<div class="styledBlock"></div>');

	// Cache the styled div
	var styledBlock = this_.next('div.styledBlock');

	// Show the first select option in the styled div
	styledBlock.text(this_.children('option').eq(0).text());

	// Insert an unordered list after the styled div and also cache the list
	var list = $('<ul />', {
		'class': 'options'
	}).insertAfter(styledBlock);

	// Insert a list item into the unordered list for each select option
	for (var i = 0; i < numberOfOptions; i++) {
		var span;
		if (this_.children('option').eq(i).data('inf')){
			span = '<span> ' + this_.children('option').eq(i).data('inf') + '</span>';
		}
		else {
			span = '';
		}
		$('<li />', {
			html: this_.children('option').eq(i).text() + span,
			rel: this_.children('option').eq(i).val()
		}).appendTo(list);
	}

	// Cache the list items
	var listItems = list.children('li');

	// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
	styledBlock.on('click', function (e) {
		var block = $(this),
			parent = block.parents('.select');
		if (!block.hasClass('is-active')) {
			$('.styledBlock').removeClass('is-active');
			$('ul.options').fadeOut(delay);
			block.addClass('is-active').next('ul.options').fadeIn(delay);
		}
		else {
			block.removeClass('is-active').next('ul.options').fadeOut(delay);
		}
		e.stopPropagation();
	});

	// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
	// Updates the select element to have the value of the equivalent option
	listItems.on('click', function (e) {
		styledBlock.html($(this).html()).removeClass('is-active');
		this_.val($(this).attr('rel'));
		listItems.removeClass('is-active');
		$(this).addClass('is-active');
		list.fadeOut(delay);
		e.stopPropagation();
	});

	// Hides the unordered list when clicking outside of it
	$(document).on('click', function () {
		styledBlock.removeClass('is-active');
		list.fadeOut(delay);
	});

});