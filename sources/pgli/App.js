var pgli = pgli || {};

pgli.App = gamecore.Base.extend("App",
{ // static

},
{ // instance

	project: null,
	moduleList: null,
	editor: null,
	diagram: null,
	nodeCount: 0,

	init: function(domDiagram, domModuleList, domEditor)
	{
		var self = this;

		this.moduleList = new pgli.ui.ModuleList(domModuleList);

		this.editor = ace.edit(domEditor);
		this.editor.setFontSize("16px");
		this.editor.setTheme("ace/theme/monokai");
		this.editor.getSession().setMode("ace/mode/json");

		this.diagram = new pgli.diagram.Diagram(domDiagram, $('#'+domDiagram).width(), $('#'+domDiagram).height(), 30);

		$(document).bind('keydown', function(e){ self.onKeyDown.call(self,e);});
	},

	bindProject: function(project)
	{
		this.nodeCount = 0;
		this.project = project;
		this.project.setAppInstance(this);
		this.moduleList.bindProject(project);
		this.draw();
	},

	draw: function()
	{
		this.moduleList != undefined && this.moduleList.draw();
	},

	showInEditor: function(module)
	{
		this.project.setActiveFile(module);
		this.editor.getSession().setValue(this.project.files.get(module));
	},

	getEditorContent: function()
	{
		return this.editor.getSession().getValue();
	},

	addDiagramNode: function(key, module)
	{
		this.diagram.addNode(new pgli.diagram.Node(key, module, 50 + 160 * this.nodeCount++, 50));
	},

	onKeyDown:function (e)
	{
		console.log(e.keyCode);
			if(e.keyCode==117)
			{
				console.log("touche F6");
				this.updateDiagram();
			}	
	},

	updateDiagram:function()
	{
		this.project.rememberActiveFile();
		
		for(var i = 0, len = this.project.keys.length; i<len; i++)
		{

			var object = pgli.lang.Parser.parseModule(this.project.files.get(this.project.keys[i]));
		    this.project.modules.put(this.project.keys[i], object);
		    this.diagram.getNode(this.project.keys[i]).module = object;
		    //this.getNode.updateModule()...

		}

		this.diagram.draw();

	}



});