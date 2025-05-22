// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Character counter functions
function updateTitleCount() {
    const titleInput = document.getElementById('title');
    const titleCount = document.getElementById('titleCount');
    if (titleInput && titleCount) {
        titleCount.textContent = titleInput.value.length;
    }
}

function updateDescriptionCount() {
    const descriptionInput = document.getElementById('description');
    const descriptionCount = document.getElementById('descriptionCount');
    if (descriptionInput && descriptionCount) {
        descriptionCount.textContent = descriptionInput.value.length;
    }
}

// Form submission handler
function handleFormSubmit(e) {
    if (e) {
        e.preventDefault();
    }
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    // Get existing ideas from localStorage
    let storedIdeas = [];
    try {
        const existingData = localStorage.getItem('startupIdeas');
        if (existingData) {
            storedIdeas = JSON.parse(existingData);
        }
    } catch (error) {
        console.error('Error loading existing ideas:', error);
    }
    
    // Add new idea
    const newIdea = {
        title: title,
        description: description,
        score: 0,
        date: new Date().toISOString().split('T')[0]
    };
    
    storedIdeas.push(newIdea);
    
    // Save back to localStorage
    try {
        localStorage.setItem('startupIdeas', JSON.stringify(storedIdeas));
        console.log('Idea saved successfully:', newIdea);
        console.log('Updated ideas in localStorage:', storedIdeas);
        
        // Show success message
        alert('Idea successfully posted!');
        
        // Clear the form
        document.getElementById('ideaForm').reset();
        document.getElementById('titleCount').textContent = '0';
        document.getElementById('descriptionCount').textContent = '0';
        
        // Redirect to review page
        window.location.href = 'review.html';
    } catch (error) {
        console.error('Error saving idea to localStorage:', error);
        alert('There was an error saving your idea. Please try again.');
    }
}

// Initialize the form when the document is loaded
function initializeForm() {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const ideaForm = document.getElementById('ideaForm');
    
    if (titleInput) {
        titleInput.oninput = updateTitleCount;
    }
    
    if (descriptionInput) {
        descriptionInput.oninput = updateDescriptionCount;
    }
    
    if (ideaForm) {
        ideaForm.onsubmit = handleFormSubmit;
    }
}

// Set up initialization to run when the page loads
window.onload = initializeForm;