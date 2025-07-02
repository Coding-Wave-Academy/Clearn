// Form validation and interaction
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Real-time validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    
    // Form submission
    loginForm.addEventListener('submit', handleSubmit);
});

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    }
    //  else if (password.length >= 5) {
    //     passwordError.textContent = 'Password must be at least 6 characters';
    //     return false;
    // }
     else {
        passwordError.textContent = '';
        return true;
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous messages
    document.getElementById('generalError').textContent = '';
    document.getElementById('successMessage').textContent = '';
    
    // Validate form
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    // Show loading state
    showLoading(true);
    
    // Create FormData object
    const formData = new FormData(document.getElementById('loginForm'));
    
    // Send AJAX request
    fetch('../login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showLoading(false);
        
        if (data.success) {
            document.getElementById('successMessage').textContent = data.message;
            // Redirect after successful login
            setTimeout(() => {
                window.location.href = data.redirect || 'dashboard.html';
            }, 1500);
        } else {
            document.getElementById('generalError').textContent = data.message;
        }
    })
    .catch(error => {
        showLoading(false);
        document.getElementById('generalError').textContent = 'An error occurred. Please try again.';
        console.error('Error:', error);
    });
}

function showLoading(isLoading) {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    if (isLoading) {
        loginBtn.disabled = true;
        btnText.textContent = 'Signing In...';
        loadingSpinner.style.display = 'inline-block';
    } else {
        loginBtn.disabled = false;
        btnText.textContent = 'Sign In';
        loadingSpinner.style.display = 'none';
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});