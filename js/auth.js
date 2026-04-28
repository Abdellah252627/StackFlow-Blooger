import { auth, googleProvider } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const loginNavBtn = document.getElementById('login-nav-btn');
    const closeBtn = document.querySelector('.close-modal');
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form-container');
    const googleLoginBtn = document.getElementById('google-login-btn');

    // 1. Modal Toggling
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', () => {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 2. Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById(`${target}-form`).classList.add('active');
        });
    });

    // 3. Google Login Logic
    googleLoginBtn.addEventListener('click', async () => {
        try {
            // Check if Firebase is configured (not using placeholders)
            if (auth.app.options.apiKey === "YOUR_API_KEY") {
                simulateLogin("Google User");
                return;
            }

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Logged in:", user.displayName);
            authModal.classList.remove('active');
            updateUIForLogin(user.displayName);
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("فشل تسجيل الدخول بواسطة جوجل: " + error.message);
        }
    });

    // 4. Auth State Observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateUIForLogin(user.displayName || user.email);
        } else {
            updateUIForLogout();
        }
    });

    // Helper: Update UI when logged in
    function updateUIForLogin(name) {
        if (loginNavBtn) {
            loginNavBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${name}`;
            loginNavBtn.classList.remove('login-trigger');
            loginNavBtn.removeEventListener('click', openModal); // Fix recursive binding if needed
        }
    }

    function updateUIForLogout() {
        if (loginNavBtn) {
            loginNavBtn.innerText = 'تسجيل الدخول';
        }
    }

    // Mock Login for Demonstration if keys are missing
    function simulateLogin(name) {
        console.log("Simulating login for demo purposes...");
        authModal.classList.remove('active');
        updateUIForLogin(name);
        alert("هذا عرض تجريبي! يرجى تهيئة Firebase في ملف firebase-config.js لاستخدام النظام الحقيقي.");
    }
});
