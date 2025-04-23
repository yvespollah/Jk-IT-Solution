// Wait for jQuery to be loaded
function waitForJQuery(callback) {
    if (typeof jQuery !== 'undefined') {
        callback();
    } else {
        setTimeout(function() {
            waitForJQuery(callback);
        }, 100);
    }
}

// Function to get the correct base path
function getBasePath() {
    // If running from file://, use relative path
    if (window.location.protocol === 'file:') {
        return '';
    }
    // If running from a server, use the current directory
    return window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
}

// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const basePath = getBasePath();
        const fullPath = basePath + componentPath;
        console.log(`Loading component: ${elementId} from ${fullPath}`);
        
        const response = await fetch(fullPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            console.log(`Successfully loaded component: ${elementId}`);
            
            // Initialize any Bootstrap components
            if (typeof bootstrap !== 'undefined') {
                // Initialize tooltips
                var tooltipTriggerList = [].slice.call(element.querySelectorAll('[data-bs-toggle="tooltip"]'));
                tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl);
                });
                
                // Initialize popovers
                var popoverTriggerList = [].slice.call(element.querySelectorAll('[data-bs-toggle="popover"]'));
                popoverTriggerList.map(function (popoverTriggerEl) {
                    return new bootstrap.Popover(popoverTriggerEl);
                });
            }
        } else {
            console.error(`Element with ID ${elementId} not found in the DOM`);
        }
    } catch (error) {
        console.error(`Error loading component ${elementId}:`, error);
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="alert alert-danger">
                <strong>Error loading component:</strong><br>
                ${error.message}<br>
                <small>Please make sure you're running the site through a web server.</small>
            </div>`;
        }
    }
}

// Function to set active navigation
function setActiveNav() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log(`Setting active nav for page: ${currentPage}`);
        const navLinks = document.querySelectorAll('.nav-item.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                console.log(`Set active nav link: ${link.getAttribute('href')}`);
            }
        });
    } catch (error) {
        console.error('Error setting active nav:', error);
    }
}

// Function to set current year in footer
function setCurrentYear() {
    try {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
            console.log(`Set current year in footer: ${yearElement.textContent}`);
        } else {
            console.error('Year element not found in the DOM');
        }
    } catch (error) {
        console.error('Error setting year:', error);
    }
}

// Initialize components when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Load components
    loadComponent('header-component', 'components/header.html');
    loadComponent('navbar-component', 'components/navbar.html').then(() => {
        setActiveNav();
    });
    loadComponent('footer-component', 'components/footer.html').then(() => {
        setCurrentYear();
    });
}); 