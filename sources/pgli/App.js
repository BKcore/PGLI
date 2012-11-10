var pgli = pgli || {};

pgli.App = gamecore.Base.extend("App",
{ // static

},
{ // instance

	project: null,
	moduleList: null,
	editor: null,
	diagram: null,

	init: function(domDiagram, domModuleList, domEditor)
	{
		this.moduleList = new pgli.ui.ModuleList(domModuleList);

		this.editor = ace.edit(domEditor);
		this.editor.setFontSize("16px");
		this.editor.setTheme("ace/theme/monokai");
		this.editor.getSession().setMode("ace/mode/json");

		this.diagram = new pgli.diagram.Diagram(domDiagram, $('#'+domDiagram).width(), $('#'+domDiagram).height(), 30);
		this.diagram.addNode(new pgli.diagram.Node({name: "Façade", layers:["Floor"]}, 100, 50));
		this.diagram.addNode(new pgli.diagram.Node({name: "Floor", layers: []}, 260, 110));
	},

	bindProject: function(project)
	{
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
		this.project.setActiveModule(module);
		this.editor.getSession().setValue(this.project.files.get(module));
	}

});