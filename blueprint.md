# Lotto Number Generator & Animal Face Test

## Overview

A multi-functional web application featuring a lottery number generator, an AI-powered animal face test (via image upload), and community interaction.

## Features

*   **Lotto Generator**: Displays 6 unique random numbers with a modern UI.
*   **Animal Face Test (Upload)**: AI analysis using Teachable Machine to determine if a user looks like a dog or a cat based on an uploaded photo.
*   **Theme System**: Dark/Light mode toggle with persistence.
*   **Multi-language**: Support for English and Korean.
*   **Inquiry Form**: Partnership form powered by Formspree.
*   **Comments**: Community discussion via Disqus.

## Detailed Outline

1.  **AI Animal Face Test**:
    *   Integration of Teachable Machine Image Model.
    *   **Image Upload Support**: File picker for local image selection.
    *   **Image Preview**: Real-time preview of the uploaded image before/during analysis.
    *   Visual feedback with progress bars for each animal type.
2.  **Theme & Localization**:
    *   Consistent styling across all features.
    *   Full translation of AI test instructions, upload buttons, and results.

## Current Task: AI Animal Face Test (Image Upload Migration)

1.  **Update `index.html`**: Replace webcam container with an image preview area and add a file input.
2.  **Modify `style.css`**: Style the upload button and ensure the preview image is centered and responsive.
3.  **Update `main.js`**: Remove webcam logic, implement file reading, and trigger AI prediction on image load.
4.  **Deployment**: Push the final version to Git.
