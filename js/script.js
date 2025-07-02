// Sample job data
const jobsData = [
    {
        id: 1,
        title: "Senior UI/UX Designer",
        company: "Amazon",
        logo: "https://logo.clearbit.com/amazon.com",
        location: "San Francisco, CA",
        salary: "$250/hr",
        date: "20 May, 2023",
        tags: ["Part time", "Senior level", "Distant"],
        type: "part_time",
        experience: "senior",
        description: "We are looking for a Senior UI/UX Designer to join our team and help create amazing user experiences for our products.",
        requirements: ["5+ years of UI/UX design experience", "Proficiency in Figma and Adobe Creative Suite", "Strong portfolio showcasing design process", "Experience with user research and testing"]
    },
    {
        id: 2,
        title: "Junior UI/UX Designer",
        company: "Google",
        logo: "https://logo.clearbit.com/google.com",
        location: "California, CA",
        salary: "$150/hr",
        date: "4 Feb, 2023",
        tags: ["Full time", "Junior level", "Distant"],
        type: "full_time",
        experience: "junior",
        description: "Join our design team as a Junior UI/UX Designer and work on products used by millions of people worldwide.",
        requirements: ["1-3 years of design experience", "Knowledge of design principles", "Figma proficiency", "Bachelor's degree in Design or related field"]
    },
    {
        id: 3,
        title: "Senior Motion Designer",
        company: "Dribbble",
        logo: "https://logo.clearbit.com/dribbble.com",
        location: "New York, NY",
        salary: "$260/hr",
        date: "29 Jan, 2023",
        tags: ["Part time", "Senior level", "Full Day"],
        type: "part_time",
        experience: "senior",
        description: "Create amazing motion graphics and animations for our brand and marketing campaigns.",
        requirements: ["Expert level After Effects skills", "3D animation experience", "Strong storytelling abilities", "Portfolio of motion work"]
    },
    {
        id: 4,
        title: "UX Designer",
        company: "Twitter",
        logo: "https://logo.clearbit.com/twitter.com",
        location: "California, CA",
        salary: "$120/hr",
        date: "11 Apr, 2023",
        tags: ["Full time", "Middle level", "Distant"],
        type: "full_time",
        experience: "mid",
        description: "Design user experiences for our social platform and help shape the future of social media.",
        requirements: ["3-5 years UX design experience", "User research skills", "Prototyping expertise", "Social media platform experience"]
    },
    {
        id: 5,
        title: "Graphic Designer",
        company: "Airbnb",
        logo: "https://logo.clearbit.com/airbnb.com",
        location: "New York, NY",
        salary: "$300/hr",
        date: "2 Apr, 2023",
        tags: ["Part time", "Senior level"],
        type: "part_time",
        experience: "senior",
        description: "Create visual designs for our brand and marketing materials across various channels.",
        requirements: ["Strong visual design skills", "Brand design experience", "Print and digital design", "Creative campaign development"]
    },
    {
        id: 6,
        title: "Graphic Designer",
        company: "Apple",
        logo: "https://logo.clearbit.com/apple.com",
        location: "San Francisco, CA",
        salary: "$140/hr",
        date: "18 Jan, 2023",
        tags: ["Part time", "Distant"],
        type: "part_time",
        experience: "mid",
        description: "Join Apple's design team and work on visual designs for our products and marketing.",
        requirements: ["Strong portfolio", "Adobe Creative Suite mastery", "Attention to detail", "Brand consistency focus"]
    }
];

// Global variables
let filteredJobs = [...jobsData];
let currentPage = 1;
const jobsPerPage = 6;
let savedJobs = new Set();

// DOM elements
const jobsGrid = document.getElementById('jobsGrid');
const jobCount = document.getElementById('jobCount');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const experienceFilter = document.getElementById('experienceFilter');
const sortSelect = document.getElementById('sortSelect');
const sortToggle = document.getElementById('sortToggle');
const salaryMin = document.getElementById('salaryMin');
const salaryMax = document.getElementById('salaryMax');
const salaryDisplay = document.getElementById('salaryDisplay');
const jobModal = document.getElementById('jobModal');
const modalClose = document.getElementById('modalClose');
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderJobs();
    initializeFilters();
    initializeSalaryRange();
    initializeEventListeners();
    initializeAnimations();
}

// Render jobs
function renderJobs() {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);
    
    jobsGrid.innerHTML = '';
    
    if (jobsToShow.length === 0) {
        jobsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button onclick="clearAllFilters()" class="btn btn-primary" style="margin-top: 1rem;">
                    Clear All Filters
                </button>
            </div>
        `;
    } else {
        jobsToShow.forEach((job, index) => {
            const jobCard = createJobCard(job);
            jobsGrid.appendChild(jobCard);
            
            // Add animation delay
            setTimeout(() => {
                jobCard.classList.add('fade-in-up');
            }, index * 100);
        });
    }
    
    updateJobCount();
    updatePagination();
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.dataset.jobId = job.id;
    
    const isSaved = savedJobs.has(job.id);
    
    card.innerHTML = `
        <div class="job-header">
            <div class="job-date">${job.date}</div>
            <button class="save-job ${isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
            </button>
        </div>
        
        <div class="job-content">
            <div class="company-info">
                <div class="company-logo">
                    <img src="${job.logo}" alt="${job.company}" onerror="this.src='/placeholder.svg?height=40&width=40'">
                </div>
                <div class="company-name">${job.company}</div>
            </div>
            
            <h3 class="job-title">${job.title}</h3>
            
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag tag-${tag.toLowerCase().replace(' ', '-')}">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="job-footer">
            <div class="job-salary">${job.salary}</div>
            <div class="job-location">${job.location}</div>
            <button class="btn-details" onclick="openJobModal(${job.id})">
                Details
            </button>
        </div>
    `;
    
    // Add click event for save button
    const saveBtn = card.querySelector('.save-job');
    saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSaveJob(job.id);
    });
    
    // Add click event for card
    card.addEventListener('click', () => {
        openJobModal(job.id);
    });
    
    return card;
}

// Filter functions
function initializeFilters() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            console.log('Checkbox changed:', checkbox.name, checkbox.value, checkbox.checked);
            applyFilters();
        });
    });
    
    categoryFilter.addEventListener('change', () => {
        console.log('Category filter changed:', categoryFilter.value);
        applyFilters();
    });
    locationFilter.addEventListener('change', () => {
        console.log('Location filter changed:', locationFilter.value);
        applyFilters();
    });
    experienceFilter.addEventListener('change', () => {
        console.log('Experience filter changed:', experienceFilter.value);
        applyFilters();
    });
}

// COMPLETELY REWRITTEN: Simple and clear filter logic
function applyFilters() {
    console.log('=== Applying Filters ===');
    
    filteredJobs = jobsData.filter(job => {
        // Category filter (dropdown)
        const categoryValue = categoryFilter.value;
        if (categoryValue) {
            const categoryMatch = job.title.toLowerCase().includes(categoryValue.replace('-', ' '));
            if (!categoryMatch) {
                console.log(`Job ${job.id} filtered out by category`);
                return false;
            }
        }
        
        // Location filter (dropdown)
        const locationValue = locationFilter.value;
        if (locationValue) {
            const locationMatch = job.location.toLowerCase().includes(locationValue.replace('-', ' '));
            if (!locationMatch) {
                console.log(`Job ${job.id} filtered out by location`);
                return false;
            }
        }
        
        // Experience filter (dropdown)
        const experienceValue = experienceFilter.value;
        if (experienceValue && job.experience !== experienceValue) {
            console.log(`Job ${job.id} filtered out by experience`);
            return false;
        }
        
        // Employment type filter (checkboxes)
        const checkedEmploymentTypes = [];
        document.querySelectorAll('input[name="employment_types"]:checked').forEach(cb => {
            checkedEmploymentTypes.push(cb.value);
        });
        
        console.log('Checked employment types:', checkedEmploymentTypes);
        console.log('Job type:', job.type);
        
        // If any employment type checkboxes are checked, job must match one of them
        if (checkedEmploymentTypes.length > 0) {
            if (!checkedEmploymentTypes.includes(job.type)) {
                console.log(`Job ${job.id} filtered out by employment type`);
                return false;
            }
        }
        
        // Work schedule filter (checkboxes) - currently not filtering since our data doesn't have this field
        const checkedWorkSchedules = [];
        document.querySelectorAll('input[name="work_schedules"]:checked').forEach(cb => {
            checkedWorkSchedules.push(cb.value);
        });
        
        // Salary range filter
        const minSalary = parseInt(salaryMin.value);
        const maxSalary = parseInt(salaryMax.value);
        const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        
        if (jobSalary < minSalary || jobSalary > maxSalary) {
            console.log(`Job ${job.id} filtered out by salary range`);
            return false;
        }
        
        console.log(`Job ${job.id} passed all filters`);
        return true;
    });
    
    console.log(`Filtered jobs count: ${filteredJobs.length}`);
    
    currentPage = 1;
    renderJobs();
    updateFilterCount();
}

function updateFilterCount() {
    let activeFilters = 0;
    
    // Count dropdown filters
    if (categoryFilter.value) activeFilters++;
    if (locationFilter.value) activeFilters++;
    if (experienceFilter.value) activeFilters++;
    
    // Count checkbox filters
    const checkedEmploymentTypes = document.querySelectorAll('input[name="employment_types"]:checked').length;
    const checkedWorkSchedules = document.querySelectorAll('input[name="work_schedules"]:checked').length;
    
    if (checkedEmploymentTypes > 0) activeFilters++;
    if (checkedWorkSchedules > 0) activeFilters++;
    
    // Check salary range
    const isDefaultSalaryRange = salaryMin.value == 1200 && salaryMax.value == 20000;
    if (!isDefaultSalaryRange) activeFilters++;
    
    document.querySelector('.filter-count').textContent = activeFilters;
}

// Clear all filters function
function clearAllFilters() {
    console.log('Clearing all filters');
    
    // Reset dropdowns
    categoryFilter.value = '';
    locationFilter.value = '';
    experienceFilter.value = '';
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset salary range
    salaryMin.value = 1200;
    salaryMax.value = 20000;
    
    // Update salary display
    salaryDisplay.textContent = '$1,200 - $20,000';
    
    // Apply filters (should show all jobs)
    applyFilters();
    
    showToast('All filters cleared');
}

// Make clearAllFilters globally available
window.clearAllFilters = clearAllFilters;

// Salary range
function initializeSalaryRange() {
    function updateSalaryDisplay() {
        const min = parseInt(salaryMin.value);
        const max = parseInt(salaryMax.value);
        
        // Ensure min doesn't exceed max
        if (min >= max) {
            salaryMin.value = max - 1000;
        }
        
        // Ensure max doesn't go below min
        if (max <= min) {
            salaryMax.value = min + 1000;
        }
        
        const finalMin = parseInt(salaryMin.value);
        const finalMax = parseInt(salaryMax.value);
        
        salaryDisplay.textContent = `$${finalMin.toLocaleString()} - $${finalMax.toLocaleString()}`;
        
        // Update slider track
        updateSliderTrack(finalMin, finalMax);
    }
    
    function updateSliderTrack(min, max) {
        const minPercent = ((min - 1000) / (50000 - 1000)) * 100;
        const maxPercent = ((max - 1000) / (50000 - 1000)) * 100;
        
        const track = document.querySelector('.range-slider');
        track.style.background = `linear-gradient(to right, 
            rgba(255,255,255,0.2) 0%, 
            rgba(255,255,255,0.2) ${minPercent}%, 
            #4fd1c7 ${minPercent}%, 
            #4fd1c7 ${maxPercent}%, 
            rgba(255,255,255,0.2) ${maxPercent}%, 
            rgba(255,255,255,0.2) 100%)`;
    }
    
    salaryMin.addEventListener('input', updateSalaryDisplay);
    salaryMax.addEventListener('input', updateSalaryDisplay);
    salaryMin.addEventListener('change', applyFilters);
    salaryMax.addEventListener('change', applyFilters);
    
    // Initialize
    updateSalaryDisplay();
}

// Sorting
function initializeSorting() {
    sortSelect.addEventListener('change', applySorting);
    sortToggle.addEventListener('click', toggleSortOrder);
}

function applySorting() {
    const sortBy = sortSelect.value;
    const isAscending = sortToggle.dataset.order === 'asc';
    
    filteredJobs.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
            case 'title':
                aValue = a.title.toLowerCase();
                bValue = b.title.toLowerCase();
                break;
            case 'company':
                aValue = a.company.toLowerCase();
                bValue = b.company.toLowerCase();
                break;
            case 'salary':
                aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
                bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
                break;
            case 'updated':
            default:
                aValue = new Date(a.date);
                bValue = new Date(b.date);
                break;
        }
        
        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
    });
    
    renderJobs();
}

function toggleSortOrder() {
    const currentOrder = sortToggle.dataset.order || 'desc';
    const newOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    sortToggle.dataset.order = newOrder;
    
    const icon = sortToggle.querySelector('i');
    icon.className = newOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
    
    applySorting();
}

// Job modal functions
function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    // Populate modal content
    document.getElementById('modalCompanyLogo').src = job.logo;
    document.getElementById('modalJobTitle').textContent = job.title;
    document.getElementById('modalCompanyName').textContent = job.company;
    document.getElementById('modalJobLocation').textContent = job.location;
    document.getElementById('modalJobSalary').textContent = job.salary;
    document.getElementById('modalJobDescription').textContent = job.description;
    
    // Populate tags
    const tagsContainer = document.getElementById('modalJobTags');
    tagsContainer.innerHTML = job.tags.map(tag => 
        `<span class="tag tag-${tag.toLowerCase().replace(' ', '-')}">${tag}</span>`
    ).join('');
    
    // Populate requirements
    const requirementsContainer = document.getElementById('modalJobRequirements');
    requirementsContainer.innerHTML = job.requirements.map(req => `<li>${req}</li>`).join('');
    
    // Update save button
    const saveBtn = document.getElementById('saveJobBtn');
    const isSaved = savedJobs.has(jobId);
    saveBtn.innerHTML = `
        <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
        ${isSaved ? 'Saved' : 'Save Job'}
    `;
    saveBtn.onclick = () => toggleSaveJob(jobId);
    
    // Update apply button
    document.getElementById('applyJobBtn').onclick = () => applyForJob(jobId);
    
    // Show modal
    jobModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for this modal instance
    setupModalEventListeners();
}

function closeJobModal() {
    jobModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Remove event listeners to prevent memory leaks
    removeModalEventListeners();
}

// Modal event listener setup
function setupModalEventListeners() {
    // Remove any existing listeners first
    removeModalEventListeners();
    
    // Close button click
    const closeBtn = document.getElementById('modalClose');
    closeBtn.addEventListener('click', handleModalClose);
    
    // Click outside modal to close
    jobModal.addEventListener('click', handleModalOverlayClick);
    
    // Escape key to close
    document.addEventListener('keydown', handleModalEscape);
}

function removeModalEventListeners() {
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) {
        closeBtn.removeEventListener('click', handleModalClose);
    }
    
    jobModal.removeEventListener('click', handleModalOverlayClick);
    document.removeEventListener('keydown', handleModalEscape);
}

// Event handler functions
function handleModalClose(e) {
    e.preventDefault();
    e.stopPropagation();
    closeJobModal();
}

function handleModalOverlayClick(e) {
    if (e.target === jobModal) {
        closeJobModal();
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape' && jobModal.classList.contains('show')) {
        closeJobModal();
    }
}

// Save job functionality
function toggleSaveJob(jobId) {
    if (savedJobs.has(jobId)) {
        savedJobs.delete(jobId);
        showToast('Job removed from saved jobs');
    } else {
        savedJobs.add(jobId);
        showToast('Job saved successfully');
    }
    
    // Update UI
    updateSaveButtons(jobId);
}

function updateSaveButtons(jobId) {
    const isSaved = savedJobs.has(jobId);
    
    // Update card save button
    const cardSaveBtn = document.querySelector(`[data-job-id="${jobId}"]`);
    if (cardSaveBtn) {
        const icon = cardSaveBtn.querySelector('i');
        cardSaveBtn.classList.toggle('saved', isSaved);
        icon.className = isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';
    }
    
    // Update modal save button if open
    const modalSaveBtn = document.getElementById('saveJobBtn');
    if (modalSaveBtn) {
        modalSaveBtn.innerHTML = `
            <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
            ${isSaved ? 'Saved' : 'Save Job'}
        `;
    }
}

function applyForJob(jobId) {
    showToast('Application submitted successfully!');
    closeJobModal();
}

// Toast notifications
function showToast(message, type = 'success') {
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    toastIcon.className = icons[type] || icons.success;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    toast.classList.remove('show');
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const pagination = document.getElementById('pagination');
    
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = createPageButton('prev', '<i class="fas fa-chevron-left"></i>');
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i, i.toString());
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => goToPage(i));
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = createPageButton('next', '<i class="fas fa-chevron-right"></i>');
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

function createPageButton(value, content) {
    const button = document.createElement('button');
    button.className = 'page-btn';
    button.innerHTML = content;
    button.dataset.page = value;
    return button;
}

function goToPage(page) {
    currentPage = page;
    renderJobs();
    
    // Scroll to top of job listings
    document.querySelector('.job-listings').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function updateJobCount() {
    jobCount.textContent = filteredJobs.length;
}

// Main event listeners initialization
function initializeEventListeners() {
    // Toast close event
    toastClose.addEventListener('click', hideToast);
    
    // Sorting events
    initializeSorting();
    
    // Global keyboard events (excluding modal-specific ones)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (toast.classList.contains('show')) {
                hideToast();
            }
        }
    });
}

// Animations
function initializeAnimations() {
    // Animate job cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe job cards
    const observeJobCards = () => {
        document.querySelectorAll('.job-card').forEach(card => {
            observer.observe(card);
        });
    };
    
    // Initial observation
    setTimeout(observeJobCards, 100);
    
    // Re-observe after filtering/sorting
    const originalRenderJobs = renderJobs;
    renderJobs = function() {
        originalRenderJobs.call(this);
        setTimeout(observeJobCards, 100);
    };
}

// Utility functions
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

// Remove the debounced filter application that was causing issues
// Initialize search with debounce - REMOVED THIS AS IT WAS CAUSING CONFLICTS

// Add loading states
function showLoading() {
    jobsGrid.classList.add('loading');
}

function hideLoading() {
    jobsGrid.classList.remove('loading');
}

// Remove the loading simulation that was interfering with filters
// Simulate loading for better UX - REMOVED THIS

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Apply focus trap to modal when opened
const originalOpenJobModal = openJobModal;
openJobModal = function(jobId) {
    originalOpenJobModal.call(this, jobId);
    setTimeout(() => {
        trapFocus(document.querySelector('.modal-content'));
    }, 100);
};

console.log('LuckyJob platform initialized successfully!');