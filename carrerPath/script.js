// Global variables
let currentQuestionIndex = 0;
let userAnswers = [];
let assessmentQuestions = [];
let assessmentResults = null;

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const assessmentContainer = document.getElementById('assessmentContainer');
const assessmentStart = document.getElementById('assessmentStart');
const questionContainer = document.getElementById('questionContainer');
const resultsContainer = document.getElementById('resultsContainer');
const paymentModal = document.getElementById('paymentModal');
const freeAccessModal = document.getElementById('freeAccessModal');
const toast = document.getElementById('toast');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadAssessmentQuestions();
    setupTestimonialCarousel();
    setupFAQAccordion();
});

function initializeApp() {
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.step, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Assessment start buttons
    document.getElementById('startAssessmentBtn').addEventListener('click', scrollToAssessment);
    document.getElementById('beginAssessmentBtn').addEventListener('click', startAssessment);
    document.getElementById('finalStartBtn').addEventListener('click', scrollToAssessment);
    
    // Learn more button
    document.getElementById('learnMoreBtn').addEventListener('click', () => {
        document.getElementById('howItWorksSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Question navigation
    document.getElementById('prevQuestionBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

    // Results actions
    document.getElementById('unlockFullReportBtn').addEventListener('click', showPaymentModal);
    document.getElementById('findMentorBtn').addEventListener('click', () => {
        showToast('Mentor matching feature coming soon!', 'info');
    });
    document.getElementById('shareResultsBtn').addEventListener('click', shareResults);
    document.getElementById('exploreMoreBtn').addEventListener('click', () => {
        showToast('Exploring more career paths...', 'info');
    });

    // Premium section
    document.getElementById('getPremiumBtn').addEventListener('click', showPaymentModal);
    document.getElementById('applyForFreeAccess').addEventListener('click', showFreeAccessModal);

    // Modal controls
    document.getElementById('modalClose').addEventListener('click', hidePaymentModal);
    document.getElementById('cancelPayment').addEventListener('click', hidePaymentModal);
    document.getElementById('processPayment').addEventListener('click', handlePayment);
    
    document.getElementById('freeAccessModalClose').addEventListener('click', hideFreeAccessModal);
    document.getElementById('cancelFreeAccess').addEventListener('click', hideFreeAccessModal);
    document.getElementById('submitFreeAccess').addEventListener('click', handleFreeAccessApplication);

    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Toast close
    document.querySelector('.toast-close').addEventListener('click', hideToast);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

function scrollToAssessment() {
    assessmentContainer.scrollIntoView({ behavior: 'smooth' });
}

function loadAssessmentQuestions() {
    // Simulated API call to load questions
    assessmentQuestions = [
        {
            id: 1,
            category: "Skills Assessment",
            question: "How comfortable are you with learning new technologies?",
            type: "scale",
            options: [
                { value: 5, text: "Very comfortable - I love exploring new tech" },
                { value: 4, text: "Comfortable - I adapt well to new tools" },
                { value: 3, text: "Somewhat comfortable - I need some guidance" },
                { value: 2, text: "Uncomfortable - I prefer familiar technologies" },
                { value: 1, text: "Very uncomfortable - I avoid new tech" }
            ]
        },
        {
            id: 2,
            category: "Interest Mapping",
            question: "Which type of work environment excites you most?",
            type: "single",
            options: [
                { value: "startup", text: "Fast-paced startup with lots of variety" },
                { value: "corporate", text: "Structured corporate environment" },
                { value: "remote", text: "Remote work with flexible schedule" },
                { value: "freelance", text: "Freelance/consulting work" },
                { value: "nonprofit", text: "Mission-driven nonprofit organization" }
            ]
        },
        {
            id: 3,
            category: "Skills Assessment",
            question: "How would you rate your problem-solving abilities?",
            type: "scale",
            options: [
                { value: 5, text: "Excellent - I thrive on complex challenges" },
                { value: 4, text: "Good - I can solve most problems independently" },
                { value: 3, text: "Average - I solve problems with some help" },
                { value: 2, text: "Below average - I need significant guidance" },
                { value: 1, text: "Poor - I struggle with problem-solving" }
            ]
        },
        {
            id: 4,
            category: "Personality Insights",
            question: "Do you prefer working alone or in teams?",
            type: "scale",
            options: [
                { value: 5, text: "Strongly prefer teams - I'm energized by collaboration" },
                { value: 4, text: "Prefer teams - I work better with others" },
                { value: 3, text: "No preference - I'm comfortable either way" },
                { value: 2, text: "Prefer alone - I'm more productive independently" },
                { value: 1, text: "Strongly prefer alone - I work best in isolation" }
            ]
        },
        {
            id: 5,
            category: "Interest Mapping",
            question: "Which activities do you find most engaging?",
            type: "multiple",
            options: [
                { value: "coding", text: "Writing code and building applications" },
                { value: "design", text: "Creating visual designs and user interfaces" },
                { value: "analysis", text: "Analyzing data and finding patterns" },
                { value: "communication", text: "Presenting ideas and communicating with others" },
                { value: "strategy", text: "Planning and strategic thinking" },
                { value: "teaching", text: "Teaching and mentoring others" }
            ]
        },
        {
            id: 6,
            category: "Skills Assessment",
            question: "How comfortable are you with mathematics and logical thinking?",
            type: "scale",
            options: [
                { value: 5, text: "Very comfortable - Math is my strong suit" },
                { value: 4, text: "Comfortable - I handle math well" },
                { value: 3, text: "Somewhat comfortable - Basic math is fine" },
                { value: 2, text: "Uncomfortable - I struggle with math" },
                { value: 1, text: "Very uncomfortable - I avoid mathematical tasks" }
            ]
        },
        {
            id: 7,
            category: "Personality Insights",
            question: "How do you handle stress and pressure?",
            type: "single",
            options: [
                { value: "thrive", text: "I thrive under pressure and perform better" },
                { value: "manage", text: "I manage stress well and stay focused" },
                { value: "cope", text: "I cope adequately but prefer less pressure" },
                { value: "struggle", text: "I struggle with high-pressure situations" },
                { value: "avoid", text: "I actively avoid stressful situations" }
            ]
        },
        {
            id: 8,
            category: "Interest Mapping",
            question: "What motivates you most in your career?",
            type: "single",
            options: [
                { value: "impact", text: "Making a positive impact on society" },
                { value: "money", text: "Financial success and stability" },
                { value: "growth", text: "Personal and professional growth" },
                { value: "recognition", text: "Recognition and achievement" },
                { value: "balance", text: "Work-life balance and flexibility" }
            ]
        },
        {
            id: 9,
            category: "Skills Assessment",
            question: "How would you describe your communication skills?",
            type: "scale",
            options: [
                { value: 5, text: "Excellent - I'm a natural communicator" },
                { value: 4, text: "Good - I communicate effectively" },
                { value: 3, text: "Average - I get my point across" },
                { value: 2, text: "Below average - I struggle to express ideas" },
                { value: 1, text: "Poor - Communication is very challenging for me" }
            ]
        },
        {
            id: 10,
            category: "Personality Insights",
            question: "How do you prefer to learn new skills?",
            type: "single",
            options: [
                { value: "hands-on", text: "Hands-on practice and experimentation" },
                { value: "structured", text: "Structured courses and formal education" },
                { value: "mentorship", text: "One-on-one mentorship and guidance" },
                { value: "self-study", text: "Self-directed study and research" },
                { value: "peer", text: "Peer learning and group discussions" }
            ]
        },
        {
            id: 11,
            category: "Interest Mapping",
            question: "Which technology areas interest you most?",
            type: "multiple",
            options: [
                { value: "web", text: "Web development and frontend technologies" },
                { value: "mobile", text: "Mobile app development" },
                { value: "ai", text: "Artificial intelligence and machine learning" },
                { value: "data", text: "Data science and analytics" },
                { value: "cybersecurity", text: "Cybersecurity and information security" },
                { value: "blockchain", text: "Blockchain and cryptocurrency" },
                { value: "iot", text: "Internet of Things (IoT)" },
                { value: "cloud", text: "Cloud computing and infrastructure" }
            ]
        },
        {
            id: 12,
            category: "Skills Assessment",
            question: "How comfortable are you with public speaking and presentations?",
            type: "scale",
            options: [
                { value: 5, text: "Very comfortable - I enjoy presenting" },
                { value: 4, text: "Comfortable - I can present effectively" },
                { value: 3, text: "Somewhat comfortable - I manage when needed" },
                { value: 2, text: "Uncomfortable - I avoid presentations" },
                { value: 1, text: "Very uncomfortable - Public speaking terrifies me" }
            ]
        },
        {
            id: 13,
            category: "Personality Insights",
            question: "How do you approach deadlines and time management?",
            type: "single",
            options: [
                { value: "early", text: "I always finish early and plan ahead" },
                { value: "ontime", text: "I consistently meet deadlines" },
                { value: "lastminute", text: "I work well under last-minute pressure" },
                { value: "struggle", text: "I sometimes struggle with deadlines" },
                { value: "procrastinate", text: "I tend to procrastinate and rush" }
            ]
        },
        {
            id: 14,
            category: "Interest Mapping",
            question: "What type of projects excite you most?",
            type: "single",
            options: [
                { value: "creative", text: "Creative and artistic projects" },
                { value: "technical", text: "Technical and engineering challenges" },
                { value: "business", text: "Business and entrepreneurial ventures" },
                { value: "social", text: "Social impact and community projects" },
                { value: "research", text: "Research and analytical projects" }
            ]
        },
        {
            id: 15,
            category: "Skills Assessment",
            question: "How would you rate your leadership abilities?",
            type: "scale",
            options: [
                { value: 5, text: "Excellent - I'm a natural leader" },
                { value: 4, text: "Good - I can lead when needed" },
                { value: 3, text: "Average - I prefer to follow" },
                { value: 2, text: "Below average - Leadership is challenging" },
                { value: 1, text: "Poor - I avoid leadership roles" }
            ]
        },
        {
            id: 16,
            category: "Personality Insights",
            question: "How do you handle failure and setbacks?",
            type: "single",
            options: [
                { value: "learn", text: "I learn from failures and bounce back quickly" },
                { value: "persist", text: "I persist and keep trying different approaches" },
                { value: "reflect", text: "I take time to reflect and then move forward" },
                { value: "discouraged", text: "I get discouraged but eventually recover" },
                { value: "avoid", text: "I try to avoid situations where I might fail" }
            ]
        },
        {
            id: 17,
            category: "Interest Mapping",
            question: "What size company would you prefer to work for?",
            type: "single",
            options: [
                { value: "startup", text: "Small startup (1-50 employees)" },
                { value: "medium", text: "Medium company (50-500 employees)" },
                { value: "large", text: "Large corporation (500+ employees)" },
                { value: "freelance", text: "Self-employed/freelance" },
                { value: "nonprofit", text: "Nonprofit organization" }
            ]
        },
        {
            id: 18,
            category: "Skills Assessment",
            question: "How comfortable are you with continuous learning and upskilling?",
            type: "scale",
            options: [
                { value: 5, text: "Very comfortable - I love learning new things" },
                { value: 4, text: "Comfortable - I enjoy professional development" },
                { value: 3, text: "Somewhat comfortable - I learn when necessary" },
                { value: 2, text: "Uncomfortable - I prefer to stick with what I know" },
                { value: 1, text: "Very uncomfortable - I resist learning new skills" }
            ]
        },
        {
            id: 19,
            category: "Personality Insights",
            question: "How important is work-life balance to you?",
            type: "scale",
            options: [
                { value: 5, text: "Extremely important - It's my top priority" },
                { value: 4, text: "Very important - I need good balance" },
                { value: 3, text: "Moderately important - Some balance is needed" },
                { value: 2, text: "Somewhat important - I can sacrifice for career" },
                { value: 1, text: "Not important - Career comes first" }
            ]
        },
        {
            id: 20,
            category: "Interest Mapping",
            question: "What would you like to achieve in your career in the next 5 years?",
            type: "single",
            options: [
                { value: "expertise", text: "Become an expert in my field" },
                { value: "leadership", text: "Move into leadership/management roles" },
                { value: "entrepreneur", text: "Start my own business" },
                { value: "impact", text: "Make a significant social impact" },
                { value: "financial", text: "Achieve financial independence" }
            ]
        }
    ];
}

function startAssessment() {
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Hide start screen and show question container
    assessmentStart.style.display = 'none';
    questionContainer.style.display = 'block';
    
    // Display first question
    displayQuestion();
    
    // Track assessment start
    trackEvent('Assessment Started', {
        timestamp: new Date().toISOString()
    });
}

function displayQuestion() {
    const question = assessmentQuestions[currentQuestionIndex];
    const totalQuestions = assessmentQuestions.length;
    
    // Update progress
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progressPercent + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Update question content
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionNumberBadge').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Generate answer options
    const answerOptions = document.getElementById('answerOptions');
    answerOptions.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.dataset.value = option.value;
        optionElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 20px; height: 20px; border: 2px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 10px; height: 10px; background: var(--primary-color); border-radius: 50%; opacity: 0; transition: opacity 0.3s ease;"></div>
                </div>
                <span>${option.text}</span>
            </div>
        `;
        
        optionElement.addEventListener('click', () => selectAnswer(optionElement, option.value));
        answerOptions.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prevQuestionBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextQuestionBtn').disabled = true;
    
    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex]) {
        const previousAnswer = userAnswers[currentQuestionIndex];
        const selectedOption = answerOptions.querySelector(`[data-value="${previousAnswer}"]`);
        if (selectedOption) {
            selectAnswer(selectedOption, previousAnswer);
        }
    }
}

function selectAnswer(optionElement, value) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
        const indicator = option.querySelector('div > div');
        if (indicator) indicator.style.opacity = '0';
    });
    
    // Add selection to clicked option
    optionElement.classList.add('selected');
    const indicator = optionElement.querySelector('div > div');
    if (indicator) indicator.style.opacity = '1';
    
    // Store answer
    userAnswers[currentQuestionIndex] = value;
    
    // Enable next button
    document.getElementById('nextQuestionBtn').disabled = false;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Assessment complete
        completeAssessment();
    }
}

function completeAssessment() {
    // Hide question container and show loading
    questionContainer.style.display = 'none';
    
    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'assessment-loading';
    loadingElement.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div style="width: 80px; height: 80px; border: 4px solid var(--primary-light); border-top: 4px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 2rem;"></div>
            <h3>Analyzing Your Responses...</h3>
            <p>Our AI is processing your answers to create your personalized career profile</p>
        </div>
    `;
    assessmentContainer.appendChild(loadingElement);
    
    // Simulate API call to analyze results
    setTimeout(() => {
        assessmentContainer.removeChild(loadingElement);
        generateResults();
        displayResults();
    }, 3000);
    
    // Track assessment completion
    trackEvent('Assessment Completed', {
        answers: userAnswers,
        timestamp: new Date().toISOString()
    });
}

function generateResults() {
    // Simulate AI analysis of user responses
    assessmentResults = {
        profile: {
            match: 93,
            strengths: [
                "Problem-solving",
                "Technical aptitude",
                "Continuous learning",
                "Team collaboration",
                "Communication skills"
            ],
            workStyle: {
                teamwork: 85,
                independence: 70,
                leadership: 75,
                creativity: 90,
                analytical: 95
            },
            interests: [
                "Web Development",
                "Data Analysis",
                "AI/Machine Learning",
                "User Experience",
                "Problem Solving"
            ]
        },
        careerPaths: [
            {
                title: "Full-Stack Developer",
                match: 95,
                description: "Build end-to-end web applications using modern technologies",
                icon: "fas fa-code",
                salary: "$45,000 - $85,000",
                growth: "High demand, 22% growth expected"
            },
            {
                title: "Data Scientist",
                match: 88,
                description: "Analyze complex data to drive business decisions",
                icon: "fas fa-chart-line",
                salary: "$55,000 - $95,000",
                growth: "Fastest growing field, 35% growth expected"
            },
            {
                title: "UX/UI Designer",
                match: 82,
                description: "Design intuitive and beautiful user experiences",
                icon: "fas fa-paint-brush",
                salary: "$40,000 - $75,000",
                growth: "Strong demand, 18% growth expected"
            }
        ],
        learningPath: [
            {
                step: 1,
                title: "Foundation Skills",
                description: "Master the basics of programming and web technologies",
                duration: "2-3 months",
                resources: [
                    { type: "course", name: "HTML/CSS Fundamentals", url: "#" },
                    { type: "course", name: "JavaScript Basics", url: "#" },
                    { type: "project", name: "Build Your First Website", url: "#" }
                ]
            },
            {
                step: 2,
                title: "Frontend Development",
                description: "Learn modern frontend frameworks and tools",
                duration: "3-4 months",
                resources: [
                    { type: "course", name: "React.js Mastery", url: "#" },
                    { type: "course", name: "Responsive Design", url: "#" },
                    { type: "project", name: "Portfolio Website", url: "#" }
                ]
            },
            {
                step: 3,
                title: "Backend Development",
                description: "Build server-side applications and APIs",
                duration: "3-4 months",
                resources: [
                    { type: "course", name: "Node.js & Express", url: "#" },
                    { type: "course", name: "Database Design", url: "#" },
                    { type: "project", name: "Full-Stack Application", url: "#" }
                ]
            },
            {
                step: 4,
                title: "Professional Development",
                description: "Prepare for the job market and career growth",
                duration: "1-2 months",
                resources: [
                    { type: "mentorship", name: "1-on-1 Career Coaching", url: "#" },
                    { type: "course", name: "Interview Preparation", url: "#" },
                    { type: "project", name: "Capstone Project", url: "#" }
                ]
            }
        ]
    };
}

function displayResults() {
    // Show results container
    resultsContainer.style.display = 'block';
    
    // Populate strengths
    const strengthsList = document.getElementById('strengthsList');
    strengthsList.innerHTML = '';
    assessmentResults.profile.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${strength}`;
        strengthsList.appendChild(li);
    });
    
    // Populate work style chart
    const workStyleChart = document.getElementById('workStyleChart');
    workStyleChart.innerHTML = '';
    Object.entries(assessmentResults.profile.workStyle).forEach(([key, value]) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${value}%`;
        bar.setAttribute('data-label', key.charAt(0).toUpperCase() + key.slice(1));
        workStyleChart.appendChild(bar);
    });
    
    // Populate interest tags
    const interestTags = document.getElementById('interestTags');
    interestTags.innerHTML = '';
    assessmentResults.profile.interests.forEach(interest => {
        const tag = document.createElement('span');
        tag.className = 'interest-tag';
        tag.textContent = interest;
        interestTags.appendChild(tag);
    });
    
    // Populate career paths
    const careerPaths = document.getElementById('careerPaths');
    careerPaths.innerHTML = '';
    assessmentResults.careerPaths.forEach(path => {
        const pathElement = document.createElement('div');
        pathElement.className = 'career-path';
        pathElement.innerHTML = `
            <div class="career-path-icon">
                <i class="${path.icon}"></i>
            </div>
            <div class="career-path-content">
                <h4>${path.title}</h4>
                <p>${path.description}</p>
                <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">
                    <span><i class="fas fa-dollar-sign"></i> ${path.salary}</span>
                    <span><i class="fas fa-trending-up"></i> ${path.growth}</span>
                </div>
            </div>
            <div class="career-path-match">${path.match}% match</div>
        `;
        careerPaths.appendChild(pathElement);
    });
    
    // Populate learning path
    const learningPath = document.getElementById('learningPath');
    learningPath.innerHTML = '';
    assessmentResults.learningPath.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'learning-step';
        
        const resourcesHTML = step.resources.map(resource => {
            const iconMap = {
                course: 'fas fa-play-circle',
                project: 'fas fa-code',
                mentorship: 'fas fa-user-friends'
            };
            return `<a href="${resource.url}" class="resource-link">
                <i class="${iconMap[resource.type]}"></i>
                ${resource.name}
            </a>`;
        }).join('');
        
        stepElement.innerHTML = `
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">
                    <i class="fas fa-clock"></i> Duration: ${step.duration}
                </p>
                <div class="step-resources">
                    ${resourcesHTML}
                </div>
            </div>
        `;
        learningPath.appendChild(stepElement);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Track results view
    trackEvent('Results Viewed', {
        topCareerPath: assessmentResults.careerPaths[0].title,
        matchScore: assessmentResults.profile.match,
        timestamp: new Date().toISOString()
    });
}

function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'My CareerPath Assessment Results',
            text: `I just discovered my ideal career path! My top match is ${assessmentResults.careerPaths[0].title} with a ${assessmentResults.careerPaths[0].match}% compatibility score.`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `I just discovered my ideal career path on CareerPath! My top match is ${assessmentResults.careerPaths[0].title} with a ${assessmentResults.careerPaths[0].match}% compatibility score. Check it out: ${window.location.href}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            showToast('Results copied to clipboard!', 'success');
        } else {
            showToast('Share feature not supported on this browser', 'info');
        }
    }
}

function showPaymentModal() {
    paymentModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.getElementById('phoneNumber').focus();
    }, 300);
}

function hidePaymentModal() {
    paymentModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('phoneNumber').value = '';
    document.getElementById('email').value = '';
}

function showFreeAccessModal() {
    freeAccessModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.getElementById('fullName').focus();
    }, 300);
}

function hideFreeAccessModal() {
    freeAccessModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('fullName').value = '';
    document.getElementById('freeAccessEmail').value = '';
    document.getElementById('school').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('agreeTerms').checked = false;
}

function handlePayment() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Validate inputs
    if (!phoneNumber || !email) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    // Simulate payment processing
    const paymentBtn = document.getElementById('processPayment');
    const originalText = paymentBtn.innerHTML;
    
    paymentBtn.innerHTML = '<div class="spinner"></div> Processing...';
    paymentBtn.disabled = true;

    // Simulate Nkwa Pay integration
    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            hidePaymentModal();
            showToast('Payment successful! Your Premium Career Report is being generated...', 'success');
            
            // Simulate premium report generation
            setTimeout(() => {
                showToast('Premium report ready! Check your email for the download link.', 'success');
            }, 3000);
        } else {
            showToast('Payment failed. Please try again.', 'error');
        }
        
        paymentBtn.innerHTML = originalText;
        paymentBtn.disabled = false;
    }, 3000);
}

function handleFreeAccessApplication() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('freeAccessEmail').value;
    const school = document.getElementById('school').value;
    const reason = document.getElementById('reason').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validate inputs
    if (!fullName || !email || !school || !reason) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showToast('Please agree to share a testimonial if you benefit from free access', 'error');
        return;
    }
    
    // Simulate application processing
    const submitBtn = document.getElementById('submitFreeAccess');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        hideFreeAccessModal();
        showToast('Application submitted successfully! We\'ll review it within 24 hours.', 'success');
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function setupTestimonialCarousel() {
    const container = document.getElementById('testimonialsContainer');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const testimonials = container.children;
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
        // Hide all testimonials
        Array.from(testimonials).forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'flex' : 'none';
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(prevIndex);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
    
    // Initialize
    showTestimonial(0);
}

function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon i');
                otherAnswer.style.display = 'none';
                otherIcon.style.transform = 'rotate(0deg)';
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

function showToast(message, type = 'info') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toastIcon.className = `toast-icon ${icons[type]}`;
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    // Auto hide after 4 seconds
    setTimeout(hideToast, 4000);
}

function hideToast() {
    toast.classList.remove('show');
}

function handleKeyboardShortcuts(e) {
    // Escape to close modals
    if (e.key === 'Escape') {
        if (paymentModal.classList.contains('show')) {
            hidePaymentModal();
        }
        if (freeAccessModal.classList.contains('show')) {
            hideFreeAccessModal();
        }
        if (toast.classList.contains('show')) {
            hideToast();
        }
    }
    
    // Arrow keys for question navigation (when in assessment)
    if (questionContainer.style.display === 'block') {
        if (e.key === 'ArrowLeft' && !document.getElementById('prevQuestionBtn').disabled) {
            previousQuestion();
        }
        if (e.key === 'ArrowRight' && !document.getElementById('nextQuestionBtn').disabled) {
            nextQuestion();
        }
    }
}

// Analytics tracking (simulated)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    
    // In a real application, you would send this to your analytics service
    // Example: analytics.track(eventName, properties);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: var(--bg-primary);
            width: 100%;
            text-align: center;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger {
            display: flex;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .hero-stats {
            flex-direction: column;
            gap: 1rem;
        }
        
        .hero-actions {
            flex-direction: column;
        }
        
        .results-summary {
            grid-template-columns: 1fr;
        }
        
        .premium-container {
            grid-template-columns: 1fr;
        }
        
        .steps-container {
            flex-direction: column;
            gap: 2rem;
        }
        
        .step-arrow {
            transform: rotate(90deg);
        }
        
        .premium-features {
            grid-template-columns: 1fr;
        }
        
        .premium-pricing {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .testimonials-container {
            flex-direction: column;
        }
        
        .testimonial-card {
            min-width: auto;
        }
        
        .results-actions {
            flex-direction: column;
        }
    }
    
    @media (max-width: 480px) {
        .hero-title {
            font-size: 2rem;
        }
        
        .assessment-features {
            grid-template-columns: 1fr;
        }
        
        .question-card {
            padding: 1.5rem;
        }
        
        .results-container {
            padding: 2rem 1rem;
        }
        
        .modal {
            width: 95%;
            margin: 1rem;
        }
    }
`;
document.head.appendChild(style);

console.log('CareerPath Assessment initialized successfully!');
console.log('Built for Code4Change Hackathon - AI-powered career guidance for African students');