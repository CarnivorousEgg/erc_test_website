# ERC BITS Goa Website

Electronics & Robotics Club website for BITS Pilani K K Birla Goa Campus.

## Features

- 🌙 Dark/Light theme toggle
- 📱 Responsive design
- 🎯 Interactive project tabs
- 👥 About us sections
- 🚀 Modern animations
- 📊 Alumni network display

## Deployment

### GitHub Pages

This website is designed to work directly on GitHub Pages without any build process. Simply:

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose your main branch and `/ (root)` folder
5. Save

The website will be available at `https://yourusername.github.io/your-repo-name/`

### Local Development

For local development, you can use any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Using PHP
php -S localhost:8000
```

## File Structure

```
├── index.html          # Main HTML file
├── script.js           # Main JavaScript (non-module version)
├── styles/             # CSS files
│   ├── base.css        # Base styles and theme variables
│   ├── navigation.css  # Navigation and theme toggle
│   ├── hero.css        # Hero section
│   ├── projects.css    # Projects section
│   ├── about.css       # About section
│   ├── outreach.css    # Outreach section
│   ├── footer.css      # Footer
│   └── responsive.css  # Responsive design
├── public/             # Static assets
│   ├── erc-logo.jpg    # Logo
│   └── world_map.jpg   # World map for alumni
└── js/                 # Original module files (not used in production)
```

## Troubleshooting

### Theme Toggle Not Working
- Check browser console for JavaScript errors
- Ensure `script.js` is loading properly
- Verify theme toggle buttons exist in HTML

### Project Tabs Not Working
- Check if project content sections exist
- Verify CSS classes match between HTML and JavaScript
- Check browser console for errors

### About Section Tabs Not Working
- Ensure about section content has correct CSS classes
- Check if tab click events are being registered
- Verify CSS selectors match HTML structure

### Mobile Navigation Issues
- Check if hamburger menu button exists
- Verify mobile menu overlay is present
- Ensure responsive CSS is loading

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Notes

- The website uses vanilla JavaScript (no frameworks)
- CSS custom properties for theming
- Responsive design with mobile-first approach
- No external dependencies except Google Fonts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 Electronics & Robotics Club, BITS Goa. All rights reserved. 