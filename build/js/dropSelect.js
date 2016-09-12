var Select = {
	start: function(options) {
		this._el = document.querySelectorAll(options.selector);
		this._parentClass = options.cssClass;
		this._body = document.body;
		this.init();
	},
	init: function() {
		this._makeDom();
		this._firstLoad();
		this._onClick();
	},
	_makeDom: function() {
		this._createParent();
		this._createList();
		this._createTitle();
		this._createLabel();
	},
	_createParent: function() {
		for (var i = 0; i < this._el.length; i++) {
			var parent = document.createElement("div");
			this._el[i].parentNode.insertBefore(parent, this._el[i]);
			parent.appendChild(this._el[i])
			parent.classList.add(this._parentClass, "no-selected");
		}
		this._parent = document.querySelectorAll("." + this._parentClass);
	},
	_createList: function() {
		for (var i = 0; i < this._parent.length; i++) {
			var options = this._parent[i].querySelectorAll("option");
			var ul = document.createElement('ul');
			for (var j = 0; j < options.length; j++) {
				var li = "<li>" + options[j].dataset.text + "</li>";
				// var li = "<li>" + options[j].innerHTML + "</li>";
				ul.insertAdjacentHTML("beforeEnd", li);
			}
			this._parent[i].appendChild(ul);
			ul.classList.add(this._parentClass + "__list");
		}
		this._ul = document.querySelectorAll(this._parentClass + " ul");

	},
	_createTitle: function() {
		for (var i = 0; i < this._parent.length; i++) {
			var title = document.createElement("span");
			title.classList.add(this._parentClass + "__label");
			this._parent[i].appendChild(title);
		}
		this._title = document.querySelectorAll(this._parentClass + " span");
	},
	_createLabel: function(){
		for (var i = 0; i < this._parent.length; i++) {
			var label = document.createElement("div");
			var labelText = this._parent[i].querySelector("select").getAttribute("data-label");
			label.classList.add("label");
			label.innerHTML = labelText;
			this._parent[i].appendChild(label);
		}
		this._label = document.querySelectorAll(this._parentClass + " div");
	},
	_onClick: function() {
		for (var i = 0; i < this._parent.length; i++) {
			this._parent[i].addEventListener("click", this._clickAction.bind(this));
		}
	},
	_clickAction: function(event) {
		// disabled select
		if (event.currentTarget.children[0].disabled) {
			return false;
		}
		if (event.target.tagName == "SPAN") {
			this._toggleList(event);
		}
		if (event.target.tagName == "LI") {
			this._changeVal(event);
			event.currentTarget.classList.remove("no-selected");
			$('.js-close-popup').addClass('is-white');
			$('.js-btn-find').addClass('is-active');
		}
	},
	_toggleList: function(event) {
		event.currentTarget.classList.toggle("is-active");
	},
	_changeVal: function(event) {
		var arrLi = event.currentTarget.querySelectorAll("li");
		var arrOptions = event.currentTarget.querySelectorAll("option");
		var target = event.target;
		var parent = event.currentTarget;
		var index = [].indexOf.call(arrLi, target);
		for (var j = 0; j < arrOptions.length; j++) {
			if (index == j) {
				arrOptions[j].selected = true;
				break;
			}
		}
		this._changeTitle(parent, arrLi[index].innerHTML);

		this._toggleList(event);
	},
	_changeTitle: function(parent, text) {

		// parent.querySelector("span").innerHTML = text+'11';
		$(parent.querySelector("span")).html(text);
		// parent.querySelector("span").innerHTML = '111';
		// console.log(parent.querySelector("span").innerHTML);
		// console.log(parent.querySelector("span"));
		//parent.querySelector("span").classList.remove("no-selected");
	},
	_firstLoad: function() {
		for (var i = 0; i < this._parent.length; i++) {
			var options = this._parent[i].querySelectorAll("option");
			var placeholder = this._parent[i].querySelector("select").getAttribute("placeholder");
			var li = this._parent[i].querySelectorAll("li");
			var arrLi = [].slice.call(li);
			var title = this._parent[i].querySelector("span");

			//title.classList.add("no-selected");
			// placeholder
			if (placeholder) {
				for (var j = 0; j < placeholder.length; j++) {
					var option = options[j];
					title.innerHTML = placeholder
				}
			}
			else {
				for (var j = 0; j < options.length; j++) {
					var option = options[j];
					if (option.selected) {
						var optionIndex = j;
						break;
					}
				}
				title.innerHTML = arrLi[optionIndex].innerHTML;
			}
		}
	}
};
Select.start({
	selector: ".js-dropSelect",
	cssClass: "drop"
});