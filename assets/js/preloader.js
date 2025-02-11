document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.loader-progress');
    let totalAssets = 0;
    let loadedAssets = 0;

    // Function to update progress
    function updateProgress() {
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        
        if (loadedAssets === totalAssets) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 500);
        }
    }

    // Function to preload an image
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        });
    }

    // Function to preload audio
    function preloadAudio(url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = url;
            audio.oncanplaythrough = resolve;
            audio.onerror = reject;
        });
    }

    // Collect all assets to preload
    const images = Array.from(document.images);
    const gifs = Array.from(document.querySelectorAll('.gif-img'));
    const audioElements = Array.from(document.querySelectorAll('audio source'));

    // Calculate total assets
    totalAssets = images.length + gifs.length + audioElements.length;

    // Preload all images
    images.forEach(img => {
        preloadImage(img.src)
            .then(updateProgress)
            .catch(() => {
                console.warn(`Failed to load image: ${img.src}`);
                updateProgress();
            });
    });

    // Preload all GIFs
    gifs.forEach(gif => {
        preloadImage(gif.src)
            .then(updateProgress)
            .catch(() => {
                console.warn(`Failed to load GIF: ${gif.src}`);
                updateProgress();
            });
    });

    // Preload all audio files
    audioElements.forEach(audio => {
        preloadAudio(audio.src)
            .then(updateProgress)
            .catch(() => {
                console.warn(`Failed to load audio: ${audio.src}`);
                updateProgress();
            });
    });
}); 