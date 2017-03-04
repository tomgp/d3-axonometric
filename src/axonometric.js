export default projection;
export {axonometricPath as axonometricPath};

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
  return 'path';
}

// export path function(){

//   var projector = 

//   function pathGenerator(data){

//   }

//   pathGenerator.projector = function(p){
//     if(p === undefined) return projector;
//   }

//   return pathGenerator;
// }