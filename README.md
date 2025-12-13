# Dr Cinema

This repository contains the Dr. Cinema mobile application, built as part of the App Development course at Reykjavík University. The course covers key topics in modern app development, including React Native, TypeScript, Expo, Redux, API integration, and app deployment. The project emphasizes building a well-structured, maintainable application with reusable components, consistent styling, and persistent data management.

#### Project Overview
Dr. Cinema is a mobile application that allows users to browse movies currently showing in cinemas, as well as upcoming releases. The app integrates with an external API provided by kvikmyndir.is
to retrieve real-time information about movies, cinemas, showtimes, and trailers. Users can also manage a personalized list of favorite movies.
The application is fully built with Expo and TypeScript, and it leverages Redux for state management.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
    - [Clone the Repository](#1-clone-the-repository)
    - [Go Into the repository](#2-go-into-the-repository)
    - [Install Depedencies](#3-intall-depedencies)
- [Running the Application Guide](#running-the-application-guide)
- [Primary Development Platform](#primary-development-platform)
- [Features](#features)
- [Extras](#extras)
- [Screenshots](#screenshots)
- [Collaborators](#collaborators)

## Project Structure

``` bash
.
├── README.md
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── expo-router.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
│
├── screenshots/
│   ├── simulator_photo_01.png
│   ├── simulator_photo_02.png
│   ├── simulator_photo_03.png
│   └── simulator_photo_04.png
│
└── src/
    ├── app/
    │   ├── (tabs)/
    │   │   ├── theaters/
    │   │   │   └── index.tsx
    │   │   ├── upcoming/
    │   │   │   └── index.tsx
    │   │   ├── _layout.tsx
    │   │   └── index.tsx
    │   │
    │   ├── favorites/
    │   ├── movie_details/
    │   ├── theater_details/
    │   └── _layout.tsx
    │
    ├── assets/
    │   ├── images/
    │   │   ├── favicon.svg
    │   │   ├── icon.png
    │   │   └── splash-icon.png
    │   └── icons/
    │       ├── cassette_icon.svg
    │       ├── popcorn_icon.svg
    │       ├── projector_icon.svg
    │       └── rotten_tomatoes.svg
    │
    ├── components/
    │   ├── ui/
    │   │   ├── movie_card.tsx
    │   │   ├── movie_filters.tsx
    │   │   ├── scroll_to_top_button.tsx
    │   │   ├── theater_card.tsx
    │   │   ├── theater_website_link.tsx
    │   │   └── movie_details/
    │   │       ├── favorite_button.tsx
    │   │       ├── movie_info.tsx
    │   │       ├── index.tsx
    │   │       └── cassette_icon.svg
    │   │
    │   └── views/
    │       ├── favorites_view.tsx
    │       ├── home_view.tsx
    │       ├── movie_details_view.tsx
    │       ├── theaters_view.tsx
    │       ├── theater_details_view.tsx
    │       └── upcoming_view.tsx
    │
    ├── constants/
    │   └── theme.ts
    │
    ├── services/
    │   ├── api.ts
    │   ├── current_movie_service.ts
    │   ├── movie_details.ts
    │   ├── theaters_service.ts
    │   ├── upcoming_movies_service.ts
    │   └── upcoming_movie_details.ts
    │
    ├── store/
    │   ├── current_movie_slice.ts
    │   ├── current_movie_details_slice.ts
    │   ├── favorites_slice.ts
    │   ├── reviews_slice.ts
    │   ├── theaters_slice.ts
    │   ├── upcoming_movies_slice.ts
    │   ├── upcoming_movie_details_slice.ts
    │   ├── hooks.ts
    │   └── index.ts
    │
    ├── types/
    │   ├── movie.ts
    │   └── theatre.ts
    │
    └── utils/
        ├── date_formatter.ts
        ├── favorite_movies.ts
        ├── filter_theater.ts
        ├── filter_upcoming.ts
        ├── get_type.ts
        ├── linking.ts
        ├── movie_dedupe.ts
        ├── movie_filtering.ts
        ├── movie_group.ts
        ├── movie_sort.ts
        └── share_favorites.ts

```

## Prerequisites

- Node.js (v14 or higher)
- npm
- React Native CLI
- Xcode (for iOS development)

## Installation Guide

### 1. Clone the Repository

Open your terminal and clone the repository into a desired directory.

```bash
git clone https://github.com/guiroquue/The-Contactor.git
```

### 2. Go Into the Repository

Inside the terminal, travel into the repository.

```bash
cd The-Contactor
```

### 3. Intall Depedencies

Install the required depedencies with the node package manager.

```bash
npm install
```

### 4. Set Up Environment Variables
Create a .env file in the root of the project by copying the provided example file:
```bash
cp .env.example .env
```
Then, open the .env file and replace the placeholder values with your API key for the movie API.

⚠️ The app will not function correctly without a valid API key.

## Running the Application Guide

Run the application with Expo.

```bash
npm start
```

## Primary Development Platform

- Primary Platform: [iOS]
- Test Device: [e.g., iPhone 16e]
- OS Version: [e.g., iOS 26.1]

## Features

- View contacts
- Search contacts
- Ordered contacts
- Import contacts from the OS
- Create a new contact (*name, number and photo*)
- Edit a contact (*name, number and photo*)

## Extras

- Custom app icon

## Screenshots

<p align="center">
    <img src="./screenshots/simulator_photo_01.png" width="200">
    <img src="./screenshots/simulator_photo_02.png" width="200">
    <img src="./screenshots/simulator_photo_03.png" width="200">
    <img src="./screenshots/simulator_photo_04.png" width="200">
</p>

## Collaborators

*Guilherme Baía Roque*, *Mariana Fedorovych*, *Þorvaldur Breki Lárusson*
