// Scroll Animation Handler
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(#hero)');
    
    // Options for the Intersection Observer
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the section is visible
    };
    
    // Callback function when section becomes visible
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once animation is triggered, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all sections except hero
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}); 