# Data Model Mermaid Diagram - Bridge Interface

This diagram represents the data model for the Phase 1 Static Jekyll Blog as defined in the specifications.

```mermaid
erDiagram
    BlogPost {
        string layout "REQUIRED: must be 'post'"
        string title "REQUIRED: 1-100 chars"
        date date "REQUIRED: YYYY-MM-DD"
        string author "REQUIRED: 1-50 chars"
        string excerpt "OPTIONAL: 50-200 chars"
        array tags "OPTIONAL: 1-10 lowercase-hyphenated"
        string image "OPTIONAL: featured image path"
        boolean published "OPTIONAL: defaults to true"
        string filename "Pattern: YYYY-MM-DD-slug.md"
        string url "Generated: /posts/title-slug/"
        string content "Rendered HTML from markdown"
        string id "Unique identifier from path"
    }

    StaticPage {
        string layout "REQUIRED: page|home|default"
        string title "REQUIRED: 1-100 chars"
        string permalink "REQUIRED: /path/ format"
        string description "OPTIONAL: 50-160 chars"
        string url "Matches permalink"
        string content "Rendered HTML"
    }

    DesignToken {
        string category "colors|typography|spacing|layout|effects"
        string token_name "Format: --category-name"
        string value "Valid CSS value"
        string usage "Human-readable description"
    }

    TemplateComponent {
        string name "Component identifier"
        string props "Liquid template parameters"
        string bem_class "Component__element--modifier"
        string usage "Documentation and examples"
    }

    Navigation {
        string section "main|footer"
        string title "1-20 chars"
        string url "Valid URL or path"
        boolean external "Opens in new tab"
        integer order "Display order"
    }

    JekyllConfig {
        string title "Site title"
        string description "Site description"
        string url "Production URL"
        string baseurl "Base URL path"
        string markdown "Processor: kramdown"
        string permalink "URL pattern"
        string timezone "Site timezone"
        array plugins "Jekyll plugins"
        array exclude "Files to exclude"
        object defaults "Frontmatter defaults"
    }

    %% Relationships
    BlogPost ||--o{ DesignToken : "styled with"
    StaticPage ||--o{ DesignToken : "styled with"
    
    TemplateComponent ||--o{ DesignToken : "uses"
    TemplateComponent ||--|| BlogPost : "renders"
    TemplateComponent ||--|| StaticPage : "renders"
    
    Navigation ||--o| StaticPage : "links to"
    Navigation ||--o| BlogPost : "links to"
    
    JekyllConfig ||--|| BlogPost : "configures"
    JekyllConfig ||--|| StaticPage : "configures"
    JekyllConfig ||--|| TemplateComponent : "configures"
    
    BlogPost }|--|| TemplateComponent : "uses post-card"
    
    %% Notes
    BlogPost ||--o{ BlogPost : "related via tags"
```

## Entity Storage Locations

```mermaid
graph TD
    A[Bridge Interface Repository] --> B[blog/]
    
    B --> C[_posts/]
    B --> D[pages/]
    B --> E[_includes/]
    B --> F[_layouts/]
    B --> G[_sass/]
    B --> H[_data/]
    B --> I[_config.yml]
    
    C --> C1[YYYY-MM-DD-slug.md<br/>Blog Posts]
    
    D --> D1[about.md<br/>Static Pages]
    D --> D2[atrium.md]
    
    E --> E1[header.html<br/>Template Components]
    E --> E2[footer.html]
    E --> E3[post-card.html]
    E --> E4[meta.html]
    E --> E5[analytics.html]
    
    F --> F1[default.html<br/>Layouts]
    F --> F2[page.html]
    F --> F3[post.html]
    F --> F4[home.html]
    
    G --> G1[_tokens.scss<br/>Design Tokens]
    G --> G2[_components.scss]
    G --> G3[main.scss]
    
    H --> H1[navigation.yml<br/>Navigation Config]
    H --> H2[design-tokens.yml<br/>Token Documentation]
    
    I --> I1[Jekyll Configuration]
```

## Data Flow Diagram

```mermaid
flowchart LR
    A[Markdown Files] --> B[Jekyll Build Process]
    C[YAML Frontmatter] --> B
    D[Design Tokens] --> B
    E[Template Components] --> B
    F[Navigation Config] --> B
    G[Jekyll Config] --> B
    
    B --> H[Static HTML Site]
    
    H --> I[Blog Post Pages]
    H --> J[Static Pages]
    H --> K[Home Page]
    H --> L[Post Listing]
    
    subgraph "Content Creation"
        A
        C
    end
    
    subgraph "Design System"
        D
        E
    end
    
    subgraph "Configuration"
        F
        G
    end
    
    subgraph "Generated Output"
        I
        J
        K
        L
    end
```

## Content Validation Flow

```mermaid
flowchart TD
    A[Content Created/Modified] --> B{Valid Frontmatter?}
    B -->|No| C[❌ Build Fails]
    B -->|Yes| D{File Naming Convention?}
    D -->|No| C
    D -->|Yes| E{Required Fields Present?}
    E -->|No| C
    E -->|Yes| F{Content Guidelines Met?}
    F -->|No| G[⚠️ Warning]
    F -->|Yes| H[✅ Content Valid]
    G --> I[Jekyll Build]
    H --> I
    I --> J[Static Site Generated]
```

## Template Component Architecture

```mermaid
graph TB
    A[Layout: default.html] --> B[Layout: page.html]
    A --> C[Layout: post.html]
    A --> D[Layout: home.html]
    
    B --> E[Include: header.html]
    C --> E
    D --> E
    
    B --> F[Include: footer.html]
    C --> F
    D --> F
    
    C --> G[Include: meta.html]
    D --> H[Include: post-card.html]
    
    E --> I[Data: navigation.yml]
    G --> J[Design Tokens]
    H --> J
    
    subgraph "Reusable Components"
        E
        F
        G
        H
    end
    
    subgraph "Page Layouts"
        B
        C
        D
    end
    
    subgraph "Base Layout"
        A
    end
```