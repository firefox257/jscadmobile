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


.background
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

.inner
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
  .inner
  {
    left:48px;
  }
}

@media (orientation: portrait) {
  .inner
  {
    top:48px;
  }
}



.full
{
        position:absolute;
        margin:0;
        padding:0;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        display:inline-block;
    background: url(./images/background.jpg) no-repeat center center;


        background-size: cover;
        color: #fff;
        z-index:1;
}

.dot1
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

.dot2
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

<div class="background">

</div>
<div class="full" t="background:style.background,backgroundSize:style.backgroundSize">
        <div class="inner" ti>
                <!--
                <span class="dot1">
                </span>
                <span class="dot2">
                </span>
                -->
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

        function reSize()
        {
                reScroll();
                var b=document.body;

                b.style.zoom="100%";


                var f= document.querySelector(".background");

                var w, h;
                var or=window.innerWidth > window.innerHeight;

                if(or)
                {
                        h=(screen.width)+"px";
                        w=(screen.height)+"px";
                }
                else
                {
                        w=(screen.width)+"px";
                        h=(screen.height)+"px";
                }

                f.style.width="8000px";
                f.style.height="8000px";

        }


        //reScroll();



function o()
{

        var at=
        {

                attr:
                {
                    get background()
                    {
                        return "";
                    }
                },
                background: "url(./images/background.jpg) no-repeat center center",
                backgroundSize:"cover",
                init()
                {
                        reSize();
                window.onscroll=reScroll;
                window.onorientationchange=reSize;

            //var body=$.q("body");
                //body.ontouchmove=stopEvents;
                //body.onmousemove=stopEvents;

                }
        };

        return at;
}
o.css=css;
o.html=html;


$.comp("background",o);
