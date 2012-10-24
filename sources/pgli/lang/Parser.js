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



	parse: function(string)
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

	getVar: function(varName)
	{
		return 1;
	},

	execFunction: function(methodName)
	{
		return 2;
	}
},
{

});


