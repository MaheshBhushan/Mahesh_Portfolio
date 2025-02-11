document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const audio = item.querySelector('audio');
        const wrap = item.querySelector('.portfolio-wrap');
        let isPlaying = false;
        let wasPlayingBeforeLeave = false;

        // Function to handle play/pause
        function toggleAudio() {
            if (!audio) return;
            
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                audio.play();
                isPlaying = true;
            }
        }

        // Mouse enter - start playing if not manually paused
        wrap.addEventListener('mouseenter', () => {
            if (audio && !isPlaying) {
                audio.play();
                isPlaying = true;
            }
        });

        // Mouse leave - pause and remember state
        wrap.addEventListener('mouseleave', () => {
            if (audio && isPlaying) {
                wasPlayingBeforeLeave = true;
                audio.pause();
                isPlaying = false;
            }
        });

        // Click - toggle play/pause
        wrap.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAudio();
            
            // Visual feedback
            if (isPlaying) {
                wrap.classList.add('audio-playing');
            } else {
                wrap.classList.remove('audio-playing');
            }
        });

        // Reset audio when it ends
        if (audio) {
            audio.addEventListener('ended', () => {
                isPlaying = false;
                wrap.classList.remove('audio-playing');
            });
        }
    });
}); 