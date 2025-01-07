
# Airbnb Clone

This is a fully functional **Airbnb clone** built using **Next.js**, **TypeScript**, and **MongoDB**. The application provides the basic functionalities of Airbnb, including **user authentication**, **property listings**, and a **booking system**.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles via **OAuth authentication** using **Google** and **GitHub**.
- **Listing Properties**: Hosts can list their properties for rent, including descriptions, photos, pricing, etc.
- **Booking System**: Users can search for available listings and book properties.
- **Filters**: Users can filter properties based on location, price, and other parameters.
- **Responsive Design**: Fully responsive UI for both mobile and desktop.

## Technologies Used

- **Frontend**: Next.js, TypeScript
- **Database**: MongoDB
- **Authentication**: Auth.js (OAuth with Google and GitHub)
- **State Management**: React Context or hooks
- **CSS Framework**: Tailwind CSS

## Deployed Link

You can view the live version of the project here:

[**View Airbnb Clone**](https://airbnb-clone-ayush.vercel.app/)

## Setup Instructions

Follow these steps to get the project running locally:

### Prerequisites

- **Node.js** and **npm** must be installed on your machine. If you don't have them, you can download and install from [Node.js website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Ayusht0mar/airbnb-clone
   ```

2. Navigate to the project directory:

   ```bash
   cd airbnb-clone
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables:
   
   Create a `.env.local` file in the root of your project and add the necessary environment variables. For example:

   ```bash
    DATABASE_URL=<your_mongo_connection_string>

    NEXTAUTH_SECRET=<your_auth_secret>

    AUTH_GITHUB_ID=<your_github_id>
    AUTH_GITHUB_SECRET=<your_github_secret>

    AUTH_GOOGLE_ID=<your_google_id>
    AUTH_GOOGLE_SECRET=<your_google_secret>


    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloudinary_key>
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Features and Functionalities

### User Authentication

- **Sign Up/Login via OAuth**: Users can sign up or log in using **Google** or **GitHub** accounts via **Auth.js** integration.
- **Logout**: Users can log out from their sessions.
- **JWT Authentication**: All requests requiring authentication are secured with JWT tokens.

### Listing Properties

- **Property Creation**: Hosts can list their properties with descriptions, photos, and availability.
- **Search and Filters**: Users can search for properties and filter them by location, price, and other parameters.

### Booking System

- **Availability Check**: Users can view available properties and book them.
- **Booking Confirmation**: Once a booking is made, users receive a confirmation.
- **Booking History**: Users can view their past bookings.
