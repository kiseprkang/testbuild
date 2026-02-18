# Lotto Number Generator

## Overview

A simple web application to generate random lottery numbers with theme switching capabilities.

## Features

*   Displays 6 unique random numbers between 1 and 45.
*   A button to generate a new set of numbers.
*   Responsive design for different screen sizes.
*   Dark/Light mode toggle for improved user experience.
*   Theme preference persistence using `localStorage`.
*   Partnership Inquiry form powered by Formspree for lead generation.

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
    *   Styled to match the existing theme (Light/Dark support).

## Current Task: Partnership Inquiry Form & Deployment

1.  **Update `index.html`**: Add the HTML structure for the partnership form using the Formspree endpoint.
2.  **Modify `style.css`**: Add styling for the form elements, ensuring they are responsive and theme-aware.
3.  **Verification**: Test the layout and theme compatibility of the new form.
4.  **Deployment**: Commit and push the changes.
