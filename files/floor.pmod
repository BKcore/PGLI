{
    "name": "Floor",
    "desc": "Floor template example",
    "params": {
        "winwidth": 120,
        "winspacing": 30,
        "topmargin": 30
    },
    "vars": {
        "winws": "@winwidth + @winspacing",
        "nbwin": "#mod(@g_width, @winws)",
        "margin": "(@g_width - @nbwin*@winws) / 2",
        "winheight": "@floorheight - 2*@topmargin"
    },
    "layers": [
        {
            "use": "window.pmod",
            "repeat": "@w 0 < @nbwin",
            "x": "@w * (@winws) + @margin + @winspacing/2",
            "y": "@topmargin",
            "width": "@winwidth",
            "height": "@winheight"
        }
    ],
    "fill": {
        "type": "line",
        "value": "#666666"
    }
}