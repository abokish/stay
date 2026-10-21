// The night band's sky: twinkling stars and the odd shooting star.
(function(){
  var c=document.getElementById("sky"); if(!c) return;
  var x=c.getContext("2d"), stars=[], meteor=null, w=0, h=0;
  var still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setup(){
    var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;
    w=r.width;h=r.height;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);
    var n=Math.round(w*h/1500),s=7;stars=[];
    function rnd(){s=(s*16807)%2147483647;return s/2147483647}
    for(var i=0;i<n;i++)stars.push({x:rnd()*w,y:rnd()*h,r:rnd()*1.3+.2,a:.25+rnd()*.6,p:rnd()*6.3,v:.4+rnd()*1.6});
  }
  function frame(t){
    x.clearRect(0,0,w,h);x.fillStyle="#F4E7C9";
    for(var i=0;i<stars.length;i++){var s=stars[i];
      x.globalAlpha=still?s.a:Math.max(.08,s.a+Math.sin(t/1000*s.v+s.p)*.3);
      x.beginPath();x.arc(s.x,s.y,s.r,0,6.3);x.fill()}
    if(!still){
      if(!meteor&&Math.random()<.004)meteor={x:Math.random()*w,y:Math.random()*h*.4,l:0};
      if(meteor){meteor.l+=14;var dx=-meteor.l*.9,dy=meteor.l*.45;
        var g=x.createLinearGradient(meteor.x,meteor.y,meteor.x+dx,meteor.y+dy);
        g.addColorStop(0,"rgba(244,231,201,0)");g.addColorStop(1,"rgba(244,231,201,.9)");
        x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=1.5;x.beginPath();
        x.moveTo(meteor.x+dx*.6,meteor.y+dy*.6);x.lineTo(meteor.x+dx,meteor.y+dy);x.stroke();
        if(meteor.l>260)meteor=null}
      requestAnimationFrame(frame)}
  }
  setup();addEventListener("resize",setup);requestAnimationFrame(frame);
})();
