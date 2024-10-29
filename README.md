## **Coach and Student Scheduling System**

- ### LIVE DEMO: https://ecs4000.ddns.net/

### **Introduction**
  
  I’ve been working on the development of a scheduling platform designed to connect **coaches and students** seamlessly. This system allows coaches to manage their availability and feedback efficiently, while students can browse and book time slots with the coach of their choice. Below, I’ll walk through the platform’s design, features, challenges, and technical decisions.  
  
---
  ### **Project Overview**
  
  The goal of the project is to facilitate **effective booking management** between coaches and students, with a smooth user experience for both roles. The platform ensures that:  
- **Coaches** manage their availability by defining 2-hour slots.
- **Students** can browse available slots, book a session, and connect directly with the coach.
- **After sessions**, coaches provide feedback by rating student satisfaction and writing session notes.
  
---
 ### **Key Features and Workflow**
- **Role-based Dashboards**
	- **Coaches**:
		- View upcoming availability and manage slots.
		- Record student feedback after a session, including **satisfaction ratings (1-5)** and **free-form notes**.
		- View historical feedback on completed sessions.
	- **Students**:
		- Browse all available slots across different coaches.
		- Book sessions with any coach.
		- View both their booked sessions and coach contact information after booking.
- **Phone Number Visibility after Booking**
	- After a slot is successfully booked, **both the student and coach can view each other's phone numbers**, enabling direct communication.
- **Call Feedback System**
	- Each booked slot is associated with a **Call** record.
	- Coaches log **feedback** after calls, ensuring structured tracking of performance and session outcomes.
	- Feedback includes:
		- **Satisfaction score** (integer 1-5).
		- **Session notes** (optional).
- **Data Constraints**
	- Slots **cannot be created in the past** and cannot overlap with already-booked sessions.
	- Coaches **cannot book their own slots**.
	- Only **one student can book a slot** at a time.
	    
---
  ### **Backend Design Decisions**
- **Separation of Slot and Call Models**
	- **Slot Model**: Stores time-based availability data for each coach.
	- **Call Model**: Captures **feedback** related to a booked slot, decoupling the feedback logic from the slot management system to ensure flexibility.
	  This separation allows:  
		- Easier updates to the feedback system without interfering with the slot structure.
		- Scalability if we need to extend feedback functionality (e.g., adding follow-up actions or summaries).
- **Custom API Endpoints for Slots and Calls**
	- **Slots API**: Handles creation, listing, and filtering by **coach, student, and availability status**.
	- **Calls API**: Provides a **record or update endpoint** to log feedback after each session.
	    
---
- ### **Tech Stack and Architecture**
- **Frontend**:
	- **React**: Built with React to provide a smooth user interface for dashboards and slot management.
	- **React Router**: Enables seamless navigation between student and coach detail views.
- **Backend**:
	- **Django + Django Rest Framework** (DRF): Provides reliable APIs to manage **users, slots, and calls**.
	- **Relational Database**: Uses PostgreSQL to store user, slot, and feedback data.
- **Axios Integration**: Handles communication between the frontend and backend APIs for dynamic data fetching and updates.
  
---
  ### **Challenges and Solutions**
- **Ensuring Consistency Across Dashboards**
	- To keep **coach and student dashboards** synchronized, we implemented real-time updates via **re-renders** based on API responses.
- **Handling Role-Specific Logic**
	- Prevented coaches from booking their own slots by filtering slot views based on the **user's role**.
- **Feedback Management**
	- Allowing **one-to-one relationships** between slots and calls simplified the feedback management. We can easily query for call details when rendering session history or feedback forms.
	    
---
  ### **Future Improvements**
  
  Looking forward, the platform can be extended with features such as:  
- **Automated reminders** for upcoming sessions to reduce cancellations or missed appointments.
- **Student feedback system** to allow both parties to provide structured feedback after calls.
- **Performance dashboards** for coaches, aggregating their satisfaction scores and feedback over time.
  
---
  ### **Conclusion**
  
  This project reflects my ability to design, build, and maintain a **robust scheduling system** while balancing user needs, backend constraints, and clean code practices. Working through challenges such as **role-specific permissions, feedback management, and real-time updates** has provided valuable experience in full-stack development.  
  
  I look forward to sharing more details during the interview and discussing how this experience aligns with broader goals in product development and engineering.

---
  ### **Deployment**
- **PostgreSQL**
```
docker run --name postgres-container \
-e POSTGRES_PASSWORD=mysecretpassword \
-p 5432:5432 -d postgres
```
- **Backend**

Create Python Environment:
```
python -m venv scheduler
source scheduler/bin/activate
```
Install dependencies:
```
pip install -r requirements.txt
```

Migrate database
```
python manage.py migrate
```
Start the server:
```
python manage.py runserver
```

- **Frontend**

go the frontend folder:
```
 cd coaching-frontend
```

install node if you don't have:

```
curl -L https://bit.ly/n-install | bash

```
check node version:

```
node -v
v22.11.0
```

Install dependencies:
```
npm install
```

Start Frontend:

```
npm start
```
Now the application is accessible from 

http://localhost:3000/