
var css =`
html
{
        overflow:visible;
        background-color:#000;

}
body
{
        overflow:visible;
        background-color:#000;
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
	color: #fff;
	z-index:1;
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
<div td="dom">
	<!--<canvas class="backgroundCanvas">

	</canvas>-->
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
</div>
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
		var or=window.innerWidth > window.innerHeight;

		if(or)
		{
			w=(window.innerWidth);
			h=(window.innerHeight);
		}
		else
		{
			h=(window.innerWidth);
			w=(window.innerHeight);
		}
		return {w: w, h: h};
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

	}

	var at=
	{

		attr:
		{
			get background()
			{
				return "";
			}
		},
		dom: undefined,
		scene: undefined,
		camera: undefined,
		render: undefined,
		init()
		{
			at.scene = new THREE.Scene();
			var size = windowSize();
			at.camera = new THREE.PerspectiveCamera( 75, size.w / size.h, 0.1, 1000);
			at.renderer = new THREE.WebGLRenderer({antialias:true});
			at.renderer.setSize( size.w, size.h );

			at.renderer.setClearColor( 0xffffff, 0);



			var ren = at.renderer.domElement;
			$.attr(ren, "class", "backgroundCanvas");
			at.dom.appendChild(ren);
			reSize();
			window.onscroll=reScroll;
			window.onorientationchange=reSize;

			/*var geometry = new THREE.BoxGeometry( 1, 1, 1);
var material = new THREE.MeshBasicMaterial( { color: 0xff0051 });
var cube = new THREE.Mesh ( geometry, material );
at.scene.add( cube );

at.camera.position.z = 5;

at.renderer.render( at.scene, at.camera );*/



		}
	};

	return at;
}
o.css=css;
o.html=html;


$.comp("canvas",o);
