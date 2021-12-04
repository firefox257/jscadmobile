var origin =
{
	sphere: sphere,
	cylinder: cylinder,
	rotate: rotate,
	difference: difference,
	color:color,
	translate: translate
};
$.cache = function(project, comp, code)
{

	/*
	directory structur
	/project(directory)/comp(directory)
	Files in directory
	code.js
	cache.js // is an object array of each step call.
	stepcache_(id 0 to N).json
	stepcache_(id 0 to N).json

	*/
 //to do to load code and cache.json into objecgt.

 //return new object




	function cube()
	{
		return {__func:"cube", __args: arguments};
	}
	function sphere()
	{
		return {__func:"sphere", __args: arguments};
	}
	function cylinder()
	{
		return {__func:"cylinder", __args: arguments};
	}
	function torus()
	{
		return {__func:"torus", __args: arguments};
	}
	function polyhedron()
	{
		return {__func:"polyhedron", __args: arguments};
	}
	function vector_text()
	{
		return {__func:"vector_text", __args: arguments};
	}
	function scale()
	{
		return {__func:"scale", __args: arguments};
	}
	function rotate()
	{
		return {__func:"rotate", __args: arguments};
	}
	function translate()
	{
		return {__func:"translate", __args: arguments};
	}
	function center()
	{
		return {__func:"center", __args: arguments};
	}
	function mirror()
	{
		return {__func:"mirror", __args: arguments};
	}

	function union()
	{
		return {__func:"union", __args: arguments};
	}
	function intersection()
	{
		return {__func:"intersection", __args: arguments};
	}
	function difference()
	{
		return {__func:"difference", __args: arguments};
	}
//2d
	function circle()
	{
		return {__func:"circle", __args: arguments};
	}
	function square()
	{
		return {__func:"square", __args: arguments};
	}
	function polygon()
	{
		return {__func:"polygon", __args: arguments};
	}
	//todo path

	function hull()
	{
		return {__func:"hull", __args: arguments};
	}
	function chain_hull()
	{
		return {__func:"chain_hull", __args: arguments};
	}
	function linear_extrude()
	{
		return {__func:"linear_extrude", __args: arguments};
	}
	function rectangular_extrude()
	{
		return {__func:"rectangular_extrude", __args: arguments};
	}
	function rotate_extrude()
	{
		return {__func:"rotate_extrude", __args: arguments};
	}

	function color()
	{
		return {__func:"color", __args: arguments};
	}


	var final;
	eval(code + "final = main();");

	final.make = function(o)
	{
		if(o == undefined)
		{
			var oo = [];
			for(var i = 0; i < this.length; i++)
			{
				oo.push(this.make(this[i]));
			}
			return oo;
		}
		else
		{
			if(o["__func"]!= undefined)
			{
				var oo = [];
				for(var i = 0; i < o.__args.length; i++)
				{
					oo.push(this.make(o.__args[i]));
				}
				var ff = origin[o.__func];
				/*console.log("ff:" + o.__func);
				console.log(ff);
				console.log("args oo");
				console.log(oo);*/
				return origin[o.__func].apply(null,oo);
			}
			else
			{
				return o;
			}
		}


	}

	return final;
};
