/* =============================================
   FK BASE — KEYBOARD AUDIO (Sadece yazı yazarken)
   Yazma: yüksek perde, silme: düşük perde
   ============================================= */

(function () {
    let ctx = null;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx;
    }

    function playTyping(isDeleting = false) {
        try {
            const ac = getCtx();
            const osc = ac.createOscillator();
            const gain = ac.createGain();

            osc.connect(gain);
            gain.connect(ac.destination);

            if (isDeleting) {
                // Silme: düşük perde, kısa ve tok ses
                osc.type = 'sine';
                osc.frequency.setValueAtTime(220, ac.currentTime);
                osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.04);
                gain.gain.setValueAtTime(0.06, ac.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
                osc.start(ac.currentTime);
                osc.stop(ac.currentTime + 0.05);
            } else {
                // Yazma: yüksek perde, hafif tık sesi
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, ac.currentTime);
                osc.frequency.exponentialRampToValueAtTime(620, ac.currentTime + 0.035);
                gain.gain.setValueAtTime(0.05, ac.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.045);
                osc.start(ac.currentTime);
                osc.stop(ac.currentTime + 0.045);
            }
        } catch (e) {
            // Sessiz hata
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        let lastLength = 0;

        document.addEventListener('keydown', function (e) {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') {
                const target = e.target;
                const currentLength = target.value.length;
                
                // Backspace veya Delete ile silme
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    if (currentLength < lastLength) {
                        playTyping(true); // silme sesi
                    }
                } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    // Normal karakter yazma
                    playTyping(false); // yazma sesi
                }
                
                lastLength = target.value.length;
            }
        });

        // Input değiştiğinde length takibi
        document.addEventListener('input', function (e) {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') {
                lastLength = e.target.value.length;
            }
        });
    });
})();