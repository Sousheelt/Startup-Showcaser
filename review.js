// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Global variables to track review stats
let ideasReviewed = new Set();
let upvotesGiven = 0;
let downvotesGiven = 0;

// Get stored ideas from localStorage or create default ones
function getStoredIdeas() {
    let storedIdeas = [];
    try {
        const storedData = localStorage.getItem('startupIdeas');
        if (storedData) {
            storedIdeas = JSON.parse(storedData);
        }
    } catch (error) {
        console.error('Error loading ideas:', error);
    }
    
    return storedIdeas;
}

// Create HTML elements for each idea
function createIdeaElements(ideas) {
    const ideasList = document.getElementById('ideasList');
    if (!ideasList) {
        console.error('Ideas list element not found');
        return;
    }
    
    ideasList.innerHTML = ''; // Clear existing items
    
    ideas.forEach((idea, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'leaderboard-item';
        listItem.setAttribute('data-date', idea.date);
        listItem.setAttribute('data-description', idea.description);
        
        listItem.innerHTML = `
            <span class="leaderboard-rank">${index + 1}</span>
            <div class="leaderboard-user">${idea.title}</div>
            <span class="leaderboard-score">${idea.score}</span>
            <div class="vote-buttons">
                <button onclick="downVote(this)" class="vote-btn down-vote"><i class="fas fa-thumbs-down"></i></button>
                <button onclick="upVote(this)" class="vote-btn up-vote"><i class="fas fa-thumbs-up"></i></button>
            </div>
        `;
        
        ideasList.appendChild(listItem);
    });
}

// Save updated ideas to localStorage
function saveIdeas() {
    const items = document.querySelectorAll('.leaderboard-item');
    const updatedIdeas = [];
    
    items.forEach(item => {
        updatedIdeas.push({
            title: item.querySelector('.leaderboard-user').textContent,
            description: item.dataset.description || "No description available",
            score: parseInt(item.querySelector('.leaderboard-score').textContent),
            date: item.dataset.date
        });
    });
    
    localStorage.setItem('startupIdeas', JSON.stringify(updatedIdeas));
}

// Voting functionality
function upVote(button) {
    const listItem = button.closest('.leaderboard-item');
    const scoreElement = listItem.querySelector('.leaderboard-score');
    const downButton = listItem.querySelector('.down-vote');
    
    // Check if already voted
    if (button.classList.contains('voted')) {
        // Already upvoted, remove the vote
        button.classList.remove('voted');
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore - 1;
        upvotesGiven--;
    } else {
        // Add upvote
        button.classList.add('voted');
        
        // Remove downvote if exists
        if (downButton.classList.contains('voted')) {
            downButton.classList.remove('voted');
            downvotesGiven--;
        }
        
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore + 1;
        upvotesGiven++;
    }
    
    // Add to reviewed ideas
    ideasReviewed.add(listItem.querySelector('.leaderboard-user').textContent);
    
    // Update stats
    updateStats();
    
    // Update rankings
    updateRankings();
    
    // Save updated scores
    saveIdeas();
}

function downVote(button) {
    const listItem = button.closest('.leaderboard-item');
    const scoreElement = listItem.querySelector('.leaderboard-score');
    const upButton = listItem.querySelector('.up-vote');
    
    // Check if already voted
    if (button.classList.contains('voted')) {
        // Already downvoted, remove the vote
        button.classList.remove('voted');
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore + 1;
        downvotesGiven--;
    } else {
        // Add downvote
        button.classList.add('voted');
        
        // Remove upvote if exists
        if (upButton.classList.contains('voted')) {
            upButton.classList.remove('voted');
            upvotesGiven--;
        }
        
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore - 1;
        downvotesGiven++;
    }
    
    // Add to reviewed ideas
    ideasReviewed.add(listItem.querySelector('.leaderboard-user').textContent);
    
    // Update stats
    updateStats();
    
    // Update rankings
    updateRankings();
    
    // Save updated scores
    saveIdeas();
}

// Update user stats
function updateStats() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    statsNumbers[0].textContent = ideasReviewed.size;
    statsNumbers[1].textContent = upvotesGiven;
    statsNumbers[2].textContent = downvotesGiven;
}

// Sort ideas by popularity or date
function sortIdeas() {
    const sortBy = document.getElementById('sortBy').value;
    const ideasList = document.getElementById('ideasList');
    const items = Array.from(ideasList.querySelectorAll('.leaderboard-item'));
    
    items.sort(function(a, b) {
        if (sortBy === 'popular') {
            // Sort by score (descending)
            const scoreA = parseInt(a.querySelector('.leaderboard-score').textContent);
            const scoreB = parseInt(b.querySelector('.leaderboard-score').textContent);
            return scoreB - scoreA;
        } else if (sortBy === 'newest') {
            // Sort by date (newest first)
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA;
        } else if (sortBy === 'oldest') {
            // Sort by date (oldest first)
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateA - dateB;
        }
    });
    
    // Clear and re-append items
    ideasList.innerHTML = '';
    items.forEach(function(item) {
        ideasList.appendChild(item);
    });
    
    // Update rankings after sorting
    updateRankings();
}

// Update the rank numbers after sorting or voting
function updateRankings() {
    const items = document.querySelectorAll('.leaderboard-item');
    items.forEach(function(item, index) {
        item.querySelector('.leaderboard-rank').textContent = index + 1;
    });
}

// Initialize function to be called on page load instead of using addEventListener
function initializeReviewPage() {
    console.log('Review page loaded');
    
    // Get ideas from localStorage and create elements
    const ideas = getStoredIdeas();
    console.log('Loaded ideas:', ideas); // Debug log
    createIdeaElements(ideas);
    
    // Get all leaderboard items
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    
    // Add animation classes to each item with a delay
    leaderboardItems.forEach(function(item, index) {
        // Add animation class with delay
        setTimeout(function() {
            item.classList.add('fade-in');
        }, index * 100); // 100ms delay between each item
    });
    
    // Initialize rankings
    updateRankings();
}


window.onload = initializeReviewPage;
