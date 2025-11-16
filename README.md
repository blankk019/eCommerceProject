# Cyber - Modern eCommerce Platform

A feature-rich, fully responsive eCommerce web application built with Angular 18, offering a seamless shopping experience with modern UI/UX design and Progressive Web App capabilities.

## Features

### User Interface

- **Modern Design System**: Clean, professional interface with custom CSS variables and Inter font family
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Hero Sections**:
  - iPhone 14 Pro showcase section with elegant typography
  - Carousel slider for featured collections and promotions
  - Big Summer Sale banner section
- **Product Cards**: Interactive cards with hover effects, wishlist buttons, and quick actions
- **Side Banners**: Featured product highlights (PlayStation 5, MacBook Air)

### Shopping Features

- **Product Catalog**: Browse products with pagination and filtering
- **Product Details**: Comprehensive product information with image carousel
- **Shopping Cart**: Add/remove items, update quantities, view cart total
- **Wishlist**: Save favorite products for later
- **Categories & Brands**: Filter products by category and brand
- **Search Functionality**: Quick product search

### Authentication & Authorization

- **User Registration**: Create new account with email validation
- **User Login**: Secure authentication with JWT tokens
- **Route Guards**:
  - `authGuard`: Protects authenticated routes
  - `loggedGuard`: Prevents logged-in users from accessing auth pages
- **Password Recovery**: Forgot password functionality
- **Profile Management**: User profile dropdown with conditional rendering

### Progressive Web App (PWA)

- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Service worker for offline functionality
- **Smart Caching**:
  - Products cached for 1 hour
  - Categories and brands cached for 6 hours
  - User data cached for 5 minutes
- **Install Prompt**: Custom install button with animated icon
- **App Shortcuts**: Quick access to Products, Cart, and Categories

### User Experience

- **Mobile Navigation**: Slide-in drawer from right with backdrop overlay
- **Profile Dropdown**: Context-aware menu (Login/Register or Profile/Logout)
- **Breadcrumbs**: Easy navigation on product details page
- **Loading States**: Spinner integration with ngx-spinner
- **Toast Notifications**: Success/error messages with ngx-toastr
- **Smooth Animations**: CSS transitions and hover effects throughout

### Checkout Process

- **Multi-step Checkout**: Step-by-step checkout process with stepper UI
- **Address Management**: Add and select delivery addresses
- **Shipping Options**: Choose shipping method
- **Order Summary**: Review items before purchase
- **Receipt Page**: Order confirmation and details

## Technologies Used

### Frontend Framework

- **Angular 18.2.x**: Latest Angular with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for data streams

### UI/UX Libraries

- **Bootstrap 5**: Responsive grid system and components
- **Bootstrap Icons**: Icon library
- **ngx-owl-carousel-o**: Touch-enabled carousel slider
- **ngx-spinner**: Loading spinner animations
- **ngx-toastr**: Toast notification system

### PWA & Performance

- **@angular/pwa**: Progressive Web App support
- **@angular/service-worker**: Service worker for caching and offline support
- **esbuild**: Fast build tool for development

### State Management & Routing

- **Angular Router**: Client-side routing with lazy loading
- **Route Guards**: Custom guards for authentication
- **JWT Decode**: Token decoding for user data
- **LocalStorage**: Client-side data persistence

### HTTP & API

- **Angular HttpClient**: RESTful API communication
- **HTTP Interceptors**: Token injection for authenticated requests

### Development Tools

- **Angular CLI**: Project scaffolding and development server
- **TypeScript**: Static type checking
- **ESLint**: Code quality and linting
- **Git**: Version control

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/              # Route guards (auth, logged)
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── interfaces/          # TypeScript interfaces
│   │   └── services/            # Core services (auth, cart, products, etc.)
│   ├── features/                # Feature modules
│   │   ├── auth/                # Authentication (login, register)
│   │   ├── home/                # Home page with hero sections
│   │   ├── products/            # Product listing
│   │   ├── product-details/     # Product detail page
│   │   ├── cart/                # Shopping cart
│   │   ├── checkout/            # Checkout process
│   │   ├── categories/          # Category browsing
│   │   ├── brands/              # Brand browsing
│   │   └── profile/             # User profile
│   ├── layouts/                 # Layout components
│   │   ├── auth-layout/         # Layout for auth pages
│   │   └── main-layout/         # Layout for main app
│   ├── shared/                  # Shared components
│   │   ├── components/          # Reusable components (product-card, etc.)
│   │   ├── nav-main/            # Main navigation
│   │   ├── nav-auth/            # Auth navigation
│   │   └── footer/              # Footer component
│   └── app.config.ts            # App configuration
├── assets/                      # Static assets (images, icons)
└── styles.css                   # Global styles with CSS variables
```

## Design System

### Color Palette

- **Primary**: `#111827` (Dark Gray)
- **Accent**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)
- **Background**: `#f9fafb` (Light Gray)

### Typography

- **Font Family**: Inter (300, 400, 500, 600, 700, 800 weights)
- **Responsive Text**: Scales down on mobile devices

### Components

- **Border Radius**: 12px (default), 8px (small)
- **Shadows**: 4-tier system (sm, md, lg, xl)
- **Transitions**: Smooth cubic-bezier animations

## Responsive Breakpoints

- **Extra Large**: 1200px+
- **Large**: 992px - 1199px
- **Medium**: 768px - 991px
- **Small**: 576px - 767px
- **Extra Small**: < 576px

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/blankk019/eCommerceProject.git
cd eCommerceProject
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm start
```

4. Open browser at `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint code

## Key Services

### AuthService

- User registration and login
- Token management
- User data persistence
- Sign out functionality

### ProductsService

- Fetch all products with pagination
- Get product details
- Filter by category/brand

### CartService

- Add/remove items from cart
- Update quantities
- Calculate totals

### CategoriesService & BrandsService

- Fetch categories and brands
- Filter products

### PwaService

- PWA install prompt handling
- Service worker management

## Route Guards

### authGuard

Protects routes that require authentication (cart, checkout, profile)

### loggedGuard

Prevents logged-in users from accessing auth pages (login, register)

## Highlights

- Modern Angular 18 with standalone components
- PWA Ready with offline support and install capability
- Fully Responsive from mobile to desktop
- Type-Safe with TypeScript interfaces
- Clean Architecture with separation of concerns
- Smooth UX with animations and loading states
- Secure with JWT authentication and route guards

## Author

**Mamdouh**

- GitHub: [@blankk019](https://github.com/blankk019)

## License

This project is licensed under the MIT License.

---

Built with Angular
