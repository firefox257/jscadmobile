var css = `
.righteditorbutton
{
	position: absolute;
	top: 0;
	right: 5mm;
	z-index: 10;
	display: inline-block;
}
#editor
{

	 width: 100%;

}
.editorbox
{
	position: absolute;
	 top: 10mm;
	 left: 10mm;
	 right: 10mm;
	 bottom: 0;
	 z-index: 100;

}
`;

var html = `
<span class = "righteditorbutton" >
	<c tt = "button" te = "ontoggleheight:onclick">height</c>
	<c tt = "button" te="onshowhide:onclick">&#8595;</c>
</span>
<span class = "editorbox" t="showcode:style.display">
<c tt = "radiobutton" group = "compview" id="full" value="full" selected =1>Full</c>
<c tt = "radiobutton" group = "compview" id="comp" value="comp">Comp</c>
	<textarea id="editor" te="onkeydown:onkeydown" t="heightcode:style.height" >
	</textarea>
</span>
`;


function o()
{
	var at =
	{
		showcode: "none",
		heightcode: "42%",
		onshowhide(e)
		{
			if(at.showcode == "none")
			{
				at.showcode = "inline-block";
			}
			else
			{
				at.showcode = "none";
			}
		},
		ontoggleheight(e)
		{
			if(at.heightcode == "42%")
			{
				at.heightcode = "90%";
			}
			else
			{
				at.heightcode = "42%";
			}
		},
		onkeydown(e)
		{

			if (e.keyCode == 9 || e.keyCode == 32)
			{
		    e.preventDefault();
				document.execCommand('insertText',false,"\t");
		    /*var start = this.selectionStart;
		    var end = this.selectionEnd;

		    // set textarea value to: text before caret + tab + text after caret
		    this.value = this.value.substring(0, start) +"\t" + this.value.substring(end);

		    // put caret at right position again
		    this.selectionStart =
		    this.selectionEnd = start + 1;*/
  		}
			else if(e.keyCode == 13)
			{
				e.preventDefault();
				var start = this.selectionStart;
		    var end = this.selectionEnd;
				var val = this.value;
				var c = 0;

				for(var i = start; i >= 0; i--)
				{
					if(val[i] == '\t') c++;
					if(val[i] =='\r' || val[i] == '\n') break;
				}
				var str = "\r\n"
				for(var i = 0; i < c; i++)
				{
					str += "\t";
				}
				document.execCommand('insertText',false,str);
			}
		},
		init()
		{

		}
	};
	return at;
}
o.css = css;
o.html = html;

$.comp("editor", o);
