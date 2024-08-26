# Opulence eShop

Opulence is a modern eCommerce platform built with React and Tailwind CSS for the frontend, Node.js and Express.js for the backend, and MongoDB for the database. The platform is designed to offer a seamless shopping experience with features like authentication, product management, and category-based browsing.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Opulence is designed to be a scalable and maintainable eCommerce platform. It supports product listing, category management, user authentication, and more. The platform is built with a modular architecture, making it easy to add new features and improve existing ones.

## Features

- **User Authentication**: Secure login and registration with Auth0 and Passport.js.
- **Product Management**: Create, update, delete, and view products.
- **Category Management**: Organize products into categories for easier browsing.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Real-time Updates**: Leveraging WebSockets for real-time data updates.
- **Hosted on Vercel**: Easily deployable with continuous integration and deployment.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Auth0, Passport.js
- **Hosting**: Vercel

## Installation

### Prerequisites

- **Node.js** and **npm/yarn** installed
- **MongoDB** installed or a MongoDB Atlas account

### Clone the Repository

````bash
git clone https://github.com/yourusername/opulence-eshop.git
cd opulence-eshop

``` bash
### Install dependencies
npm install
````

## Environmental Variables

- Create a .env file at the root of the frontend and api directories

#### The frontend Directory

VITE_URL = backend_url
VITE_LOGIN_ENDPOINT=/api/auth/login
VITE_REGISTER_ENDPOINT=/api/auth/register
VITE_MAIL_VERIFICATION_ENDPOINT=/api/auth/verify_mail
VITE_PERSONAL_INFORMATION="/api/user/personal-information"
VITE_REFRESH_TOKEN="/api/auth/refresh-jwt-token"
VITE_UPDATE_PERSONAL_INFORMATION="/api/user/update-personal-information"
VITE_UPDATE_PASSWORD="/api/user/update-password"
VITE_CONTACT_URL="/api/comms/contact-us"
VITE_CLOUDINARY_CLOUD_NAME = cloudinary_cloud_name
VITE_ADD_BRAND_ENDPOINT="/api/products/add-brand"
VITE_GET_BRAND_ENDPOINT="/api/products/all-brands"
VITE_GET_CATEGORIES_ENDPOINT="/api/products/all-categories"

#### For the api directory

DEFAULT_IMAGE_URL=DEFAULT_USER_IMAGE_URL
PORT=3000
SESSION_SECRET_KEY=SECRET_KEY
MONGO_URI=MONGODB_URL
LOCAL_MONGO_URI=LOCAL_MONGO_URI
DB='opulence'
PASSWORD=MONGO_DB_CONNECTION_PWSSWORD
JWT_REFRESH_TOKEN=REFRESH_TOKEN
JWT_TOKEN_SECRET=8JWT_TOKEN
FRONTEND_URL=http://localhost:5173
OPULENCE_MAIL= EMIAL_ADDRESS
OPULENCE_PWD= MAIL+PASSWORD
OPULENCE_MAIL=BISNESS MAIL
OPULENCE_HOST=EMAIL_HOST
GOOGLE_ID=GOOGLE_CONSOLE_ID
GOOGLE_CLIENT_SECRET=GOOGLE_SECRET_KEY
url=FRONTEND_URL

```bash
npm run dev
```

## Usage

#### Frontend

- Home Page: Lists all products with options to filter by categories.
- Product Details: View detailed information about each product.
- Cart: Manage items in the shopping cart.
- User Account: Register, log in, and manage your profile.

#### api

- API: Provides endpoints for managing products, categories, and users.

## API Endpoints

- GET /api/user/personal-information : retrieve user personal information
- POST /api/products/add-brand: Add brand to database
- GET /api/products/all-brands: Retrieve all brands
- GET /api/products/all-categories: Retrieve all categories
- POST /api/user/update-personal-information: update personal information
- GET /api/products/new-arrivals: Retrieve all latest arrivals
- POST /api/products/add-product-category: Add new product category
- GET /api/products/:product-name : Retrieve informayion about product
- GET /api/search:brand: Find products under brand

## Authentication

Authentication is handled via Auth0, with Passport.js used for local strategies. Users can sign up, log in, and access protected routes based on their roles.

### Setting Up Auth0

- Sign up for an Auth0 account.
- Create a new application in the Auth0 dashboard.
- Copy the domain, client ID, and client secret to your .env file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

### Steps to Contribute

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.

## License

### Customization Tips:

- Replace `yourusername` in the repository link with your GitHub username.
- Adjust the `API Endpoints` section according to the specific routes and methods you have implemented.
- Add more details in the `Features` and `Usage` sections based on the unique functionalities of your platform.

This `README.md` provides a solid foundation for documentation and should give users and contributors a clear understanding of your project.
