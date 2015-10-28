// Объявление модуля
var main = (function(){

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
		_selects();
		_columnizer();
		_slider();
	};
	var _slider = function() {
		$(".slider").slider({
			range: true,
			min: 0,
			max: 50000,
			values: [7500, 30000],
			slide: function (event, ui) {
				$(".price__from").val(ui.values[0]);
				$(".price__to").val(ui.values[1]);
			}


		})
	}
	var _selects = function () {
		$(".content-bar__select").select2({
			placeholder: "Select a State",
			allowClear: true
		});
	}
	var _columnizer = function(){
	$('.block-info-text').columnize({
		columns: 2
	});
	}


 //Прослушивает события
	var _setUpListners = function() {
	$('.trigger').on('click',_accordeonUp);
	$('#filter-off_1').on('click', _clearCheckbox);
	$('#filter-off_2').on('click', _clearCheckbox);
	};
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


})();


 main.init();
