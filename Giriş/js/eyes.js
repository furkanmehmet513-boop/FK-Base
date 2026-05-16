/* =============================================
   FK BASE — EYE TRACKING (subtle parallax)
   Adds a gentle mouse-parallax effect to the
   background character image.
   ============================================= */

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const charImg = document.querySelector('.bg-character img');
        if (!charImg) return;

        let tX = 0, tY = 0, cX = 0, cY = 0;
        const STRENGTH = 10; // max px shift
        let raf = null;

        function lerp(a, b, t) { return a + (b - a) * t; }

        function animate() {
            cX = lerp(cX, tX, 0.06);
            cY = lerp(cY, tY, 0.06);
            charImg.style.transform = `translate(${cX}px, ${cY}px) scale(1.04)`;
            raf = requestAnimationFrame(animate);
        }

        document.addEventListener('mousemove', function (e) {
            const { innerWidth: W, innerHeight: H } = window;
            // Normalise to -1…+1
            const nx = (e.clientX / W - 0.5) * 2;
            const ny = (e.clientY / H - 0.5) * 2;
            tX = nx * STRENGTH;
            tY = ny * STRENGTH;
        });

        // Touch support
        document.addEventListener('touchmove', function (e) {
            const t = e.touches[0];
            const nx = (t.clientX / window.innerWidth  - 0.5) * 2;
            const ny = (t.clientY / window.innerHeight - 0.5) * 2;
            tX = nx * STRENGTH;
            tY = ny * STRENGTH;
        }, { passive: true });

        raf = requestAnimationFrame(animate);
    });
})();