var css = `
.menuside
{
	position: absolute;
	top: 0; left: 0;
	display:inline-block;
}
.menu
{
	display: inline-block;
	border: 1px solid #000;
	background-color: rgba(255, 255, 255, 0.7);
}
`;

var html = `
	<span class = "menuside">
		<c tt = "button" te="onclick:onclick">&#8595;</c><br/>
		<span class = "menu" t="show:style.display" tg = "menu">
		menu stuff. <br/>
		</span>

	</span>
`;


function o()
{
	var at =
	{
		show: "none",
		onclick(e)
		{
			if(at.show== "none")
			{
				at.show = "inline-block";
			}
			else
			{
				at.show = "none";
			}
		}
	};
	return at;
}
o.css = css;
o.html = html;

$.comp("menu", o);
