CREATE TABLE opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    work_schedule ENUM( 'Part time', 'Internship', 'Project work', 'Volunteering') NOT NULL,
    employment_type ENUM('On-Site', 'Remote', 'Online') NOT NULL,
    level ENUM('Junior level', 'Middle level', 'Senior level') NOT NULL,
    pay_rate VARCHAR(50),
    date_posted DATE NOT NULL,
    logo_url VARCHAR(255),
    application_link VARCHAR(255),
    company_email VARCHAR(255)
);
