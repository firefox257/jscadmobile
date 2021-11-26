var css = `
.radiobutton
{
	user-select: none;
	border:1px solid #000;
	padding: 1mm;
	background-color: #fff;
	font-size: 2.5mm;
}
`;

var html = `
<span class="radiobutton" t="backgroundColor:style.backgroundColor" te="onclick:onclick" ti>
</span>
`;


function o()
{
	var at =
	{
		attr:
		{
			get group()
			{
				return at.group;
			},
			set group(v)
			{
				at.group = v;
			},
			get id()
			{
				return at.id;
			},
			set id(v)
			{
				at.id = v;
			},
			get value()
			{
				return at.value;
			},
			set value(v)
			{
				at.value = v;
			},
			get selected()
			{
				return at.selected;
			},
			set selected(v)
			{
				at.selected = v;
				if(v)
				{
					at.backgroundColor="#ff5";
				}
				else
				{
					at.backgroundColor="#fff";
				}
			},
			onselect: undefined
		},
		group: "",
		id: "",
		value: "",
		selected: 0,
		backgroundColor: "#fff",
		onclick(e)
		{
			if(at.attr.onselect)
			{
				at.attr.onselect(at.value);
			}
			$.msgc.send("radiobutton click", at.group, at.id);
		},
		init()
		{
			$.msgc.subscribe("radiobutton click", function(group, id)
			{
				if(at.group == group && at.id == id)
				{
					at.attr.selected = 1;
				}
				else if(at.group == group)
				{
					at.attr.selected = 0;
				}
			});
		}


	};
	return at;
}
o.css = css;
o.html = html;

$.comp("radiobutton", o);
