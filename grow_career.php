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



// Handle search and filters
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$work_schedule = isset($_GET['work_schedule']) ? $_GET['work_schedule'] : [];
$employment_type = isset($_GET['employment_type']) ? $_GET['employment_type'] : [];

// Build the SQL query with filters
$where = [];
$params = [];
$types = '';

if ($search) {
    $where[] = "(title LIKE ? OR company LIKE ? OR location LIKE ?)";
    $params = array_merge($params, ["%$search%", "%$search%", "%$search%"]);
    $types .= 'sss';
}

if (!empty($work_schedule)) {
    $placeholders = str_repeat('?,', count($work_schedule) - 1) . '?';
    $where[] = "work_schedule IN ($placeholders)";
    $params = array_merge($params, $work_schedule);
    $types .= str_repeat('s', count($work_schedule));
}

if (!empty($employment_type)) {
    $placeholders = str_repeat('?,', count($employment_type) - 1) . '?';
    $where[] = "employment_type IN ($placeholders)";
    $params = array_merge($params, $employment_type);
    $types .= str_repeat('s', count($employment_type));
}

$sql = "SELECT * FROM opportunities";
if (!empty($where)) {
    $sql .= " WHERE " . implode(' AND ', $where);
}
$sql .= " ORDER BY date_posted DESC";

$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$opportunities = $stmt->get_result();

// Count total jobs
$total_jobs = $opportunities->num_rows;

// Available filter options
$schedules = [ 'Part time', 'Internship', 'Project work', 'Volunteering'];
$types = ['On-Site', 'Remote', 'Shift work'];
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

        body{
            overflow: hidden;
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
                    <a href="./career_opp.php" class="nav-link ">Find Jobs</a>
                    <a href="./grow_career.php" class="nav-link active">Grow your Career</a>
                    <a href="#" class="nav-link">Learn a Skill</a>
                    <a href="./resume_builder.php" class="nav-link"> <i class="fas fa-lock"> </i>Resume Builder</a>
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
    <main class="main">
        <iframe src="./carrerPath/careerPath.html" frameborder="0"  style="width:100%; height:90vh; overflow:hidden;"></iframe>
    </main>

    
    <script src="https://kit.fontawesome.com/YOUR_FONT_AWESOME_KIT.js" crossorigin="anonymous"></script>
</body>
</html>