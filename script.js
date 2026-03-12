// --- Tool Tabs Interactivity (TechVenus Style) ---
const tabs = document.querySelectorAll('.tool-tab');
const codeBody = document.querySelector('.code-body');

const codeSnippets = {
    'Node.js': `
<span class="sh-purple">async function</span> <span class="sh-blue">initAISystem</span>() {<br>
&nbsp;&nbsp;<span class="sh-orange">const</span> engine = <span class="sh-purple">new</span> <span class="sh-cyan">NovaEngine</span>({<br>
&nbsp;&nbsp;&nbsp;&nbsp;model: <span class="sh-green">'GPT-4-Turbo'</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;autoScale: <span class="sh-orange">true</span><br>
&nbsp;&nbsp;});<br><br>
&nbsp;&nbsp;<span class="sh-purple">await</span> engine.<span class="sh-blue">ignite</span>();<br>
&nbsp;&nbsp;<span class="sh-orange">console</span>.<span class="sh-blue">log</span>(<span class="sh-green">"TechNova AI Core Online."</span>);<br>
}`,
    'React': `
<span class="sh-purple">const</span> <span class="sh-blue">Dashboard</span> = () => {<br>
&nbsp;&nbsp;<span class="sh-purple">const</span> [data, setData] = <span class="sh-blue">useState</span>(<span class="sh-orange">null</span>);<br><br>
&nbsp;&nbsp;<span class="sh-blue">useEffect</span>(() => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="sh-cyan">NovaAPI</span>.<span class="sh-blue">fetchStats</span>().<span class="sh-blue">then</span>(setData);<br>
&nbsp;&nbsp;}, []);<br><br>
&nbsp;&nbsp;<span class="sh-purple">return</span> <span class="sh-cyan">&lt;NovaGrid</span> data={data} <span class="sh-cyan">/&gt;</span>;<br>
}`,
    'Python': `
<span class="sh-purple">import</span> novacore <span class="sh-purple">as</span> nc<br><br>
<span class="sh-purple">def</span> <span class="sh-blue">process_data</span>(raw_input):<br>
&nbsp;&nbsp;model = nc.<span class="sh-cyan">Intelligence</span>(v=<span class="sh-green">"3.0"</span>)<br>
&nbsp;&nbsp;results = model.<span class="sh-blue">predict</span>(raw_input)<br>
&nbsp;&nbsp;<span class="sh-purple">return</span> results.<span class="sh-blue">format_json</span>()`,
    'SASS': `
<span class="sh-blue">$primary-cyan</span>: <span class="sh-green">#00f5ff</span>;<br>
<span class="sh-blue">$glass-bg</span>: <span class="sh-purple">rgba</span>(255, 255, 255, 0.03);<br><br>
<span class="sh-cyan">.glass-panel</span> {<br>
&nbsp;&nbsp;background: <span class="sh-blue">$glass-bg</span>;<br>
&nbsp;&nbsp;border: <span class="sh-orange">1px solid</span> <span class="sh-purple">rgba</span>(255,255,255,0.1);<br>
&nbsp;&nbsp;<span class="sh-orange">backdrop-filter</span>: <span class="sh-blue">blur</span>(15px);<br>
}`
};

if (tabs.length > 0 && codeBody) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            codeBody.style.opacity = '0';
            setTimeout(() => {
                codeBody.innerHTML = codeSnippets[tab.innerText];
                codeBody.style.opacity = '1';
            }, 200);
        });
    });
}

// --- FAQ Interactivity ---
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// --- Custom Cursor ---
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursorDot.style.transform = `translate(${x}px, ${y}px)`;
        cursorRing.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.querySelectorAll('a, button, .service-card, .tool-tab, .faq-question, .nav-cta, .nav-links a').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorRing.style.width = '80px';
            cursorRing.style.height = '80px';
            cursorRing.style.borderColor = 'white';
            cursorRing.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        item.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.background = 'transparent';
            cursorRing.style.borderColor = 'var(--primary-cyan)';
        });
    });
}

// --- Starfield ---
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 1.5;
            this.speed = 0.3 + Math.random() * 1.2;
            this.alpha = Math.random() * 0.5;
        }
        update() {
            this.y -= this.speed;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- Intersection Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const statNum = entry.target.querySelector('.stat-num');
            if (statNum) {
                startCount(statNum);
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function startCount(el) {
    if (el.dataset.started) return;
    el.dataset.started = "true";
    
    const targetValue = el.getAttribute('data-val');
    const target = parseInt(targetValue);
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCount(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        current = Math.floor(progress * target);
        
        let suffix = '+';
        if (targetValue.includes('%')) suffix = '%';
        if (targetValue.includes('M')) suffix = 'M+';
        
        el.innerText = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = targetValue;
        }
    }
    requestAnimationFrame(updateCount);
}

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- 3D Banner Parallax ---
const banner3D = document.querySelector('.banner-3d-wrapper');
const textBlock = document.querySelector('.text-3d-block');
const uiCards = document.querySelectorAll('.floating-ui-card');

if (banner3D && textBlock) {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        textBlock.style.transform = `rotateY(${-10 + x}deg) rotateX(${5 + y}deg)`;
        
        uiCards.forEach((card, index) => {
            const factor = (index + 1) * 30;
            const cx = (window.innerWidth / 2 - e.clientX) / factor;
            const cy = (window.innerHeight / 2 - e.clientY) / factor;
            card.style.transform = `translate(${cx}px, ${cy}px) scale(1.05)`;
        });
    });

    banner3D.addEventListener('mouseleave', () => {
        textBlock.style.transform = `rotateY(-10deg) rotateX(5deg)`;
        uiCards.forEach(card => card.style.transform = `translate(0, 0) scale(1)`);
    });
}

// --- Form Submission ---
const contactForm = document.getElementById('main-contact-form');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('form-feedback');

if (contactForm && submitBtn && feedback) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab data from form
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        submitBtn.innerText = "Igniting...";
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.opacity = "0.7";

        // Submit to Formspree Cloud
        fetch(contactForm.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                contactForm.reset();
                submitBtn.innerText = "Proposal Ignited!";
                feedback.innerText = "Success! Our AI Core has received your transmission. Expected response within 2.4 light-hours.";
                feedback.style.opacity = "1";

                setTimeout(() => {
                    feedback.style.opacity = "0";
                    submitBtn.innerText = "Ignite Proposal";
                    submitBtn.style.pointerEvents = "all";
                    submitBtn.style.opacity = "1";
                }, 5000);
            } else {
                feedback.innerText = "Transmission Interrupted. Check your network connection.";
                feedback.style.opacity = "1";
                submitBtn.innerText = "Ignite Proposal";
                submitBtn.style.pointerEvents = "all";
                submitBtn.style.opacity = "1";
            }
        }).catch(error => {
            console.error(error);
            feedback.innerText = "Error: Transmission Lost. Please try again later.";
            feedback.style.opacity = "1";
            submitBtn.innerText = "Ignite Proposal";
            submitBtn.style.pointerEvents = "all";
            submitBtn.style.opacity = "1";
        });
    });
}

// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}
