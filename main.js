document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeBtn = document.getElementById('theme-btn');
    const langBtn = document.getElementById('lang-btn');
    const body = document.body;

    // Translations
    const translations = {
        en: {
            title: "Lotto Number Generator",
            generate: "Generate Numbers",
            formTitle: "Partnership Inquiry",
            labelName: "Name",
            labelEmail: "Email Address",
            labelMessage: "Message",
            placeholderName: "Enter your name",
            placeholderEmail: "your@email.com",
            placeholderMessage: "How can we help you?",
            btnSend: "Send Inquiry",
            commentsTitle: "Comments",
            langName: "KO"
        },
        ko: {
            title: "로또 번호 생성기",
            generate: "번호 생성하기",
            formTitle: "제휴 문의",
            labelName: "이름",
            labelEmail: "이메일 주소",
            labelMessage: "문의 내용",
            placeholderName: "이름을 입력하세요",
            placeholderEmail: "your@email.com",
            placeholderMessage: "어떤 도움이 필요하신가요?",
            btnSend: "문의 보내기",
            commentsTitle: "댓글",
            langName: "EN"
        }
    };

    // Language logic
    let currentLang = localStorage.getItem('lang') || 'en';

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        langBtn.textContent = translations[lang].langName;
        localStorage.setItem('lang', lang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ko' : 'en';
        updateLanguage(currentLang);
    });

    // Theme logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Lotto generation logic
    function generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        lottoNumbersDiv.innerHTML = '';
        numbers.forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'lotto-number';
            numberDiv.textContent = number;
            lottoNumbersDiv.appendChild(numberDiv);
        });
    }

    generateBtn.addEventListener('click', () => {
        const newNumbers = generateNumbers();
        displayNumbers(newNumbers);
    });

    // Initial setup
    updateLanguage(currentLang);
    const initialNumbers = generateNumbers();
    displayNumbers(initialNumbers);
});
