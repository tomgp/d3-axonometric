import {default as axonometricProjection}  from "./axonometric";

export default function(){
    var project = axonometricProjection();

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