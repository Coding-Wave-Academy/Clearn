CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  profile_pic VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(20),
  university VARCHAR(100),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  bio TEXT
);