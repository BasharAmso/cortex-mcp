---
id: SKL-0409
name: Ruby & Rails
category: skills
tags: [ruby, rails, activerecord, convention-over-configuration, generators, mvc]
capabilities: [rails-application-design, activerecord-modeling, convention-based-development, rapid-prototyping]
useWhen:
  - building web applications with Ruby on Rails
  - using ActiveRecord for database interactions
  - scaffolding features with Rails generators
  - following convention over configuration principles
  - prototyping web applications quickly
estimatedTokens: 650
relatedFragments: [SKL-0408, PAT-0207, PAT-0209]
dependencies: []
synonyms: ["how to build a Rails app", "Ruby on Rails tutorial", "ActiveRecord guide", "Rails generators", "convention over configuration explained", "how to structure a Rails project"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/rails/rails"
difficulty: beginner
owner: "cortex"
pillar: "language"
---

# Skill: Ruby & Rails

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0409 |
| **Name** | Ruby & Rails |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Ruby on Rails pioneered the "convention over configuration" philosophy that influenced nearly every web framework since. Rails optimizes for developer happiness and rapid iteration, making it ideal for MVPs and startups.

### Convention Over Configuration

Rails makes decisions for you: model names map to table names (User to users), controllers map to routes, and views live in predictable directories. Follow the conventions and you write far less code. Fight them and you fight the framework. The "Rails Way" means embracing these defaults: RESTful routes, MVC structure, and database-backed models.

### ActiveRecord

ActiveRecord is Rails' ORM. Models are Ruby classes that inherit from `ApplicationRecord`. Associations (`has_many`, `belongs_to`, `has_many :through`) define relationships. Validations live in the model. Scopes provide reusable query fragments. Use `includes` to prevent N+1 queries.

```ruby
class Article < ApplicationRecord
  belongs_to :author
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 255 }
  scope :published, -> { where(status: 'published') }
  scope :recent, -> { order(created_at: :desc).limit(10) }
end
```

### Generators and Scaffolding

Rails generators create models, controllers, migrations, and tests with a single command. `rails generate scaffold Post title:string body:text` creates the full CRUD stack. Use generators to maintain consistency, then customize. Migrations version your database schema and are reversible by default.

### Modern Rails (7+)

Rails 7 introduced Hotwire (Turbo + Stimulus) for rich interactions without heavy JavaScript. Import maps replace Webpack. Action Cable handles WebSockets. Solid Queue and Solid Cache provide database-backed job queuing and caching. These defaults reduce dependency on external services during development.

## Key Takeaways

- Follow Rails conventions to maximize productivity and minimize configuration
- Use `includes` and scopes to write efficient, readable ActiveRecord queries
- Generators maintain consistency across the codebase
- Rails 7+ Hotwire reduces JavaScript complexity for interactive features
- Migrations keep database schema versioned and reversible
