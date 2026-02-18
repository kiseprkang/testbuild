document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

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

    // Initial generation
    const initialNumbers = generateNumbers();
    displayNumbers(initialNumbers);
});