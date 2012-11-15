var pgli = pgli || {};

pgli.App = gamecore.Base.extend("App",
{ // static

},
{ // instance

	project: null,
	moduleList: null,
	editor: null,
	diagram: null,
	preview: null,
	nodeCount: 0,

	init: function(domDiagram, domModuleList, domEditor, domPreview)
	{
		this.moduleList = new pgli.ui.ModuleList(domModuleList);

		this.editor = ace.edit(domEditor);
		this.editor.setFontSize("16px");
		this.editor.setTheme("ace/theme/monokai");
		this.editor.getSession().setMode("ace/mode/json");

		this.diagram = new pgli.diagram.Diagram(domDiagram, 30);

		this.preview = new pgli.render.CanvasRenderer(domPreview);

		this.bindEvents();
	},

	bindEvents: function()
	{
		var self = this;
		$(window).on('resize', function(){ self.resize.call(self); });
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

	resize: function()
	{
		this.diagram.resize();
		this.preview.resize();
	}

});