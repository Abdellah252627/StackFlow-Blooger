document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Removal
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        // Utility for XSS Prevention
        const sanitize = (str) => {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };

        // Dynamic Title Loading From Dashboard
        const savedTitle = localStorage.getItem('sf_blog_title');
        const savedDesc = localStorage.getItem('sf_blog_desc');
        const savedTemplate = localStorage.getItem('sf_blog_template');

        if (savedTitle) {
            const safeTitle = sanitize(savedTitle);
            document.querySelectorAll('.logo .gradient-text').forEach(el => el.innerText = safeTitle);
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) heroTitle.innerHTML = `اكتشف عالم <span class="gradient-text">${safeTitle}</span> بأسلوب مختلف`;
        }
        if (savedDesc) {
            const heroDesc = document.querySelector('.hero-description');
            if (heroDesc) heroDesc.innerText = sanitize(savedDesc);
        }
        if (savedTemplate) {
            document.body.className = ''; // Reset classes
            document.body.classList.add(savedTemplate);
        }

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // In a real app, I'd show a mobile-specific drawer
            // For now, let's just toggle a class or alert
            console.log('Mobile menu clicked');
            // navLinks.classList.toggle('active'); // Needs CSS support
        });
    }

    // 4. Filter Buttons Interaction
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Simple animation feedback
            const container = document.getElementById('posts-container');
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transition = 'opacity 0.5s ease';
            }, 200);
        });
    });

    // 5. Intersection Observer for Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal class to elements
    const revealElements = document.querySelectorAll('.post-card, .stat-card, .section-header, .newsletter-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Dynamic style for active reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 6. Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 7. Newsletter Form Submission Feedback
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Spam Check (Honeypot)
            const hp = newsletterForm.querySelector('input[name="hp_field"]').value;
            if (hp) {
                console.log("Spam detected!");
                return;
            }

            const email = newsletterForm.querySelector('input[type="email"]').value;
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'تم الاشتراك!';
            btn.style.background = '#27c93f';
            newsletterForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // 8. Dynamic Copyright Year
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        yearEl.innerHTML = `© ${currentYear} StackFlow Blogger. جميع الحقوق محفوظة.`;
    }
});
