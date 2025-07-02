<?php
include 'db.php';
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
    <title>User Profile</title>
    <link rel="stylesheet" href="./css/ProfileStyles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <style>
        a{
            text-decoration:none;
            color:white;
        }
    </style>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-user-circle"></i>
                    <span>Clearn</span>
                </div>
                <nav class="nav">
                    <!-- <a href="#" class="nav-link">Dashboard</a>
                    <a href="#" class="nav-link">Settings</a> -->
                    <a href="#" class="nav-link">Logout</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Welcome Message -->
            <section class="welcome-section">
                <div class="welcome-card">
                    <div class="welcome-content">
                        <h1 class="welcome-title" id="welcomeMessage">Welcome back, <?php echo htmlspecialchars($user['full_name']); ?></h1>
                        <p class="welcome-subtitle">Ready to explore new opportunities?</p>
                    </div>
                    <div class="welcome-decoration">
                        <a href="./career_opp.php"><i class="fas fa-rocket"></i></a>
                    </div>
                </div>
            </section>

            <!-- Profile Section -->
            <section class="profile-section">
                <div class="profile-container">
                    <!-- Profile Header -->
                    <div class="profile-header">
                        <div class="profile-image-container">
                            <img src="uploads/<?php echo htmlspecialchars($user['profile_pic']); ?>" alt="Profile Picture" style="width: 90px; height: 90px; border-radius:50%;">
                        </div>
                        <div class="profile-basic-info">
                            <h2 class="profile-name" id="profileName"><?php echo htmlspecialchars($user['full_name']); ?></h2>
                            <p class="profile-title">Student of <?php echo htmlspecialchars($user['university']); ?></p>
                            <!-- <div class="profile-status">
                                <span class="status-indicator active"></span>
                                <span class="status-text">Available for opportunities</span>
                            </div> -->
                        </div>
                        <div class="profile-actions">
                            <button class="btn btn-primary" id="editProfileBtn">
                                <i class="fas fa-edit"></i>
                                Edit Profile
                            </button>
                            <button class="btn btn-secondary" id="findOpportunitiesBtn">
                                <i class="fas fa-search"></i>
                               <a href="./career_opp.php"> Find Opportunities</a>
                            </button>
                        </div>
                    </div>

                    <!-- Profile Details -->
                    <div class="profile-details">
                        <div class="details-grid">
                            <!-- Contact Information -->
                            <div class="detail-card">
                                <div class="card-header">
                                    <h3 class="card-title">
                                        <i class="fas fa-address-card"></i>
                                        Contact Information
                                    </h3>
                                </div>
                                <div class="card-content">
                                    <div class="detail-item">
                                        <div class="detail-label">
                                            <i class="fas fa-envelope"></i>
                                            Email
                                        </div>
                                        <div class="detail-value" id="profileEmail"><?php echo htmlspecialchars($user['email']); ?></div>
                                    </div>
                                    <div class="detail-item">
                                        <div class="detail-label">
                                            <i class="fas fa-phone"></i>
                                            Phone
                                        </div>
                                        <div class="detail-value" id="profilePhone"><?php echo htmlspecialchars($user['phone']); ?></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Social Links -->
                            <div class="detail-card">
                                <div class="card-header">
                                    <h3 class="card-title">
                                        <i class="fas fa-share-alt"></i>
                                        Social Links
                                    </h3>
                                </div>
                                <div class="card-content">
                                    <div class="detail-item">
                                        <div class="detail-label">
                                            <i class="fab fa-linkedin"></i>
                                            LinkedIn
                                        </div>
                                        <div class="detail-value">
                                            <a href="#" class="social-link" id="profileLinkedIn" target="_blank">
                                                <?php echo htmlspecialchars($user['linkedin_url']); ?>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="detail-item">
                                        <div class="detail-label">
                                            <i class="fab fa-github"></i>
                                            GitHub
                                        </div>
                                        <div class="detail-value">
                                            <a href="#" class="social-link" id="profileGithub" target="_blank">
                                               <?php echo htmlspecialchars($user['github_url']); ?>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Bio Section -->
                            <div class="detail-card bio-card">
                                <div class="card-header">
                                    <h3 class="card-title">
                                        <i class="fas fa-user"></i>
                                        About Me
                                    </h3>
                                </div>
                                <div class="card-content">
                                    <p class="bio-text" id="profileBio">
                                        <?php echo htmlspecialchars($user['bio']); ?>
                                           
                                    </p>
                                </div>
                            </div>

                            <!-- Skills & Achievements
                            <div class="detail-card">
                                <div class="card-header">
                                    <h3 class="card-title">
                                        <i class="fas fa-trophy"></i>
                                        Skills & Achievements
                                    </h3>
                                </div>
                                <div class="card-content">
                                    <div class="skills-container">
                                        <span class="skill-tag">JavaScript</span>
                                        <span class="skill-tag">React</span>
                                        <span class="skill-tag">Node.js</span>
                                        <span class="skill-tag">Python</span>
                                        <span class="skill-tag">AWS</span>
                                        <span class="skill-tag">Docker</span>
                                    </div>
                                    <div class="achievements">
                                        <div class="achievement-item">
                                            <i class="fas fa-medal"></i>
                                            <span>AWS Certified Developer</span>
                                        </div>
                                        <div class="achievement-item">
                                            <i class="fas fa-star"></i>
                                            <span>Top Performer 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div> -->



                        </div>




                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Edit Profile Modal -->
    <div class="modal-overlay" id="editModalOverlay">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Edit Profile</h3>
                <button class="modal-close" id="modalClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="editProfileForm" class="edit-form">
                    <div class="form-group">
                        <label for="editName">Full Name</label>
                        <input type="text" id="editName" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editEmail">Email</label>
                        <input type="email" id="editEmail" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editPhone">Phone Number</label>
                        <input type="tel" id="editPhone" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editLinkedIn">LinkedIn Profile</label>
                        <input type="url" id="editLinkedIn" class="form-input" placeholder="https://linkedin.com/in/username">
                    </div>
                    
                    <div class="form-group">
                        <label for="editGithub">GitHub Profile</label>
                        <input type="url" id="editGithub" class="form-input" placeholder="https://github.com/username">
                    </div>
                    
                    <div class="form-group">
                        <label for="editBio">Bio</label>
                        <textarea id="editBio" class="form-input" rows="4" placeholder="Tell us about yourself..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="editImage">Profile Image</label>
                        <div class="image-upload-area">
                            <input type="file" id="editImage" accept="image/*" class="image-input">
                            <div class="upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload or drag and drop</p>
                                <span>JPG, PNG up to 5MB</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancelEdit">Cancel</button>
                <button type="submit" form="editProfileForm" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>

    <!-- Opportunities Modal -->
    <div class="modal-overlay" id="opportunitiesModalOverlay">
        <div class="modal large-modal">
            <div class="modal-header">
                <h3 class="modal-title">Find Opportunities</h3>
                <button class="modal-close" id="opportunitiesModalClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="opportunities-content">
                    <div class="search-section">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search for jobs, companies, or skills..." class="search-input">
                        </div>
                        <div class="filters">
                            <select class="filter-select">
                                <option>All Locations</option>
                                <option>Remote</option>
                                <option>New York</option>
                                <option>San Francisco</option>
                                <option>London</option>
                            </select>
                            <select class="filter-select">
                                <option>All Types</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="opportunities-list">
                        <div class="opportunity-card">
                            <div class="opportunity-header">
                                <div class="company-logo">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div class="opportunity-info">
                                    <h4 class="job-title">Senior Full Stack Developer</h4>
                                    <p class="company-name">TechCorp Inc.</p>
                                    <div class="job-meta">
                                        <span class="location"><i class="fas fa-map-marker-alt"></i> Remote</span>
                                        <span class="type"><i class="fas fa-clock"></i> Full-time</span>
                                        <span class="salary"><i class="fas fa-dollar-sign"></i> $80k - $120k</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm">Apply</button>
                            </div>
                        </div>
                        
                        
                        <div class="opportunity-card">
                            <div class="opportunity-header">
                                <div class="company-logo">
                                    <i class="fas fa-rocket"></i>
                                </div>
                                <div class="opportunity-info">
                                    <h4 class="job-title">Frontend Developer</h4>
                                    <p class="company-name">StartupXYZ</p>
                                    <div class="job-meta">
                                        <span class="location"><i class="fas fa-map-marker-alt"></i> San Francisco</span>
                                        <span class="type"><i class="fas fa-clock"></i> Full-time</span>
                                        <span class="salary"><i class="fas fa-dollar-sign"></i> $70k - $100k</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm">Apply</button>
                            </div>
                        </div>
                        
                        <div class="opportunity-card">
                            <div class="opportunity-header">
                                <div class="company-logo">
                                    <i class="fas fa-code"></i>
                                </div>
                                <div class="opportunity-info">
                                    <h4 class="job-title">React Developer</h4>
                                    <p class="company-name">DevStudio</p>
                                    <div class="job-meta">
                                        <span class="location"><i class="fas fa-map-marker-alt"></i> Remote</span>
                                        <span class="type"><i class="fas fa-clock"></i> Contract</span>
                                        <span class="salary"><i class="fas fa-dollar-sign"></i> $60/hour</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const modal = document.getElementById('editProfileModal');
  const btn = document.getElementById('editProfileBtn');
  const close = document.getElementById('closeModal');
  btn.onclick = () => { modal.style.display = 'flex'; };
  close.onclick = () => { modal.style.display = 'none'; };
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    </script>
</body>
</html>