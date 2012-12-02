{
	"name": "Facade",
	"desc": "Facade template example",

	"width": 1000,
	"height": 2000,

	"unit": "cm",
	"pixelratio": 0.5,

	"origin": "bottom left",

	"params" : {
		"resources": "~/PGLI/resources",
		"style": "urban",
		"floorheight": 200,
		"decaydensity": 10,
		"width": 1000,
		"height": 2000
	},

	"vars" : {
		"nbfloors": "#mod(@height, @floorheight)"
	},

	"layers": [
		{
			"use": "wall.pmod"
		},
		{
			"use": "decay.pmod",
			"repeat": "@i 0 < @decaydensity"
		},
		{
			"use": "floor.pmod",
			"repeat": "@i 0 < @nbfloors",

			"height": "@floorheight",
			"y": "@i * @floorheight" 
		}
	],

	"fill": {
		"type": "color",
		"value": "#FF0000"
	}
}