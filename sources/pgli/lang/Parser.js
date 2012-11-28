var pgli = pgli || {};
pgli.lang = pgli.lang || {};

pgli.lang.Parser = gamecore.Base.extend('Parser',
{
	TYPE: {
		NONE: -1,
		ARITH: 0,
		NUM: 1,
		VARIABLE: 2,
		METHOD: 3
	},


	patternVar:/\@(\w+)/g,
	patternMethod: /\#(\w+)(\(([^\)]+)\))?/g,



	parseExpression: function(string)
	{
		var self = this;

		string = string.replace(this.patternVar,function(match,varName)
		{
			return self.getVar(varName);
		});


		string = string.replace(this.patternMethod,function(match,methodName,a,params)
		{
			console.log(arguments);
			return self.execFunction(methodName, params);
		});

		console.log(string);
		

		return eval(string);
		

	},

	parseModule: function(string)
	{
		try
		{
			return JSON.parse(string);
		}
		catch(e)
		{
			console.warn("module syntax error : "+ string);
			return {error:"unable to parse module"};
		}
	},

	getVar: function(varName)
	{
		return 1;
	},

	execFunction: function(methodName, params)
	{
		var hasP = params != undefined;
		var p = hasP ? params.replace(" ", "").split(',') : [];

		if(methodName == "random")
		{
			var r = Math.random();
			if(hasP && p.length == 2)
			{
				var min = eval(p[0]);
				var max = eval(p[1]);
				r = Math.round(r * (max-min) + min);
			}
			return r;
		}
		else
			throw "Unsupported method : "+methodName;
	}
},
{

});


