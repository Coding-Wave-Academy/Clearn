<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Login - Secure Access</title>
    <link rel="stylesheet" href="./css/login_styles.css">
    <script src="./js/login_script.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <title>Document</title>
</head>
<body>
    


<div class="container">
        <div class="login-form">
            <div class="form-header">
                <i class="fas fa-user-circle"></i>
                <h2>Welcome Back</h2>
                <p>Please sign in to your account</p>
            </div>
            
            <form id="loginForm" action="./login_process.php" method="POST">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-group">
                       <input type="email" name="email" placeholder="Email" required> 
                  </div>
                    <span class="error-message" id="emailError"></span>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-group">
                        <input type="password" name="password" placeholder="Password" required>
                    <button type="button" class="toggle-password" onclick="togglePassword()">
                            <i class="fas fa-eye" id="toggleIcon"></i>
                        </button>
                    </div>
                    <span class="error-message" id="passwordError"></span>
                </div>
                
                <div class="form-options">
                    <label class="checkbox-container">
                        
                        <span class="checkmark"></span>
                       
                    </label>
                    <a href="forgot-password.html" class="forgot-link">Forgot Password?</a>
                </div>

                <button type="submit" class="login-btn" id="loginBtn">Sign In</button>
                
               
                
                <div class="error-message" id="generalError"></div>
                <div class="success-message" id="successMessage"></div>
            </form>
            
            <div class="form-footer">
                <p>Don't have an account? <a href="./signup.php">Sign up here</a></p>
            </div>
        </div>
    </div>
    
</body>
</html>