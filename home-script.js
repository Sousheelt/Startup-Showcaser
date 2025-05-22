
// Get stored ideas from localStorage
function getStoredIdeas() {
    let storedIdeas = [];
    try {
        const storedData = localStorage.getItem('startupIdeas');
        if (storedData) {
            storedIdeas = JSON.parse(storedData);
            console.log('Successfully loaded ideas from localStorage:', storedIdeas);
        } else {
            console.log('No ideas found in localStorage');
        }
    } catch (error) {
        console.error('Error loading ideas from localStorage:', error);
    }
    return storedIdeas;
}

// Create HTML elements for each idea
function createIdeaElements(ideas) {
    const ideasList = document.getElementById('topIdeasList');
    if (!ideasList) {
        console.error('Ideas list element not found');
        return;
    }
    
    ideasList.innerHTML = ''; // Clear existing items
    
    // Sort ideas by score in descending order
    ideas.sort((a, b) => b.score - a.score);
    
    // Display top 5 ideas
    const topIdeas = ideas.slice(0, 5);
    
    if (topIdeas.length === 0) {
        // Display a message if no ideas are available
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No startup ideas available yet. Be the first to post one!';
        ideasList.appendChild(emptyMessage);
    } else {
        // Create and append idea elements
        topIdeas.forEach((idea, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'leaderboard-item';
            
            listItem.innerHTML = `
                <span class="leaderboard-rank">${index + 1}</span>
                <div class="leaderboard-user">${idea.title}</div>
                <span class="leaderboard-score">${idea.score}</span>
            `;
            // Add animation with delay
            setTimeout(() => {
                listItem.classList.add('fade-in');
            }, index * 100);
            
            ideasList.appendChild(listItem);
        });
    }
}

// Initialize home page function
function initializeHomePage() {
    console.log('Home page loaded');
    // Get ideas from localStorage and create elements
    const ideas = getStoredIdeas();
    createIdeaElements(ideas);
}

window.onload = initializeHomePage;