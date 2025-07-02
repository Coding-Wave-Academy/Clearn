// Profile data
let profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Always eager to learn new technologies and tackle challenging problems. Looking for opportunities to contribute to innovative projects and grow professionally.',
    image: '/placeholder.svg?height=150&width=150'
};

// DOM Elements
const editProfileBtn = document.getElementById('editProfileBtn');
const findOpportunitiesBtn = document.getElementById('findOpportunitiesBtn');
const editModalOverlay = document.getElementById('editModalOverlay');
const opportunitiesModalOverlay = document.getElementById('opportunitiesModalOverlay');
const modalClose = document.getElementById('modalClose');
const opportunitiesModalClose = document.getElementById('opportunitiesModalClose');
const cancelEdit = document.getElementById('cancelEdit');
const editProfileForm = document.getElementById('editProfileForm');
const toast = document.getElementById('toast');

// Profile elements
const welcomeMessage = document.getElementById('welcomeMessage');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePhone = document.getElementById('profilePhone');
const profileLinkedIn = document.getElementById('profileLinkedIn');
const profileGithub = document.getElementById('profileGithub');
const profileBio = document.getElementById('profileBio');
const profileImage = document.getElementById('profileImage');

// Form elements
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPhone = document.getElementById('editPhone');
const editLinkedIn = document.getElementById('editLinkedIn');
const editGithub = document.getElementById('editGithub');
const editBio = document.getElementById('editBio');
const editImage = document.getElementById('editImage');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    updateProfileDisplay();
    setupImageUpload();
    setupOpportunitySearch();
}

function setupEventListeners() {
    // Modal controls
    editProfileBtn.addEventListener('click', showEditModal);
    // findOpportunitiesBtn.addEventListener('click', showOpportunitiesModal);
    modalClose.addEventListener('click', hideEditModal);
    opportunitiesModalClose.addEventListener('click', hideOpportunitiesModal);
    cancelEdit.addEventListener('click', hideEditModal);
    
    // Form submission
    editProfileForm.addEventListener('submit', handleProfileUpdate);
    
    // Close modals when clicking outside
    editModalOverlay.addEventListener('click', (e) => {
        if (e.target === editModalOverlay) hideEditModal();
    });
    
    opportunitiesModalOverlay.addEventListener('click', (e) => {
        if (e.target === opportunitiesModalOverlay) hideOpportunitiesModal();
    });
    
    // Profile image click
    profileImage.addEventListener('click', showEditModal);
    
    // Toast close
    document.querySelector('.toast-close').addEventListener('click', hideToast);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Opportunity apply buttons
    setupOpportunityButtons();
}

function updateProfileDisplay() {
    // Update welcome message
    const firstName = profileData.name.split(' ')[0];
    welcomeMessage.textContent = `Welcome back, ${firstName}!`;
    
    // Update profile information
    profileName.textContent = profileData.name;
    profileEmail.textContent = profileData.email;
    profilePhone.textContent = profileData.phone;
    profileBio.textContent = profileData.bio;
    profileImage.src = profileData.image;
    
    // Update social links
    profileLinkedIn.textContent = extractDomain(profileData.linkedin);
    profileLinkedIn.href = profileData.linkedin;
    profileGithub.textContent = extractDomain(profileData.github);
    profileGithub.href = profileData.github;
}

function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname + urlObj.pathname;
    } catch {
        return url;
    }
}

function showEditModal() {
    // Populate form with current data
    editName.value = profileData.name;
    editEmail.value = profileData.email;
    editPhone.value = profileData.phone;
    editLinkedIn.value = profileData.linkedin;
    editGithub.value = profileData.github;
    editBio.value = profileData.bio;
    
    // Show modal with animation
    editModalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => editName.focus(), 300);
}

function hideEditModal() {
    editModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset form
    editProfileForm.reset();
}

function showOpportunitiesModal() {
    opportunitiesModalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus search input
    setTimeout(() => {
        const searchInput = document.querySelector('.search-input');
        searchInput.focus();
    }, 300);
}

function hideOpportunitiesModal() {
    opportunitiesModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Update profile data
    profileData.name = editName.value.trim();
    profileData.email = editEmail.value.trim();
    profileData.phone = editPhone.value.trim();
    profileData.linkedin = editLinkedIn.value.trim();
    profileData.github = editGithub.value.trim();
    profileData.bio = editBio.value.trim();
    
    // Handle image upload
    const imageFile = editImage.files[0];
    if (imageFile) {
        handleImageUpload(imageFile);
    }
    
    // Update display
    updateProfileDisplay();
    
    // Hide modal
    hideEditModal();
    
    // Show success message
    showToast('Profile updated successfully!', 'success');
    
    // Add update animation
    addUpdateAnimation();
}

function validateForm() {
    const requiredFields = [
        { field: editName, name: 'Name' },
        { field: editEmail, name: 'Email' },
        { field: editPhone, name: 'Phone' }
    ];
    
    for (const { field, name } of requiredFields) {
        if (!field.value.trim()) {
            showToast(`${name} is required`, 'error');
            field.focus();
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail.value.trim())) {
        showToast('Please enter a valid email address', 'error');
        editEmail.focus();
        return false;
    }
    
    // Validate URLs
    const urlFields = [
        { field: editLinkedIn, name: 'LinkedIn' },
        { field: editGithub, name: 'GitHub' }
    ];
    
    for (const { field, name } of urlFields) {
        if (field.value.trim() && !isValidUrl(field.value.trim())) {
            showToast(`Please enter a valid ${name} URL`, 'error');
            field.focus();
            return false;
        }
    }
    
    return true;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

function setupImageUpload() {
    const imageUploadArea = document.querySelector('.image-upload-area');
    
    // Click to upload
    imageUploadArea.addEventListener('click', () => editImage.click());
    
    // Drag and drop
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = 'var(--primary-color)';
        imageUploadArea.style.background = 'var(--primary-light)';
    });
    
    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = 'var(--border-color)';
        imageUploadArea.style.background = 'var(--bg-secondary)';
    });
    
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = 'var(--border-color)';
        imageUploadArea.style.background = 'var(--bg-secondary)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            editImage.files = files;
            handleImagePreview(files[0]);
        }
    });
    
    // File input change
    editImage.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImagePreview(e.target.files[0]);
        }
    });
}

function handleImagePreview(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image size must be less than 5MB', 'error');
        return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        const uploadContent = document.querySelector('.upload-content');
        uploadContent.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <img src="${e.target.result}" alt="Preview" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 3px solid var(--primary-color);">
                <div>
                    <p style="color: var(--success-color); font-weight: 600;">✓ Image selected</p>
                    <span style="color: var(--text-muted); font-size: 0.875rem;">${file.name}</span>
                </div>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

function handleImageUpload(file) {
    // In a real application, you would upload to a server
    // For this demo, we'll use a local URL
    const reader = new FileReader();
    reader.onload = (e) => {
        profileData.image = e.target.result;
        profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function setupOpportunitySearch() {
    const searchInput = document.querySelector('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    
    opportunityCards.forEach(card => {
        const title = card.querySelector('.job-title').textContent.toLowerCase();
        const company = card.querySelector('.company-name').textContent.toLowerCase();
        
        if (title.includes(query) || company.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'slideInUp 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    const visibleCards = Array.from(opportunityCards).filter(card => card.style.display !== 'none');
    if (visibleCards.length === 0 && query.trim()) {
        showToast('No opportunities found matching your search', 'info');
    }
}

function handleFilter() {
    // In a real application, this would filter based on the selected values
    showToast('Filters applied successfully', 'info');
}

function setupOpportunityButtons() {
    const applyButtons = document.querySelectorAll('.opportunity-card .btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.opportunity-card');
            const jobTitle = card.querySelector('.job-title').textContent;
            const companyName = card.querySelector('.company-name').textContent;
            
            // Simulate application process
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Applied';
                button.style.background = 'var(--success-color)';
                showToast(`Application submitted for ${jobTitle} at ${companyName}`, 'success');
            }, 2000);
        });
    });
}

function addUpdateAnimation() {
    const profileSection = document.querySelector('.profile-section');
    profileSection.style.animation = 'none';
    profileSection.offsetHeight; // Trigger reflow
    profileSection.style.animation = 'slideInUp 0.6s ease';
}

function showToast(message, type = 'info') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toastIcon.className = `toast-icon ${icons[type]}`;
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    // Auto hide after 4 seconds
    setTimeout(hideToast, 4000);
}

function hideToast() {
    toast.classList.remove('show');
}

function handleKeyboardShortcuts(e) {
    // Escape to close modals
    if (e.key === 'Escape') {
        if (editModalOverlay.classList.contains('show')) {
            hideEditModal();
        }
        if (opportunitiesModalOverlay.classList.contains('show')) {
            hideOpportunitiesModal();
        }
        if (toast.classList.contains('show')) {
            hideToast();
        }
    }
    
    // Ctrl/Cmd + E to edit profile
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        showEditModal();
    }
    
    // Ctrl/Cmd + F to find opportunities
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        showOpportunitiesModal();
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to profile image
    profileImage.addEventListener('click', function() {
        this.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
    
    // Add typing effect to welcome message
    setTimeout(() => {
        const welcomeTitle = document.querySelector('.welcome-title');
        const text = welcomeTitle.textContent;
        welcomeTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                welcomeTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }, 500);
});

console.log('Profile page initialized successfully!');