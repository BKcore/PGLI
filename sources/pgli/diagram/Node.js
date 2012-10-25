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
	width: 200,
	height: 200,

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
			width: this.width,
			height: this.height,
			fill: "#222",
			stroke: "#111",
			strokeWidth: 1,
			shadow: {
				color: "black",
				blur: 6,
				offset: [0, 0],
				opacity: 0.5
			},
			cornerRadius: 5
		});

		this.name = new Kinetic.Text({
			x: 5,
			y: 5,
			text: module.name,
			fontSize: 13,
			fontFamily: "Ubuntu Mono",
			textFill: "#aaa"
		});

		this.shape.on('mousedown', function(){
			this.moveToTop();
		});

		this.shape.add(this.background);
		this.shape.add(this.name);
	}
});