// --- Theme Toggle Logic (keep your existing if it's more advanced) ---
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeAnnouncer = document.getElementById('theme-announcer');

    // Load theme from localStorage or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeAnnouncer(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeAnnouncer(newTheme);
    });

    function updateThemeAnnouncer(theme) {
        themeAnnouncer.textContent = `Theme changed to ${theme} mode.`;
    }

    // --- NEW FEATURE: Image Carousel Logic ---
    const carouselSlide = document.getElementById('carouselSlide');
    if (carouselSlide) { // Check if carousel elements exist
        const images = carouselSlide.querySelectorAll('img');
        const dotsContainer = document.getElementById('carouselDots');
        let currentIndex = 0;

        // Create dots for navigation
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        window.showSlide = function(index) { // Made global for onclick in HTML
            if (index >= images.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = images.length - 1;
            } else {
                currentIndex = index;
            }
            carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;

            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) { // Ensure dot exists before adding class
                 dots[currentIndex].classList.add('active');
            }
        }

        window.moveSlide = function(direction) { // Made global for onclick in HTML
            showSlide(currentIndex + direction);
        }

        // Optional: Auto-slide functionality
        // setInterval(() => {
        //     moveSlide(1);
        // }, 5000); // Change image every 5 seconds (adjust time as needed)
    }


    // --- NEW FEATURE: Client-Side Comment Submission Logic ---
    // IMPORTANT: This is a client-side only implementation.
    // Comments submitted this way will NOT be saved permanently
    // and will disappear when the page is refreshed.
    // For a persistent comment system, you NEED a backend (e.g., Node.js, Python, PHP)
    // with a database (e.g., MongoDB, PostgreSQL, MySQL).

    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm && commentsList) { // Check if elements exist
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            const commentText = document.getElementById('commentText').value;
            const commentAuthor = document.getElementById('commentAuthor').value.trim() || 'Anonymous Reader';
            // const commentEmail = document.getElementById('commentEmail').value; // Email is not displayed, just for potential backend use

            if (commentText.trim() === '') {
                alert('Please enter your comment before posting.');
                return;
            }

            // Create new comment HTML element
            const newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('comment');

            const commentHeader = document.createElement('div');
            commentHeader.classList.add('comment-header');

            const authorSpan = document.createElement('span');
            authorSpan.classList.add('comment-author');
            authorSpan.textContent = commentAuthor;

            const dateSpan = document.createElement('span');
            dateSpan.classList.add('comment-date');
            const now = new Date();
            dateSpan.textContent = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const textParagraph = document.createElement('p');
            textParagraph.classList.add('comment-text');
            textParagraph.textContent = commentText;

            commentHeader.appendChild(authorSpan);
            commentHeader.appendChild(dateSpan);
            newCommentDiv.appendChild(commentHeader);
            newCommentDiv.appendChild(textParagraph);

            commentsList.prepend(newCommentDiv); // Add new comment to the top of the list

            // Clear the form fields
            commentForm.reset();
            document.getElementById('commentText').focus(); // Put focus back on textarea
        });
    }

    // --- Animate In effect (if you have it, integrate into your script.js) ---
    const animateElements = document.querySelectorAll('.animate-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when element enters viewport
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
});
