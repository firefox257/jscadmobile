console.log("canvas init");
//const jscad = require('@jscad/modeling');
//import CSG2Geom from "../js/csg-2-geom.js";
//var CSG2Geom = require('/js/csg-2-geom.js');
//console.log(CSG2Geom);
import*as THREE from "../js/three.module.js";



var css =`
html
{
        overflow:visible;

}
body
{
        overflow:visible;
}


.backgroundCanvas
{

        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        padding: 0;
        display:inline-block;
        z-index:0;

}

.innerCanvas
{
        position:relative;
        margin:0;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        display:inline-block;

}

.innerCanvas > *
{
	pointer-events:auto;
}
@media (orientation: landscape) {
  .innerCanvas
  {
    left:48px;
  }
}

@media (orientation: portrait) {
  .innerCanvas
  {
    top:48px;
  }
}



.fullCanvas
{
	position:absolute;
	margin:0;
	padding:0;
	top:0;
	left:0;
	width:100vw;
	height:100vh;
	display:inline-block;
	z-index:1;
	pointer-events: none;

}

.dot1Canvas
{
	position: absolute;
	top:0;
	left:0;
	background-color:#0f0;
	width:100px;
	height:100px;
	display: inline-block;
	border:1px solid #f00;
}

.dot2Canvas
{
        position: absolute;
        bottom:0;
        right:0;
        background-color:#0f0;
        width:100px;
        height:100px;
        display: inline-block;
        border:1px solid #f00;
}


`;
var html=`

<canvas class="backgroundCanvas" td="canvas" te="onclick:onclick">

</canvas>
<div class="fullCanvas">
	<div class="innerCanvas" ti>
		<!--
		<span class="dot1Canvas">
		</span>
		<span class="dot2Canvas">
		</span>
		-->
	</div>
</div>

<span tgt="menu">
	<c tt="button" te="createDownload:onclick">Create Download</c>
</span>

<c tt ="modal" to="modal">
	<a td="link">Click here to download binary STL</a>
</c>

`;




	function stopEvents(e)
	{
		e.preventDefault();
		e.stopPropagation();
	}
	function reScroll()
	{
		var or=window.innerWidth > window.innerHeight;
		if(or)
		{
			window.scroll(48,0);
		}
		else
		{
			window.scroll(0,48);
		}
	}

	function windowSize()
	{
		var w, h;
		//console.log("here1: " + window.orientation);
		//if(window.matchMedia("(orientation: portrait)").matches)
		if(window.orientation == 0 || window.orientation == undefined)
		{
			w=(window.innerWidth);
			h=(window.innerHeight);
		}
		else
		{
			w=(window.innerHeight);
			h=(window.innerWidth);

		}

		return {w: w, h: h};
	}

	function cadToThree(v1)
	{
		const gg = new THREE.BufferGeometry();
		var pos = [];
		var nor = [];
		var col = [];

		for(var p = 0; p < v1.polygons.length; p++)
		{
			var vv = v1.polygons[p].vertices;
			var nn = v1.polygons[p].plane.normal;
			var co = v1.polygons[p].shared.color;
			if(co == null)
			{
				co = [1.0, 0.8, 0.2, 1.0];
			}
			else if(co.lengh == 3)
			{
				co = [co[0], co[1], co[2], 1.0];
			}

			for(var ii =2; ii < vv.length; ii++)
			{
				pos.push(vv[0].pos.x);
				pos.push(vv[0].pos.y);
				pos.push(vv[0].pos.z);

				pos.push(vv[ii-1].pos.x);
				pos.push(vv[ii-1].pos.y);
				pos.push(vv[ii-1].pos.z);

				pos.push(vv[ii].pos.x);
				pos.push(vv[ii].pos.y);
				pos.push(vv[ii].pos.z);

				for(var iii = 0; iii < 3; iii++)
				{
					nor.push(nn.x);
					nor.push(nn.y);
					nor.push(nn.x);
					col.push(co[0]);
					col.push(co[1]);
					col.push(co[2]);
					col.push(co[3]);

				}


			}


		}

		gg.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(pos), 3 ) );
		gg.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(nor), 3));
		gg.setAttribute('color',new THREE.BufferAttribute(new Float32Array(col), 4));


		const obj1 = new THREE.Mesh(gg, new THREE.MeshPhongMaterial(
			{
				vertexColors: true,
				transparent: true,
				//vertexAlphas:true,
        //side:THREE.DoubleSide
			}
		));

		return obj1;
	}





function o()
{
	function reSize()
	{

		reScroll();
		var b=document.body;

		b.style.zoom="100%";

		var f= document.querySelector(".backgroundCanvas");
		var size = windowSize();

		f.style.width=size.w + "px";
		f.style.height=size.h + "px";
		$.attr(f, "width", size.w + "px");
		$.attr(f, "height", size.h + "px");

		at.camera.aspect = size.w / size.h;
    at.camera.updateProjectionMatrix();
    at.renderer.setSize( size.w, size.h );
		at.renderer.render( at.scene, at.camera );
	}


	function setupThree(size)
	{

		at.camera = new THREE.PerspectiveCamera( 45, size.w / size.h, 0.1, 100000);
		at.renderer = new THREE.WebGLRenderer(
			{
				antialias:true,
				canvas:at.canvas
			});
		at.renderer.setSize( size.w, size.h );

		at.scene = new THREE.Scene();
		at.scene.background = new THREE.Color( 0xeeeeee );
		at.camera.position.y = -1;
		at.camera.position.z = 140;


	}



	const lightcolor1 = 0xFFFFFF;
	const lightintensity1 = 1;
	const light1 = new THREE.DirectionalLight(lightcolor1, lightintensity1);
	light1.position.set(-1000, 2000, 4000);

	const lightcolor2 = 0xFFAA00;
	const lightintensity2 = 0.5;
	const light2 = new THREE.DirectionalLight(lightcolor2, lightintensity2);
	light2.position.set(0, -500, -4000);
	function setupMsgc()
	{
		$.msgc.subscribe("set cad obj", function(cad)
		{
			at.mainobj = cad;
			at.scene.clear();
			at.scene.add(light1);
			at.scene.add(light2);
			var obj1 = cadToThree(cad);

			obj1.rotation.x = 0.5;
			obj1.rotation.y = 0.5;

			at.scene.add(obj1);

			//var v2 = v1.toStlBinary();

			//console.log("here1");
			//console.log(URL.createObjectURL);
			//var blobUrl = URL.createObjectURL(v2);

			//var link = document.createElement("a"); // Or maybe get it from the current document
			//link.href = blobUrl;
			//link.download = "try1.stl";
			//link.innerHTML = "Click here to download the file";
			//document.body.appendChild(link); // Or append it whereever you want


			//console.log(v2);
				at.renderer.render( at.scene, at.camera );
		});
	}

	var at=
	{

		attr:
		{

		},
		mainobj: undefined,
		canvas:undefined,
		scene: undefined,
		camera: undefined,
		render: undefined,
		modal: undefined,
		link: undefined,
		onclick(e)
		{
			console.log("here1");
		},
		createDownload(e)
		{
			at.modal.show = 1;
			console.log(at.link);
			var stl = at.mainobj.toStlBinary();
			var blobUrl = URL.createObjectURL(stl);


			//at.link.href = blobUrl;
			$.attr(at.link, "href", blobUrl);
			at.link.download = "obj.stl";
			//link.innerHTML = "Click here to download the file";

		},
		init()
		{
			var body  = $.q("body");
			body.onresize = reSize;

			var size = windowSize();



			setupThree(size);

			reSize();
			window.onscroll=reScroll;
			window.onorientationchange=reSize;



			//const material = new THREE.MeshPhongMaterial({color: 0x00ffff});

			setupMsgc();






		//console.log("v1");
		//console.log(v1);

		//var s = v1.toStlBinary();






/*
		var obj1 = cadToThree(v1);

		obj1.rotation.x = 0.5;
		obj1.rotation.y = 0.5;

		console.log("obj1");
		console.log(obj1);
		at.scene.add(obj1);
		console.log("CSG");

		var v2 = v1.toStlBinary();

		console.log("here1");
		console.log(URL.createObjectURL);
		var blobUrl = URL.createObjectURL(v2);

		var link = document.createElement("a"); // Or maybe get it from the current document
		link.href = blobUrl;
		link.download = "try1.stl";
		link.innerHTML = "Click here to download the file";
		document.body.appendChild(link); // Or append it whereever you want


		console.log(v2);


			at.renderer.render( at.scene, at.camera );
			*/



		}//end init
	};

	return at;
}
o.css=css;
o.html=html;


$.comp("canvas",o);
