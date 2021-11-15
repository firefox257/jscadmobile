
var css = `
body
{
	color: #fff;
}
`;

var html = `
<c tt ="canvas">
<span te="onclick:onclick">
	here1
	</span>
</c>
`;


function o()
{

	var at =
	{
		onclick(e)
		{
			alert("herereer");
		},
	};
	return at;
}
o.css = css;
o.html = html;


$.comp("landing", o);
