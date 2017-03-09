(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-shape')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-shape'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3));
}(this, function (exports,d3Shape) { 'use strict';

	d3Shape = 'default' in d3Shape ? d3Shape['default'] : d3Shape;

	function projection(){
		var angle = Math.PI/8;
		var sinAngle = Math.sin(angle);
		var cosAngle = Math.cos(angle);

		function projector(p){
			var x = (p[0]-p[2]) * cosAngle;
			var y = -p[1] + (p[0]+p[2]) * sinAngle;
			return [x, y];
		}

	    projector.angle = function(radians){
	        if(radians === undefined) return angle;
	        angle = radians;
	        sinAngle = Math.sin(angle);
		      cosAngle = Math.cos(angle);
	        return projector
	    };

		return projector;
	}

	function axonometricPath(){
	    var project = projection();
	    var xAccessor = function(d){ return d[0]; };
	    var yAccessor = function(d){ return d[1]; };
	    var zAccessor = function(d){ return d[2]; };
	    var pathGenerator = d3Shape.line()
	        .x(function(d) { return d[0]; })
	        .y(function(d) { return d[1]; });

	    function drawer (data){
	        var pathData = data.map(function(d){
	            return project([xAccessor(d), yAccessor(d), zAccessor(d)]);
	        })

	        return pathGenerator(pathData);
	    }

	    drawer.projection = function(x){
	        if(x === undefined) return project; 
	        project = x;
	        return drawer;
	    }

	    drawer.pathGenerator = function(x){
	        if(x === undefined) return pathGenerator;
	        pathGenerator = x;
	        return drawer;
	    }

	    return drawer;
	}

	function axonometricLine(){
	    var project = projection();

	    function drawer (start, end){
	        var s = project(start);
	        var e = project(end);
	        return {
	            x1:s[0],
	            y1:s[1],
	            x2:e[0],
	            y2:e[1],
	        };
	    }

	    drawer.projection = function(p){
	        if(p === undefined) return project; 
	        project = p;
	        return drawer;
	    }

	    return drawer;
	}

	function axonometricBounds(){
	    var project = projection();

	    function bounds (points){
	        var projectedPoints = points.map(function(d){
	            return project(d);
	        });

	        var boundingExtents = projectedPoints.reduce(function(ranges,current){
	            if(ranges.x[0] === undefined){
	                ranges.x = [ current[0], current[0] ];
	                ranges.y = [ current[1], current[1] ];
	            }else{
	                ranges.x[0] = Math.min( current[0], ranges.x[0] ); 
	                ranges.x[1] = Math.max( current[0], ranges.x[1] );
	                ranges.y[0] = Math.min( current[1], ranges.y[0] );
	                ranges.y[1] = Math.max( current[1], ranges.y[1] );
	            }
	            return ranges;
	        }, {x:[],y:[]});

	        return {
	            x:boundingExtents.x[0],
	            y:boundingExtents.y[0],
	            width:boundingExtents.x[1] - boundingExtents.x[0],
	            height:boundingExtents.y[1] - boundingExtents.y[0],
	        };
	    }

	    bounds.projection = function(p){
	        if(p === undefined) return project; 
	        project = p;
	        return bounds;
	    }

	    return bounds;
	}

	exports.axonometricProjection = projection;
	exports.axonometricPath = axonometricPath;
	exports.axonometricLine = axonometricLine;
	exports.axonometricBounds = axonometricBounds;

	Object.defineProperty(exports, '__esModule', { value: true });

}));