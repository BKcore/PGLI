var pgli = pgli || {};
pgli.diagram = pgli.diagram || {};

pgli.diagram.Node = gamecore.Base.extend('Node',
{ // static

},
{ // instance
	module: null,
	shape: null,
	background: null,
	name: null,
	sockets: [],

	init: function(module, x, y)
	{
		this.module = module;

		this.shape = new Kinetic.Group({
			x: x == undefined ? 0 : x,
			y: y == undefined ? 0 : y,
			draggable: true
		});

		this.background = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: 200,
			height: 300,
			fill: "#111111",
			cornerRadius: 5
		});

		this.shape.add(this.background);
	}
});