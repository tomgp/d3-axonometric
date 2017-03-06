import {default as axonometricProjection}  from "./axonometric";

export default function(){
    var project = axonometricProjection();
    //console.log(axonometricProjection);

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
        if(p !== undefined) return project; 
        project = p;
        return drawer;
    }

    return drawer;
}