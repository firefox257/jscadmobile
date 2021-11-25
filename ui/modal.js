var css = `

`;

var html = `
<span class = "modal" t="show:style.display" tgt="modals" ti>
</span>
`;


function o()
{
	var at =
	{
		attr:
		{
			get show()
			{
				return at.show != "inline-block";
			},
			set show(v)
			{

				if(v)
				{
					at.show = "inline-block";
				}
				else
				{
					at.show = "none";
				}
				$.msgc.send("modalbackground show",v);
			}
		},
		show: "none",
		init()
		{
			$.msgc.subscribe("modals hide all", function()
			{
				at.attr.show = 0;
			});
		}

	};
	return at;
}
o.css = css;
o.html = html;

$.comp("modal", o);
