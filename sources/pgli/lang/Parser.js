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
	patternMethod: /\#(\w+)(\(([^\)]+)\))/g,



	parseExpression: function(string, scope)
	{
		var self = this;
		var orig = string;

		if(typeof(string) != "string")
			return string;

		if(scope != undefined)
		{
			string = string.replace(this.patternVar,function(match,varName)
			{
				return varName in scope ? scope[varName] : 0;
			});
		}

		string = string.replace(this.patternMethod,function(match,methodName,a,params)
		{
			console.log(arguments);
			return self.execFunction(methodName, params);
		});

		console.log("#Parsed expr: '"+string+"' from '"+orig+"'");
		
		try {
			return eval(string);
		} catch (e) {
			return string;
		}
		

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

	execFunction: function(methodName, params)
	{
		var hasP = params != undefined;
		var p = hasP ? params.replace(" ", "").split(',') : [];

		if(methodName == "random")
		{
			var r = Math.random();
			if(hasP && p.length == 2) try
			{
				var min = eval(p[0]);
				var max = eval(p[1]);
				r = Math.round(r * (max-min) + min);
			} catch(e) {
				console.warn('Bad method format: '+methodName+' / '+params);
				return 0;
			}
			return r;
		}
		else if(methodName == "mod")
		{
			if(hasP && p.length == 2) try
			{
				var base = eval(p[0]);
				var div = eval(p[1]);
				if(div == 0) throw "Divide by 0";
				return Math.floor(base/div);
			} catch(e) {
				console.warn('Bad method format: '+methodName+' / '+params);
			}
			return 0;
		}
		else
		{
			console.warn("Unsupported method : "+methodName);
			return 0;
		}
	}
},
{

});


