/* =============================================
   FK BASE — AUTH MODALS (Sign In / Sign Up)
   Handles modal open/close and basic validation.
   ============================================= */

(function () {

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function showError(elId, msg) {
        const el = document.getElementById(elId);
        if (el) {
            el.textContent = msg;
            const form = el.closest('.modal');
            if (form) {
                form.classList.add('shake');
                form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true });
            }
        }
    }

    function clearError(elId) {
        const el = document.getElementById(elId);
        if (el) el.textContent = '';
    }

    function openModal(id) {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.classList.add('active');
            // Focus first input after animation
            setTimeout(() => {
                const first = overlay.querySelector('input');
                if (first) first.focus();
            }, 150);
        }
        if (window.FKAudio) window.FKAudio.play('open');
    }

    function closeModal(id) {
        const overlay = document.getElementById(id);
        if (overlay) overlay.classList.remove('active');
    }

    document.addEventListener('DOMContentLoaded', function () {

        // ---------- Sign In ----------
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) {
            signInBtn.addEventListener('click', () => openModal('modalSignInOverlay'));
        }

        document.getElementById('modalSignInClose')?.addEventListener('click', () => closeModal('modalSignInOverlay'));
        document.getElementById('modalSignInOverlay')?.addEventListener('click', function (e) {
            if (e.target === this) closeModal('modalSignInOverlay');
        });

        document.getElementById('siSubmit')?.addEventListener('click', function () {
            clearError('siError');
            const email = document.getElementById('siEmail')?.value || '';
            const pass  = document.getElementById('siPass')?.value  || '';
            const s = window.FKLang ? window.FKLang.strings() : {};

            if (!email || !pass) {
                showError('siError', s.errorEmpty || 'Please fill in all fields.');
                return;
            }
            if (!validateEmail(email)) {
                showError('siError', s.errorEmail || 'Enter a valid email address.');
                return;
            }
            // TODO: Replace with real auth call
            console.log('Sign In:', email);
            closeModal('modalSignInOverlay');
        });

        // ---------- Sign Up ----------
        const signUpBtn = document.getElementById('signUpBtn');
        if (signUpBtn) {
            signUpBtn.addEventListener('click', () => openModal('modalSignUpOverlay'));
        }

        document.getElementById('modalSignUpClose')?.addEventListener('click', () => closeModal('modalSignUpOverlay'));
        document.getElementById('modalSignUpOverlay')?.addEventListener('click', function (e) {
            if (e.target === this) closeModal('modalSignUpOverlay');
        });

        document.getElementById('suSubmit')?.addEventListener('click', function () {
            clearError('suError');
            const name  = document.getElementById('suName')?.value  || '';
            const email = document.getElementById('suEmail')?.value || '';
            const pass  = document.getElementById('suPass')?.value  || '';
            const s = window.FKLang ? window.FKLang.strings() : {};

            if (!name || !email || !pass) {
                showError('suError', s.errorEmpty || 'Please fill in all fields.');
                return;
            }
            if (!validateEmail(email)) {
                showError('suError', s.errorEmail || 'Enter a valid email address.');
                return;
            }
            if (pass.length < 6) {
                showError('suError', s.errorPassLen || 'Password must be at least 6 characters.');
                return;
            }
            // TODO: Replace with real auth call
            console.log('Sign Up:', name, email);
            closeModal('modalSignUpOverlay');
        });

        // Close modals on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal('modalSignInOverlay');
                closeModal('modalSignUpOverlay');
            }
        });
    });
})();