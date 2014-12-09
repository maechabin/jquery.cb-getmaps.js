/*!
* jquery.cbgetmap.js v1.0.0
* Auther @maechabin
* Licensed under mit license
* https://github.com/maechabin/jquery.cb-getmaps.js
*/

;(function ($, window, document, undefined) {

	var GetMap = function (element, options, i) {

		this.element = element;
		this.$element = $(element);
		this.config;
		this.options = options;
		this.map_canvas;
		this.map_canvas_id = i;
		this.geocoder = new google.maps.Geocoder();

	};

	GetMap.prototype.defaults = {

		map_canvas_name: ".cb-mapcanvas",
		map_canvas_width: "100%",
		map_canvas_height: "120px",
		map_canvas_text: "大きな地図で見る",
		map_canvas_text_size: "14px",
		map_zoom: 13,
		map_type: "ROADMAP"

	};


//	GetMap.prototype.readGoogleapi = function () {

//		var body = $("body");
//		var s = $("<script>").attr("src", "http://maps.googleapis.com/maps/api/js?sensor=true");
//		body.append(s);

//	};

	GetMap.prototype.getData = function () {

			var map_address = this.$element.attr("title");
			this.codeAddress(map_address);

	};

	GetMap.prototype.codeAddress = function (address) {

		var that = this;
		var address = address;
		var mapOptions = {
			zoom: that.config.map_zoom,
			mapTypeId: google.maps.MapTypeId[that.config.map_type],
			scrollwheel: false
		};

		var c = this.map_canvas[this.map_canvas_id];
		var map = new google.maps.Map(c, mapOptions);

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

		var location_text = location + ""
		var link_location = location_text.replace(/[\(\)]/g, "");

		var map_link_p = $("<p>").addClass("map-link").css({"font-size": this.config.map_canvas_text_size});
		var map_link_a = $("<a>").attr({
				"href": "https://www.google.co.jp/maps?q=" + link_location,
				"target": "_blank"
			}).html("<b>" + this.config.map_canvas_text + "</b>");

		var map_link = map_link_p.append(map_link_a );

		this.map_canvas.eq(this.map_canvas_id).after(map_link);

	};

	GetMap.prototype.makeCanvas = function () {

		this.map_canvas = $(this.config.map_canvas_name);
		this.map_canvas.css({
			width: this.config.map_canvas_width,
			height: this.config.map_canvas_height
		});

	};

	GetMap.prototype.init = function () {

		this.config = $.extend({}, this.defaults, this.options);
//		this.readGoogleapi();
		this.makeCanvas();
		this.getData();

		return this;

	};

	$.fn.cbGetMaps = function (options) {

		return this.each(function (i) {

			new GetMap(this, options, i).init();

		});

	};

} (jQuery, window, document));