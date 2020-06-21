// Avalanche demo
//https://codepen.io/liabru/pen/soGfr

// Create random circles falling
// https://youtu.be/KakpnfDv_f0

// Plugin not working, versions warning clg

Matter.use("matter-wrap");

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    background: "transparent",
    width: 1330,
    height: 900,
    wireframes: false,
  },
});

// create two boxes and a ground
var leftGround = Bodies.rectangle(0, 600, 1730, 40, {
  isStatic: true,
  angle: 0.08,
});
var rightGround = Bodies.rectangle(1125, 625, 400, 40, {
  isStatic: true,
  angle: -0.08,
});
var leftWall = Bodies.rectangle(5, 560, 10, 100, { isStatic: true });
var rightWall = Bodies.rectangle(1320, 560, 10, 100, { isStatic: true });

// add bodies

var stack = Composites.stack(750, -1100, 10, 20, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(10, 25), {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      fillStyle: ["#e3cc42", "#6e6e6e", "#008000"][
        Math.round(Math.random() * 3 - 0.5)
      ],
    },
    plugin: {
      wrap: {
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: 2000,
          y: 2000,
        },
      },
    },
  });
});

// add all of the bodies to the world
World.add(engine.world, [stack, leftWall, rightWall, leftGround, rightGround]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
