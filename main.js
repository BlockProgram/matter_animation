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
    width: 800,
    height: 600,
    wireframes: false,
  },
});

// create two boxes and a ground
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, 540, 10, 80, { isStatic: true });
var rightWall = Bodies.rectangle(800, 540, 10, 80, { isStatic: true });

// add bodies
var stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(10, 25), {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      fillStyle: ["#000000", "#CCCCCC", "#25DDBC", "#007DB0"][
        Math.round(Math.random() * 6 - 0.5)
      ],
    },
  });
});

// return Bodies.circle(Math.random() * width, size, radius, {
//   mass: size / 5,
//   render: {
//     fillStyle: [
//       "#EA1070",
//       "#EAC03C",
//       "#25DDBC",
//       "#007DB0",
//       "#252B7F",
//       "#FF6040",
//     ][Math.round(Math.random() * 6 - 0.5)],
//   },
// });

// add all of the bodies to the world
World.add(engine.world, [stack, leftWall, rightWall, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
