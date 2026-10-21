// A quiet field of stars behind the night band.
(function(){
  var c=document.getElementById("sky"); if(!c) return;
  var x=c.getContext("2d");
  function draw(){
    var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;
    c.width=r.width*d;c.height=r.height*d;x.setTransform(d,0,0,d,0,0);
    var n=Math.round(r.width*r.height/1800),s=7;
    function rnd(){s=(s*16807)%2147483647;return s/2147483647}
    x.fillStyle="#F4E7C9";
    for(var i=0;i<n;i++){x.globalAlpha=.25+rnd()*.6;x.beginPath();x.arc(rnd()*r.width,rnd()*r.height,rnd()*1.2+.2,0,6.3);x.fill()}
  }
  draw();addEventListener("resize",draw);
})();
