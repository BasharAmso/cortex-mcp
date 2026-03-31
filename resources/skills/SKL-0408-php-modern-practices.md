---
id: SKL-0408
name: PHP Modern Practices
category: skills
tags: [php, laravel, composer, psr-standards, php8, modern-php]
capabilities: [laravel-application-design, composer-dependency-management, psr-compliance, modern-php-features]
useWhen:
  - building web applications with PHP and Laravel
  - modernizing a legacy PHP codebase
  - using Composer for dependency management
  - applying PSR standards to PHP projects
  - leveraging PHP 8+ features like enums and fibers
estimatedTokens: 650
relatedFragments: [SKL-0409, PAT-0207, PAT-0209]
dependencies: []
synonyms: ["how to write modern PHP", "Laravel tutorial", "PHP 8 features", "Composer dependency management", "PSR standards guide", "how to structure a PHP project"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/laravel/laravel"
difficulty: intermediate
owner: "cortex"
pillar: "language"
---

# Skill: PHP Modern Practices

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0408 |
| **Name** | PHP Modern Practices |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Modern PHP (8.0+) is a far cry from its legacy reputation. With strict typing, enums, fibers, and frameworks like Laravel, PHP powers performant, well-structured web applications.

### PHP 8+ Features

PHP 8 introduced named arguments, union types, match expressions, and attributes. PHP 8.1 added enums, fibers, and readonly properties. PHP 8.2 brought readonly classes and disjunctive normal form types. Use strict typing (`declare(strict_types=1)`) in every file. Type-hint everything: parameters, return types, and properties.

```php
enum OrderStatus: string {
    case Pending = 'pending';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
}

function processOrder(Order $order): OrderStatus {
    return match(true) {
        $order->isShipped() => OrderStatus::Shipped,
        $order->isDelivered() => OrderStatus::Delivered,
        default => OrderStatus::Pending,
    };
}
```

### Laravel Framework

Laravel provides routing, Eloquent ORM, Blade templating, queues, and authentication out of the box. Use Artisan commands to scaffold models, controllers, and migrations. Follow the service-repository pattern for complex business logic. Use Form Requests for validation, middleware for cross-cutting concerns, and Events/Listeners for decoupled workflows.

### Composer and PSR Standards

Composer is PHP's dependency manager. Use `composer.json` to declare dependencies and autoloading. Follow PSR-4 for autoloading, PSR-12 for coding style, PSR-7 for HTTP messages, and PSR-15 for middleware. Run `composer audit` to check for known vulnerabilities in dependencies.

### Testing

PHPUnit is the standard. Laravel provides testing helpers: `$this->get('/api/users')->assertOk()`. Use Pest PHP for a more expressive syntax. Database testing uses `RefreshDatabase` trait. Mock external services with `Http::fake()`.

## Key Takeaways

- Always use `declare(strict_types=1)` and type-hint everything
- PHP 8 enums replace magic strings and class constants for finite state
- Laravel Form Requests and middleware keep controllers thin
- Follow PSR standards for interoperability and code consistency
- Use `composer audit` and keep dependencies updated
