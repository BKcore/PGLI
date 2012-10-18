var pgli = pgli || {};
pgli.render = pgli.render || {};

pgli.render.CanvasRenderer = gamecore.Base.extend('CanvasRenderer',
{ // static



},
{ // instance

	dom: null,
	width: 1024,
	height: 768,

	init: function(domElement, width, height)
	{
		this.dom = domElement;
		this.width = width;
		this.height = height;
	}

});