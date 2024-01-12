# Hotel Booking App

A travel booking website that allows users to search for accommodations and make a reservation. It uses Google Map API to locate listed hotels on the map.

## Table of Contents

- Getting Started
  - Prerequisites
  - Installation
- Obtaining API Key

## Getting Started

### Prerequisites

1. Google Map API key:
     - Follow the instructions in the Obtaining API Key section to obtain the `API Key`.

### Installation

1. Clone the repository: `https://github.com/priyanshudevsingh/Hotel-Booking-App.git`
2. Go to the App Folder. `Hotel-Booking-App`
3. Open the CodeBase in your IDE. `code .`
4. Install the node_modules. `npm install`
5. Run the App. `npm start`

The application will start on http://localhost:3000.

## Obtaining API Key

To use the Gmail API, you need to set up API credentials. Follow these steps:

1. Go to the [Google Maps Cloud Platform](https://mapsplatform.google.com/) and click on Get Started.
2. Create a new project by clicking on the "Select a project" dropdown in the top bar, then click on "New Project."
3. Select the newly created project by clicking on "Select a project" again.
4. Now click on Key & Credentials from the sidebar.
5. Fill in your country and then your personal details and credit/debit card details."
6. After successfully filling you will get api key.
7. Copy that API key and make a .env file and add it there as `REACT_APP_GOOGLE_MAPS_API_KEY="<your_api_key>"`.
8. Now you are good to go.
