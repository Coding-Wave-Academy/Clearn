document.addEventListener('DOMContentLoaded', function() {
    const switchLink = document.getElementById('switch-link');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const nameGroup = document.getElementById('name-group');
    const submitBtn = document.getElementById('submit-btn');
    const formType = document.getElementById('form-type');
    const switchText = document.getElementById('switch-text');
    const authForm = document.getElementById('auth-form');
    
    let isSignUp = true;
    
    // Toggle between Sign Up and Sign In
    switchLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add switching animation
        document.querySelector('.form-content').classList.add('form-switching');
        
        setTimeout(() => {
            if (isSignUp) {
                // Switch to Sign In
                formTitle.textContent = 'Welcome Back';
                formSubtitle.textContent = 'Sign in to your account to continue';
                nameGroup.style.display = 'none';
                submitBtn.textContent = 'Sign In';
                formType.value = 'signin';
                switchText.textContent = "Don't have an account?";
                switchLink.textContent = 'Sign Up';
                document.getElementById('name').removeAttribute('required');
            } else {
                // Switch to Sign Up
                formTitle.textContent = 'Create Your Free Account';
                formSubtitle.textContent = 'Enjoy your 7 day free trial, start right now';
                nameGroup.style.display = 'block';
                submitBtn.textContent = 'Sign Up';
                formType.value = 'signup';
                switchText.textContent = 'Already have an account?';
                switchLink.textContent = 'Sign In';
                document.getElementById('name').setAttribute('required', '');
            }
            
            isSignUp = !isSignUp;
            
            // Remove switching animation
            document.querySelector('.form-content').classList.remove('form-switching');
            document.querySelector('.form-content').classList.add('form-switched');
            
            setTimeout(() => {
                document.querySelector('.form-content').classList.remove('form-switched');
            }, 300);
        }, 150);
    });
    
    // Form submission
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(authForm);
        const submitButton = document.getElementById('submit-btn');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        fetch('auth.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
    
    // Social login handlers
    document.querySelector('.google-btn').addEventListener('click', function() {
        alert('Google OAuth integration would be implemented here');
    });
    
    document.querySelector('.x-btn').addEventListener('click', function() {
        alert('X (Twitter) OAuth integration would be implemented here');
    });
    
    // Form validation
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'password' && value.length < 6) {
            showFieldError(field, 'Password must be at least 6 characters');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
    .form-group input.error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2 !important;
    }
    
    .error-message {
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);