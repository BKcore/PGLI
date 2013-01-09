{
    "name": "Aquarium",
    "desc": "Aquarium example",
    "width": 2000,
    "height": 1000,
    "params": {
        "resources": "../resources/aqua",
        "fishw": 120,
        "fishh": 65,
        "smin": 2,
        "smax": 30,
        "nbf": 15,
        "nbb": 30,
        "w": 2000,
        "h": 1400
    },
    "layers": [
        {
            "use": "fish.pmod",
            "repeat": "@n 1 < @nbf"
        },
        {
            "use": "bubble.pmod",
            "repeat": "@b 1 < @nbb"
        }
    ],
    "fill": {
        "type": "image",
        "value": "@resources/bg.jpg"
    }
}