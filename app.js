/* ==========================================================================
   IGNIS MATCH CO. - PREMIUM APP LOGIC & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --------------------------------------------------
    // 0. Dynamic Bunch Generation for Hero Matchstick Drawer
    // --------------------------------------------------
    const topHeroMatchbox = document.getElementById('hero-matchbox');
    const topDrawerMatches = document.querySelector('.drawer-3d .drawer-matches');
    
    if (topHeroMatchbox && topDrawerMatches) {
        const isVerticalBox = topHeroMatchbox.classList.contains('vertical-box');
        const existingInteractiveSticks = topDrawerMatches.querySelectorAll('.interactive-matchstick');
        let stickHeightVal = '';
        let stickWidthVal = '';
        if (existingInteractiveSticks.length > 0) {
            stickHeightVal = existingInteractiveSticks[0].style.height || '';
            stickWidthVal = existingInteractiveSticks[0].style.width || '';
        }
        
        // Remove existing interactive matchsticks
        existingInteractiveSticks.forEach(el => el.remove());
        
        if (isVerticalBox) {
            // Vertical box: generate bunch side-by-side (left positions)
            const leftPositions = [20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80];
            leftPositions.forEach((leftVal, idx) => {
                const stick = document.createElement('div');
                stick.className = 'interactive-matchstick';
                if (leftVal === 50) {
                    stick.id = 'hero-matchstick';
                } else {
                    stick.id = `hero-matchstick-${idx + 1}`;
                }
                
                stick.style.left = `${leftVal}px`;
                stick.style.zIndex = '9';
                if (stickHeightVal) stick.style.height = stickHeightVal;
                if (stickWidthVal) stick.style.width = stickWidthVal;
                
                topDrawerMatches.appendChild(stick);
            });
        } else {
            // Horizontal box: generate bunch stacked vertically (top positions)
            const topPositions = [48, 56, 64, 72, 80, 88, 96, 104, 112];
            topPositions.forEach((topVal, idx) => {
                const stick = document.createElement('div');
                stick.className = 'interactive-matchstick';
                if (topVal === 80) {
                    stick.id = 'hero-matchstick';
                } else {
                    stick.id = `hero-matchstick-${idx + 1}`;
                }
                
                stick.style.top = `${topVal}px`;
                stick.style.left = '140px'; // default left for horizontal
                stick.style.zIndex = '9';
                if (stickHeightVal) stick.style.height = stickHeightVal;
                if (stickWidthVal) stick.style.width = stickWidthVal;
                
                topDrawerMatches.appendChild(stick);
            });
        }
    }

    // --------------------------------------------------
    // 1. Lenis Smooth Scroll Setup (Disabled to restore Snappy Native Scroll)

    // --------------------------------------------------
    // 2. Navigation & Mobile Menu
    // --------------------------------------------------
    const header = document.querySelector('header');
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }



    // --------------------------------------------------
    // 3. Particle Systems (Canvas-based)
    // --------------------------------------------------
    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // A. Background Sparks Emitter (Global spark-canvas)
    const sparkCanvas = document.getElementById('spark-canvas');
    let sparkCtx = null;
    let globalSparks = [];
    let storySparks = [];

    if (sparkCanvas) {
        sparkCtx = sparkCanvas.getContext('2d');
        function resizeSparkCanvas() {
            sparkCanvas.width = window.innerWidth;
            sparkCanvas.height = window.innerHeight;
        }
        resizeSparkCanvas();
        window.addEventListener('resize', resizeSparkCanvas);

        class BackgroundSpark {
            constructor() {
                this.reset();
                this.y = randomRange(0, sparkCanvas.height);
            }
            reset() {
                this.x = randomRange(0, sparkCanvas.width);
                this.y = sparkCanvas.height + 10;
                this.size = randomRange(1, 3);
                this.vx = randomRange(-0.5, 0.5);
                this.vy = randomRange(-1.5, -0.5);
                this.alpha = randomRange(0.1, 0.6);
                this.decay = randomRange(0.001, 0.005);
                this.color = Math.random() > 0.5 ? '#ff5e00' : '#d4af37';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                if (this.alpha <= 0 || this.y < -10) {
                    this.reset();
                }
            }
            draw() {
                if (!sparkCtx) return;
                sparkCtx.save();
                sparkCtx.globalAlpha = this.alpha;
                sparkCtx.fillStyle = this.color;
                sparkCtx.beginPath();
                sparkCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                sparkCtx.fill();
                sparkCtx.restore();
            }
        }

        const maxGlobalSparks = window.innerWidth < 768 ? 15 : 40;
        for (let i = 0; i < maxGlobalSparks; i++) {
            globalSparks.push(new BackgroundSpark());
        }
    }

    // B. Preloader Canvas Sparks & Fire
    const preloaderCanvas = document.getElementById('preloader-canvas');
    let preloaderCtx = null;
    let preloaderSparks = [];
    let preloaderFlames = [];
    let preloaderSmokes = [];
    let preloaderActive = false;
    let strikePoint = { x: 0, y: 0 };
    let preloaderIgnited = false;

    if (preloaderCanvas) {
        preloaderCtx = preloaderCanvas.getContext('2d');
        preloaderActive = true;
        function resizePreloaderCanvas() {
            preloaderCanvas.width = window.innerWidth;
            preloaderCanvas.height = window.innerHeight;
        }
        resizePreloaderCanvas();
        window.addEventListener('resize', resizePreloaderCanvas);
    }

    class Spark {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx || randomRange(-8, 8);
            this.vy = vy || randomRange(-12, 2);
            this.size = randomRange(2, 4);
            this.gravity = 0.25;
            this.alpha = 1.0;
            this.decay = randomRange(0.02, 0.05);
            this.color = `hsl(${randomRange(20, 45)}, 100%, ${randomRange(60, 90)}%)`;
        }
        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }
        draw(ctx) {
            if (!ctx) return;
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class Flame {
        constructor(x, y, scale = 1) {
            this.x = x;
            this.y = y;
            this.vx = randomRange(-0.8, 0.8);
            this.vy = randomRange(-4, -2) * scale;
            this.size = randomRange(12, 22) * scale;
            this.alpha = 1.0;
            this.decay = randomRange(0.015, 0.03);
            this.life = 1.0;
        }
        update(x, y) {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            if (x && y) {
                this.vx += (x - this.x) * 0.01;
            }
        }
        draw(ctx) {
            if (!ctx) return;
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = this.life;
            let color;
            if (this.life > 0.65) {
                color = `rgba(255, 240, 200, ${this.life})`;
            } else if (this.life > 0.35) {
                color = `rgba(255, 120, 0, ${this.life})`;
            } else {
                color = `rgba(214, 40, 40, ${this.life})`;
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class Smoke {
        constructor(x, y, scale = 1) {
            this.x = x;
            this.y = y;
            this.vx = randomRange(-1.5, 1.5);
            this.vy = randomRange(-2.5, -1) * scale;
            this.size = randomRange(15, 25) * scale;
            this.alpha = 0.5;
            this.decay = randomRange(0.008, 0.015);
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.size += 0.5;
            this.alpha -= this.decay;
        }
        draw(ctx) {
            if (!ctx) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = 'rgba(60, 60, 60, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // C. Hero Canvas Sparks & Fire
    const heroCanvas = document.getElementById('hero-canvas');
    let heroCtx = null;
    let heroSparks = [];
    let heroFlames = [];
    let heroSmokes = [];
    let heroIgnited = false;
    let heroMatchstickTip = { x: 0, y: 0 };
    let tipDetector = null;

    if (heroCanvas) {
        heroCtx = heroCanvas.getContext('2d');
        function resizeHeroCanvas() {
            if (heroCanvas.parentElement) {
                heroCanvas.width = heroCanvas.parentElement.clientWidth;
                heroCanvas.height = heroCanvas.parentElement.clientHeight;
            }
        }
        resizeHeroCanvas();
        window.addEventListener('resize', resizeHeroCanvas);

        // Dynamic Flame/Smoke coordinate tracker for the 3D Hero Matchstick
        const heroStickEl = document.getElementById('hero-matchstick');
        if (heroStickEl) {
            tipDetector = document.createElement('div');
            tipDetector.style.position = 'absolute';
            tipDetector.style.width = '2px';
            tipDetector.style.height = '2px';
            
            // Adjust tracker depending on horizontal/vertical matchstick orientation
            const heroMatchbox = document.getElementById('hero-matchbox');
            const isVertical = heroMatchbox && heroMatchbox.classList.contains('vertical-box');
            if (isVertical) {
                tipDetector.style.left = '3px'; // center of 6px vertical stick
                tipDetector.style.top = '-8px'; // top tip
            } else {
                tipDetector.style.left = '-12px';
                tipDetector.style.top = '2px';
            }
            tipDetector.style.transformStyle = 'preserve-3d';
            heroStickEl.appendChild(tipDetector);
        }
    }

    function updateHeroTipCoords() {
        if (!tipDetector || !heroCanvas) return;
        const rect = tipDetector.getBoundingClientRect();
        const canvasRect = heroCanvas.getBoundingClientRect();
        heroMatchstickTip.x = rect.left - canvasRect.left + 1;
        heroMatchstickTip.y = rect.top - canvasRect.top + 1;
    }

    // Main Canvas Update & Render Loops
    function animateParticles() {
        // 1. Global Background sparks
        if (sparkCanvas && sparkCtx) {
            sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
            globalSparks.forEach(p => {
                p.update();
                p.draw();
            });

            // Handle story sparks
            storySparks = storySparks.filter(p => p.alpha > 0);
            storySparks.forEach(p => {
                p.update();
                p.draw(sparkCtx);
            });
        }

        // 2. Preloader Canvas
        if (preloaderActive && preloaderCanvas && preloaderCtx) {
            preloaderCtx.clearRect(0, 0, preloaderCanvas.width, preloaderCanvas.height);
            
            preloaderSparks = preloaderSparks.filter(p => p.alpha > 0);
            preloaderSparks.forEach(p => {
                p.update();
                p.draw(preloaderCtx);
            });

            if (preloaderIgnited) {
                for (let i = 0; i < 3; i++) {
                    preloaderFlames.push(new Flame(strikePoint.x, strikePoint.y, 1.2));
                }
                if (Math.random() < 0.3) {
                    preloaderSmokes.push(new Smoke(strikePoint.x, strikePoint.y, 1.2));
                }
            }

            preloaderFlames = preloaderFlames.filter(p => p.life > 0);
            preloaderFlames.forEach(p => {
                p.update();
                p.draw(preloaderCtx);
            });

            preloaderSmokes = preloaderSmokes.filter(p => p.alpha > 0);
            preloaderSmokes.forEach(p => {
                p.update();
                p.draw(preloaderCtx);
            });
        }

        // 3. Hero Canvas (Fire on match stick)
        if (heroCanvas && heroCtx) {
            heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            updateHeroTipCoords();

            heroSparks = heroSparks.filter(p => p.alpha > 0);
            heroSparks.forEach(p => {
                p.update();
                p.draw(heroCtx);
            });

            if (heroIgnited) {
                for (let i = 0; i < 2; i++) {
                    heroFlames.push(new Flame(heroMatchstickTip.x, heroMatchstickTip.y, 0.9));
                }
                if (Math.random() < 0.2) {
                    heroSmokes.push(new Smoke(heroMatchstickTip.x, heroMatchstickTip.y, 0.9));
                }
            }

            heroFlames = heroFlames.filter(p => p.life > 0);
            heroFlames.forEach(p => {
                p.update(heroMatchstickTip.x, heroMatchstickTip.y);
                p.draw(heroCtx);
            });

            heroSmokes = heroSmokes.filter(p => p.alpha > 0);
            heroSmokes.forEach(p => {
                p.update();
                p.draw(heroCtx);
            });
        }

        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);

    // --------------------------------------------------
    // 4. Cinematic Preloader Workflow (Initial Strike & Redirect Loader)
    // --------------------------------------------------
    const preloader = document.getElementById('preloader');
    const preloaderStick = document.getElementById('preloader-stick');
    const preloaderProgress = document.getElementById('preloader-progress');
    const progressFlame = document.getElementById('progress-flame');
    const preloaderPercent = document.getElementById('preloader-percent');
    const preloaderSubtitle = document.getElementById('preloader-subtitle');

    function initPreloaderCoords() {
        const striker = document.querySelector('.preloader-striker');
        if (striker) {
            const rect = striker.getBoundingClientRect();
            strikePoint.x = rect.right - 10;
            strikePoint.y = rect.top + (rect.height / 2);
        }
    }

    const isRedirect = sessionStorage.getItem('redirecting') === 'true';

    if (preloader) {
        // Set subtitle based on page title
        if (preloaderSubtitle) {
            const titleClean = document.title.split('|')[0].trim();
            preloaderSubtitle.textContent = `Loading ${titleClean}...`;
        }

        if (isRedirect) {
            // Redirect mode: immediately show transparent/blurred overlay
            initPreloaderCoords();
            preloader.classList.add('redirect-mode');
            gsap.set(preloader, { opacity: 1, display: 'flex' });
            
            // Make sure the subtitle is visible immediately
            if (preloaderSubtitle) {
                gsap.set(preloaderSubtitle, { opacity: 1, scale: 1, filter: 'drop-shadow(0 0 12px var(--color-orange))' });
            }
            
            // Show match stick burnt and ignited immediately
            preloaderIgnited = true;
            if (preloaderStick) {
                preloaderStick.classList.add('burnt');
                gsap.set(preloaderStick, { x: 230, y: 0, rotationZ: 0 });
            }
            
            // Snappy exit transition
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                    onComplete: () => {
                        preloaderActive = false;
                        preloader.style.display = 'none';
                        sessionStorage.removeItem('redirecting');
                        playMainEntrance();
                    }
                });
            }, 350);
        } else {
            // Initial load: play full match striking and loading progress sequence
            if (preloaderStick && preloaderProgress && progressFlame && preloaderPercent) {
                initPreloaderCoords();
                window.addEventListener('resize', initPreloaderCoords);

                const preloaderTimeline = gsap.timeline({ delay: 0.4 }); // reduced delay for responsiveness

                preloaderTimeline.to(preloaderStick, {
                    x: 180,
                    y: 5,
                    rotationZ: -8,
                    duration: 0.8, // snappier slide
                    ease: 'power3.inOut'
                })
                .to(preloaderStick, {
                    x: 230,
                    y: 0,
                    rotationZ: 0,
                    duration: 0.15,
                    ease: 'power1.in',
                    onComplete: triggerStrikeSpark
                })
                .to('#preloader-logo', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '+=0.1')
                .to('#preloader-subtitle', { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5');

                function triggerStrikeSpark() {
                    preloaderIgnited = true;
                    preloaderStick.classList.add('burnt');

                    for (let i = 0; i < 40; i++) { // reduced particle count for mobile performance
                        const vx = randomRange(-12, 2);
                        const vy = randomRange(-8, 3);
                        preloaderSparks.push(new Spark(strikePoint.x, strikePoint.y, vx, vy));
                    }

                    gsap.to(progressFlame, { opacity: 1, duration: 0.2 });

                    let loadingProgress = { val: 0 };
                    gsap.to(loadingProgress, {
                        val: 100,
                        duration: 1.2, // faster load
                        ease: 'power2.out',
                        onUpdate: () => {
                            const roundedPercent = Math.round(loadingProgress.val);
                            preloaderPercent.textContent = roundedPercent + '%';
                            preloaderProgress.style.width = roundedPercent + '%';
                            progressFlame.style.left = roundedPercent + '%';
                        },
                        onComplete: fadeOutPreloader
                    });
                }

                function fadeOutPreloader() {
                    gsap.to(preloaderPercent, { opacity: 0, duration: 0.2 });
                    gsap.to(preloaderProgress, { opacity: 0, duration: 0.2 });
                    gsap.to(progressFlame, { opacity: 0, duration: 0.2 });
                    
                    gsap.to(preloader, {
                        opacity: 0,
                        scale: 1.01,
                        duration: 0.4,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            preloaderActive = false;
                            preloader.style.display = 'none';
                            playMainEntrance();
                        }
                    });
                }
            } else {
                playMainEntrance();
            }
        }
    } else {
        playMainEntrance();
    }

    // --------------------------------------------------
    // 5. Global Link Intercept for Snappy Transitions
    // --------------------------------------------------
    const localLinks = document.querySelectorAll('a[href$=".html"], a[href^="./"], a[href^="/"]');
    localLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Skip external links
        if (link.hostname && link.hostname !== window.location.hostname) return;
        if (link.getAttribute('target') === '_blank') return;
        
        // Skip same-page anchors
        const currentFilename = window.location.pathname.split('/').pop() || 'index.html';
        const targetFilename = href.split('#')[0].split('/').pop();
        if (href.startsWith('#') || (targetFilename === currentFilename && href.includes('#'))) {
            return;
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;
            
            if (preloader) {
                // Set subtitle to target page name
                let linkText = link.textContent.trim().replace(/\s+/g, ' ') || "Next Page";
                linkText = linkText.split('\n')[0].replace('›', '').replace('»', '').trim();
                
                if (preloaderSubtitle) {
                    preloaderSubtitle.textContent = `Loading ${linkText}...`;
                }

                // Add redirect mode class and reset stick/canvas states
                preloader.classList.add('redirect-mode');
                preloaderActive = true;
                preloaderIgnited = false;
                if (preloaderStick) {
                    preloaderStick.classList.remove('burnt');
                    gsap.set(preloaderStick, { x: 0, y: 0, rotationZ: 0 });
                }
                
                // Hide page subtitle initially to fly out later
                if (preloaderSubtitle) {
                    gsap.set(preloaderSubtitle, { opacity: 0, scale: 0.1, filter: 'drop-shadow(0 0 0px var(--color-orange))' });
                }

                // Show preloader transparently
                preloader.style.display = 'flex';
                gsap.to(preloader, {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                    onComplete: () => {
                        // Start snappy strike animation on redirect transition!
                        initPreloaderCoords();
                        const tl = gsap.timeline();
                        
                        tl.to(preloaderStick, {
                            x: 180,
                            y: 5,
                            rotationZ: -8,
                            duration: 0.4,
                            ease: 'power2.inOut'
                        })
                        .to(preloaderStick, {
                            x: 230,
                            y: 0,
                            rotationZ: 0,
                            duration: 0.1,
                            ease: 'power1.in',
                            onComplete: () => {
                                // Strike complete: Ignite!
                                preloaderIgnited = true;
                                preloaderStick.classList.add('burnt');
                                
                                // Emit sparks
                                for (let i = 0; i < 40; i++) {
                                    const vx = randomRange(-12, 2);
                                    const vy = randomRange(-8, 3);
                                    preloaderSparks.push(new Spark(strikePoint.x, strikePoint.y, vx, vy));
                                }
                                
                                // Fade in and expand page name FROM the fire!
                                gsap.fromTo(preloaderSubtitle, 
                                    { opacity: 0, scale: 0.1, filter: 'drop-shadow(0 0 0px var(--color-orange))' },
                                    {
                                        opacity: 1,
                                        scale: 1,
                                        filter: 'drop-shadow(0 0 12px var(--color-orange))',
                                        duration: 0.45,
                                        ease: 'back.out(1.5)',
                                        onComplete: () => {
                                            // Store redirect transition state and navigate!
                                            sessionStorage.setItem('redirecting', 'true');
                                            window.location.href = targetUrl;
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            } else {
                window.location.href = targetUrl;
            }
        });
    });

    // --------------------------------------------------
    // 6. Main Entrance & Hero Animations
    // --------------------------------------------------
    const heroMatchbox = document.getElementById('hero-matchbox');
    const heroShadow = document.getElementById('hero-shadow');
    const isMobileDevice = window.innerWidth <= 480;
    const targetHeroScale = isMobileDevice ? 0.85 : 1.0;
    
    if (heroMatchbox) {
        gsap.set('.hero-tag, .hero-title, .hero-desc, .hero-buttons, header', { opacity: 0, y: 30 });
        gsap.set([heroMatchbox, heroShadow], { opacity: 0, scale: 0.8 * targetHeroScale });
    }

    function playMainEntrance() {
        // Reveal Header
        gsap.to('header', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' });

        // Reveal Page Banner elements if on secondary page
        const bannerTitle = document.querySelector('.page-banner h1');
        const bannerDesc = document.querySelector('.page-banner p');
        if (bannerTitle || bannerDesc) {
            gsap.fromTo([bannerTitle, bannerDesc],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
        }

        if (!heroMatchbox) return;
        const isVertical = heroMatchbox.classList.contains('vertical-box');

        // Reveal Hero texts
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          
          .to([heroMatchbox, heroShadow], { 
              opacity: 1, 
              scale: targetHeroScale, 
              duration: 1.5, 
              ease: 'power3.out' 
          }, '-=1.0')
          
          .to('#matchbox-drawer', {
              transform: isVertical ? 'translateZ(0px) translateY(-40px)' : 'translateZ(0px) translateX(90px)',
              duration: 1.6,
              ease: 'power3.out'
          }, '-=0.2')
          
          .to('.interactive-matchstick', {
              x: isVertical ? 0 : 180,
              y: isVertical ? -50 : 0,
              duration: 1.5,
              ease: 'power3.out',
              onComplete: igniteHeroMatch
          }, '-=0.6');
    }

    function igniteHeroMatch() {
        if (heroIgnited) return;
        heroIgnited = true;
        
        updateHeroTipCoords();
        
        for (let i = 0; i < 40; i++) {
            const vx = randomRange(-8, 8);
            const vy = randomRange(-10, 2);
            heroSparks.push(new Spark(heroMatchstickTip.x, heroMatchstickTip.y, vx, vy));
        }
    }

    document.querySelectorAll('.interactive-matchstick').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!heroIgnited) {
                igniteHeroMatch();
            }
        });
    });

    // --------------------------------------------------
    // 7. Interactive 3D Matchbox Mouse Controls (Perspective)
    // --------------------------------------------------
    const heroVisual = document.getElementById('hero-visual');
    if (heroVisual && heroMatchbox && heroShadow) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const normX = x / (rect.width / 2);
            const normY = y / (rect.height / 2);

            const rotY = normX * 8;
            const rotX = -normY * 8;

            gsap.to(heroMatchbox, {
                rotationY: rotY,
                rotationX: rotX,
                ease: 'power2.out',
                duration: 0.8
            });

            gsap.to(heroShadow, {
                x: normX * 20,
                y: normY * 10,
                scaleX: 1 - Math.abs(normY) * 0.15,
                ease: 'power2.out',
                duration: 0.8
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            gsap.to(heroMatchbox, {
                rotationY: 0,
                rotationX: 0,
                ease: 'power3.out',
                duration: 1.5
            });

            gsap.to(heroShadow, {
                x: 0,
                y: 0,
                scaleX: 1,
                ease: 'power3.out',
                duration: 1.5
            });
        });
    }

    // --------------------------------------------------
    // 8. 3D Product Carousel (Swap Feature)
    // --------------------------------------------------
    const carouselTrack = document.getElementById('carousel-track');
    const productCards = Array.from(document.querySelectorAll('.product-card-3d'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const carouselContainer = document.getElementById('product-carousel');
    
    if (carouselTrack && productCards.length && prevBtn && nextBtn && carouselContainer) {
        const numCards = productCards.length;
        let activeIndex = 0;
        let trackRotation = 0;
        const angleStep = 360 / numCards;

        function arrangeCarouselCards() {
            const spacing = window.innerWidth < 768 ? 130 : 240;
            productCards.forEach((card, i) => {
                let diff = i - activeIndex;
                if (diff < -numCards / 2) diff += numCards;
                if (diff > numCards / 2) diff -= numCards;

                const xOffset = diff * spacing;
                const scale = diff === 0 ? 1.0 : 0.8;
                const opacity = diff === 0 ? 1.0 : (Math.abs(diff) === 1 ? 0.45 : 0.0);
                const zIndex = diff === 0 ? 10 : (Math.abs(diff) === 1 ? 5 : 1);

                gsap.set(card, {
                    x: xOffset,
                    y: 0,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    rotationY: 0,
                    rotationX: 0,
                    transformOrigin: 'center center'
                });
                
                const box3d = card.querySelector('.box-3d');
                if (box3d) {
                    gsap.set(box3d, { rotationY: 0, rotationX: 0 });
                }

                gsap.set(card.querySelectorAll('.box-face'), {
                    opacity: diff === 0 ? 1.0 : 0.45
                });
            });
        }
        arrangeCarouselCards();
        window.addEventListener('resize', arrangeCarouselCards);

        function updateActiveCarouselState() {
            gsap.to(carouselTrack, {
                rotationY: 0,
                duration: 0.1
            });

            const detailsElements = document.querySelectorAll('.details-content');
            detailsElements.forEach((el, index) => {
                if (index === activeIndex) {
                    el.style.display = 'block';
                    setTimeout(() => el.classList.add('active'), 50);
                } else {
                    el.classList.remove('active');
                    setTimeout(() => el.style.display = 'none', 500);
                }
            });

            const spacing = window.innerWidth < 768 ? 130 : 240;
            productCards.forEach((card, index) => {
                let diff = index - activeIndex;
                if (diff < -numCards / 2) diff += numCards;
                if (diff > numCards / 2) diff -= numCards;

                const xOffset = diff * spacing;
                const scale = diff === 0 ? 1.0 : 0.8;
                const opacity = diff === 0 ? 1.0 : (Math.abs(diff) === 1 ? 0.45 : 0.0);
                const zIndex = diff === 0 ? 10 : (Math.abs(diff) === 1 ? 5 : 1);

                gsap.to(card, {
                    x: xOffset,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    duration: 0.8,
                    ease: 'power2.out'
                });

                gsap.to(card.querySelectorAll('.box-face'), {
                    opacity: diff === 0 ? 1.0 : 0.45,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        }
        
        updateActiveCarouselState();

        function slideNext() {
            trackRotation -= angleStep;
            activeIndex = (activeIndex + 1) % numCards;
            updateActiveCarouselState();
        }

        function slidePrev() {
            trackRotation += angleStep;
            activeIndex = (activeIndex - 1 + numCards) % numCards;
            updateActiveCarouselState();
        }

        nextBtn.addEventListener('click', slideNext);
        prevBtn.addEventListener('click', slidePrev);

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            const diffX = currentX - startX;
            if (Math.abs(diffX) > 60) {
                if (diffX > 0) slidePrev();
                else slideNext();
            }
        });

        carouselContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            const diffX = currentX - startX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) slidePrev();
                else slideNext();
            }
        });
    }

    // --------------------------------------------------
    // 9. GSAP ScrollTrigger Animations
    // --------------------------------------------------
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section reveals
        const revealSections = document.querySelectorAll('.about, .features, .export, .testimonials, .contact');
        revealSections.forEach((section) => {
            gsap.from(section.querySelectorAll('.subtitle, .section-title, p, .about-visual, .features-grid, .export-grid, .testimonials-grid, .contact-grid'), {
                opacity: 0,
                y: 40,
                duration: 1.0,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Burning timeline fuse scroll trigger
        const burnLine = document.getElementById('timeline-burn-line');
        const burnSpark = document.getElementById('timeline-burn-spark');
        
        if (burnLine && burnSpark) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.set(burnSpark, {
                            opacity: progress > 0.01 && progress < 0.99 ? 1 : 0
                        });
                    }
                }
            })
            .to(burnLine, { height: '100%', ease: 'none' })
            .to(burnSpark, { top: '100%', ease: 'none' }, 0);
        }

        // Timeline item triggers
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item) => {
            const card = item.querySelector('.timeline-card');
            if (card) {
                gsap.from(card, {
                    opacity: 0,
                    x: Array.from(timelineItems).indexOf(item) % 2 === 1 ? 80 : -80,
                    rotationX: -15,
                    transformOrigin: 'center center',
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 65%',
                        onEnter: () => item.classList.add('active'),
                        toggleActions: 'play none none none'
                    }
                });
            }
        });

        // 3D Product Showcase tilts
        const productBoxes = document.querySelectorAll('.box-3d');
        productBoxes.forEach(box => {
            const cardParent = box.parentElement;
            if (cardParent) {
                cardParent.addEventListener('mousemove', (e) => {
                    const rect = cardParent.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    const normX = x / (rect.width / 2);
                    const normY = y / (rect.height / 2);

                    gsap.to(box, {
                        rotationY: normX * 8,
                        rotationX: -normY * 8,
                        ease: 'power2.out',
                        duration: 0.4
                    });
                });

                cardParent.addEventListener('mouseleave', () => {
                    gsap.to(box, {
                        rotationY: 0,
                        rotationX: 0,
                        ease: 'power3.out',
                        duration: 0.8
                    });
                });
            }
        });

        // Map glowing routes
        const mapRoutes = ['#route-europe', '#route-usa', '#route-africa', '#route-latam', '#route-australia'];
        mapRoutes.forEach(routeId => {
            const path = document.querySelector(routeId);
            if (path) {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength
                });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 2.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.export',
                        start: 'top 60%',
                        toggleActions: 'play none none none'
                    }
                });
            }
        });

        // A. ScrollTrigger: Vision Matchbox drawer open
        const visionDrawer = document.querySelector('.vision-drawer');
        const visionContainer = document.querySelector('.vision-matchbox-container');
        if (visionDrawer && visionContainer) {
            gsap.to(visionDrawer, {
                x: 300,
                z: -10,
                duration: 1.5,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: visionContainer,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // B. ScrollTrigger: Story profile spark strike & subheading reveal
        const storySection = document.querySelector('.company-story');
        const sparkSubheading = document.getElementById('spark-subheading');
        if (storySection && sparkSubheading) {
            ScrollTrigger.create({
                trigger: storySection,
                start: 'top 60%',
                onEnter: () => {
                    triggerStoryStrikeSparks();
                    gsap.fromTo(sparkSubheading, 
                        { opacity: 0, y: 20, filter: 'drop-shadow(0 0 0px var(--color-orange))' },
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: 1.2, 
                            filter: 'drop-shadow(0 0 8px var(--color-orange))',
                            ease: 'power3.out',
                            onComplete: () => {
                                gsap.to(sparkSubheading, { filter: 'drop-shadow(0 0 2px var(--color-orange))', duration: 1.0 });
                            }
                        }
                    );
                }
            });
        }

        function triggerStoryStrikeSparks() {
            const sleeveEl = document.querySelector('.matchbox-img-sleeve');
            if (!sleeveEl) return;
            
            const rect = sleeveEl.getBoundingClientRect();
            const emitX = rect.left;
            const emitY = rect.top + rect.height * 0.4;
            
            for (let i = 0; i < 50; i++) {
                const vx = randomRange(-10, -2);
                const vy = randomRange(-6, 4);
                storySparks.push(new Spark(emitX, emitY, vx, vy));
            }
        }
    }

    // --------------------------------------------------
    // 10. Magnetic Submit Button
    // --------------------------------------------------
    const magneticWrap = document.querySelector('.magnetic-wrap');
    const submitBtn = document.getElementById('form-submit-btn');

    if (magneticWrap && submitBtn) {
        magneticWrap.addEventListener('mousemove', (e) => {
            const rect = magneticWrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(submitBtn, {
                x: x * 0.45,
                y: y * 0.45,
                ease: 'power2.out',
                duration: 0.3
            });
        });

        magneticWrap.addEventListener('mouseleave', () => {
            gsap.to(submitBtn, {
                x: 0,
                y: 0,
                ease: 'elastic.out(1, 0.3)',
                duration: 0.8
            });
        });
    }

    // --------------------------------------------------
    // 11. Contact Form Submission Handling
    // --------------------------------------------------
    const contactForm = document.getElementById('export-contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm && successMsg && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            submitBtn.setAttribute('disabled', 'true');
            submitBtn.textContent = 'Submitting Request...';

            setTimeout(() => {
                gsap.to(contactForm.querySelectorAll('.form-group, .magnetic-wrap'), {
                    opacity: 0,
                    y: -10,
                    duration: 0.5,
                    stagger: 0.05,
                    onComplete: () => {
                        contactForm.querySelectorAll('.form-group, .magnetic-wrap').forEach(el => el.style.display = 'none');
                        successMsg.style.display = 'block';
                        gsap.fromTo(successMsg, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 });
                    }
                });
            }, 1200);
        });
    }

});
