# Dr. Appointment

This is a React.js project for managing doctor appointments.
This is deployed link: https://dr-appointmentt.netlify.app   (Since this is hosted on a free server, it may take some time for the server to respond).

## Prerequisites

- Ensure you have **Node.js** and **npm** installed on your system.
- A running backend server accessible at `http://localhost:8080`.

## Setup Instructions

Follow these steps to set up and run the project:

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   
2. **Install Dependencies**
    Run the following command to install the necessary dependencies:
    npm install

    If you encounter peer dependency issues, use:
    npm install --legacy-peer-deps

3. **ADD Environment Variable**
   Create a .env file in the root directory and add the following line:
   REACT_APP_API=http://localhost:8080
   
4.  **Start the Application**
    Run the project using: npm start

5.  **Access the Application**
    Open your browser and navigate to http://localhost:3000.

## Workflow of Project Dr.Appointment .................................................................................................................................

The project workflow involves three types of users: **Admin**, **Doctor**, and **User**. Below is the detailed flow:

---

### 1. **Login Page**
   - The application starts with a login page.
   - There are three types of users: **Admin**, **Doctor**, and **User**.

---

### 2. **Admin Workflow**
   - Admin Credentials:  
     - **Email**: vijendra.maurya@ikonworkk.com  
     - **Password**: Ayush@123  
   - After logging in, the Admin can:  
     - Access the **Doctor Requests Page**: View and either **accept** or **reject** doctor registration requests.  
     - Access the **Users Page**: Manage user details.  

---

### 3. **User Workflow**
   - A new user can register with a valid email and password.
   - After logging in, the user has two options:  
     1. **Use the account as a User only**:  
        - Search for doctors based on their specialties or availability.  
        - Book an appointment with a doctor of choice.  
        - Check the availability of a doctor.  
        - Wait for the doctor to approve the appointment request.  
        - Receive a **notification** when the doctor approves or rejects the request.  
     2. **Apply as a Doctor**:  
        - Fill out the **Doctor Registration Form**.  
        - The registration request is sent to the Admin for approval.  

---

### 4. **Doctor Workflow**
   - Once a user's doctor request is **approved by the Admin**, the user becomes a Doctor.  
   - The Doctor has access to a **Doctor Dashboard** with the following features:  
     - **Appointments Page**: View a list of all appointment requests.  
     - Approve or reject appointment requests from users.  
   - When the Doctor approves a user's appointment request, the user receives a **notification**.  

---

### Summary of Notifications:
   - **User**: Notified when their appointment request is approved or rejected by the Doctor.  
   - **Admin**: Notified when a new doctor registration request is submitted.  
   - **Doctor**: Notified when a new appointment request is made by a User.

---

### Example Flow:
1. A new user registers and logs in.  
2. The user chooses to either:  
   - Use the account as a **User only**.  
   - Apply as a **Doctor** by submitting a form.  
3. The Admin reviews the doctor request and either accepts or rejects it.  
4. If accepted, the user becomes a Doctor and gains access to the Doctor Dashboard.  
5. The User books an appointment with a Doctor.  
6. The Doctor approves or rejects the appointment request.  
7. The User receives a notification about the Doctor's decision.

---

This workflow ensures a smooth and clear interaction between the Admin, Doctor, and User roles.
