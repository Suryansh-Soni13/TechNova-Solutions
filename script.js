document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE NAVIGATION LOGIC
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
            }
        });
    }

    /* =========================================
       2. SCROLL ANIMATIONS (Fade-up)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


    /* =========================================
       3. INTELLIGENT CLIENT-SIDE AI CHATBOT
       ========================================= */
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatHistory = document.getElementById('chatHistory');
    const chatInput = document.getElementById('chatInput');
    const chatSubmit = document.getElementById('chatSubmit');
    const resetChat = document.getElementById('resetChat');
    const typingIndicator = document.getElementById('typingIndicator');

    let isGenerating = false;
    let messageHistory = [];

    // Toggles
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotPanel.classList.toggle('active');
            if (chatbotPanel.classList.contains('active')) {
                chatInput.focus();
                if (chatHistory.querySelectorAll('.tn-chatbot-message:not(#typingIndicator)').length === 0) {
                    addBotMessage("Hi! I\'m the TechNova AI Assistant. I can explain our engineering capabilities, introduce you to the team, or help you start a project. What can I help you with?", ["Explore Services", "Meet the Team", "Start a Project"]);
                }
            }
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener('click', () => {
            chatbotPanel.classList.remove('active');
        });
    }

    if (resetChat) {
        resetChat.addEventListener('click', () => {
            chatHistory.innerHTML = '';
            messageHistory = [];
            // Recreate typing indicator
            const newTyping = document.createElement('div');
            newTyping.id = 'typingIndicator';
            newTyping.className = 'tn-chatbot-message bot';
            newTyping.style.display = 'none';
            newTyping.innerHTML = '<em>Typing...</em>';
            chatHistory.appendChild(newTyping);
            addBotMessage("Conversation reset. How can I assist you today?", [
                "Explore Services",
                "Meet the Team",
                "Start a Project"
            ]);
        });
    }

    // Input handling
    if (chatSubmit) chatSubmit.addEventListener('click', () => sendMessage());
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function showTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    function hideTypingIndicator() {
        if (typingIndicator) typingIndicator.style.display = 'none';
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'tn-chatbot-message user';
        msgDiv.textContent = text;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        messageHistory.push(text.toLowerCase());
    }

    function addBotMessage(text, chips = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'tn-chatbot-message bot';
        msgDiv.innerHTML = text;
        chatHistory.appendChild(msgDiv);

        // Remove all previous chip containers to prevent overlap
        const oldChips = chatHistory.querySelectorAll('.tn-chat-chips');
        oldChips.forEach(el => el.remove());

        if (chips && chips.length > 0) {
            const chipContainer = document.createElement('div');
            chipContainer.className = 'tn-chat-chips';
            chips.forEach(chip => {
                const btn = document.createElement('button');
                btn.className = 'tn-chip';
                btn.textContent = chip;
                btn.onclick = () => {
                    chipContainer.remove();
                    chatInput.value = chip;
                    sendMessage();
                };
                chipContainer.appendChild(btn);
            });
            chatHistory.appendChild(chipContainer);
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // THE AI LOGIC ENGINE (Client-Side NLP Simulator)
    function generateAssistantResponse(query) {
        const q = query.toLowerCase();
        
        if (/(explore services|what services|your services)/.test(q)) {
            return {
                text: "We provide end-to-end IT engineering, including:<br><br>1. <strong>AI Solutions & Prompt Engineering</strong><br>2. <strong>AI-Powered Web & App Development</strong><br>3. <strong>Custom Software Engineering</strong><br>4. <strong>UI/UX & Web Design</strong><br>5. <strong>WordPress & SEO Solutions</strong>",
                chips: ["Web & App Dev", "AI Solutions", "Start a Project"]
            };
        }
        if (/(web & app|build an app|build a website)/.test(q)) {
            return {
                text: "We build highly scalable web platforms and native mobile apps using React, Next.js, and Flutter. We optimize everything for lightning-fast speeds and high conversion rates.",
                chips: ["Meet the Team", "Start a Project"]
            };
        }
        if (/(ai solutions|artificial intelligence)/.test(q)) {
            return {
                text: "Our AI solutions integrate LLMs (like GPT/Gemini) directly into your business to automate data processing, customer interactions, and internal workflows.",
                chips: ["Meet the Team", "Start a Project"]
            };
        }
        if (/(meet the team|who are the founders|team|developers)/.test(q)) {
            return {
                text: "TechNova Solutions is led by a team of expert engineers. Who would you like to know more about?",
                chips: ["Suryansh Soni", "Dhruv Bhavsar", "Umang Bhanushali"]
            };
        }
        if (/(suryansh|suryansh soni)/.test(q)) {
            return {
                text: "<strong>Suryansh Soni</strong> is a Senior Web Developer and UI/UX Specialist. He architects high-performance, conversion-optimized digital platforms using React, Next.js, and Figma.",
                chips: ["Dhruv Bhavsar", "Umang Bhanushali", "Explore Services"]
            };
        }
        if (/(dhruv|dhruv bhavsar)/.test(q)) {
            return {
                text: "<strong>Dhruv Bhavsar</strong> is our Application & Systems Architect. He specializes in building robust, cross-platform mobile applications using Flutter and designing scalable backend infrastructure.",
                chips: ["Suryansh Soni", "Umang Bhanushali", "Explore Services"]
            };
        }
        if (/(umang|umang bhanushali)/.test(q)) {
            return {
                text: "<strong>Umang Bhanushali</strong> is a Full Stack Developer & AI Integrator. He focuses on weaving complex AI models into seamless enterprise workflows and building powerful custom software solutions.",
                chips: ["Suryansh Soni", "Dhruv Bhavsar", "Explore Services"]
            };
        }
        if (/(start a project|contact us)/.test(q)) {
            return {
                text: "We'd love to hear about your project! You can fill out the contact form on our website or email us directly at support.technovasolutions@gmail.com.",
                chips: ["Explore Services", "Meet the Team"]
            };
        }

        // Fallback
        return {
            text: "I can help you explore our services, learn about our team, or get in touch to start a project.",
            chips: ["Explore Services", "Meet the Team", "Start a Project"]
        };
    }

    function sendMessage() {
        if (isGenerating) return;

        const rawText = chatInput.value.trim();
        if (!rawText) return;
        if (rawText.length < 2) {
            addBotMessage("Please provide a bit more detail so I can help you correctly.", []);
            chatInput.value = '';
            return;
        }

        // Sanitize and process
        const sanitizedQuery = rawText.length > 500 ? rawText.slice(0, 500) : rawText;

        addUserMessage(sanitizedQuery);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSubmit.disabled = true;
        isGenerating = true;

        showTypingIndicator();

        // Realistic typing response latency
        const delay = Math.min(800, Math.max(400, sanitizedQuery.length * 15));

        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAssistantResponse(sanitizedQuery);
            addBotMessage(response.text, response.chips);

            chatInput.disabled = false;
            chatSubmit.disabled = false;
            isGenerating = false;
            chatInput.focus();
        }, delay);
    }

    /* =========================================
       4. FORMSPREE CONTACT FORM LOGIC
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = "Thank you! Your message has been sent successfully.";
                        formStatus.className = 'form-status success visible';
                        formStatus.style.display = 'block';
                    }
                    contactForm.reset();
                } else {
                    if (formStatus) {
                        formStatus.textContent = "Oops! There was a problem submitting your form. Please try again.";
                        formStatus.className = 'form-status error visible';
                        formStatus.style.display = 'block';
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = "Network error. Please try again.";
                    formStatus.className = 'form-status error visible';
                    formStatus.style.display = 'block';
                }
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});
