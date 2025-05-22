// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add smooth scrolling for anchor links - using onclick attributes instead of addEventListener
const anchorLinks = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < anchorLinks.length; i++) {
    const anchor = anchorLinks[i];
    anchor.onclick = function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    };
}

// User authentication state
let isUserSignedIn = false;
let currentUsername = '';

// Check if user is already signed in (from session storage)
function initializeApp() {
    // Check for existing session
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
        isUserSignedIn = true;
        currentUsername = savedUsername;
        updateUIAfterSignIn();
    } else {
        // If not signed in, disable get started button
        document.getElementById('getStartedBtn').classList.add('disabled');
    }
    
    // Set up sign in form using traditional event handler assignment
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && username && password) {
                // Set signed in status
                isUserSignedIn = true;
                currentUsername = username;
                
                // Store in session storage
                sessionStorage.setItem('username', username);
                
                // Update UI
                updateUIAfterSignIn();
                
                // Close modal
                closeSignInModal();
            }
        };
    }
}

// Assign the initialization function to window.onload
window.onload = initializeApp;

// Sign Out Function
function signOut() {
    isUserSignedIn = false;
    currentUsername = '';
    sessionStorage.removeItem('username');
    
    // Update UI after sign out
    document.getElementById('signInBtn').classList.remove('hidden');
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('getStartedBtn').classList.add('disabled');
    document.getElementById('welcomeUser').textContent = 'Welcome, User';
}

// Update UI elements after sign in
function updateUIAfterSignIn() {
    // Update welcome message
    document.getElementById('welcomeUser').textContent = `Welcome, ${currentUsername}`;
    
    // Show user info, hide sign in button
    document.getElementById('signInBtn').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    
    // Enable get started button
    document.getElementById('getStartedBtn').classList.remove('disabled');
}

// Try to navigate to "Get Started" page
function tryGetStarted() {
    if (isUserSignedIn) {
        document.location = 'home.html';
    } else {
        // If not signed in, show sign in modal
        openSignInModal();
    }
}

// Sign In Modal Functions
function openSignInModal() {
    document.getElementById('signInModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeSignInModal() {
    document.getElementById('signInModal').style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
}


window.onclick = function(event) {
    const modal = document.getElementById('signInModal');
    if (event.target === modal) {
        closeSignInModal();
    }
};