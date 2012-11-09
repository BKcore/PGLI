var pgli = pgli || {};
pgli.diagram = pgli.diagram || {};

pgli.diagram.Diagram = gamecore.Base.extend('Diagram',
{ // static

},
{ // instance

	dom: null,
	width: 1024,
	height: 768,

	timer: null,
	redrawDelay: 1000/30,

	stage: null,
	layers: {
		background: null,
		nodes: null,
		links: null
	},
	background: null,
	links: null,

	nodes: [],

	/**
	 * Bind a new renderer to given canvas
	 * @param  HTMLElement domContainer [description]
	 * @param  Integer width      [description]
	 * @param  Integer height     [description]
	 * @param  Integer autoRedraw If defined, sets redraw rate to given FPS
	 */
	init: function(domContainer, width, height, autoRedraw)
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
			fill: "#272822"
		});

		this.layers.background.add(this.background);

		this.links = new pgli.diagram.Links(this);
		this.layers.links.add(this.links.shape);

		this.stage.add(this.layers.background);
		this.stage.add(this.layers.nodes);
		this.stage.add(this.layers.links);

		// Stage drag hack to trigger only on background drag
		var self = this;
		this.background.on("mousedown", function(){
			self.stage.setDraggable(true);
			self.stage.on("dragmove", function(){
				self.layers.background.setX(-this.getX());
				self.layers.background.setY(-this.getY());
			});
			self.stage.on("dragend", function(){
				this.off("dragend");
				this.off("dragmove");
				this.setDraggable(false);
			});
		});

		if(autoRedraw != undefined && autoRedraw != false && autoRedraw > 0)
		{
			this.redrawDelay = 1000 / autoRedraw;
			this.timer = new bkcore.Timer();
			this.timer.start();
			this.autoRedraw(true);
		}
	},

	addNode: function(node)
	{
		this.nodes.push(node);
		this.layers.nodes.add(node.shape);
		this.layers.nodes.draw();
	},

	getNode: function(nodeName)
	{
		var i = 0, len = this.nodes.length;
		while(i < len)
		{
			if(this.nodes[i].module.name == nodeName)
				return this.nodes[i];
			i++;
		}

		throw "Error in Diagram: Unable to find node["+nodeName+"]";
	},

	draw: function()
	{
		this.layers.nodes.draw();
		this.layers.links.draw();
	},

	autoRedraw: function(keep)
	{
		var self = this;

		if(this.timer.update() > this.redrawDelay)
		{
			this.timer.start();
			this.draw();
		}

		if(keep)
			requestAnimFrame(function(){
				self.autoRedraw(true);
			});
	}

});