
<?php
include 'db.php';
session_start();

$user_id = $_SESSION['user_id'];
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$university = $_POST['university'];
$linkedin_url = $_POST['linkedin_url'];
$github_url = $_POST['github_url'];
$bio = $_POST['bio'];

// Handle profile picture upload if provided
if (!empty($_FILES['profile_pic']['name'])) {
    $pic_name = basename($_FILES['profile_pic']['name']);
    $target = "uploads/" . $pic_name;
    move_uploaded_file($_FILES['profile_pic']['tmp_name'], $target);
    $conn->query("UPDATE users SET profile_pic='$pic_name' WHERE id=$user_id");
}

// Update all profile fields
$stmt = $conn->prepare("UPDATE users SET full_name=?, email=?, phone=?, university=?, linkedin_url=?, github_url=?, bio=? WHERE id=?");
$stmt->bind_param("sssssssi", $full_name, $email, $phone, $university, $linkedin_url, $github_url, $bio, $user_id);
$stmt->execute();
$stmt->close();

// Show a message to prompt the user to complete their profile if any field is missing
if (empty($phone) || empty($university) || empty($linkedin_url) || empty($github_url) || empty($bio)) {
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>Profile Incomplete</title>
    </head>
    <body>
        <h2>Profile Updated</h2>
        <p>Your profile has been updated, but some information are still missing.</p>
        <p>Please complete all fields for a full profile experience.</p>
        <a href='profile.php'>Go back to Profile</a>
    </body>
    </html>";
    exit;
}

header("Location: profile.php");
exit;
?>