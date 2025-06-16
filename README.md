# ojcodes Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and a focus on showcasing professional work and personal projects.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive layout
- 🎯 Project showcase with detailed case studies
- 📝 Blog section
- 📬 Working contact form using Web3Forms
- 🔍 SEO optimized
- ⚡ Fast loading times
- 📱 Accessible design

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (for version control)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ojcodes/oj.codes.git
cd oj.codes
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The site will be available at `http://localhost:3000`

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in production mode using the `serve` package.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run dev`

Runs the app in development mode using `nodemon`.
The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode using Jest.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Runs ESLint to check for code style and potential errors.

### `npm run lint:fix`

Runs ESLint and automatically fixes any auto-fixable issues.

### `npm run format`

Runs Prettier to format all supported files in the project.

### `npm run build`

Runs both the format and lint scripts to ensure code quality.

### `npm run ci`

Runs a clean install of dependencies and then runs the build script.
This is typically used in CI/CD pipelines.

## GitHub Pages Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. The deployment process is triggered on every push to the main branch.

### Setup GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" under "Code and automation"
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - Branch: Select "main"

### Manual Deployment

You can manually trigger a deployment by:

1. Going to the "Actions" tab in your repository
2. Selecting the "Deploy to GitHub Pages" workflow
3. Clicking "Run workflow"

### Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) for form submission. To set up the contact form:

1. Go to [Web3Forms](https://web3forms.com/)
2. Click "Get Access Key"
3. Choose your preferred authentication method (Email, GitHub, or Google)
4. Copy your access key
5. Replace `YOUR_ACCESS_KEY` in the contact form's `data-access-key` attribute with your actual access key

The form will automatically handle:

- Email delivery
- Spam protection
- Form validation
- Success/error messages
- File attachments (if enabled)

Note: Web3Forms is free for up to 250 submissions per month. For higher volumes, consider their paid plans.

### Common Issues

1. **Node.js not found**:

   - Install Node.js using Homebrew: `brew install node`
   - Or download from https://nodejs.org/

2. **Port 3000 already in use**:

   - Change the port in `server.js`
   - Or kill the process using the port: `lsof -i :3000` then `kill -9 PID`

3. **GitHub Pages not updating**:
   - Wait a few minutes for changes to propagate
   - Clear your browser cache
   - Check repository settings

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Lobster](https://fonts.google.com/specimen/Lobster)
- Icons: [Font Awesome](https://fontawesome.com/)
- Form Handling: [Web3Forms](https://web3forms.com/)

## Contributing

Feel free to submit issues and enhancement requests!
