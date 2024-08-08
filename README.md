# ClinicConnect

ClinicConnect is a comprehensive clinic management system built with React and Node.js. It provides a platform for doctors and receptionists to manage patient information, generate tokens, assign charges, and manage prescriptions.

## Features

- **Doctor Login**: Doctors can log in to the system to view and manage patient details.
- **Receptionist Login**: Receptionists can log in to assign tokens, create charges, and manage patient records.
- **Token Generation**: Automatically generates token numbers for new patients.
- **Patient Information**: Records and maintains detailed patient information including prescriptions.
- **Prescription Management**: Doctors can add prescriptions to a patient's record.
- **404 Not Found Page**: A user-friendly 404 page is displayed when users try to access a non-existent route.


## Installation

### Prerequisites

- Node.js and npm
- MongoDB

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/ClinicConnect.git
   cd ClinicConnect




- **Install dependencies:**
    
    bash
    
    Copy code
    
    `npm install`
    
- **Start the development server:**
    
    bash
    
    Copy code
    
    `npm start`
    
    The app will be available at http://localhost:3000.
## API Endpoints

- **GET /api/patients/
    **: Fetch details of a patient by their ID.
- **POST /api/patients/
    /prescription**: Add a prescription to a patient's record (Doctor-only).
    
## Technology Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS
