# Dr. Cinema

This repository contains the application for assignment 2 for the App Development course at Reykjavík University. The course covers key topics in modern app development, including React Native, ES6, Expo, development environments, app publishing, Redux, and more. It provides the foundational knowledge and hands-on skills needed to begin building and deploying mobile applications.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
    - [Clone the Repository](#1-clone-the-repository)
    - [Go Into the repository](#2-go-into-the-repository)
    - [Install Depedencies](#3-intall-depedencies)
    - [Add API Credentials](#4-add-api-credentials)
    - [Test API](#5-test-api)
- [Running the Application Guide](#running-the-application-guide)
- [Primary Development Platform](#primary-development-platform)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Collaborators](#collaborators)

## Project Structure

``` bash

```

## Prerequisites

## Installation Guide

### 1. Clone the Repository

Open your terminal and clone the repository into a desired directory.

```bash
git clone https://github.com/guiroquue/Dr-Cinema.git
```

### 2. Go Into the Repository

Inside the terminal, travel into the repository.

```bash
cd /dr-cinema
```

### 3. Intall Depedencies

Install the required depedencies with the node package manager.

```bash
npm install
```

### 4. Add API Credentials

Before running the app, create an **.env** file in the project root and add your Kvikmyndir API credentials.

You can use **.env.example** as a reference.
The required structure is:

```bash
# Kvikmyndir API
EXPO_PUBLIC_KVIKMYNDIR_BASE_URL=https://api.kvikmyndir.is
EXPO_PUBLIC_KVIKMYNDIR_API_KEY=your_api_key_here
```

> Note: You can obtain an API key by creating an account at [https://api.kvikmyndir.is] and following their setup instructions.

### 5. Test API

You can test all endpoints after putting in your API token inside the **.env** file by running:

```bash
npm run test-api
```

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

## Technologies Used

## Screenshots

## Collaborators

*Guilherme Baía Roque*, *Mariana Fedorovych*, *Þorvaldur Breki Lárusson*
