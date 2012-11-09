var pgli = pgli || {};
pgli.ui = pgli.ui || {};

pgli.ui.ModuleList = gamecore.Base.extend('ModuleList',
{ // static
	tplModuleItem: "<li data-path='$path'>$name</li>",
	tplModuleList: "<ul data-path='$path'>$list</ul>"
},
{ // instance

	project: null,
	container: null,

	init: function(domContainer)
	{
		this.container = $(domContainer);
	},

	bindProject: function(project)
	{
		this.project = project;
		this.redraw();
	},

	redraw: function()
	{
		var static = pgli.ui.ModuleList;
		var modules = "";
		var module = null;
		if(!this.project.isEmpty()) for(var i = 0, len = this.project.getModulesCount(); i < len; ++i)
		{
			key = this.project.getModuleKey(i);
			module = this.project.getModule(key);
			modules += static.tplModuleItem.replace("$path", key).replace("$name", key);
		}

		this.container.html(static.tplModuleList.replace("$list", modules));
	}

});