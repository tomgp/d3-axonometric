var tape = require("tape"),
    axonometric = require("../");

tape("foo() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  test.equal(axonometric.axonometric(), 42);
  test.end();
});
