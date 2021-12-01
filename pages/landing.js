
console.log("landing init");
var css = `
body
{
	color: #000;
}
`;

var html = `
<c tt ="canvas">
	<c tt="menu" ></c>
	<c tt ="editor"></c>
</c>
<c tt = "modals">
</c>
`;

function o()
{

	var at =
	{

	};
	return at;
}
o.css = css;
o.html = html;


$.comp("landing", o);
