// Объявление модуля
var main = (function(){

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
		_selects();
		_columnizer();
		_slider();
		_RatingWidget();
		_ViewStateChange
	};
	var _slider = function() {

		$(".slider").slider({
			range: true,
			min: 0,
			max: 50000,
			values: [7500, 30000],
			slide: function (event, ui) {
				$(".price__from").val(ui.values[ 0 ]);
				$(".price__to").val(ui.values[ 1 ]);
			}
		});

			$('.price__from').val($(".slider" ).slider( "values", 0 ));
			$('.price__to').val($( ".slider" ).slider( "values", 1 ));


	}

	var _selects = function () {
		$(".content-bar__select").select2({
			placeholder: "Select a State",
			allowClear: true,
			minimumResultsForSearch: Infinity
		});
	}
	var _columnizer = function(){
		$('.block-info-text').columnize({
			columns: 2
	});
	}
	var _RatingWidget = function() {

		var _letThestarShining = function(ratingAmount) {
				var
					starsArray = [];
				for (var i = 0; i < 5; i++) {
					var
						starClassName = (i < ratingAmount) ? '.rating-stars-item.rating-stars-filed' : '.rating-stars-item';

					var
						star = $('<li>', {
							class: starClassName
						});
					starsArray.push(star);
				}
				return starsArray;
			}
		var _generateMarkup = function(ratingAmount, elementToAppend){
			var
				ul = $('<ul>',{
					class : 'inner__rating-stars',
					html : _letThestarShining(ratingAmount)
				});
			var
				ratingDisplay = $('<div>',{
					class : 'rating-result',
					text : ratingAmount
					});
			elementToAppend.append([ul, ratingDisplay]);
		}

		return {
			init: function () {
				$('.wrapper-inner__rating').each(function () {
					var
						$this =$(this),
						ratingAmount = parseInt($this.data('rating'));
					_generateMarkup(ratingAmount, $this);

				});
			}

		}

	}


 //Прослушивает события
	var _setUpListners = function() {
		$('.trigger').on('click',_accordeonUp);
		$('#filter-off_1').on('click', _clearCheckbox);
		$('#filter-off_2').on('click', _clearCheckbox);
		$('.sort_view-link').on('click', _ViewStateChange);
		$('.min-pick').on('click', _galleryStart);
			};
	

	var _galleryStart = function(e) {
		e.preventDefault();
		var
			$this = $(this),
			item = $this.closest('.slider__item'),
			container = $this.closest('.wrapper-inner__gallery'),
			display = container.find('.main-pick'),
			path = item.find('img').attr('src'),
			duration = 300;

		if (!item.hasClass('active')){
			item.addClass('active').siblings().removeClass('active');
			display.find('img').fadeOut(duration, function (){
				$(this).attr('src',path).fadeIn(duration);
			});
		}

	}
	var _ViewStateChange = function(e){
		e.preventDefault();
		var
			$this = $(this),
			item = $this.closest('.content-bar__item'),
			view = item.data('view'),
			ListOfItems = $('#sel-content'),
			ModificationPrefix = 'content-page__list_',
			ClassOfViewState = ModificationPrefix +view+'_active';

		  ListOfItems.attr('class',ClassOfViewState );
		}


	//var _prevClass = '';
	//var _changeState = function($this){
	//	var
	//		item = $this.closest('.content-bar__item'),
	//		view = item.data('view'),
	//		ListOfItems = $('#sel-content'),
	//		ModificationPrefix = 'content-page__list_';
    //
	//	$(ListOfItems).addClass('content-page__list_'+ view);
	//var _sort_1 = function (){
	//	$('#list-1').addClass('content-bar__sort_1_active');
	//	$('#list-2').removeClass('content-bar__sort_2_active');
	//	$('#list-3').removeClass('content-bar__sort_3_active');
	//	$('#sel').addClass('sel-1').removeClass('sel-2').removeClass('sel-3')
	//}
	//var _sort_2 =  function (){
	//	$('#list-2').addClass('content-bar__sort_2_active');
	//	$('#list-1').removeClass('content-bar__sort_1_active');
	//	$('#list-3').removeClass('content-bar__sort_3_active');
	//	$('#sel').addClass('sel-2').removeClass('sel-1').removeClass('sel-3')
	//}
	//var _sort_3 = function (){
	//	$('#list-3').addClass('content-bar__sort_3_active');
	//	$('#list-2').removeClass('content-bar__sort_2_active');
	//	$('#list-1').removeClass('content-bar__sort_1_active');
	//	$('#sel').addClass('sel-3').removeClass('sel-2').removeClass('sel-1')
	//}
	var _accordeonUp = function(e){
		e.preventDefault();
		var $this = $(this),
		item = $this.closest('.accordeon__item'),
		list = $this.closest('.accordeon__item_block'),
        items = list.find('.accordeon__item'),
		content = item.find('.inner-item'),
        otherContent = list.find('.inner-item'),
		otherTrigger = list.find('.trigger'),
			duration =200;

        if( !item.hasClass('active')) {
            items.removeClass('active');
            item.addClass('active');
            otherContent.stop(true,true).slideUp(duration);
            content.stop(true,true).slideDown(duration);
        } else {
            item.removeClass('active');
            content.stop(true,true).slideUp(duration);
        };
		if ($this.hasClass('trigger_close')) {
			otherTrigger.removeClass('trigger_close').addClass('trigger_open');
			$(this).removeClass('trigger_close').addClass('trigger_open');
		} else { console.log("hola datevid");
			otherTrigger.removeClass('trigger_close').addClass('trigger_open');
			$this.removeClass('trigger_open').addClass('trigger_close');
		}
	};

	var _clearCheckbox = function(e){
		e.preventDefault();
		var $this = $(this),
		form = $this.parent(form),
			elements = form.find('input').removeAttr("checked");
	}
		return {
			init: init
		};


	$(document).ready(function(){
		if ($('.wrapper-inner__rating').length){
			_RatingWidget.init();
		}
		if ($('.slider').length){
			_slider.init();
		}
		if ($('.content-bar__select').length){
			_selects.init();
		}
	});

})();




 main.init();
