package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

// Config represents the site configuration
type Config struct {
	Site struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Author      string `json:"author"`
		URL         string `json:"url"`
	} `json:"site"`
	Homepage struct {
		Hero struct {
			Title       string `json:"title"`
			Subtitle    string `json:"subtitle"`
			Description string `json:"description"`
		} `json:"hero"`
		About struct {
			Title       string   `json:"title"`
			Description string   `json:"description"`
			Expertise   []string `json:"expertise"`
		} `json:"about"`
		Contact struct {
			Email   string `json:"email"`
			Phone   string `json:"phone"`
			Location string `json:"location"`
		} `json:"contact"`
		Social struct {
			LinkedIn  string `json:"linkedin"`
			Instagram string `json:"instagram"`
			Github    string `json:"github"`
		} `json:"social"`
	} `json:"homepage"`
	Footer struct {
		GithubProfile string `json:"github_profile"`
	} `json:"footer"`
}

// Content represents a content item (blog post, project, etc.)
type Content struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Date        time.Time `json:"date"`
	Image       string    `json:"image"`
	URL         string    `json:"url"`
	Content     template.HTML    `json:"content"`
	Tags        []string  `json:"tags"`
}

// SiteData represents all the data needed for the site
type SiteData struct {
	Config     Config
	Projects   []Content
	Personal   []Content
	BlogPosts  []Content
	BuildTime  time.Time
}

func main() {
	fmt.Println("Starting static site generation...")

	// Load configuration
	config, err := loadConfig("config.json")
	if err != nil {
		log.Fatal("Error loading config:", err)
	}

	// Create site data
	siteData := SiteData{
		Config:    *config,
		BuildTime: time.Now(),
	}

	// Load content from markdown files
	projects, err := loadContent("content/projects", "projects")
	if err != nil {
		log.Printf("Warning: Error loading projects: %v", err)
	}
	// Sort projects by date descending
	sort.Slice(projects, func(i, j int) bool {
		return projects[i].Date.After(projects[j].Date)
	})
	siteData.Projects = projects

	personal, err := loadContent("content/personal-projects", "personal-projects")
	if err != nil {
		log.Printf("Warning: Error loading personal projects: %v", err)
	}
	// Sort personal projects by date descending
	sort.Slice(personal, func(i, j int) bool {
		return personal[i].Date.After(personal[j].Date)
	})
	siteData.Personal = personal

	blogPosts, err := loadContent("content/blog", "blog")
	if err != nil {
		log.Printf("Warning: Error loading blog posts: %v", err)
	}
	siteData.BlogPosts = blogPosts

	// Create public directory
	if err := os.MkdirAll("public", 0755); err != nil {
		log.Fatal("Error creating public directory:", err)
	}

	// Copy static files
	if err := copyStaticFiles(); err != nil {
		log.Fatal("Error copying static files:", err)
	}

	// Generate pages
	if err := generatePages(siteData); err != nil {
		log.Fatal("Error generating pages:", err)
	}

	fmt.Println("Static site generation completed successfully!")
}

func loadConfig(configPath string) (*Config, error) {
	data, err := ioutil.ReadFile(configPath)
	if err != nil {
		return nil, err
	}

	var config Config
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

func loadContent(contentDir, contentType string) ([]Content, error) {
	var contents []Content

	// Check if directory exists
	if _, err := os.Stat(contentDir); os.IsNotExist(err) {
		return contents, nil
	}

	files, err := ioutil.ReadDir(contentDir)
	if err != nil {
		return nil, err
	}

	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithParserOptions(
			parser.WithAutoHeadingID(),
		),
		goldmark.WithRendererOptions(
			html.WithHardWraps(),
			html.WithXHTML(),
		),
	)

	for _, file := range files {
		if file.IsDir() || !strings.HasSuffix(file.Name(), ".md") {
			continue
		}

		filePath := filepath.Join(contentDir, file.Name())
		data, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Printf("Warning: Error reading %s: %v", filePath, err)
			continue
		}

		// Parse front matter and content
		content, err := parseMarkdownFile(data, file.Name(), contentType, md)
		if err != nil {
			log.Printf("Warning: Error parsing %s: %v", filePath, err)
			continue
		}

		contents = append(contents, *content)
	}

	return contents, nil
}

func parseMarkdownFile(data []byte, filename, contentType string, md goldmark.Markdown) (*Content, error) {
	// Simple front matter parsing (assumes YAML-like format)
	lines := strings.Split(string(data), "\n")
	
	var frontMatter []string
	var contentLines []string
	inFrontMatter := false
	
	for i, line := range lines {
		if i == 0 && strings.TrimSpace(line) == "---" {
			inFrontMatter = true
			continue
		}
		
		if inFrontMatter && strings.TrimSpace(line) == "---" {
			inFrontMatter = false
			continue
		}
		
		if inFrontMatter {
			frontMatter = append(frontMatter, line)
		} else {
			contentLines = append(contentLines, line)
		}
	}
	
	// Parse front matter
	content := &Content{
		Title:       strings.TrimSuffix(filename, ".md"),
		Description: "",
		Date:        time.Now(),
		Image:       "",
		URL:         "",
		Tags:        []string{},
	}
	
	for _, line := range frontMatter {
		parts := strings.SplitN(line, ":", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])
			
			switch key {
			case "title":
				content.Title = value
			case "description":
				content.Description = value
			case "date":
				if t, err := time.Parse("2006-01-02", value); err == nil {
					content.Date = t
				}
			case "image":
				content.Image = value
			case "tags":
				content.Tags = strings.Split(value, ",")
				for i, tag := range content.Tags {
					content.Tags[i] = strings.TrimSpace(tag)
				}
			}
		}
	}
	
	// Convert markdown content to HTML
	contentText := strings.Join(contentLines, "\n")
	var buf strings.Builder
	if err := md.Convert([]byte(contentText), &buf); err != nil {
		return nil, err
	}
	content.Content = template.HTML(buf.String())
	
	// Generate URL
	content.URL = fmt.Sprintf("/%s/%s.html", contentType, strings.TrimSuffix(filename, ".md"))
	
	return content, nil
}

func copyStaticFiles() error {
	// Copy static directory to public
	return filepath.Walk("static", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		
		// Calculate relative path
		relPath, err := filepath.Rel("static", path)
		if err != nil {
			return err
		}
		
		publicPath := filepath.Join("public", relPath)
		
		if info.IsDir() {
			return os.MkdirAll(publicPath, 0755)
		}
		
		// Create directory if it doesn't exist
		dir := filepath.Dir(publicPath)
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
		
		// Always overwrite the file with the latest version
		input, err := ioutil.ReadFile(path)
		if err != nil {
			return err
		}
		
		return ioutil.WriteFile(publicPath, input, 0644)
	})
}

func generatePages(siteData SiteData) error {
	// Load templates
	tmpl, err := template.ParseGlob("templates/*.html")
	if err != nil {
		return err
	}
	
	// Generate index page
	if err := generatePage(tmpl, "index", "public/index.html", siteData); err != nil {
		return err
	}
	
	// Generate projects page
	if err := generatePage(tmpl, "projects", "public/projects.html", siteData); err != nil {
		return err
	}
	
	// Generate personal projects page
	if err := generatePage(tmpl, "personal", "public/personal.html", siteData); err != nil {
		return err
	}
	
	// Generate blog page
	if err := generatePage(tmpl, "blog", "public/blog.html", siteData); err != nil {
		return err
	}
	
	// Generate individual content pages
	if err := generateContentPages(tmpl, siteData); err != nil {
		return err
	}
	
	// Generate 404 page
	if err := generatePage(tmpl, "404", "public/404.html", siteData); err != nil {
		return err
	}
	
	// Generate thanks page
	if err := generatePage(tmpl, "thanks", "public/thanks.html", siteData); err != nil {
		return err
	}
	
	return nil
}

func generatePage(tmpl *template.Template, templateName, outputPath string, data interface{}) error {
	file, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer file.Close()
	
	return tmpl.ExecuteTemplate(file, templateName, data)
}

func generateContentPages(tmpl *template.Template, siteData SiteData) error {
	// Generate project pages
	for _, project := range siteData.Projects {
		outputPath := filepath.Join("public", strings.TrimPrefix(project.URL, "/"))
		if err := generateContentPage(tmpl, "project", outputPath, project, siteData); err != nil {
			return err
		}
	}
	
	// Generate personal project pages
	for _, personal := range siteData.Personal {
		outputPath := filepath.Join("public", strings.TrimPrefix(personal.URL, "/"))
		if err := generateContentPage(tmpl, "personal-project", outputPath, personal, siteData); err != nil {
			return err
		}
	}
	
	// Generate blog post pages
	for _, post := range siteData.BlogPosts {
		outputPath := filepath.Join("public", strings.TrimPrefix(post.URL, "/"))
		if err := generateContentPage(tmpl, "blog-post", outputPath, post, siteData); err != nil {
			return err
		}
	}
	
	return nil
}

func generateContentPage(tmpl *template.Template, templateName, outputPath string, content Content, siteData SiteData) error {
	// Create directory if it doesn't exist
	dir := filepath.Dir(outputPath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}
	
	file, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer file.Close()
	
	data := struct {
		Content Content
		Site    SiteData
	}{
		Content: content,
		Site:    siteData,
	}
	
	return tmpl.ExecuteTemplate(file, templateName, data)
} 