// Portfolio data and rendering functions
let portfolioData = null;

// Load portfolio data
async function loadPortfolioData() {
  try {
    const response = await fetch("./data/sokpheng.json");
    portfolioData = await response.json();
    renderPortfolio();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

// Render header section
function renderHeader() {
  const header = document.getElementById("header");
  const { personal } = portfolioData;

  header.innerHTML = `
                <h1>Portfolio</h1>
                <p class="subtitle">${personal.title}</p>
                <div class="quote-section">
                    <span class="quote-text">"${personal.quote}"</span>
                </div>
            `;
}

// Render about section
function renderAbout() {
  const aboutSection = document.getElementById("about-section");
  const { about } = portfolioData;

  aboutSection.innerHTML = `
                <h2 class="section-title">About Me</h2>
                <div class="purpose-highlight">
                    ${about.purpose}
                </div>
                <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                    ${about.description}
                </p>
            `;
}

// Render stats section
function renderStats() {
  const statsSection = document.getElementById("stats-section");
  const { stats } = portfolioData;

  const statsHTML = stats
    .map(
      (stat) => `
                <div class="stat-card">
                    <div class="stat-number">${stat.number}</div>
                    <div>${stat.label}</div>
                </div>
            `
    )
    .join("");

  statsSection.innerHTML = `
                <div class="stat-grid">
                    ${statsHTML}
                </div>
            `;
}

// Render certificates section
function renderCertificates() {
  const certificatesSection = document.getElementById("certificates-section");
  const { certificates } = portfolioData;

  const certificatesHTML = certificates
    .map((cert) => {
      const skillsHTML = cert.skills
        .map((skill) => `<span class="certificate-skill">${skill}</span>`)
        .join("");

      return `
                    <div class="certificate-card">
                        <div class="certificate-header">
                            <span class="certificate-icon">${cert.icon}</span>
                            <div>
                                <h3 class="certificate-name">${cert.name}</h3>
                            </div>
                        </div>
                        <div class="certificate-issuer">${cert.issuer}</div>
                        <div class="certificate-date">Obtained: ${cert.date}</div>
                        <p class="certificate-description">${cert.description}</p>
                        <div class="certificate-skills">
                            ${skillsHTML}
                        </div>
                    </div>
                `;
    })
    .join("");

  certificatesSection.innerHTML = `
                <h2 class="section-title">Certifications</h2>
                <div class="certificates-grid">
                    ${certificatesHTML}
                </div>
            `;
}

// Render achievements section
function renderAchievements() {
  const achievementsSection = document.getElementById("achievements-section");
  const { achievements } = portfolioData;

  const achievementsHTML = achievements
    .map((achievement) => {
      return `
                    <div class="achievement-card">
                        <div class="achievement-header">
                            <span class="achievement-icon">${achievement.icon}</span>
                            <div>
                                <h3 class="achievement-title">${achievement.title}</h3>
                            </div>
                        </div>
                        <div class="achievement-category">${achievement.category}</div>
                        <div class="achievement-date">${achievement.date}</div>
                        <p class="achievement-description">${achievement.description}</p>
                    </div>
                `;
    })
    .join("");

  achievementsSection.innerHTML = `
                <h2 class="section-title">Awards & Achievements</h2>
                <div class="achievements-grid">
                    ${achievementsHTML}
                </div>
            `;
}

// Render skills section
function renderSkills() {
  const skillsSection = document.getElementById("skills-section");
  const { skills } = portfolioData;

  const skillsHTML = skills
    .map((skill) => {
      const tagsHTML = skill.tags
        .map((tag) => `<span class="skill-tag">${tag}</span>`)
        .join("");

      return `
                    <div class="skill-category">
                        <h3>${skill.icon} ${skill.title}</h3>
                        <div class="skill-tags">
                            ${tagsHTML}
                        </div>
                        <p style="margin-top: 1rem; color: var(--text-primary); font-size: 0.9rem; line-height: 1.5;">
                            ${skill.description}
                        </p>
                    </div>
                `;
    })
    .join("");

  skillsSection.innerHTML = `
                <h2 class="section-title">Technical Skills</h2>
                <div class="skills-grid">
                    ${skillsHTML}
                </div>
            `;
}

// Render experience section
function renderExperience() {
  const experienceSection = document.getElementById("experience-section");
  const { experience } = portfolioData;

  const experienceHTML = experience
    .map((exp) => {
      const achievementsHTML = exp.achievements
        .map((achievement) => `<li>${achievement}</li>`)
        .join("");

      return `
                    <div class="experience-item">
                        <div class="experience-header">
                            <div>
                                <div class="job-title">${exp.title}</div>
                                <div class="company">${exp.company}</div>
                            </div>
                            <div class="date">${exp.period}</div>
                        </div>
                        <ul class="achievement-list">
                            ${achievementsHTML}
                        </ul>
                    </div>
                `;
    })
    .join("");

  experienceSection.innerHTML = `
                <h2 class="section-title">Work Experience</h2>
                ${experienceHTML}
            `;
}

// Render projects section
function renderProjects() {
  const projectsSection = document.getElementById("projects-section");
  const { projects } = portfolioData;

  const projectsHTML = projects
    .map((project) => {
      const techHTML = project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");

      return `
                    <div class="project-item">
                        <div class="project-header">
                            <div>
                                <div class="project-title">${project.title}</div>
                                <div class="project-type">${project.type}</div>
                            </div>
                            <div class="date">${project.role}</div>
                        </div>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${techHTML}
                        </div>
                    </div>
                `;
    })
    .join("");

  projectsSection.innerHTML = `
                <h2 class="section-title">Key Projects</h2>
                ${projectsHTML}
            `;
}

// Render contact section
function renderContact() {
  const contactSection = document.getElementById("contact-section");
  const { contact, personal } = portfolioData;

  const specializationsHTML = contact.specializations
    .map((spec) => `<div>• ${spec}</div>`)
    .join("");

  contactSection.innerHTML = `
                <h2 class="section-title">Get In Touch</h2>
                <div class="contact-section">
                    <h3>${contact.title}</h3>
                    <p>${contact.description}</p>
                    <div class="specializations">
                        <p>Specializations:</p>
                        <div class="specializations-grid">
                            ${specializationsHTML}
                        </div>
                    </div>
                    <a href="mailto:${personal.email}?subject=Professional Inquiry&body=Hello, I would like to discuss..." class="btn">
                        📧 Contact Me via Email
                    </a>
                </div>
            `;
}

// Render entire portfolio
function renderPortfolio() {
  if (!portfolioData) return;

  renderHeader();
  renderAbout();
  renderStats();
  renderCertificates();
  renderAchievements(); // Add this line
  renderSkills();
  renderExperience();
  renderProjects();
  renderContact();

  // Update page title
  document.title = `${portfolioData.personal.name} - ${portfolioData.personal.title}`;

  // Initialize animations after rendering
  initializeAnimations();
}

// Initialize scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Apply animation to all sections
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = body.getAttribute("data-theme");

  if (currentTheme === "light") {
    body.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("theme-icon");

  if (savedTheme === "light") {
    document.body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }

  // Load and render portfolio data
  loadPortfolioData();

  // Smooth scrolling for navigation links
  document.addEventListener("click", function (e) {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});
