{
    "name": "Fish",
    "desc": "Fish aquarium example",
    "vars": {
        "sf": "#random(@smin, @smax)/10",
        "wf": "@fishw * @sf",
        "hf": "@fishh * @sf",
        "xf": "#random(0, @w - @wf)",
        "yf": "@h/6 + #random(0, @h/2 - @hf)",
        "url": "@resources/fish#random(1,5).png"
    },
    "layers": [
        {
            "use": "sprite.pmod",
            "x": "@xf",
            "y": "@yf",
            "width": "@wf",
            "height": "@hf"
        }
    ]
}