/*!
* jquery.cbgetmap.js v1.2.1
* Auther @maechabin
* Licensed under mit license
* https://github.com/maechabin/jquery.cbgetmaps.js
*/
;(function (factory) {

  if (typeof module === "object" && typeof module.exports === "object") {

    factory(require("jquery"), window, document);

  } else {

    factory(jQuery, window, document);

  }

} (function ($, window, document, undefined) {

	var GetMap = function (element, options, id) {

		this.element = element;
		this.$element = $(element);
		this.config = {};
		this.options = options;
		this.map_canvas = [];
		this.map_canvas_id = id;
		this.geocoder = new google.maps.Geocoder();

	};

	GetMap.prototype.defaults = {

		map_location_name: ".cb-getlocation",
		map_canvas_name: ".cb-mapcanvas",
		map_canvas_width: "100%",
		map_canvas_height: "120px",
		map_canvas_text: "大きな地図で見る", // タグ使用可
		map_canvas_text_size: "14px",
		map_zoom: 13,
		map_type: "ROADMAP" // ROADMAP, SATELLITE, HYBRID, TERRAIN

	};

	GetMap.prototype.getData = function () {

		var map_address = this.$element.find(this.config.map_location_name).attr("title");
		this.codeAddress(map_address);

	};

	GetMap.prototype.codeAddress = function (addr) {

		var that = this;
		var address = addr;
		var mapOptions = {
			zoom: that.config.map_zoom,
			mapTypeId: google.maps.MapTypeId[that.config.map_type],
			scrollwheel: false
		};

		var cvs = that.map_canvas[that.map_canvas_id];
		var map = new google.maps.Map(cvs, mapOptions);

		this.geocoder.geocode({'address': address}, function (results, status) {

			var location, maker;

			if (status == google.maps.GeocoderStatus.OK) {

				location = results[0].geometry.location;
				map.setCenter(location);

				marker = new google.maps.Marker({
					map: map,
					position: location
				});

				that.makeLink(location);

			} else {

				console.log('Geocode was not successful for the following reason: ' + status);

			}

		});

	};

	GetMap.prototype.makeLink = function (location) {

		var location_text = location + "";
		var link_location = location_text.replace(/[\(\)]/g, "");

		var map_link_p = $("<p>").addClass("cb-maplink").css({
			"font-size": this.config.map_canvas_text_size,
			"margin-top": "4px"
		});
		var map_link_a = $("<a>").attr({
			"href": "https://www.google.co.jp/maps?q=" + link_location,
			"target": "_blank"
		}).html(
			"<b>" + this.config.map_canvas_text + "</b>"
		);

		var map_link = map_link_p.append(map_link_a );

		this.map_canvas.eq(this.map_canvas_id).after(map_link);

	};

	GetMap.prototype.makeCanvas = function () {

		this.map_canvas = $("." + this.$element.attr("class")).find(this.config.map_canvas_name);
		this.map_canvas.css({
			"margin": 0,
			"width": this.config.map_canvas_width,
			"height": this.config.map_canvas_height
		});

	};

	GetMap.prototype.init = function () {

		this.config = $.extend({}, this.defaults, this.options);
		this.makeCanvas();
		this.getData();

		return this;

	};

	$.fn.cbGetMaps = function (options) {

		return this.each(function (i) {

			new GetMap(this, options, i).init();

		});

	};

}));
