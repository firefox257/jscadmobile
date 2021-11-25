var css = `
.button
{
	border: 1px solid #000;
	padding: 1mm 2mm;
	border-radius: 3mm;
	user-select: none;
	background-color: #fff;
}
`;

var html = `
<span style = "display:inline-block; margin: 1mm 0;">
	<span class = "button" te="onclick:onclick" ti>
	</span>
</span>
`;


function o()
{
	var at =
	{
		attr:
		{
			onclick:undefined,

		},
		onclick(e)
		{
			if(at.attr.onclick)at.attr.onclick(e);
		}
	};
	return at;
}
o.css = css;
o.html = html;

$.comp("button", o);
