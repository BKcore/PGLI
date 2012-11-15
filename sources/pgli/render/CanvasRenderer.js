var pgli = pgli || {};
pgli.render = pgli.render || {};

pgli.render.CanvasRenderer = gamecore.Base.extend('CanvasRenderer',
{ // static



},
{ // instance

	dom: null,
	container: null,
	canvas: null,
	width: 1024,
	height: 768,

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

		console.log(this.container, this.canvas);

		this.resize();
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


		var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0, 0, size, size);
		ctx.canvas.width = ctx.canvas.height = size;
		ctx.font = 'bold 40px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#444';
  		ctx.fillText("Preview", size/2, size/2);
	}

});