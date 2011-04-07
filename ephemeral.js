// ephemawrite...

var maxchars;
var maxlines = 7;
var firstKey = true;

$(document).ready(function() {
		var maxchars = $(document).width() / 50;
		var now = $('#now');
		now.val('ephemawrite... ');
		now.attr('disabled', false);
		now.keydown(function(k) {
				if (firstKey) {
						now.val(now.val().slice(-1));
						now.css('color', 'black');
						firstKey = false;
				}
		});
		now.focus().keyup(function(k) {
				var currchars = now.val().length;
				if (k.keyCode == 32 && currchars > maxchars) {
						newline();
				}
				if (k.keyCode == 13) {
						newline();
				}
		});
});

function newline() {
		var now = $('#now');
		var newText = $('<span>' + now.val() + '</span>');
		var nl = $('<div></div>');
		nl.append(newText);
		$('#before').append(nl);
		newText.fadeTo(10000, 0).slideUp(2000);

		now.val('');
		
		var befores = $('#before div');
		var currlines = befores.length;
		befores.each(function(index, el) {
				var el = $(el);
				if (index == 0 && currlines > maxlines) {
						el.remove();
						return;
				}
				var scale = (maxlines - currlines + index) / maxlines;
				var easedScale = Math.pow(scale, 0.5);
				el.animate({fontSize: (easedScale * 100) + '%'}, 500);
		});
}