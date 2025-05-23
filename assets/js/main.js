/**
 * Template Name: Mahesh Portfolio - v1.0.0
 * Author: Mahesh Koduri
 */
(function () {
  "use strict";

  /**
   * Loading Screen Handler
   */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    const minimumLoadTime = 1500; // Reduced to 1.5 seconds for better UX
    const startTime = Date.now();
    
    // Initialize progress
    let progress = 0;
    let imagesLoaded = false;
    
    // Create a more dynamic progress animation
    const progressInterval = setInterval(() => {
      if (!imagesLoaded) {
        // Slower progress until images are loaded
        progress = Math.min(progress + 0.5, 85);
      } else {
        // Faster progress after images are loaded
        progress = Math.min(progress + 5, 100);
      }
      
      loaderProgress.style.setProperty('--progress', progress + '%');
      
      if (progress === 100) {
        clearInterval(progressInterval);
      }
    }, 20);
    
    // Load and track all images
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    function updateProgress() {
      const imageProgress = (loadedImages / totalImages) * 100;
      if (imageProgress > progress) {
        progress = imageProgress;
        loaderProgress.style.setProperty('--progress', progress + '%');
      }
      
      if (loadedImages === totalImages) {
        imagesLoaded = true;
      }
    }
    
    function tryRemovePreloader() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (loadedImages === totalImages && elapsedTime >= minimumLoadTime) {
        // Ensure progress is complete with a smooth animation
        progress = 100;
        loaderProgress.style.setProperty('--progress', '100%');
        
        // Add fade-out class with a slight delay
        setTimeout(() => {
          preloader.classList.add('fade-out');
          
          // Remove preloader after animation
          setTimeout(() => {
            preloader.style.display = 'none';
            clearInterval(progressInterval);
          }, 600);
        }, 100);
      } else if (loadedImages === totalImages) {
        // Wait for minimum time if images loaded too quickly
        setTimeout(tryRemovePreloader, 100);
      }
    }
    
    // Track image loading
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
        updateProgress();
        tryRemovePreloader();
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          updateProgress();
          tryRemovePreloader();
        });
        
        img.addEventListener('error', () => {
          loadedImages++;
          updateProgress();
          tryRemovePreloader();
        });
      }
    });
    
    // Fallback: remove preloader after 5 seconds (reduced from 8)
    setTimeout(() => {
      if (preloader.style.display !== 'none') {
        progress = 100;
        loaderProgress.style.setProperty('--progress', '100%');
        setTimeout(() => {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            preloader.style.display = 'none';
            clearInterval(progressInterval);
          }, 600);
        }, 100);
      }
    }, 5000);
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Mobile nav toggle
   */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const header = document.getElementById('header');
  const body = document.querySelector('body');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      header.classList.toggle('nav-active');
      mobileNavToggle.classList.toggle('bi-x');
      body.classList.toggle('mobile-nav-active');
    });
  }

  /**
   * Handle clicks outside nav menu to close it
   */
  document.addEventListener('click', function(e) {
    if (header.classList.contains('nav-active') && !header.contains(e.target) && !mobileNavToggle.contains(e.target)) {
      header.classList.remove('nav-active');
      mobileNavToggle.classList.remove('bi-x');
      body.classList.remove('mobile-nav-active');
    }
  });

  /**
   * Navbar links active state on scroll
   */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', navHighlighter);

  /**
   * Back to top button
   */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }
    window.addEventListener('load', toggleBacktotop);
    window.addEventListener('scroll', toggleBacktotop);
  }

  /**
   * Typed.js integration
   */
  const typed = document.querySelector('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * Calculate age
   */
  const ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = "22";
  }

  /**
   * Portfolio video playback
   */
  const portfolioVideoBtns = document.querySelectorAll('.portfolio-video-btn');
  let currentlyPlaying = null;

  function resetVideoContainer(wrap) {
    const video = wrap.querySelector('.portfolio-video');
    const img = wrap.querySelector('img');
    const links = wrap.querySelector('.portfolio-links');
    
    video.pause();
    video.currentTime = 0;
    video.classList.remove('active');
    video.style.display = 'none';
    img.style.display = 'block';
    links.style.display = 'flex';
    if (currentlyPlaying === video) {
      currentlyPlaying = null;
    }
  }

  portfolioVideoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const wrap = this.closest('.portfolio-wrap');
      const video = wrap.querySelector('.portfolio-video');
      const img = wrap.querySelector('img');
      const links = wrap.querySelector('.portfolio-links');

      // If there's a video currently playing, stop it and reset its container
      if (currentlyPlaying && currentlyPlaying !== video) {
        const currentWrap = currentlyPlaying.closest('.portfolio-wrap');
        resetVideoContainer(currentWrap);
      }

      // Toggle video playback
      if (video.classList.contains('active')) {
        resetVideoContainer(wrap);
      } else {
        video.classList.add('active');
        video.style.display = 'block';
        video.play();
        img.style.display = 'none';
        links.style.display = 'none';
        currentlyPlaying = video;
      }
    });
  });

  // Handle video events (end, pause, click)
  document.querySelectorAll('.portfolio-video').forEach(video => {
    video.addEventListener('ended', function() {
      resetVideoContainer(this.closest('.portfolio-wrap'));
    });

    video.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        resetVideoContainer(this.closest('.portfolio-wrap'));
      }
    });

    // Remove the pause event listener since we're handling it with click
  });

  // Contact Form
  document.querySelector('.php-email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let form = this;
    let submitBtn = form.querySelector('button[type="submit"]');
    let loadingDiv = form.querySelector('.loading');
    let errorDiv = form.querySelector('.error-message');
    let sentDiv = form.querySelector('.sent-message');
    
    // Show loading message
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    sentDiv.style.display = 'none';
    submitBtn.disabled = true;

    let formData = new FormData(form);

    fetch('forms/contact.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(response.statusText);
    })
    .then(data => {
      loadingDiv.style.display = 'none';
      sentDiv.style.display = 'block';
      form.reset();
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorDiv.textContent = 'Message could not be sent. Please try again later.';
      errorDiv.style.display = 'block';
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
  });

  /**
   * Portfolio hover effects with GIF and audio
   */
  document.querySelectorAll('.portfolio-wrap').forEach(wrap => {
    const audio = wrap.querySelector('.hover-audio');
    
    if (audio) {
      audio.volume = 0.2; // Set volume to 20%
    }
    
    wrap.addEventListener('mouseenter', () => {
      if (audio) {
        audio.currentTime = 0; // Reset audio to start
        audio.play();
      }
    });

    wrap.addEventListener('mouseleave', () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  });

  /**
   * College Memories Slideshow
   */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.memories-slide');
  const memoriesModal = new bootstrap.Modal(document.getElementById('memoriesModal'));

  window.openSlideshow = function(index) {
    currentSlide = index;
    showSlide(currentSlide);
    memoriesModal.show();
  }

  window.changeSlide = function(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('memoriesModal').classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        changeSlide(-1);
      } else if (e.key === 'ArrowRight') {
        changeSlide(1);
      } else if (e.key === 'Escape') {
        memoriesModal.hide();
      }
    }
  });

  // Reset slideshow when modal is closed
  document.getElementById('memoriesModal').addEventListener('hidden.bs.modal', function() {
    slides.forEach(slide => slide.classList.remove('active'));
  });
})();
