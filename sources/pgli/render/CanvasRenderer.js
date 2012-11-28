var pgli = pgli || {};
pgli.render = pgli.render || {};

pgli.render.CanvasRenderer = gamecore.Base.extend('CanvasRenderer',
{ // static



},
{ // instance

	dom: null,
	container: null,
	canvas: null,
	context: null,
	width: 1024,
	height: 768,
	project: null,
	xform: [],
	xseek: -1,
	resources: {
		images: []
	},

	/**
	 * Bind a new renderer to given canvas
	 * @param  jQuery.DOMElement domElement [description]
	 * @param  Integer width      [description]
	 * @param  Integer height     [description]
	 */
	init: function(domElement)
	{
		this.dom = domElement;
		this.container = $('#'+this.dom);
		this.canvas = document.createElement("Canvas");
		this.container.append(this.canvas);

		this.resize();
	},

	draw: function()
	{
		if(!this.project)
			return;

		var ratio = this.getRenderRatio();

		this.xreset(ratio, 0, 0, this.width, this.height);
		console.log(this.xget());
		this.walkModule(this.project.getRootModule());
	},

	walkModule: function(module)
	{
		if(!module) return;

		this.xpush();
		console.log("render: "+module.name);

		if("fill" in module)
			this.actionFill(module.fill);

		if("layers" in module) for(var i=0, len=module.layers.length; i<len; ++i)
		{
			var layer = module.layers[i];
			if("use" in layer)
			{
				this.walkModule(this.project.getModule(layer.use));
			}
		}
		this.xpop();
	},

	actionFill: function(opts)
	{
		if(opts.type == "image")
		{
			this.loadImage(opts.value);
		}
		if(opts.type == "color")
		{
			this.context.beginPath();
			this.context.rect(this.xgetx(), this.xgety(), this.xgetw(), this.xgeth());
			this.context.fillStyle = opts.value;
			this.context.fill();
		}
	},

	xpush: function(ratio, x, y, h, w)
	{
		if(ratio == undefined)
			if(this.xseek == -1)
				this.xform.push([1.0, 0, 0, this.width, this.height]);
			else
				this.xform.push(this.xget())
		else
			this.xform.push([ratio, x, y, h, w]);
		
		this.xseek++;

		console.log("xpush: "+this.xget());
	},

	xpop: function()
	{
		this.xseek--;
		return this.xform.pop();
	},

	xget: function()
	{
		return this.xform[this.xseek];
	},

	xreset: function(ratio, x, y, h, w)
	{
		this.xseek = -1;
		this.xform = [];
		this.xpush(ratio, x, y, h, w);
	},

	xgetr: function()
	{
		return this.xform[this.xseek][0];
	},

	xgetx: function()
	{
		return this.xform[this.xseek][1];
	},

	xgety: function()
	{
		return this.xform[this.xseek][2];
	},

	xgetw: function()
	{
		return this.xform[this.xseek][3];
	},

	xgeth: function()
	{
		return this.xform[this.xseek][4];
	},

	bindProject: function(project)
	{
		this.project = project;
	},

	resize: function()
	{
		this.width = this.container.width();
		this.height = this.container.height();

		var size = 0.9*this.width;
		var $canvas = $(this.canvas);
		$canvas.width(size);
		$canvas.height(size);
		$canvas.css('marginTop', this.container.height() / 2 - size / 2);
		$canvas.css('marginLeft', this.container.width() / 2 - size / 2);

		this.context = this.canvas.getContext("2d");

		/*var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0, 0, size, size);
		ctx.canvas.width = ctx.canvas.height = size;
		ctx.font = 'bold 40px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#444';
		ctx.fillText("Preview", size/2, size/2);*/
	},

	getRenderRatio: function()
	{
		var root = this.project.getRootModule();
		if(!root) return;
		return Math.min(this.width/root.width, this.height/root.height);
	}

});