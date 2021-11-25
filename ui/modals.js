var css = `
.modals
{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	display: inline-block;
	pointer-events: none;
	z-index: 1000;
}
.modalbackground
{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
}
.modals > *
{
	pointer-events: auto;
}

.modal
{
	position:absolute;
	top: 50%;
	left: 50%;
	transition: translate(-50%, -50%);
	border: 1px solid #000;
	background-color: #fff;
	display:inline-block;
	padding: 2mm;
}
`;

var html = `
<span class = "modals" >
	<span class = "modalbackground" t="backgroundshow:style.display,backgroundclick:onclick", " tg="modals"  >
		<!--<span class = "modal">
			asdfasdfasfd
		</span>-->
	</span>
</span>
`;


function o()
{
	var at =
	{
		backgroundshow: "none",
		backgroundclick()
		{
			$.msgc.send("modals hide all");
			at.backgroundshow = "none";
		},
		init()
		{
			$.msgc.subscribe("modalbackground show", function(show)
			{
				if(show)
				{
					at.backgroundshow = "inline-block";
				}
				else
				{
					at.backgroundshow = "none";
				}
			});
		}
	};
	return at;
}
o.css = css;
o.html = html;

$.comp("modals", o);
