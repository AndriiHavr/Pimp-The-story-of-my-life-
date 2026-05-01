# Pimp: The Story of My Life

A modern web adaptation of Iceberg Slim's autobiography "Pimp: The Story of My Life", originally published in 1967.

## Project Overview

This project transforms the classic memoir into an interactive web experience with:

- Responsive navigation sidebar
- Text highlighting functionality
- Mobile-optimized popup menu
- Clean, readable typography
- GitHub Pages deployment ready

## Features

- **Interactive Table of Contents**: Collapsible sidebar with smooth animations
- **Text Highlighting**: Click to highlight text passages, saved locally or to GitHub
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Structure**: Organized codebase following current web development standards

## Project Structure

```
pimp/
├── index.html                 # Entry point (redirects to foreword)
├── src/
│   ├── book/                  # Book chapters (HTML files)
│   │   ├── titlepage.xhtml    # Cover page
│   │   ├── foreword.html      # Foreword
│   │   ├── preface.html       # Preface
│   │   └── chapter-*.html     # Individual chapters (1-21)
│   └── assets/
│       ├── css/               # Stylesheets
│       │   ├── navigation.css # Navigation and layout styles
│       │   ├── stylesheet.css # Book typography
│       │   └── page_styles.css# Additional page styles
│       ├── js/                # JavaScript
│       │   └── navigation.js  # Navigation and highlighting logic
│       ├── images/            # Book images
│       └── icons/             # UI icons (burger.svg, favicon.svg)
├── highlights.json            # User highlights data
├── package.json               # NPM scripts and dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Development Setup

### Prerequisites

- Node.js (for build scripts)
- Git

### Installation

```bash
git clone https://github.com/AndriiHavr/Pimp-The-story-of-my-life-.git
cd pimp
npm install
```

### Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run deploy # Deploy to GitHub Pages
```

### File Organization Changes

**What was reorganized:**

- **Removed unnecessary files**: EPUB metadata (content.opf, toc.ncx, mimetype, META-INF/), Python scripts (add_navigation.py, update_html.py), unused split files (000-006, 030-033)
- **Renamed HTML files**: From cryptic `CR!PW72CSEHY50YS5D2MKGED29JPXV1_split_XXX.html` to semantic names like `foreword.html`, `chapter-1-torn-from-the-nest.html`
- **Restructured directories**:
  - `src/book/` for content
  - `src/assets/` for resources (css, js, images, icons)
- **Added modern tooling**: package.json with build scripts, .gitignore, potential for CI/CD

**Why this improves maintainability:**

- **Semantic naming**: Easier to understand and navigate
- **Separation of concerns**: Assets separated from content
- **Build process**: Automated minification and optimization
- **Version control**: Proper .gitignore for generated files
- **Deployment**: Automated GitHub Pages deployment via Actions

## Navigation Structure

The book contains 21 chapters plus foreword and preface:

1. Foreword
2. Preface
3. Torn from the Nest
4. First Steps into the Jungle
5. Salty Trip with Pepper
6. A Degree in Pimping
7. The Jungle Fauna
8. Drilling for Oil
9. Melody Off Key
10. Grinning Slim
11. The Butterfly
12. The Unwritten Book
13. To Lose a Whore
14. To Gain a Stable
15. The Iceberg
16. The Mistake
17. In a Sewer
18. Away from the Track
19. Trying a New Game
20. Jailbreak
21. The Ice Pick
22. Stable Moves
23. The Steel Casket

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Responsive design, animations
- **Vanilla JavaScript**: No frameworks for lightweight experience
- **GitHub Pages**: Free hosting and deployment

## Contributing

This is a personal project for educational purposes. The book content is in the public domain.

## License

Book content: Public Domain  
Code: MIT License
