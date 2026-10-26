(function() {
    'use strict';

    // ---------- DOM elements ----------
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const toastMessage = document.getElementById('toastMessage');

    // ---------- Helpers ----------
    function showError(inputEl, errorEl, message) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
        inputEl.style.borderColor = '#d14545';
        inputEl.style.backgroundColor = '#fff8f8';
    }

    function clearError(inputEl, errorEl) {
        errorEl.classList.remove('show');
        inputEl.style.borderColor = '#dae6ed';
        inputEl.style.backgroundColor = '#fafdff';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    }

    // ---------- Live validation on blur ----------
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, emailError, 'Email address is required');
        } else if (!isValidEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else {
            clearError(emailInput, emailError);
        }
    });

    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email !== '' && isValidEmail(email)) {
            clearError(emailInput, emailError);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const pwd = passwordInput.value;
        if (pwd.length === 0) {
            showError(passwordInput, passwordError, 'Password is required');
        } else if (pwd.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        } else {
            clearError(passwordInput, passwordError);
        }
    });

    passwordInput.addEventListener('input', function() {
        const pwd = passwordInput.value;
        if (pwd.length >= 6) {
            clearError(passwordInput, passwordError);
        }
    });

    // ---------- Toggle password visibility ----------
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
            togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }
    });

    // ---------- Form submit ----------
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        toastMessage.classList.remove('show');
        toastMessage.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let isValid = true;

        // Validate email
        if (email === '') {
            showError(emailInput, emailError, 'Email address is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Validate password
        if (password.length === 0) {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        if (!isValid) {
            if (email === '' || !isValidEmail(email)) {
                emailInput.focus();
            } else if (password.length < 6) {
                passwordInput.focus();
            }
            return;
        }

        // Simulate successful login
        toastMessage.textContent = '✓ Login successful! (demo)';
        toastMessage.classList.add('show');

        // Reset eye icon if password was visible
        if (passwordInput.getAttribute('type') === 'text') {
            passwordInput.setAttribute('type', 'password');
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }

        setTimeout(() => {
            toastMessage.classList.remove('show');
        }, 3500);
    });

    // ---------- Forgot password demo ----------
    document.getElementById('forgotLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Demo: Password reset flow would open here.');
    });

    // ---------- Sign up demo ----------
    document.getElementById('signupLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Demo: Sign-up page would be loaded here.');
    });
})();