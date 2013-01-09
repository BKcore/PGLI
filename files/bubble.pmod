{
    "name": "Bubble",
    "desc": "Bubble aquarium example",
    "vars": {
        "sb": "#random(1, 10)/10",
        "wb": "100 * @sb",
        "hb": "100 * @sb",
        "xb": "#random(0, @w - @wb)",
        "yb": "#random(0, @h/2 - @hb)",
        "url": "@resources/bubble.png"
    },
    "layers": [
        {
            "use": "sprite.pmod",
            "x": "@xb",
            "y": "@yb",
            "width": "@wb",
            "height": "@hb"
        }
    ]
}