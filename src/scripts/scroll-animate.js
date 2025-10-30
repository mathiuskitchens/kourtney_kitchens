// Scroll-triggered animation using Intersection Observer
// Elements with 'scroll-animate-up' class will animate when entering viewport

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -100px 0px', // Start animation before element fully enters viewport
  };

  let animationIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        // Mark as animated to prevent re-triggering
        entry.target.setAttribute('data-animated', 'true');
        
        // Add staggered delay for smooth sequential animation
        const delay = animationIndex * 120; // 120ms delay between each element
        animationIndex++;
        
        // Set animation delay
        entry.target.style.animationDelay = `${delay}ms`;
        
        // Add animation class - CSS handles the transition from 0.3 opacity and translateY(30px) to full opacity and translateY(0)
        entry.target.classList.add('animate-slide-up');
        
        // Clean up after animation completes
        setTimeout(() => {
          entry.target.style.willChange = 'auto';
        }, 1000);
        
        // Unobserve after animation starts to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate-up class
  const elementsToAnimate = document.querySelectorAll('.scroll-animate-up');
  elementsToAnimate.forEach((el) => {
    // Set initial state (low opacity and translated down) - CSS animation will animate from here
    el.style.opacity = '0.3';
    el.style.transform = 'translateY(30px)';
    el.style.willChange = 'transform, opacity';
    
    observer.observe(el);
  });
});

