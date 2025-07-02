<?php

require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $company = $_POST['company'];
    $description = $_POST['description'];
    $location = $_POST['location'];
    $work_schedule = $_POST['work_schedule'];
    $employment_type = $_POST['employment_type'];
    $level = $_POST['level'];
    $pay_rate = $_POST['pay_rate'];
    $date_posted = date('Y-m-d');
    $company_email = $_POST['company_email'];

    // Handle logo upload
    $logo_url = null;
    if (!empty($_FILES['logo']['name'])) {
        $logo_name = uniqid() . '_' . basename($_FILES['logo']['name']);
        $target = "logouploads/" . $logo_name;
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $target)) {
            $logo_url = $target;
        }
    }

    // Generate Gmail mailto link as application_link
    $subject = rawurlencode("Application for $title at $company for $work_schedule");
    $body = rawurlencode("Dear $company,\n\nI am interested in applying for the $title position as advertised.\n\nBest regards,\n[Your Name]");
    $application_link = "https://mail.google.com/mail/?view=cm&fs=1&to=$company_email&su=$subject&body=$body";

    $stmt = $conn->prepare("INSERT INTO opportunities (title, company, description, location, work_schedule, employment_type, level, pay_rate, date_posted, logo_url, application_link, company_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss", $title, $company, $description, $location, $work_schedule, $employment_type, $level, $pay_rate, $date_posted, $logo_url, $application_link, $company_email);
    $stmt->execute();

    header("Location: opportunities.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Upload Opportunity</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <h2>Upload a New Opportunity</h2>
    <form method="POST" action="" enctype="multipart/form-data">
        <div class="mb-3"><input type="text" name="title" class="form-control" placeholder="Job Title" required></div>
        <div class="mb-3"><input type="text" name="company" class="form-control" placeholder="Company Name" required></div>
        <div class="mb-3"><input type="email" name="company_email" class="form-control" placeholder="Company Email" required></div>
        <div class="mb-3"><textarea name="description" class="form-control" placeholder="Job Description" required></textarea></div>
        <div class="mb-3"><input type="text" name="location" class="form-control" placeholder="Location" required></div>
        <div class="mb-3"><input type="text" name="work_schedule" class="form-control" placeholder="Work Schedule" required></div>
        <div class="mb-3"><input type="text" name="employment_type" class="form-control" placeholder="Employment Type" required></div>
        <div class="mb-3"><input type="text" name="level" class="form-control" placeholder="Level" required></div>
        <div class="mb-3"><input type="text" name="pay_rate" class="form-control" placeholder="Pay Rate" required></div>
        <div class="mb-3">
            <label for="logo" class="form-label">Company Logo</label>
            <input type="file" name="logo" id="logo" class="form-control" accept="image/*" required>
        </div>
        <button type="submit" class="btn btn-success">Upload</button>
    </form>
</div>
</body>
</html>