/*
 *  Project: iGrid
 *  Description: Automated grid system for random images
 *  Author: Tim Ludikar
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "iGrid",
        defaults = {
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
	
			this.getElements(this.element, this.options);
			this.setGrid(this.element, this.options);
			this.squareGrid(this.element, this.options);
			this.drawGrid(this.element, this.options);
			this.resize(this.element, this.options);
			
        },
		getElements: function(el, options){
			
			var target = $(el).children().children();
			var container_beg = "<div>";
			var container_end = "</div>"
			options.size = target.length;
			
			target.each(function(index){
				$(this).attr("cell", index);
				$(this).addClass("tile");
			});
		},

        setGrid: function(el, options) {
			var grid = [];
			var array = [];
			var cols;
					
			if(typeof options.rows != "undefined"){
				cols = Math.ceil(options.size / options.rows);
			} else {
				cols = options.columns;
			}
			
			var target = $(el).children();
			var counter = 0;
			
			target.each(function(){
				var row = $(this).children();
				row.each(function(index){
					array.push(counter);
					counter++;
				});
				grid.push(array);
				array = [];
			});
			
			grid.push(array);
			options.grid = grid;
        },

		squareGrid: function(el, options){
			var target = $(el).children('div');
			var addCol = 1;
			
			target.each(function(rows){
				$(this).children().each(function(cols){
					if($(this).outerWidth() > "247"){
						options.grid[rows].splice((cols*1 + addCol), 0, ".");
						addCol++;
					}
				});
				addCol = 1;
			});
			
			addCol = 1;
			
			target.each(function(rows){
				$(this).children().each(function(cols){
					if($(this).outerHeight() > "247"){
						options.grid[(rows*1)+1].splice((cols*1 + addCol), 0, ".");
						addCol++;
					}
				});
				addCol = 1;
			});
		},

		drawGrid: function(el, options){
			var width = options.width,
				height = options.height;
			
			var top = 0;
			var left = 0;
			var target = $(el).children().children();
			
			
			for(var rows in options.grid){
				top = rows * height;
				for(var cols in options.grid[rows]){
					var element = target[options.grid[rows][cols]];
					if(options.grid[rows][cols] != "."){
						$(target[options.grid[rows][cols]]).css('top',top+'px').css('left',left + 'px');
					}
					left += (width) *1;
				}
				left = 0;
			}
		},
		
		resize: function(el, options){
			var target = $(el).children();
			var targetWidth = 0;
			
			$(el).width(options.width * options.grid[0].length)
			$(el).height(options.width * (options.grid.length - 1));
			
		}
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );