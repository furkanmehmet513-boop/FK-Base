/* =============================================
   FK BASE — LANGUAGE SWITCHER
   Persists language selection to localStorage.
   ============================================= */

(function () {
    const STORAGE_KEY = 'fkbase-lang';

    const strings = {
        tr: {
            welcome:     'FK Base\'e Hoş Geldin',
            welcomeSub:  'Dilini seç ve devam et.',
            nextBtn:     'Devam Et',
            namePlaceholder: 'Adını gir…',
            nameLabel:   'İsim',
            signIn:      'Giriş Yap',
            signUp:      'Kayıt Ol',
            orContinue:  'ya da',
            modalSignIn: 'Giriş Yap',
            modalSignUp: 'Kayıt Ol',
            emailLabel:  'E-posta',
            passLabel:   'Şifre',
            nameInputLabel: 'İsim',
            submitSignIn:'Giriş',
            submitSignUp:'Kayıt Ol',
            errorEmpty:  'Lütfen tüm alanları doldurun.',
            errorEmail:  'Geçerli bir e-posta girin.',
            errorPassLen:'Şifre en az 6 karakter olmalı.',
        },
        en: {
            welcome:     'Welcome to FK Base',
            welcomeSub:  'Choose your language and continue.',
            nextBtn:     'Continue',
            namePlaceholder: 'Enter your name…',
            nameLabel:   'Name',
            signIn:      'Sign In',
            signUp:      'Sign Up',
            orContinue:  'or',
            modalSignIn: 'Sign In',
            modalSignUp: 'Sign Up',
            emailLabel:  'Email',
            passLabel:   'Password',
            nameInputLabel: 'Name',
            submitSignIn:'Sign In',
            submitSignUp:'Sign Up',
            errorEmpty:  'Please fill in all fields.',
            errorEmail:  'Enter a valid email address.',
            errorPassLen:'Password must be at least 6 characters.',
        }
    };

    let currentLang = localStorage.getItem(STORAGE_KEY) || 'tr';

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        const s = strings[lang];

        // Welcome text
        const welcomeEl = document.getElementById('welcomeLabel');
        if (welcomeEl) welcomeEl.textContent = s.welcome;

        // Sub text
        const subEl = document.getElementById('welcomeSub');
        if (subEl) subEl.textContent = s.welcomeSub;

        // Next button
        const nextBtn = document.querySelector('.next-btn span');
        if (nextBtn) nextBtn.textContent = s.nextBtn;

        // Name label / placeholder
        const nameLabel = document.getElementById('nameLabel');
        if (nameLabel) nameLabel.textContent = s.nameLabel;
        const nameInput = document.getElementById('nameInput');
        if (nameInput) nameInput.placeholder = s.namePlaceholder;

        // Auth buttons
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) signInBtn.textContent = s.signIn;
        const signUpBtn = document.getElementById('signUpBtn');
        if (signUpBtn) signUpBtn.textContent = s.signUp;

        // Divider
        const dividerEl = document.getElementById('dividerText');
        if (dividerEl) dividerEl.textContent = s.orContinue;

        // Modals
        const miTitle = document.getElementById('modalSignInTitle');
        if (miTitle) miTitle.innerHTML = s.modalSignIn;
        const muTitle = document.getElementById('modalSignUpTitle');
        if (muTitle) muTitle.innerHTML = s.modalSignUp;

        const emailLabelSI = document.getElementById('siEmailLabel');
        if (emailLabelSI) emailLabelSI.textContent = s.emailLabel;
        const passLabelSI  = document.getElementById('siPassLabel');
        if (passLabelSI)  passLabelSI.textContent = s.passLabel;
        const submitSI     = document.getElementById('siSubmit');
        if (submitSI)     submitSI.textContent = s.submitSignIn;

        const nameLabelSU  = document.getElementById('suNameLabel');
        if (nameLabelSU)  nameLabelSU.textContent = s.nameInputLabel;
        const emailLabelSU = document.getElementById('suEmailLabel');
        if (emailLabelSU) emailLabelSU.textContent = s.emailLabel;
        const passLabelSU  = document.getElementById('suPassLabel');
        if (passLabelSU)  passLabelSU.textContent = s.passLabel;
        const submitSU     = document.getElementById('suSubmit');
        if (submitSU)     submitSU.textContent = s.submitSignUp;

        // Active lang button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Bind lang buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                applyLang(this.dataset.lang);
            });
        });

        // Apply on load
        applyLang(currentLang);
    });

    // Expose getter for other scripts
    window.FKLang = {
        get: () => currentLang,
        strings: () => strings[currentLang]
    };
})();