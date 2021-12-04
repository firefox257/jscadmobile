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

.navView
{
	position:absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	z-index:10;

}
`;
var html=`
<canvas class="backgroundCanvas" td="canvas"
te="onclick:onclick,onmousedown:onmousedown,onmouseup:onmouseup,onmousemove:onmousemove,onmousewheel:onmousewheel,ontouchstart:ontouchstart,ontouchend:ontouchend,ontouchmove:ontouchmove">

</canvas>
<div class="fullCanvas">
	<div class="innerCanvas" ti>
		<span class = "navView">
			<c tt = "radiobutton" group="nav" id="xy" value="xy" te="onselect:onselect">
				X/Y
			</c>
			<c tt = "radiobutton" group="nav" id="zoom" value="zoom" te="onselect:onselect">
				Zoom
			</c>
			<c tt = "radiobutton" group="nav" id="rotxy" value="rotxy" te="onselect:onselect">
				Rot X/Y
			</c>

		</span>
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

					var x0 = vv[0].pos.x;
					var y0 = vv[0].pos.y;
					var z0 = vv[0].pos.z;

					var x1 = vv[ii-1].pos.x;
					var y1 = vv[ii-1].pos.y;
					var z1 = vv[ii-1].pos.z;

					var x2 = vv[ii].pos.x;
					var y2 = vv[ii].pos.y;
					var z2 = vv[ii].pos.z;


					pos.push(x0);
					pos.push(y0);
					pos.push(z0);

					pos.push(x1);
					pos.push(y1);
					pos.push(z1);

					pos.push(x2);
					pos.push(y2);
					pos.push(z2);

					var nx1 = x1 - x0;
					var ny1 = y1 - y0;
					var nz1 = z1 - z0;

					var nx2 = x2 - x0;
					var ny2 = y2 - y0;
					var nz2 = z2 - z0;

					var nnx = ny1 * nz2 - nz1 * ny2;
					var nny = nz1 * nx2 - nx1 * nz2;
					var nnz = nx1 * ny2 - ny1 * nx2;


					var nnl = Math.sqrt(nnx * nnx + nny * nny + nnz * nnz);
					nnx = nnx / nnl;
					nny = nny / nnl;
					nnz = nnz / nnl;



					for(var iii = 0; iii < 3; iii++)
					{
						/*
						nor.push(nn.x);
						nor.push(nn.y);
						nor.push(nn.x);
						//*/


						nor.push(nnx);
						nor.push(nny);
						nor.push(nnz);
						//*/

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

	function rotx(cosx, sinx, obj)
	{
		var y1 = obj.y * cosx - obj.z * sinx;
		var z1 = obj.y * sinx + obj.z * cosx;

		obj.y = y1;
		obj.z = z1;
	}

	function roty(cosy, siny, obj)
	{
		var z1 = obj.z * cosy - obj.x * siny;
		var x1 = obj.z * siny + obj.x * cosy;
		obj.z =z1;
		obj.x = x1;
	}

	function rotz(cosz, sinz, obj)
	{
		var x1 = obj.x * cosz - obj.y * sinz;
		var y1 = obj.x * sinz + obj.y * cosz;

		obj.x = x1;
		obj.y = y1;
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
		at.scene.position.y = 200;
		at.scene.position.z = -100;
		at.scene1 = new THREE.Scene();
		at.scene1.rotation.x = 3.14159265358/2 + 0.5;
		at.scene1.rotation.y = 3.14159265358;
		at.scene1.rotation.z = 3.14159265358;
		at.scene2 = new THREE.Scene();


		//at.scene2.position.z = -50;
		at.scene.background = new THREE.Color( 0xeeeeee );
		at.scene1.background = new THREE.Color( 0xeeeeee );
		at.scene2.background = new THREE.Color( 0xeeeeee );



	}



	const lightcolor1 = 0xdddddd;
	const lightintensity1 = 0.55;
	const light1 = new THREE.DirectionalLight(lightcolor1, lightintensity1);
	light1.position.set(-1000, 2000, 4000);

	const lightcolor2 = 0xddaa88;
	const lightintensity2 = 0.3;
	const light2 = new THREE.DirectionalLight(lightcolor2, lightintensity2);
	light2.position.set(0, -500, 4000);

	const lightcolor3 = 0xcc9977;
	const lightintensity3 = 0.2;
	const light3 = new THREE.DirectionalLight(lightcolor3, lightintensity3);
	light3.position.set(1000, 0, -1000);


	const ambilight = new THREE.AmbientLight( 0x404040 ); // soft white light

	const linerefmaterial = new THREE.LineBasicMaterial( { color: 0xff8855 } );

	const linerefpointsx = [new THREE.Vector3( -600, 0, 0 ), new THREE.Vector3( 600, 0, 0 )];
	const linerefpointsy = [new THREE.Vector3( 0, -600, 0 ), new THREE.Vector3( 0, 600, 0 )];
	const linerefpointsz = [new THREE.Vector3( 0, 0, -600), new THREE.Vector3( 0, 0, 600)];

	const linegeomx = new THREE.BufferGeometry().setFromPoints( linerefpointsx );
	const linegeomy = new THREE.BufferGeometry().setFromPoints( linerefpointsy );
	const linegeomz = new THREE.BufferGeometry().setFromPoints( linerefpointsz );
	const linerefx = new THREE.Line( linegeomx, linerefmaterial );
	const linerefy = new THREE.Line( linegeomy, linerefmaterial );
	const linerefz = new THREE.Line( linegeomz, linerefmaterial );

	const gridrefmaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const gridrefcenterxmaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
	const gridrefcenterymaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } );



	//scene.add( light );
	function setupMsgc()
	{
		$.msgc.subscribe("set cad obj", function(cad)
		{
			//console.log("cad");
			//console.log(cad);
			at.mainobj = cad;
			at.scene.clear();
			at.scene1.clear();
			at.scene2.clear();

			at.scene2.add(light1);
			at.scene2.add(light2);
			at.scene2.add(light3);
			at.scene2.add(ambilight);
			at.scene2.add(linerefx);
			at.scene2.add(linerefy);
			at.scene2.add(linerefz);

			for(var i = -600; i <= 600; i += 10)
			{
				const pointsx = [new THREE.Vector3( -600, i, 0 ), new THREE.Vector3( 600, i, 0 )];
				const pointsy = [new THREE.Vector3( i, -600, 0 ), new THREE.Vector3( i, 600, 0 )];
				const geomx = new THREE.BufferGeometry().setFromPoints( pointsx );
				const geomy = new THREE.BufferGeometry().setFromPoints( pointsy );
				var gridrefx;
				var gridrefy;
				if(i == 0)
				{
					gridrefx = new THREE.Line( geomx, gridrefcenterxmaterial );
					gridrefy = new THREE.Line( geomy, gridrefcenterymaterial );
				}
				else
				{
					gridrefx = new THREE.Line( geomx, gridrefmaterial );
					gridrefy = new THREE.Line( geomy, gridrefmaterial );
				}
				at.scene.add(gridrefx);
				at.scene.add(gridrefy);
			}



			for(var i = 0; i < cad.length; i++)
			{
				var obj1 = cadToThree(cad[i]);
				at.scene.add(obj1);
			}

/*
			const geometry = new THREE.BoxGeometry( 20, 20, 20 );
			const material = new THREE.MeshPhongMaterial( {
color: 0xdaa520,
specular: 0xbcbcbc,
 } );
			const cube = new THREE.Mesh( geometry, material );
			cube.rotation.x = 0.5;
    	cube.rotation.y = 0.5;

			at.scene.add( cube );
			//*/

			at.scene1.add(at.scene);
			at.scene2.add(at.scene1);

			at.renderer.render( at.scene2, at.camera );
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
		scene1: undefined,
		scene2: undefined,
		camera: undefined,
		render: undefined,
		modal: undefined,
		link: undefined,
		startmouse: false,
		startX: 0,
		startY: 0,
		startX1: 0,
		startY1: 0,
		viewfunc: "",
		lastcameraX: 0,
		lastcameraY: 0,
		lastcameraZ: 0,
		lastcameraRotX: 0,
		lastcameraRotY: 0,
		lastcameraRotZ: 0,
		lastsceneX: 0,
		lastsceneY: 0,
		lastsceneZ: 0,
		lastsceneRotX: 0,
		lastsceneRotY: 0,
		lastsceneRotZ: 0,

		lastscene1X: 0,
		lastscene1Y: 0,
		lastscene1Z: 0,
		lastscene1RotX: 0,
		lastscene1RotY: 0,
		lastscene1RotZ: 0,

		lastscene2X: 0,
		lastscene2Y: 0,
		lastscene2Z: 0,
		lastscene2RotX: 0,
		lastscene2RotY: 0,
		lastscene2RotZ: 0,

		onclick(e)
		{
			//console.log("here1");
		},
		startinit(x, y)
		{
			at.startmouse = true;
			at.startX = x;
			at.startY = y;
			at.lastcameraX = at.camera.position.x;
			at.lastcameraY = at.camera.position.y;
			at.lastcameraZ = at.camera.position.z;
			at.lastcameraRotX = at.camera.rotation.x;
			at.lastcameraRotY = at.camera.rotation.y;
			at.lastcameraRotZ = at.camera.rotation.z;
			//console.log(at.scene);
			at.lastsceneX = at.scene.position.x;
			at.lastsceneY = at.scene.position.y;
			at.lastsceneZ = at.scene.position.z;
			at.lastsceneRotX = at.scene.rotation.x;
			at.lastsceneRotY = at.scene.rotation.y;
			at.lastsceneRotZ = at.scene.rotation.z;

			at.lastscene1X = at.scene1.position.x;
			at.lastscene1Y = at.scene1.position.y;
			at.lastscene1Z = at.scene1.position.z;
			at.lastscene1RotX = at.scene1.rotation.x;
			at.lastscene1RotY = at.scene1.rotation.y;
			at.lastscene1RotZ = at.scene1.rotation.z;

			at.lastscene2X = at.scene2.position.x;
			at.lastscene2Y = at.scene2.position.y;
			at.lastscene2Z = at.scene2.position.z;
			at.lastscene2RotX = at.scene2.rotation.x;
			at.lastscene2RotY = at.scene2.rotation.y;
			at.lastscene2RotZ = at.scene2.rotation.z;
		},
		onmousedown(e)
		{
			at.startinit(e.clientX, e.clientY);
		},
		onmouseup(e)
		{

			at.startmouse = false;
		},
		move(x, y)
		{

			if(at.startmouse)
			{
				if(at.viewfunc == "zoom")
				{

					var objx = {x:1, y:0, z:0};
					var objy = {x:0, y:1, z:0};
					var objz = {x:0, y:0, z:1};
					//console.log("at.scene1.rotation");
					//console.log(at.scene1.rotation);

					var cosx = Math.cos(at.scene1.rotation.x);
					var sinx = Math.sin(at.scene1.rotation.x);

					var cosy = Math.cos(at.scene1.rotation.y);
					var siny = Math.sin(at.scene1.rotation.y);

					var cosz = Math.cos(at.scene1.rotation.z);
					var sinz = Math.sin(at.scene1.rotation.z);

					rotx(cosx, sinx, objx);
					roty(cosy, siny, objx);
					rotz(cosz, sinz, objx);

					rotx(cosx, sinx, objy);
					roty(cosy, siny, objy);
					rotz(cosz, sinz, objy);

					rotx(cosx, sinx, objz);
					roty(cosy, siny, objz);
					rotz(cosz, sinz, objz);
					var yy = at.startY - y;
					//at.scene.position.z = at.lastsceneZ + yy;
					at.scene.position.x = at.lastsceneX - objz.x * yy;
					at.scene.position.y = at.lastsceneY + objz.y * yy;
					at.scene.position.z = at.lastsceneZ - objz.z * yy;

					at.renderer.render( at.scene2, at.camera );
				}
				else if(at.viewfunc == "xy")
				{
					var xx = (at.startX - x)/5;
					var yy = (at.startY - y)/5;



					var objxy = {x: xx,y: yy, z: 0};

					var cosx = Math.cos(at.scene1.rotation.x);
					var sinx = Math.sin(at.scene1.rotation.x);

					var cosy = Math.cos(at.scene1.rotation.y);
					var siny = Math.sin(at.scene1.rotation.y);

					var cosz = Math.cos(at.scene1.rotation.z);
					var sinz = Math.sin(at.scene1.rotation.z);

					rotx(cosx, sinx, objxy);
					roty(cosy, siny, objxy);
					rotz(cosz, sinz, objxy);

					at.scene.position.x = at.lastsceneX - objxy.x;
					at.scene.position.y = at.lastsceneY + objxy.y;
					at.scene.position.z = at.lastsceneZ - objxy.z;


					at.renderer.render( at.scene2, at.camera );
				}
				else if(at.viewfunc == "rotxy")
				{
					var xx = (at.startX - x)/100;
					var yy = (at.startY - y)/100;

					/*
					var objr = {x: xx,y: yy, z: 0};

					var cosx = Math.cos(at.scene1.rotation.x);
					var sinx = Math.sin(at.scene1.rotation.x);

					var cosy = Math.cos(at.scene1.rotation.y);
					var siny = Math.sin(at.scene1.rotation.y);

					var cosz = Math.cos(at.scene1.rotation.z);
					var sinz = Math.sin(at.scene1.rotation.z);

					rotx(cosx, sinx, objr);
					roty(cosy, siny, objr);
					rotz(cosz, sinz, objr);
					//*


					at.scene1.rotation.x = at.lastscene1RotX - yy;
					at.scene1.rotation.z = at.lastscene1RotZ - xx;


					//*/

					at.scene.rotation.x = at.lastsceneRotX  - yy;
					at.scene.rotation.z = at.lastsceneRotZ - xx;


					at.renderer.render( at.scene2, at.camera );
				}
			}
		},
		onmousemove(e)
		{
			at.move(e.clientX, e.clientY);

		},
		onmousewheel(e)
		{

		},
		ontouchstart(e)
		{
			var ii = e.touches[0];
			at.startinit(ii.clientX, ii.clientY);
		},
		ontouchend(e)
		{
			at.startmouse = false;
		},
		ontouchmove(e)
		{
			var ii = e.touches[0];
			at.move(ii.clientX, ii.clientY);
		},
		onselect(func)
		{
			at.viewfunc = func;
		},
		createDownload(e)
		{
			at.modal.show = 1;
			var stl = union(at.mainobj).toStlBinary();
			var blobUrl = URL.createObjectURL(stl);
			$.attr(at.link, "href", blobUrl);
			at.link.download = "obj.stl";
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


			setupMsgc();

		}//end init
	};

	return at;
}
o.css=css;
o.html=html;


$.comp("canvas",o);
