document.addEventListener("DOMContentLoaded", function () {
  tsParticles.load("particles-js", {
    fpsLimit: 48,
    particles: {
      number: { value: 80, density: { enable: true, area: 1000 } },
      color: { value: "#ffffff" },
      shape: { type: "star" },
      opacity: { value: { min: 0.3, max: 0.9 }, animation: { enable: true, speed: 0.6, minimumValue: 0.3 } },
      size: { value: { min: 0.6, max: 2.5 }, animation: { enable: true, speed: 1.5, minimumValue: 0.5 } },
      links: { enable: false },
      move: { enable: true, speed: 0.4, random: true, outModes: { default: "out" } }
    },
    detectRetina: true
  });

  const messageContent = `亲爱的郑杰，生日快乐！\n\n这是我们在一起后你的第一个生日，感觉这个日子对我而言，突然变得格外特别和重要。\n\n虽然我们在一起的时间不长，但和你在一起的每一天，都像是收集到了一颗小小的星星，明亮又开心。谢谢你来到我的生命里。\n\n新的一岁，愿你每一天都被爱和快乐包围。以后的生日，我都想陪你一起过。\n\n生日快乐，我的女孩。`;

  const target = document.getElementById("typing-message");
  let started = false;
  const observerTyping = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !started) {
        started = true;
        new Typed("#typing-message", {
          strings: [messageContent],
          typeSpeed: 10,
          showCursor: false,
          startDelay: 100,
          loop: false
        });
        observerTyping.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  observerTyping.observe(target);

  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach((s) => observer.observe(s));

  const music = document.getElementById("bg-music");
  let musicStarted = false;

  const fadeInMusic = () => {
    music.volume = 0;
    music.play().then(() => {
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          music.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
    }).catch((err) => { console.log('播放失败', err); });
  };

  const startMusic = () => {
    if (!musicStarted) {
      fadeInMusic();
      musicStarted = true;
      document.getElementById("music-hint").classList.add("hide");
    }
  };

  window.addEventListener("click", startMusic, { once: true });
  window.addEventListener("touchstart", startMusic, { once: true });
});