# Crown Clothing E-Commerce App

An e-commerce web application built with React, Firebase, Redux Toolkit, Stripe, and other technologies.

![Crown Clothing App Screenshot](./src/assets/screencapture-localhost-3000-2023-10-11-16_47_54.png)

## Table of Contents

- [Crown Clothing E-Commerce App](#crown-clothing-e-commerce-app)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Description](#description)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Author](#author)

## Demo

You can experience the app live at [https://crwn-clothng-app.netlify.app/](https://crwn-clothng-app.netlify.app/).

## Description

This is a small e-commerce app designed to showcase key features such as user authentication, product listings, shopping cart, and secure payment processing with Stripe.

Key features include:

- User authentication using Firebase (Google Sign-In and Email/Password)
- Storing shop data on Firebase Cloud Firestore
- Product catalog and shopping cart
- Seamless and secure payment processing with Stripe API
- User-friendly and responsive user interface
- State management with Redux Toolkit
- State selection optimization with Reselect
- Local storage state persistence with Redux Persist
- Dynamic routing with React Router DOM
- Styling with SCSS

## Features

- **User Authentication**: Users can create accounts, sign in with Google, or use email and password for authentication.

- **Firebase cloud firestore**: Setting the shop data from the app to firestore, and retrieving the data into our app redux state.

- **Product Listings**: Display a variety of products with images, and prices.

- **Shopping Cart**: Users can add and remove items from their cart.

- **Payment Processing**: Securely process payments using the Stripe API.

- **State Management**: Manage application state using Redux Toolkit.

- **State Selection Optimization**: Enhance performance by optimizing state selection with Reselect.

- **Local Storage Persistence**: Persist application state to local storage for a seamless user experience.

- **Dynamic Routing**: Use React Router DOM for dynamic routing to different parts of the app.

- **Styling**: Style app with SCSS for flexibility and maintainability.

- **HOC**: Rendering a spinner div while data is being fetched from the Firebase Firestore 

## Technologies

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe API](https://stripe.com/docs/api)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Reselect](https://github.com/reduxjs/reselect)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [SCSS](https://sass-lang.com/)

## Author

- Frontend Mentor - [@Trayshmhirk](https://www.frontendmentor.io/profile/Trayshmhirk)
- Twitter - [@TrayShmhirk01](https://www.twitter.com/TrayShmhirk01)
