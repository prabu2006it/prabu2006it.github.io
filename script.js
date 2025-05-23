document.addEventListener('DOMContentLoaded', function() {
    // Image slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    // Touch variables
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Make sure first slide is active
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Function to change slide
    function changeSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Update current slide
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeSlide(index);
        });
    });
    
    // Add manual navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(currentSlide + 1);
        }
    });
    
    // Auto change slide every 2 seconds instead of 5
    let slideInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 2000);
    
    // Pause slideshow when mouse is over the slider
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume slideshow when mouse leaves the slider
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 2000);
    });
    
    // Add touch swipe functionality
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval); // Pause autoplay on touch
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        // Resume autoplay after touch
        slideInterval = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 2000);
    }, { passive: true });
    
    // Handle the swipe direction
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to be considered a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe right, go to previous slide
            changeSlide(currentSlide - 1);
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left, go to next slide
            changeSlide(currentSlide + 1);
        }
    }
    
    // Disable right-click on the page
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}); 