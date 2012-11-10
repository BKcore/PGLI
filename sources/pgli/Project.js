var pgli = pgli || {};


pgli.Project = gamecore.Base.extend('Project',
{
	patternRoot: /\/([a-z]+\.pmod)/ig,
	patternPath: /([a-z\/]+\/)[a-z]+\.pmod/ig

},

{

	modules: null,
	files:null,
	keys :[],
	name: "default",
	path: "/files/",
	root: "default.pmod",
	diagram: null,
	loadingQueue: [],
	onLoad: function() { console.log("Project loaded."); },

	

	init : function(projectFile, onLoad)
	{
		this.onLoad = onLoad;		
		this.modules = new gamecore.Hashtable();
		this.files = new gamecore.Hashtable();
		this.path = pgli.Project.patternPath.exec(projectFile)[1];
	    this.root = pgli.Project.patternRoot.exec(projectFile)[1];

	    var self = this;

    	this.loadFile(projectFile, function(data)
    	{
    		//ui.openFile(data);
    		
    		self.files.put(self.root, data);
    		self.keys.push(self.root);

    		var object = pgli.lang.Parser.parseModule(data);
    		self.modules.put(self.root, object);

	    	self.name = object.name;

	    	this.loadDependencies(object);

			//this.diagram = new pgli.diagram.Diagram();

    	});
    		
	},

	loadFile: function(path, callback)
	{
		var self = this;
		var request = $.ajax({
	            url: path,
	            type: 'get',
	            dataType: "text",
		    })
		    .success(function(data)
		    {
		        callback.call(self,data);
		        self.onLoad();
		    })
		    .error(function()
		    {
		        throw "Unable to load file: " + path;
		    });
	},

	loadDependencies: function(object)
	{

		if(!("layers" in object))
			return;

		var layers = object.layers;
		var self = this;

		for (var i=0, len = layers.length; i<len ; i++)
		{
			if(!("use" in layers[i]) )
				continue;

			var layerName = layers[i].use;

	    	(function(name,self)
	    	{

		    	self.loadFile(self.path+name, function(data)
		    	{
		    		self.files.put(name, data);
		    		self.keys.push(name);

		    		var object = pgli.lang.Parser.parseModule(data);
		    		self.modules.put(name, object);


		    		self.loadDependencies(object);

		    	});
	    	})(layerName,self);
		}

	},

	getModulesCount: function()
	{
		return this.keys.length;
	},

	getModule: function(key)
	{
		return this.modules.get(key);
	},

	getFile: function(key)
	{
		return this.files.get(key);
	},

	getModuleKey: function(index)
	{
		return this.keys[index];
	},

	isEmpty: function()
	{
		return (this.keys.length <= 0);
	}

	/*updateDiagram: function()
	{

	},

	render: function(canvasRenderer)
	{
		//canvasRenderer.Render(modules, root, new Hashtable());
	}*/

});