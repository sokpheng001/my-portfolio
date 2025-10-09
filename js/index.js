console.log(`I believe we need more practical demonstrations alongside theory.
Security isn't just about awareness - it's about understanding attacker techniques. 
The best way to learn defense is to understand offense.
--
The site will include:
- How the attack works (theory)
- How to execute it (demo)
- How to defend against it (practical fix)
Not for ego. Not for followers. 
==> Comming Soon...`);

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

// Render hero section
function renderHero() {
  const heroContent = document.getElementById("hero-content");
  const headerLogo = document.getElementById("header-logo");
  const { personal } = portfolioData;

  headerLogo.textContent = "Portfolio";

  heroContent.innerHTML = `
                <h1>${personal.name}</h1>
                <p class="subtitle">${personal.title}</p>
                <div class="quote">"${personal.quote}"</div>
            `;
}

// Render about section
function renderAbout() {
  const aboutSection = document.getElementById("about-section");
  const { about } = portfolioData;

  aboutSection.innerHTML = `
                <h2 class="section-title">About Me</h2>
                <div class="card">
                    <div class="card-description" style="font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
                        ${about.purpose}
                    </div>
                    <div class="card-description" style="font-size: 16px; line-height: 1.7;">
                        ${about.description}
                    </div>
                </div>
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
                    <div class="stat-label">${stat.label}</div>
                </div>
            `
    )
    .join("");

  statsSection.innerHTML = `
                <div class="stats-grid">
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
        .map((skill) => `<span class="tag primary">${skill}</span>`)
        .join("");

      return `
                    <div class="card">
                        <div class="card-header">
                            <div class="card-icon">${cert.icon}</div>
                            <div>
                                <div class="card-title">${cert.name}</div>
                                <div class="card-subtitle">${cert.issuer} • ${cert.date}</div>
                            </div>
                        </div>
                        <div class="card-description">${cert.description}</div>
                        <div class="tags">
                            ${skillsHTML}
                        </div>
                    </div>
                `;
    })
    .join("");

  certificatesSection.innerHTML = `
                <h2 class="section-title">Certifications</h2>
                <div class="cards-grid">
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
                    <div class="card">
                        <div class="card-header">
                            <div class="card-icon">${achievement.icon}</div>
                            <div>
                                <div class="card-title">${achievement.title}</div>
                                <div class="card-subtitle">${achievement.category} • ${achievement.date}</div>
                            </div>
                        </div>
                        <div class="card-description">${achievement.description}</div>
                    </div>
                `;
    })
    .join("");

  achievementsSection.innerHTML = `
                <h2 class="section-title">Awards & Achievements</h2>
                <div class="cards-grid">
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
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");

      return `
                    <div class="card">
                        <div class="card-header">
                            <div class="card-icon">${skill.icon}</div>
                            <div>
                                <div class="card-title">${skill.title}</div>
                            </div>
                        </div>
                        <div class="card-description">${skill.description}</div>
                        <div class="tags">
                            ${tagsHTML}
                        </div>
                    </div>
                `;
    })
    .join("");

  skillsSection.innerHTML = `
                <h2 class="section-title">Technical Skills</h2>
                <div class="cards-grid">
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
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${exp.title}</div>
                                <div class="timeline-company">${exp.company}</div>
                            </div>
                            <div class="timeline-date">${exp.period}</div>
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

// Projects pagination variables
let currentProjectsPage = 1;
let projectsPerPage = 4;
let allProjects = [];

// Render projects section with pagination
function renderProjects() {
  const projectsSection = document.getElementById("projects-section");
  const { projects } = portfolioData;
  allProjects = projects;

  const totalProjects = allProjects.length;
  const startIndex = (currentProjectsPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = allProjects.slice(0, endIndex);

  const projectsHTML = currentProjects
    .map((project, index) => {
      const techHTML = project.technologies
        .map((tech) => `<span class="tag">${tech}</span>`)
        .join("");

      const isNewProject = index >= startIndex;

      return `
                    <div class="timeline-item ${
                      isNewProject ? "fade-in" : ""
                    }" style="animation-delay: ${
        isNewProject ? (index - startIndex) * 0.1 : 0
      }s">
                        <div class="timeline-header">
                            <div>
                                <div class="timeline-title">${
                                  project.title
                                }</div>
                                <div class="timeline-company">${
                                  project.type
                                }</div>
                            </div>
                            <div class="timeline-date">${project.role}</div>
                        </div>
                        <div class="timeline-description">${
                          project.description
                        }</div>
                        <div class="tags">
                            ${techHTML}
                        </div>
                    </div>
                `;
    })
    .join("");

  const showingCount = Math.min(endIndex, totalProjects);
  const hasMore = showingCount < totalProjects;

  projectsSection.innerHTML = `
                <h2 class="section-title">Key Projects</h2>
                <div class="projects-stats">
                    Showing ${showingCount} of ${totalProjects} projects
                </div>
                <div class="projects-container">
                    <div id="projects-list">
                        ${projectsHTML}
                    </div>
                    <div class="project-controls">
                        ${
                          hasMore
                            ? `
                            <button class="btn btn-secondary" onclick="loadMoreProjects()">
                                Show More Projects (${
                                  totalProjects - showingCount
                                } remaining)
                            </button>
                        `
                            : ""
                        }
                        ${
                          currentProjectsPage > 1
                            ? `
                            <button class="btn btn-secondary" onclick="showLessProjects()" style="margin-left: 16px;">
                                Show Less
                            </button>
                        `
                            : ""
                        }
                    </div>
                </div>
            `;
}

// Load more projects function
function loadMoreProjects() {
  currentProjectsPage++;
  renderProjects();

  setTimeout(() => {
    const newProjects = document.querySelectorAll(".timeline-item.fade-in");
    if (newProjects.length > 0) {
      newProjects[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, 100);
}

// Show less projects function
function showLessProjects() {
  currentProjectsPage = 1;
  renderProjects();

  setTimeout(() => {
    document.getElementById("projects-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}

// Render contact section
function renderContact() {
  const contactSection = document.getElementById("contact-section");
  const { contact, personal } = portfolioData;

  const specializationsHTML = contact.specializations
    .map((spec) => `<div class="specialization-item">• ${spec}</div>`)
    .join("");

  contactSection.innerHTML = `
                <h2 class="section-title">Get In Touch</h2>
                <div class="contact-section">
                    <h3 class="contact-title">${contact.title}</h3>
                    <p class="contact-description">${contact.description}</p>
                    <div class="specializations-grid">
                        ${specializationsHTML}
                    </div>
                    <a href="mailto:${personal.email}?subject=Professional Inquiry&body=Hello, I would like to discuss..." class="btn btn-primary">
                        📧 Contact Me via Email
                    </a>
                </div>
            `;
}

// Render entire portfolio
function renderPortfolio() {
  currentProjectsPage = 1;
  if (!portfolioData) return;

  renderHero();
  renderAbout();
  renderStats();
  renderCertificates();
  renderAchievements();
  renderSkills();
  renderExperience();
  renderProjects();
  renderContact();

  document.title = `${portfolioData.personal.name} - ${portfolioData.personal.title}`;
  initializeAnimations();
}

// Initialize scroll animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    body.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("theme-icon");

  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }

  loadPortfolioData();
});
