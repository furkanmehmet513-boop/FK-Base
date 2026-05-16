/* =============================================
   FK BASE — THEME TOGGLE
   Persists preference to localStorage.
   ============================================= */

(function () {
    const STORAGE_KEY = 'fkbase-theme';

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
        }
    }

    // Apply saved preference immediately (before paint)
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyTheme(saved);

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;

        btn.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light');
            localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
        });
    });
})();