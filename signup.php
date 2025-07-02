<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/signup_style.css">
    <title>Sign Up - Fuel Your Career with Clearn</title>
</head>
<body>

 <div class="container">
        <!-- Left Side - Form -->
        <div class="form-section">
            <div class="form-container">
                <div class="logo">
                    <h1>Clearn</h1>
                </div>
                
                <div class="form-content">
                    <h2 id="form-title">Create Your Free Account</h2>
                    <p id="form-subtitle">Enjoy your 7 day free trial, start right now</p>
                    
                    <!-- Form -->
                    <form id="auth-form" action="./signup_process.php" method="POST">
                       
                        
                        <div class="form-group">
                           <input type="text" name="full_name" placeholder="Full Name" required>
                      </div>
                      <div class="form-group">
                     <input type="email" name="email" placeholder="Email" required>
                      </div>
                       <div class="form-group">
                        <input type="password" name="password" placeholder="Password" required>
                      </div>
                       <div class="form-group">
                        <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                      </div>
                       <div class="form-group">
                        <button type="submit" id="submit-btn" class="submit-btn">Sign Up</button>
                      </div>
                       
                        
                  </form>
                    
                    <p class="switch-form">
                        <span id="switch-text">Already have an account?</span>
                        <a href="./login.php">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Right Side - Illustration -->
        <div class="illustration-section">
            <div class="illustration-content">
                <div class="illustration-image">
                    <!-- <img src="./images/ssss.png" alt="AI Mirror Illustration"> -->
                </div>
                <div class="illustration-text">
                    <p class="tagline">Connect Learn Earn</p>
                    <h3>Currated Opportunities made for students</h3>
                </div>
            </div>
        </div>
    </div>
    
    
</body>
<script src="./js/signup_script.js"></script>
</html>