# Lotto Number Generator

## Overview

A simple web application to generate random lottery numbers with theme switching capabilities and community interaction.

## Features

*   Displays 6 unique random numbers between 1 and 45.
*   A button to generate a new set of numbers.
*   Responsive design for different screen sizes.
*   Dark/Light mode toggle for improved user experience.
*   Theme preference persistence using `localStorage`.
*   Partnership Inquiry form powered by Formspree for lead generation.
*   **Disqus Integration**: Community comment section at the bottom of the page.
*   **Multi-language Support**: Support for both English and Korean languages with a toggle.

## Detailed Outline

1.  **Initial Setup**: Basic HTML, CSS, and JS for generating and displaying lotto numbers.
2.  **Modern Styling**: Glassmorphism effect, gradients, and responsive layout.
3.  **Theme System**:
    *   CSS variables for colors, backgrounds, and shadows.
    *   A toggle switch/button in the UI.
    *   JavaScript logic to switch classes on the `body` or `html` element.
    *   Persistence of the selected theme in the browser's local storage.
4.  **Partnership Inquiry Form**:
    *   A clean, professional form section below the lotto generator.
    *   Input fields for Name, Email, and Message.
    *   Integration with Formspree for reliable email delivery.
5.  **Community & Localization**:
    *   **Disqus**: Embedded comment thread for user engagement.
    *   **I18n**: Language toggle button and a translation map in JavaScript to switch all UI text between English and Korean.

## Current Task: Disqus & Korean Language Support

1.  **Update `index.html`**: Add the language toggle button and the Disqus thread container.
2.  **Modify `style.css`**: Style the language toggle and ensure the Disqus section blends well with the theme.
3.  **Update `main.js`**: Implement the language switching logic, update UI strings dynamically, and persist language preference.
4.  **Verification**: Test both languages and the comment section in different themes.
5.  **Deployment**: Commit and push the changes.
