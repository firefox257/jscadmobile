var origin =
{
	cube: cube,
	sphere: sphere,
	cylinder: cylinder,
	torus:torus,
	polyhedron:polyhedron,
	vector_text: vector_text,
	scale: scale,
	rotate: rotate,
	translate: translate,
	center: center,
	mirror: mirror,
	union: union,
	intersection: intersection,

	difference: difference,
	color:color,
	translate: translate,
	circle: circle,
	square: square,
	polygon: polygon,
	hull: hull,
	chain_hull: chain_hull,
	linear_extrude: linear_extrude,
	rectangular_extrude: rectangular_extrude,
	rotate_extrude: rotate_extrude,
	color: color



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

	var codecount= 0;
	final.cmake = function(o)
	{

			if(o["__func"]!= undefined)
			{
				var oo = [];
				var diffcache = false;

				if(o.__cache == undefined || o.__func !== o.__funcback)
				{
					diffcache = true;
					o.__argsback = o.__args;
					o.__funcback = o.__func;
				}

				if(diffcache)
				{
					for(var i = 0; i < o.__args.length; i++)
					{
						oo.push(this.cmake(o.__args[i]));
					}


					o.__cache = origin[o.__func].apply(null,oo);
				}


				return o.__cache;
			}
			else
			{
				return o;
			}



	}

	final.make = function(code)
	{
		codecount = 0;
		var oo = [];
		for(var i = 0; i < this.length; i++)
		{
			oo.push(this.cmake(this[i]));
		}

		console.log("Here1");
		console.log(oo);
		return oo;
	}

	return final;
};
