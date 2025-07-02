<?php

require 'db.php';
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];
$result = $conn->query("SELECT * FROM users WHERE id=$user_id");
$user = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clearn Career Opportunities</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        /* CSS Modal Styles */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        .modal-content {
            position: fixed; /* Changed to fixed */
            top: 50%; /* Position in the middle vertically */
            left: 50%; /* Position in the middle horizontally */
            transform: translate(-50%, -50%); /* Center the modal */
            background-color: #fefefe;
            padding: 20px;
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            animation-name: animatetop;
            animation-duration: 0.4s
        }

        input::placeholder{
            color:white;
            opacity: 0.5;;
        }
        input:focus::placeholder{
            color:cyan;
            opacity: 0.752212;
        }

        /* Add Animation */
        @keyframes animatetop {
            from {top:-300px; opacity:0}
            to {top:0; opacity:1}
        }

        /* The Close Button */
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        /* Main Content Background */
        main.main-content {
            background-color: #fff;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <span>Clearn</span>
                </div>
                <nav class="nav">
                    <a href="./career_opp.php" class="nav-link ">Find Opportunities</a>
                    <a href="./grow_career.php" class="nav-link ">Grow your Career</a>
                    <a href="#" class="nav-link">Learn a Skill</a>
                    <a href="./resume_builder.php" class="nav-link active">Resume Builder</a>
                </nav>
                <div class="user-menu">
                        <div class="user-avatar">
                            <img src="uploads/<?php echo htmlspecialchars($user['profile_pic']); ?>" alt="Profile Picture" style="width: 50px; height: 50px;">

                        </div>
                        <div class="user-dropdown">
                            <a href="./profile.php" >Profile</a>
                            
                            <a href="#">Logout</a>
                        </div>
    </div>
            </div>
            
        </div>
        
    </header>

    

    <!-- Main Content -->
    <main class="main-content">
        <iframe src="./resume-builder.html" frameborder="0" width="100%" style="height:100vh;"></iframe>
    </main>

    
    <script src="https://kit.fontawesome.com/YOUR_FONT_AWESOME_KIT.js" crossorigin="anonymous"></script>
</body>
</html>