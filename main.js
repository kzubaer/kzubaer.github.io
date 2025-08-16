/* Particle background + small interactions
   Lightweight, no external libs.
   - Responsive particle count
   - Mouse repulsion
*/

(() => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = width * DPR;
  canvas.height = height * DPR;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(DPR, DPR);

  // params
  let particles = [];
  let mouse = { x: null, y: null, radius: 100 };
  const colors = ['#0aa5c2', '#06b2cd', '#7fe2ef', '#ffffff'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(DPR, DPR);
    initParticles();
  }
  window.addEventListener('resize', () => {
    // throttle
    clearTimeout(window._particleResize);
    window._particleResize = setTimeout(resize, 120);
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function makeParticle(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = rand(0.1, 0.6);
    return {
      x: x ?? rand(0, width),
      y: y ?? rand(0, height),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: rand(1.6, 4.2),
      color: colors[Math.floor(Math.random()*colors.length)],
      alpha: rand(0.3, 0.95)
    };
  }

  function initParticles(){
    particles = [];
    const base = Math.max(40, Math.floor((width * height) / 90000)); // scale with screen
    for (let i=0;i<base;i++) particles.push(makeParticle());
  }

  function draw(){
    ctx.clearRect(0,0,width,height);

    // draw connections
    for (let i=0;i<particles.length;i++){
      const p = particles[i];
      for (let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110){
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          const alpha = 0.12 * (1 - dist/110);
          ctx.strokeStyle = `rgba(6,30,36,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // draw particles
    for (let p of particles){
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function update(){
    for (let p of particles){
      // attraction to center for subtle drifting
      const cx = width / 2, cy = height / 2;
      p.
    }
  }})

  fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));
