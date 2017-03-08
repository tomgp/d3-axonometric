var tape = require("tape"),
    axonometric = require("../");

tape("foo() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  var projector = axonometric.axonometricProjection();
  var coords = projector([1,1,1]) 
  test.equal(coords[0], 0);
  test.equal(coords[1], -0.23463313526982044 );
  //test.equal(axonometric.axonometricLine()([1,1,1],[3,3,3]), 'ax line');
  // test.equal(axonometric.axonometricPath(), 'ax path');
  test.end();
});

