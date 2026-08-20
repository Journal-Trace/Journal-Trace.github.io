// ==================== JOURNALTRACE ANIMATIONS ====================
(function() {
    'use strict';

    // File monitor animation
    const fileActions = ['CREATE', 'MODIFY', 'DELETE', 'RENAME'];
    const filePaths = [
        'C:\\Users\\Documents\\report.docx',
        'C:\\Windows\\System32\\config.ini',
        'C:\\Program Files\\App\\data.db',
        'C:\\Temp\\cache.tmp',
        'C:\\Users\\Downloads\\file.zip',
        'C:\\Projects\\src\\main.cpp'
    ];

    let entryIndex = 0;

    function addFileEntry() {
        const monitorBody = document.querySelector('.monitor-body');
        if (!monitorBody) return;

        const entries = document.querySelectorAll('.file-entry');
        if (entries.length > 4) {
            entries[0].style.opacity = '0';
            entries[0].style.transform = 'translateY(-20px)';
            setTimeout(() => entries[0].remove(), 300);
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const action = fileActions[Math.floor(Math.random() * fileActions.length)];
        const file = filePaths[Math.floor(Math.random() * filePaths.length)];

        const entry = document.createElement('div');
        entry.className = 'file-entry';
        entry.style.opacity = '0';
        entry.style.transform = 'translateY(20px)';
        
        entry.innerHTML = `
            <span class="entry-time">${timeStr}</span>
            <span class="entry-action ${action.toLowerCase()}">${action}</span>
            <span class="entry-file">${file}</span>
        `;

        const cursor = document.querySelector('.monitor-cursor');
        monitorBody.insertBefore(entry, cursor);

        setTimeout(() => {
            entry.style.opacity = '1';
            entry.style.transform = 'translateY(0)';
        }, 50);
    }

    // Start file monitoring animation
    setInterval(addFileEntry, 3000);

    // Stats animation
    const stats = {
        speed: { element: document.getElementById('stat-speed'), values: ['0.5ms', '0.3ms', '0.7ms', '0.4ms'], current: 0 },
        entries: { element: document.getElementById('stat-entries'), values: ['1M+', '1.2M+', '1.5M+', '1.1M+'], current: 0 },
        privacy: { element: document.getElementById('stat-privacy'), value: '100%' },
        accuracy: { element: document.getElementById('stat-accuracy'), values: ['99.9%', '99.8%', '100%'], current: 0 }
    };

    function updateStats() {
        // Speed stat
        if (stats.speed.element) {
            stats.speed.current = (stats.speed.current + 1) % stats.speed.values.length;
            stats.speed.element.textContent = stats.speed.values[stats.speed.current];
            stats.speed.element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stats.speed.element.style.transform = 'scale(1)';
            }, 300);
        }

        // Entries stat
        if (stats.entries.element) {
            stats.entries.current = (stats.entries.current + 1) % stats.entries.values.length;
            stats.entries.element.textContent = stats.entries.values[stats.entries.current];
        }

        // Accuracy stat
        if (stats.accuracy.element) {
            stats.accuracy.current = (stats.accuracy.current + 1) % stats.accuracy.values.length;
            stats.accuracy.element.textContent = stats.accuracy.values[stats.accuracy.current];
        }
    }

    setInterval(updateStats, 4000);

})();

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ====================
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    
    // Hero content parallax
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        heroContent.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
    }
    
    if (heroVisual) {
        heroVisual.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        heroVisual.style.transform = `translate(${xPercent * -15}px, ${yPercent * -15}px)`;
    }
    
    // Orbs parallax
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        orb.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
    });
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observe sections
window.addEventListener('load', () => {
    document.querySelectorAll('.features-section, .download').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.95)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Stagger animation for cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + index * 100);
    });
});

// ==================== CLICK PARTICLE BURST ====================
document.addEventListener('click', (e) => {
    const particleCount = 6;
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 1.5;
        const size = 3 + Math.random() * 2;
        
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            box-shadow: 0 0 8px ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        
        document.body.appendChild(particle);
        
        let x = e.clientX;
        let y = e.clientY;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let life = 100;
        
        function animateParticle() {
            x += vx;
            y += vy;
            vy += 0.1;
            life -= 2;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = life / 100;
            particle.style.transform = `scale(${life / 100})`;
            
            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
});

// ==================== CUSTOM CURSOR TRAIL ====================
const cursorTrail = [];
const trailLength = 10;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: ${6 - i * 0.4}px;
        height: ${6 - i * 0.4}px;
        background: rgba(59, 130, 246, ${1 - i / trailLength});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        box-shadow: 0 0 ${6 - i}px rgba(59, 130, 246, 0.5);
    `;
    document.body.appendChild(dot);
    cursorTrail.push(dot);
}

let mouseX = 0, mouseY = 0;
const positions = Array(trailLength).fill({ x: 0, y: 0 });

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    positions.unshift({ x: mouseX, y: mouseY });
    positions.pop();

    cursorTrail.forEach((dot, i) => {
        dot.style.left = `${positions[i].x}px`;
        dot.style.top = `${positions[i].y}px`;
    });

    requestAnimationFrame(animateCursor);
}

animateCursor();
