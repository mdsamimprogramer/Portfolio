import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let blobs = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createBlobs = () => {
            blobs = [
                {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.max(canvas.width, canvas.height) * 0.5,
                    color: 'rgba(59, 130, 246, 0.05)' // Blue-ish
                },
                {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.max(canvas.width, canvas.height) * 0.5,
                    color: 'rgba(147, 51, 234, 0.05)' // Purple-ish
                }
            ];
        };

        const createParticles = () => {
            const particleCount = Math.floor(window.innerWidth * 0.08); // Increased count slightly
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const depth = Math.random(); // 0 (far) to 1 (near)
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    depth: depth,
                    size: (depth * 1.5) + 0.5, // 0.5 to 2.0
                    speedX: (Math.random() - 0.5) * (depth * 0.3 + 0.1),
                    speedY: (Math.random() - 0.5) * (depth * 0.3 + 0.1),
                    opacity: (Math.random() * 0.3) + 0.1
                });
            }
        };

        const draw = () => {
            const isDark = document.documentElement.classList.contains('dark');

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Ambient Blobs (Glows)
            blobs.forEach(blob => {
                blob.x += blob.vx;
                blob.y += blob.vy;

                // Bounce blobs
                if (blob.x < -blob.size || blob.x > canvas.width + blob.size) blob.vx *= -1;
                if (blob.y < -blob.size || blob.y > canvas.height + blob.size) blob.vy *= -1;

                const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size);
                if (isDark) {
                    gradient.addColorStop(0, blob.color);
                    gradient.addColorStop(1, 'rgba(0,0,0,0)');
                } else {
                    // Lighter glows for light mode
                    const lightColor = blob.color.replace('0.05', '0.03').replace('0.05', '0.03'); // Even more subtle
                    gradient.addColorStop(0, lightColor);
                    gradient.addColorStop(1, 'rgba(255,255,255,0)');
                }

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill entire canvas to blend
            });

            // 2. Draw Particles
            const particleColor = isDark ? '255, 255, 255' : '15, 23, 42'; // White / Slate-900

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Adjust opacity based on depth for "fog" effect
                const adjustedOpacity = isDark ? p.opacity : p.opacity * 0.6; // Subtler in light mode
                ctx.fillStyle = `rgba(${particleColor}, ${adjustedOpacity})`;
                ctx.fill();

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        // Initialize
        resizeCanvas();
        createBlobs();
        createParticles();
        draw();

        // Handlers
        const handleResize = () => {
            resizeCanvas();
            createBlobs();
            createParticles();
        }

        window.addEventListener('resize', handleResize);

        // Observer for theme changes (optional triggers, but draw loop handles checks)
        const observer = new MutationObserver(() => {
            // Force redraw logic if needed, but requestAnimationFrame handles it.
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
};

export default BackgroundAnimation;
