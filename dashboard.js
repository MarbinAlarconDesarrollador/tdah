if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado', reg))
            .catch(err => console.error('Error en SW', err));
    });
}

/* =========================================
   🎮 PARALLAX INTERACTIVO DASHBOARD
========================================= */

const cards = document.querySelectorAll('.game-card');

cards.forEach(card => {

    // PC
    card.addEventListener('mousemove', (e) => {

        if(window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / 12);

        const rotateY =
            ((centerX - x) / 12);

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale(1.03)
        `;
    });

    card.addEventListener('mouseleave', () => {

        card.style.transform = '';
    });

    // MOBILE TOUCH
    card.addEventListener('touchstart', () => {

        card.style.transform = `
            scale(.96)
        `;
    });

    card.addEventListener('touchend', () => {

        card.style.transform = '';
    });

});