/* =============================================
   FK BASE — APP ENTRY FLOW
   ============================================= */

(function () {
    document.addEventListener('DOMContentLoaded', function () {

        const step0 = document.getElementById('step0');
        const step1 = document.getElementById('step1');
        
        if (!step0 || !step1) return;

        step0.style.display = 'flex';
        step1.style.display = 'none';

        const nextBtn0 = step0.querySelector('.next-btn');
        const nextBtn1 = step1.querySelector('.next-btn');

        function goToStep1() {
            step0.style.animation = 'stepOut 0.3s cubic-bezier(.4,0,.2,1) forwards';
            setTimeout(() => {
                step0.style.display = 'none';
                step1.style.display = 'flex';
                step1.style.animation = 'stepIn 0.35s cubic-bezier(.22,1,.36,1) both';
                const nameInput = document.getElementById('nameInput');
                if (nameInput) nameInput.focus();
            }, 280);
        }

        function goToMain() {
            const nameInput = document.getElementById('nameInput');
            const name = nameInput ? nameInput.value.trim() : '';
            if (name) localStorage.setItem('fkbase-user', name);
            
            // YÖNLENDİRME: Ana Sayfa klasöründeki main.html'ye
            window.location.href = '../Ana Sayfa/main.html';
        }

        if (nextBtn0) {
            nextBtn0.addEventListener('click', goToStep1);
        }

        if (nextBtn1) {
            nextBtn1.addEventListener('click', goToMain);
        }

        const nameInput = document.getElementById('nameInput');
        if (nameInput) {
            nameInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') goToMain();
            });
        }
    });
})();