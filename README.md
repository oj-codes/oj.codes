# Static Site Generator

A Go-based static site generator for the ojcodes website. This generator reads markdown content files and configuration to build a complete static website.

## Features

- **Markdown Support**: Content written in markdown with YAML front matter
- **Template System**: HTML templates with Go template syntax
- **Configuration Driven**: Site content and settings in JSON configuration
- **Static Asset Management**: Automatic copying of CSS, JS, images, and other assets
- **Content Organization**: Structured content directories for projects, personal projects, and blog posts
- **Responsive Design**: Mobile-friendly templates that work on all devices

## Directory Structure

```
.
├── main.go                 # Main Go application
├── go.mod                  # Go module file
├── config.json             # Site configuration
├── content/                # Markdown content files
│   ├── projects/           # Professional projects
│   ├── personal-projects/  # Personal projects
│   └── blog/              # Blog posts
├── static/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── img/               # Images
│   └── uploads/           # PDFs and other files
├── templates/              # HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Homepage template
│   ├── projects.html      # Projects listing template
│   ├── personal.html      # Personal projects template
│   ├── blog.html          # Blog listing template
│   ├── project.html       # Individual project template
│   ├── personal-project.html # Individual personal project template
│   ├── blog-post.html     # Individual blog post template
│   ├── 404.html           # 404 error page
│   └── thanks.html        # Thank you page
└── public/                # Generated static site (created by generator)
```

## Installation

1. **Install Go**: Make sure you have Go 1.21 or later installed
2. **Clone the repository**: 
   ```bash
   git clone <repository-url>
   cd static-site-generator
   ```
3. **Install dependencies**:
   ```bash
   go mod tidy
   ```

## Configuration

The `config.json` file contains all the site configuration:

```json
{
  "site": {
    "title": "ojcodes - Senior SRE at DataSnipper",
    "description": "Senior SRE specializing in DevOps and Software Automation",
    "author": "ojcodes",
    "url": "https://oj.codes"
  },
  "homepage": {
    "hero": {
      "title": "Transforming Infrastructure Through Code",
      "subtitle": "Senior SRE specializing in DevOps and Software Automation"
    },
    "about": {
      "title": "About Me",
      "description": "...",
      "expertise": ["Software Engineering", "Infrastructure as Code", ...]
    },
    "contact": {
      "email": "ojcodes@protonmail.com",
      "phone": "+1 (561) 601-2765",
      "location": "West Palm Beach, FL"
    },
    "social": {
      "linkedin": "https://linkedin.com/in/ojcodes",
      "instagram": "https://instagram.com/oj.codes",
      "github": "https://github.com/oj-codes"
    }
  }
}
```

## Content Format

Content files are written in markdown with YAML front matter:

```markdown
---
title: Project Title
description: Brief description of the project
date: 2024-01-15
image: project-image.jpg
tags: tag1, tag2, tag3
---

# Project Title

Your markdown content here...

## Section 1

Content for section 1...

## Section 2

Content for section 2...
```

### Front Matter Fields

- **title**: The title of the content
- **description**: Brief description (used in listings)
- **date**: Publication date (YYYY-MM-DD format)
- **image**: Image filename (stored in static/img/)
- **tags**: Comma-separated list of tags

## Usage

### Generate the Site

```bash
go run main.go
```

This will:
1. Read the configuration from `config.json`
2. Process all markdown files in the content directories
3. Copy static assets from `static/` to `public/`
4. Generate HTML pages using the templates
5. Output the complete static site to `public/`

### Build for Production

```bash
go build -o static-site-generator main.go
./static-site-generator
```

### Development Workflow

1. **Add Content**: Create new markdown files in the appropriate content directory
2. **Update Configuration**: Modify `config.json` for site-wide changes
3. **Customize Templates**: Edit HTML templates in the `templates/` directory
4. **Add Assets**: Place images, CSS, JS files in the `static/` directory
5. **Generate**: Run the generator to build the updated site
6. **Deploy**: Upload the `public/` directory to your web server

## Content Organization

### Projects (`content/projects/`)
Professional projects and case studies. Each file should include:
- Detailed technical implementation
- Business impact and results
- Lessons learned
- Technologies used

### Personal Projects (`content/personal-projects/`)
Side projects and personal experiments. Include:
- Project motivation and goals
- Technical implementation details
- Personal impact and learning
- Future enhancements

### Blog Posts (`content/blog/`)
Technical articles and thoughts. Structure with:
- Clear introduction and context
- Detailed technical content
- Practical examples and code
- Conclusions and next steps

## Templates

The template system uses Go's `html/template` package with the following templates:

- **base.html**: Base template with common header, footer, and navigation
- **index.html**: Homepage with hero, about, projects, and contact sections
- **projects.html**: Grid layout for all projects
- **personal.html**: Grid layout for personal projects
- **blog.html**: Grid layout for blog posts
- **project.html**: Individual project page
- **personal-project.html**: Individual personal project page
- **blog-post.html**: Individual blog post page
- **404.html**: Error page
- **thanks.html**: Form submission confirmation

## Customization

### Adding New Content Types

1. Create a new content directory in `content/`
2. Add a new template in `templates/`
3. Update `main.go` to load and process the new content type
4. Add the content to the site data structure

### Modifying Templates

Templates use Go template syntax:
- `{{.Site.Config}}` - Access site configuration
- `{{range .Site.Projects}}` - Loop through projects
- `{{.Content.Title}}` - Access content fields
- `{{template "content" .}}` - Include other templates

### Styling

CSS files are stored in `static/css/` and automatically copied to the output. The main stylesheet is `style.css`.

## Deployment

The generated site in the `public/` directory can be deployed to any static hosting service:

- **GitHub Pages**: Push the `public/` directory to a GitHub repository
- **Netlify**: Drag and drop the `public/` directory
- **Vercel**: Connect your repository and set the output directory to `public/`
- **AWS S3**: Upload the contents of `public/` to an S3 bucket
- **Traditional Web Server**: Upload to any web server

## Development

### Adding Dependencies

```bash
go get github.com/new-dependency
go mod tidy
```

### Testing

```bash
go test ./...
```

### Code Style

Follow Go conventions:
- Use `gofmt` for code formatting
- Follow Go naming conventions
- Add comments for exported functions
- Handle errors appropriately

## Troubleshooting

### Common Issues

1. **Template Not Found**: Ensure template files are in the `templates/` directory
2. **Image Not Loading**: Check that images are in `static/img/` and referenced correctly
3. **Markdown Not Parsing**: Verify front matter format and markdown syntax
4. **Build Errors**: Check Go version and dependencies

### Debug Mode

Add debug logging to `main.go`:

```go
log.SetFlags(log.LstdFlags | log.Lshortfile)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the generator
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
