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


	patternVar:/\@([a-z]+)/ig,
	patternMethod: /\#([a-z]+)/ig,



	parseExpression: function(string)
	{
		var self = this;

		string = string.replace(this.patternVar,function(match,varName)
		{
			return self.getVar(varName);
		});


		string = string.replace(this.patternMethod,function(match,methodName)
		{
			return self.execFunction(methodName);
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

	execFunction: function(methodName)
	{
		if(methodName == "rand")
			return Math.random();
		else
			throw "Unsupported method : "+methodName;


		
	}
},
{

});


