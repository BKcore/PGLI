var pgli = pgli || {};
pgli.render = pgli.render || {};

pgli.render.CanvasRenderer = gamecore.Base.extend('CanvasRenderer',
{ // static



},
{ // instance

	dom: null,
	width: 1024,
	height: 768,

	/**
	 * Bind a new renderer to given canvas
	 * @param  jQuery.DOMElement domElement [description]
	 * @param  Integer width      [description]
	 * @param  Integer height     [description]
	 */
	init: function(domElement, width, height)
	{
		this.dom = domElement;
		this.width = width;
		this.height = height;
	}



});