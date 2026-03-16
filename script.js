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

// --- Decorative Cursor Point ---
const cursorDot = document.getElementById('cursor-dot');

if (cursorDot) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursorDot.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.querySelectorAll('a, button, .service-card, .tool-tab, .faq-question, .nav-cta, .nav-links a').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorDot.style.transform += ' scale(2)';
            cursorDot.style.background = 'var(--electric-blue)';
        });
        item.addEventListener('mouseleave', () => {
            cursorDot.style.background = 'var(--primary-cyan)';
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
}, { threshold: 0.05 });

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

// --- AI Chatbox Logic ---
const chatToggle = document.getElementById('ai-chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendMsgBtn = document.getElementById('send-msg');
const chatMessages = document.getElementById('chat-messages');
const chatCloseBtn = document.getElementById('chat-close-btn');

function openChat() {
    if (chatWindow) {
        chatWindow.classList.add('active');
        // Prevent body scroll on mobile for full-screen experience
        if (window.innerWidth <= 480) {
            document.body.style.overflow = 'hidden';
        }
        setTimeout(() => {
            if (chatInput) chatInput.focus();
        }, 300);
    }
}

function closeChat() {
    if (chatWindow) {
        chatWindow.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        if (chatWindow && chatWindow.classList.contains('active')) {
            closeChat();
        } else {
            openChat();
        }
    });
}

if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', closeChat);
}

if (chatMessages && chatInput && sendMsgBtn) {

    const addMessage = (content, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = content;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        const safeUserText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        addMessage(safeUserText, 'user');
        chatInput.value = '';
        chatInput.focus();

        // Show typing indicator
        setTimeout(() => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai typing';
            typingDiv.innerText = 'Nova is thinking...';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                chatMessages.removeChild(typingDiv);

                const input = text.toLowerCase();
                let response = "";

                if (input.includes('price') || input.includes('cost') || input.includes('budget') || input.includes('how much') || input.includes('rate') || input.includes('rs') || input.includes('inr')) {
                    response = `
                        <div style="background: rgba(13, 148, 136, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08);">
                            <h4 style="color: var(--primary-cyan); margin-bottom: 10px; font-family: 'Orbitron', sans-serif; font-size: 0.85rem;">Premium Service Matrix (2026)</h4>
                            <div style="font-size: 0.82rem; line-height: 1.7;">
                                🚀 <strong>Starter: ₹9,999</strong><br>
                                <span style="opacity: 0.7;">1-5 Pages • Basic SEO • WhatsApp Integration</span><br><br>
                                🔥 <strong>Business AI: ₹29,999</strong><br>
                                <span style="opacity: 0.7;">AI Chatbot • CRM • Full SEO Setup</span><br><br>
                                💎 <strong>Premium Ecosystem: ₹59,999+</strong><br>
                                <span style="opacity: 0.7;">Advanced App Suite • 10x ROI Scaling</span>
                            </div>
                            <p style="font-size: 0.7rem; margin-top: 10px; font-style: italic; opacity: 0.6;">* Estimates only. Custom quotes available.</p>
                        </div>
                    `;
                } else if (input.includes('service') || input.includes('what do you do') || input.includes('offer')) {
                    response = "TechNova Solutions offers elite **AI-Powered Development**:<br><br>• **AI Web Architectures** (React/Node.js)<br>• **Next-Gen Mobile Apps** (iOS/Android)<br>• **Prompt Engineering** & LLM Integration<br>• **Local SEO** & GBP Management<br><br><a href='services.html' style='color: var(--primary-cyan); font-weight: bold; text-decoration: none;'>Explore Services →</a>";
                } else if (input.includes('internship') || input.includes('job') || input.includes('career') || input.includes('apply')) {
                    response = "We are searching for elite talent to join our AI Core!<br><br><a href='internship.html' style='display:inline-block; padding:10px 20px; background:var(--primary-cyan); color:white; border-radius:25px; text-decoration:none; font-weight:700;'>VIEW OPENINGS →</a>";
                } else if (input.includes('contact') || input.includes('email') || input.includes('reach') || input.includes('phone')) {
                    response = "📧 <strong>support.technovasolutions@gmail.com</strong><br><br><a href='contact.html' style='color: var(--primary-cyan); font-weight: bold; text-decoration: none;'>Send us a message →</a>";
                } else if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('hii')) {
                    response = "👋 Nova System Online! I can help with:<br><br>• <strong>Pricing & Services</strong><br>• <strong>Internship Applications</strong><br>• <strong>Contact Information</strong><br><br>What can I assist you with?";
                } else if (input.includes('web') || input.includes('website') || input.includes('app') || input.includes('mobile')) {
                    response = "TechNova specializes in <strong>AI-integrated web & mobile apps</strong> — React, Node.js, Android & iOS.<br><br><a href='services.html' style='color: var(--primary-cyan); font-weight: bold; text-decoration: none;'>View Services →</a>";
                } else if (input.includes('seo') || input.includes('google') || input.includes('rank') || input.includes('local')) {
                    response = "Our <strong>Local SEO & Google Business Profile</strong> services rank your business at the top of search results, driving foot traffic and calls.";
                } else {
                    response = "I'm Nova, TechNova's AI Assistant! I can help you with <strong>services</strong>, <strong>pricing</strong>, <strong>internships</strong>, or <strong>contact info</strong>. What would you like to know?";
                }

                // Bold + link markdown conversion
                response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                response = response.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--primary-cyan); font-weight: bold; text-decoration: none;">$1</a>');

                addMessage(response, 'ai');
            }, 1000);
        }, 400);
    };

    // Send button — click AND touchend for mobile
    sendMsgBtn.addEventListener('click', handleSend);
    sendMsgBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleSend();
    });

    // Enter key — use keydown (works on all browsers including mobile)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });
}



