// Scroll tour: show the photo of whichever card is in the middle of the screen.
(function () {
  document.querySelectorAll('.tour').forEach(function (tour) {
    var slides = tour.querySelectorAll('.tour-slide');
    var steps = tour.querySelectorAll('.tour-step');
    var dots = tour.querySelector('.tour-dots');
    if (dots) for (var k = 0; k < steps.length; k++) dots.appendChild(document.createElement('i'));
    slides.forEach(function (s) {
      var img = s.querySelector('.pic');
      var mark = function () { if (img.naturalHeight > img.naturalWidth) s.classList.add('tall'); };
      if (img.complete) mark(); else img.addEventListener('load', mark);
    });
    var current = -1;
    function show(i) {
      if (i === current) return;
      current = i;
      slides.forEach(function (s, j) { s.classList.toggle('on', j === i); });
      if (dots) Array.prototype.forEach.call(dots.children, function (d, j) { d.classList.toggle('on', j === i); });
      // warm up the next photo so it is ready when its card arrives
      var next = slides[i + 1] && slides[i + 1].querySelectorAll('img');
      if (next) next.forEach(function (im) { im.loading = 'eager'; });
    }
    show(0);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(Number(e.target.getAttribute('data-i')));
      });
    }, {rootMargin: '-35% 0px -35% 0px'});
    // watch the cards, not the tall steps, so the photo changes as its card reaches the middle
    steps.forEach(function (st, i) { var c = st.querySelector('.tour-card') || st; c.setAttribute('data-i', i); io.observe(c); });
  });
})();
