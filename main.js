document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeBtn = document.getElementById('theme-btn');
    const langBtn = document.getElementById('lang-btn');
    const aiStartBtn = document.getElementById('ai-start-btn');
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
            langName: "KO",
            aiTitle: "AI Animal Face Test",
            aiSubtitle: "Dog? or Cat? Let AI decide!",
            btnAiStart: "Start AI Test",
            dog: "Dog",
            cat: "Cat"
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
            langName: "EN",
            aiTitle: "AI 동물상 테스트",
            aiSubtitle: "강아지상? 고양이상? AI에게 물어보세요!",
            btnAiStart: "테스트 시작",
            dog: "강아지상",
            cat: "고양이상"
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
        
        // Update AI labels if they exist
        updateAiLabels();
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

    // Teachable Machine Logic
    const URL = "https://teachablemachine.withgoogle.com/models/EmSS03bmU/";
    let model, webcam, labelContainer, maxPredictions;

    async function initAi() {
        aiStartBtn.style.display = 'none';
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const item = document.createElement("div");
            item.className = "result-bar-item";
            item.innerHTML = `
                <div class="animal-label" id="label-${i}"></div>
                <div class="bar-wrapper">
                    <div class="bar-fill" id="bar-${i}"></div>
                </div>
                <div class="percent-label" id="percent-${i}">0%</div>
            `;
            labelContainer.appendChild(item);
        }
        updateAiLabels();
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const probability = (prediction[i].probability * 100).toFixed(0);
            document.getElementById(`bar-${i}`).style.width = probability + "%";
            document.getElementById(`percent-${i}`).textContent = probability + "%";
        }
    }

    function updateAiLabels() {
        if (!labelContainer) return;
        // In this specific model: Class 0 is Dog, Class 1 is Cat (usually)
        // Adjusting based on common Teachable Machine order or provided labels
        const classes = ['dog', 'cat']; 
        for (let i = 0; i < maxPredictions; i++) {
            const labelEl = document.getElementById(`label-${i}`);
            if (labelEl) {
                const key = classes[i] || 'Unknown';
                labelEl.textContent = translations[currentLang][key] || key;
            }
        }
    }

    aiStartBtn.addEventListener('click', initAi);

    // Initial setup
    updateLanguage(currentLang);
    const initialNumbers = generateNumbers();
    displayNumbers(initialNumbers);
});
