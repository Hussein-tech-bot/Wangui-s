// Toggle mobile menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    menuLinks.classList.toggle('active');
}

// Load data from localStorage
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = '<p class="no-items">No projects yet. Add one to showcase your work!</p>';
        return;
    }
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p class="description">${project.description}</p>
            ${project.tech ? `<p class="tech"><strong>Tech:</strong> ${project.tech}</p>` : ''}
            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
            <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
        `;
        container.appendChild(projectCard);
    });
}

function loadExperiences() {
    const experiences = JSON.parse(localStorage.getItem('experiences')) || [];
    const container = document.getElementById('experiences-container');
    container.innerHTML = '';
    
    if (experiences.length === 0) {
        container.innerHTML = '<p class="no-items">No experiences yet. Add one to showcase your career!</p>';
        return;
    }
    
    experiences.forEach((exp, index) => {
        const expCard = document.createElement('div');
        expCard.className = 'experience-card';
        expCard.innerHTML = `
            <div class="exp-header">
                <h3>${exp.title}</h3>
                <span class="company">${exp.company}</span>
            </div>
            <p class="duration">${exp.duration}</p>
            <p class="description">${exp.description}</p>
            <button class="delete-btn" onclick="deleteExperience(${index})">Delete</button>
        `;
        container.appendChild(expCard);
    });
}

// Modal functions for projects
function openProjectModal() {
    document.getElementById('project-modal').style.display = 'block';
}

function closeProjectModal() {
    document.getElementById('project-modal').style.display = 'none';
}

// Modal functions for experiences
function openExperienceModal() {
    document.getElementById('experience-modal').style.display = 'block';
}

function closeExperienceModal() {
    document.getElementById('experience-modal').style.display = 'none';
}

// Handle project form submission
document.addEventListener('DOMContentLoaded', function() {
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const project = {
                title: document.getElementById('project-title').value,
                description: document.getElementById('project-description').value,
                tech: document.getElementById('project-tech').value,
                link: document.getElementById('project-link').value
            };
            
            let projects = JSON.parse(localStorage.getItem('projects')) || [];
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
            
            projectForm.reset();
            closeProjectModal();
            loadProjects();
        });
    }
    
    // Handle experience form submission
    const experienceForm = document.getElementById('experience-form');
    if (experienceForm) {
        experienceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const experience = {
                title: document.getElementById('exp-title').value,
                company: document.getElementById('exp-company').value,
                duration: document.getElementById('exp-duration').value,
                description: document.getElementById('exp-description').value
            };
            
            let experiences = JSON.parse(localStorage.getItem('experiences')) || [];
            experiences.push(experience);
            localStorage.setItem('experiences', JSON.stringify(experiences));
            
            experienceForm.reset();
            closeExperienceModal();
            loadExperiences();
        });
    }
    
    // Add event listeners to buttons
    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', openProjectModal);
    }
    
    const addExperienceBtn = document.getElementById('add-experience-btn');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', openExperienceModal);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const projectModal = document.getElementById('project-modal');
        const experienceModal = document.getElementById('experience-modal');
        if (event.target === projectModal) {
            closeProjectModal();
        }
        if (event.target === experienceModal) {
            closeExperienceModal();
        }
    });
    
    // Load initial data
    loadProjects();
    loadExperiences();
});

// Delete project
function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
}

// Delete experience
function deleteExperience(index) {
    const experiences = JSON.parse(localStorage.getItem('experiences')) || [];
    experiences.splice(index, 1);
    localStorage.setItem('experiences', JSON.stringify(experiences));
    loadExperiences();
}