<?php
include 'db.php';

$full_name = $_POST['full_name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$confirm = $_POST['confirm_password'];

if ($_POST['password'] !== $confirm) {
    die("Passwords do not match");
}

$stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $full_name, $email, $password);
$stmt->execute();
$stmt->close();

header("Location: login.php");
?>