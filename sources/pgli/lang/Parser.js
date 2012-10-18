var pgli = pgli || {};
pgli.lang = pgli.lang || {};

pgli.lang.Parser = gamecore.Base.extend('Parser',
{
	TYPE: {
		NONE: -1,
		ARITH: 0,
		NUM: 1
		VARIABLE: 2,
		METHOD: 3
	},

	patternSpace: /([^ ]+)/ig,
	patternNum: /[-+]?[0-9]*\.?[0-9]+/ig,
	patternVar:/^\@[a-z]+/ig,
	patternArith: /[\+-\--\*-\/]/,
	patternMethod: /^\#[a-z]+/ig,



	parse: function(string)
	{
		var match = this.patternSpace.exec(string);
		var type = -1;

		var numbers = [];
		var operators = [];

		while(match != null)
		{
			match = this.patternSpace.exec(string);

			type = this.getTypeOf(match[1]);

			if(type == this.TYPE.VARIABLE)
				numbers.push(this.getVar(match[1]));
			if(type == this.TYPE.NUM)
				numbers.push(match[1]);
			if(type == this.TYPE.METHOD)
				numbers.push(this.execFunction(match[1]));
			if(type == this.TYPE.ARITH )
				operators.push(match[1]);

		}
		


	},

	getTypeOf: function(string)
	{
		if(this.patternVar.test(string))
		{
			return this.TYPE.VARIABLE;
		}
		else if(this.patternNum.test(string))
		{
			return this.TYPE.NUM;
		}
		else if(this.patternArith.test(string))
		{
			return this.TYPE.ARITH;
		}
		else if(this.patternMethod.test(string))
		{
			return this.TYPE.METHOD;
		}
		else
		{
			return this.TYPE.NONE;
		}
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




/*pgli.lang.ExpressionNode = gamecore.Pooled('ExpressionNode',
{
	TYPE: {
		NONE: -1,
		ARITH: 0,
		NUM: 1
		VARIABLE: 2
	}
},
{
	value: null,
	type: -1,
	children: []

});*/