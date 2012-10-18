var pgli = pgli || {};
pgli.diagram = pgli.diagram || {};

pgli.diagram.Diagram = gamecore.Base.extend('Diagram',
{ // static

},
{ // instance

	dom: null,
	width: 1024,
	height: 768,

	stage: null,
	layers: {
		background: null,
		nodes: null,
		links: null
	},
	background: null,

	nodes: [],

	/**
	 * Bind a new renderer to given canvas
	 * @param  HTMLElement domContainer [description]
	 * @param  Integer width      [description]
	 * @param  Integer height     [description]
	 */
	init: function(domContainer, width, height)
	{
		this.dom = domContainer;
		this.width = width;
		this.height = height;

		this.stage = new Kinetic.Stage({
			container: this.dom,
			width: this.width,
			height: this.height
		});

		this.layers.background = new Kinetic.Layer();
		this.layers.nodes = new Kinetic.Layer();
		this.layers.links = new Kinetic.Layer();

		this.background = new Kinetic.Rect({
			width: this.width,
			height: this.height,
			fill: "#343530"
		});
		this.layers.background.add(this.background);

		this.stage.add(this.layers.background);
		this.stage.add(this.layers.nodes);
		this.stage.add(this.layers.links);
	},

	addNode: function(node)
	{
		this.nodes.push(node);
		this.layers.nodes.add(node.shape);
		this.layers.nodes.draw();
	},

	linkNodes: function(node1, slot1, node2, slot2)
	{
		node1.link(node2, slot1, slot2);
	}

});