# 3D Animated Portfolio Website

## Overview
A stunning, fully animated portfolio website featuring 3D graphics, custom cursor effects, dark/light theme toggle, and smooth animations throughout. Built with HTML, CSS, and JavaScript with Three.js for 3D effects.

## Project Purpose
To showcase a professional portfolio with an immersive, interactive user experience that demonstrates modern web development skills and creative design capabilities.

## Current State
✅ Complete and functional portfolio website with all features implemented
- Home section with 3D animated background and semi-circular profile placeholder
- About section with downloadable CV functionality
- Portfolio section with projects, certificates, and skills tabs
- Contact section with styled form and validation
- Custom live cursor tracer
- Dark/light theme toggle with persistence
- Smooth scroll animations throughout

## Features

### 1. Home Section
- 3D animated background using Three.js (particles and torus geometry)
- Semi-circular profile image placeholder with floating animation
- Glitch text effect on main heading
- Call-to-action buttons with hover effects
- Scroll indicator with animation

### 2. About Me Section
- Professional introduction text
- Statistics cards (Projects, Clients, Experience)
- Download CV button (generates a text file)
- Smooth fade-in animations

### 3. Portfolio Section
Three tabs for different content:
- **Projects**: Grid of clickable project cards that redirect to external links
  - E-Commerce Platform
  - Social Media Dashboard
  - Portfolio Website
  - Task Management App
- **Certificates**: Certificate showcase with flip animations
  - Web Development Certification
  - JavaScript Expert
  - UI/UX Design
  - Cloud Computing
- **Skills**: Animated skill bars for different categories
  - Frontend Development (HTML/CSS, JavaScript, React.js)
  - Backend Development (Node.js, Python, Database)
  - Design & Tools (UI/UX, Figma, Git)

### 4. Contact Section
- Styled contact form with floating labels
- Form validation and submit animation
- Contact information cards
- Social media links with rotation effects

### 5. Interactive Features
- **Custom Cursor**: Live cursor tracer with smooth following dot
- **Theme Toggle**: Dark/light mode with localStorage persistence
- **Scroll Animations**: Elements animate on scroll into view
- **Parallax Effects**: Subtle parallax on home section
- **Responsive Design**: Mobile-friendly with hamburger menu

## Technologies Used
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- JavaScript (ES6+)
- Three.js (r128) for 3D graphics
- Font Awesome for icons
- Google Fonts (Poppins)

## Project Architecture

### File Structure
```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js          # JavaScript functionality
├── .gitignore         # Git ignore rules
└── replit.md          # Project documentation
```

### Key Components

**HTML (index.html)**
- Semantic HTML5 structure
- Custom cursor elements
- Navigation bar with theme toggle
- Five main sections: Home, About, Portfolio, Contact, Footer
- Tab-based portfolio content

**CSS (styles.css)**
- CSS Custom Properties for theming
- Dark and light theme support
- Smooth transitions and animations
- Responsive grid layouts
- Keyframe animations (float, pulse, bounce, scroll, fadeIn, etc.)
- Mobile-responsive breakpoints

**JavaScript (script.js)**
- Three.js 3D scene initialization
- Custom cursor tracking
- Theme toggle with localStorage
- Smooth scroll navigation
- Intersection Observer for scroll animations
- Portfolio tab switching
- Form handling with visual feedback
- CV download functionality
- Mobile menu toggle
- Parallax effects

## Recent Changes (October 13, 2025)
- Created complete portfolio website structure
- Implemented all sections and features
- Added 3D animated background with Three.js
- Built custom cursor tracer system
- Created dark/light theme toggle
- Added scroll-triggered animations
- Implemented portfolio tabs (Projects, Certificates, Skills)
- Created contact form with validation
- Added CV download functionality
- Set up HTTP server workflow on port 5000

## Customization Guide

### Adding Your Information
1. **Profile Image**: Replace the `.profile-image` background in CSS or add an actual image
2. **Personal Details**: Update text in About section
3. **Projects**: Modify project cards in Portfolio section and update links in `initProjectCards()`
4. **Skills**: Adjust skill percentages in the Skills tab
5. **Contact Info**: Update email, phone, and location in Contact section
6. **Social Links**: Add your social media URLs to the footer icons
7. **CV Content**: Modify the CV text in the `initDownloadCV()` function

### Adding New Projects
In HTML (index.html), add a new project card in the projects grid:
```html
<div class="project-card" data-aos="zoom-in">
    <div class="project-image">
        <div class="project-overlay">
            <i class="fas fa-external-link-alt"></i>
        </div>
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description</p>
        <div class="project-tags">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

In JavaScript (script.js), update the `projectLinks` object with the new project index and URL.

### Theme Customization
Modify CSS custom properties in `:root` for dark theme and `[data-theme="light"]` for light theme:
- `--primary-color`: Main brand color
- `--secondary-color`: Secondary accent color
- `--accent-color`: Highlight color
- `--bg-color`: Background color
- `--surface-color`: Card/surface color
- `--text-color`: Primary text color

## Workflow
- **Server**: Python HTTP server on port 5000
- **Command**: `python3 -m http.server 5000`
- **Access**: View the website through the webview panel

## Performance Considerations
- Three.js renders at 60fps with optimized particle count
- CSS animations use transform and opacity for GPU acceleration
- Smooth scrolling and debounced scroll events
- Responsive images and optimized assets

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Three.js WebGL support needed for 3D effects

## Future Enhancements
- Backend integration for contact form (EmailJS or similar)
- Project filtering by category
- More complex 3D models and animations
- Blog section
- Testimonials section
- Animated loading screen
- Certificate verification system
