document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeBtn = document.getElementById('theme-btn');
    const langBtn = document.getElementById('lang-btn');
    const aiStartBtn = document.getElementById('ai-start-btn');
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const uploadText = document.getElementById('upload-text');
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
            aiSubtitle: "Upload your photo to find your animal twin!",
            btnAiStart: "Analyze Face",
            uploadText: "Click to upload your photo",
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
            aiSubtitle: "사진을 업로드하여 당신의 동물상을 확인하세요!",
            btnAiStart: "결과 분석하기",
            uploadText: "클릭하여 사진을 업로드하세요",
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

    // Teachable Machine Logic (Image Upload Version)
    const MODEL_URL = "https://teachablemachine.withgoogle.com/models/EmSS03bmU/";
    let model, labelContainer, maxPredictions;
    let uploadedImageElement = null;

    async function loadModel() {
        if (model) return;
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }

    imageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const img = new Image();
            img.onload = async () => {
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
                uploadedImageElement = img;
                aiStartBtn.style.display = 'block';
                
                // Clear previous results
                if (labelContainer) labelContainer.innerHTML = '';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    async function predict() {
        if (!model) await loadModel();
        if (!uploadedImageElement) return;

        aiStartBtn.disabled = true;
        aiStartBtn.textContent = currentLang === 'ko' ? '분석 중...' : 'Analyzing...';

        const prediction = await model.predict(uploadedImageElement);
        
        // Setup container if not exists
        if (!labelContainer) {
            labelContainer = document.getElementById("label-container");
        }
        labelContainer.innerHTML = '';

        for (let i = 0; i < maxPredictions; i++) {
            const probability = (prediction[i].probability * 100).toFixed(0);
            const item = document.createElement("div");
            item.className = "result-bar-item";
            item.innerHTML = `
                <div class="animal-label" id="label-${i}"></div>
                <div class="bar-wrapper">
                    <div class="bar-fill" id="bar-${i}" style="width: ${probability}%"></div>
                </div>
                <div class="percent-label" id="percent-${i}">${probability}%</div>
            `;
            labelContainer.appendChild(item);
        }
        
        updateAiLabels();
        aiStartBtn.disabled = false;
        aiStartBtn.textContent = translations[currentLang].btnAiStart;
    }

    function updateAiLabels() {
        if (!labelContainer) return;
        const classes = ['dog', 'cat']; 
        for (let i = 0; i < maxPredictions; i++) {
            const labelEl = document.getElementById(`label-${i}`);
            if (labelEl) {
                const key = classes[i] || 'Unknown';
                labelEl.textContent = translations[currentLang][key] || key;
            }
        }
    }

    aiStartBtn.addEventListener('click', predict);

    // Initial setup
    updateLanguage(currentLang);
    const initialNumbers = generateNumbers();
    displayNumbers(initialNumbers);
});
