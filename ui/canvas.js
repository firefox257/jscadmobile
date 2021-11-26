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
		at.scene1 = new THREE.Scene();
		at.scene2 = new THREE.Scene();


		at.scene2.position.z = -140;
		at.scene.background = new THREE.Color( 0xeeeeee );
		//at.camera.position.y = -1;
		//at.camera.position.z = 140;


	}



	const lightcolor1 = 0xdddddd;
	const lightintensity1 = 1;
	const light1 = new THREE.DirectionalLight(lightcolor1, lightintensity1);
	light1.position.set(-1000, 2000, 4000);

	const lightcolor2 = 0xddaa800;
	const lightintensity2 = 0.5;
	const light2 = new THREE.DirectionalLight(lightcolor2, lightintensity2);
	light2.position.set(0, -500, -4000);


	const ambilight = new THREE.AmbientLight( 0x404040 ); // soft white light
	//scene.add( light );
	function setupMsgc()
	{
		$.msgc.subscribe("set cad obj", function(cad)
		{
			var tt = $.obj2str(cad);
			console.log(tt);
			console.log("cad");
			console.log(cad);

			at.mainobj = cad;
			at.scene.clear();
			at.scene1.clear();
			at.scene2.clear();

			at.scene2.add(light1);
			at.scene2.add(light2);
			at.scene2.add(ambilight);

			var obj1 = cadToThree(cad);

			obj1.rotation.x = 0.5;
			obj1.rotation.y = 0.5;

			at.scene.add(obj1);
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

					var yy = at.startY - y;
				 	//at.camera.position.z = 	at.lastcameraZ + yy;

					at.scene1.position.z = at.lastscene1Z + yy;
					at.renderer.render( at.scene2, at.camera );
				}
				else if(at.viewfunc == "xy")
				{
					var xx = at.startX - x;
					var yy = at.startY - y;
					at.scene1.position.x = at.lastscene1X - (xx/5);
					at.scene1.position.y = at.lastscene1Y + (yy/5);
					at.renderer.render( at.scene2, at.camera );
				}
				else if(at.viewfunc == "rotxy")
				{
					var xx = at.startX - x;
					var yy = at.startY - y;
					at.scene2.rotation.x = at.lastscene2RotX + (yy/50);
					at.scene2.rotation.y = at.lastscene2RotY + (xx/50);
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
			var stl = at.mainobj.toStlBinary();
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
