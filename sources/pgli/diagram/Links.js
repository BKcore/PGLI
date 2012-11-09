var pgli = pgli || {};
pgli.diagram = pgli.diagram || {};

pgli.diagram.Links = gamecore.Base.extend('Links',
{ // static
	bezierOffset: 50
},
{ // instance
	diagram: null,

	shape: null,

	init: function(diagram)
	{
		var static = pgli.diagram.Links;
		var self = this;

		this.diagram = diagram;

		this.shape = new Kinetic.Shape({
			drawFunc: function(ctx){
				ctx.beginPath();
				
				for(var i = 0, len = self.diagram.nodes.length; i < len; i++)
				{
					var node = self.diagram.nodes[i];
					for(var j = 0, _len = node.module.layers.length; j < _len; j++)
					{
						var start = node.getLayerSlot(j);
						var end = self.diagram.getNode(node.module.layers[j]).getSlot();

						ctx.moveTo(start[0], start[1]);
						ctx.bezierCurveTo(
							start[0]+static.bezierOffset, start[1],
							end[0]-static.bezierOffset, end[1],
							end[0], end[1]);
					}
				}

				this.stroke(ctx);
			},
			x: 0,
			y: 0,
			stroke: "#999",
			strokeWidth: 3,
			lineCap: "round"
		});
	}
});