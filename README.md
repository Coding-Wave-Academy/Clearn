# CLearn

**A platform to connect university students with part‑time jobs, internships, volunteer opportunities, and project work.**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

CLearn is a responsive PHP web application designed to help university and college students discover and apply for various opportunities—including part‑time jobs, internships, volunteering gigs, and project collaborations—based on their interests and skillsets.

The platform allows students to:

- Browse and filter listings by category, location, and deadlines.
- View detailed descriptions and requirements for each opportunity.
- Rate and review opportunities after participation.
- Receive personalized recommendations based on their profile and past interactions.

---

## Features

- **User Authentication**: Secure signup and login flows using PHP sessions.
- **Opportunity Search & Filters**: Dynamic searching by type, keyword, location, and date.
- **Recommendation Engine**: Suggests opportunities based on user ratings and preferences.
- **User Profiles**: Students and Opportunity Providers have customizable profiles.
- **Ratings & Reviews**: Post‑experience feedback to improve community trust.
- **Admin Dashboard**: Monitor listings, manage users, and moderate content.

---

## Tech Stack

- **Backend & Frontend**: PHP 8.x
- **Database**: MySQL / MariaDB
- **Templating**: Plain PHP with HTML/CSS
- **Styling**: Tailwind CSS (optional)
- **Authentication**: PHP Sessions
- **Deployment**:Apache(Xampp)

---

## Getting Started

### Prerequisites

- PHP 8.0 or newer with PDO extension
- MySQL or MariaDB server
- Composer (if using any PHP packages)
- Apache or Nginx web server
- git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CLEarn.git
   cd CLEarn
   ```

2. **Configure the database**
   - Create a database (e.g., `clearn`).
   - Import the provided SQL schema:
     ```bash
     mysql -u your_user -p clearn < database/schema.sql
     ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the database credentials and any other settings.

4. **Install dependencies** (if applicable)
   ```bash
   composer install
   ```

5. **Configure your webserver**
   - Point your document root to the `public/` directory.
   - Ensure URL rewriting is enabled for clean URLs.

6. **Start the server**
   - With Apache/Nginx: Restart the service.
   - With PHP’s built-in server (for development):
     ```bash
     php -S localhost:8000 -t public
     ```

Visit `http://localhost:8000` (or your configured domain) to see the app in action.

---

## Usage

1. **Sign up** as a student or an opportunity provider.
2. **Complete your profile** with relevant skills and interests.
3. **Browse or search** for opportunities.
4. **Apply** directly through the platform or get redirected to the provider’s site.
5. **Rate** and **review** opportunities you’ve participated in.

---

## Roadmap

- [ ] Mobile-responsive enhancements
- [ ] Advanced AI‑driven Career PathFinder
- [ ] Integration with university career portals

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

Please ensure your contributions adhere to the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Project Maintainer**: Ribert Kandi Junior (kriskandi09@gmail.com)


Happy collaborating! 🎓🚀
