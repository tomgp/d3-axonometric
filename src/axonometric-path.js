import {default as axonometricProjection}  from "./axonometric";
import {default as d3Shape} from "d3-shape";

export default function(){
    var project = axonometricProjection();
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