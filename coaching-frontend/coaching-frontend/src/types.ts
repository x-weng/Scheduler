export interface User {
    id: number;         // Unique identifier for the user
    name: string;       // User's name
    role: 'coach' | 'student'; // Role can only be 'coach' or 'student'
    phone?: string;     // Optional: Phone number for contact
  }
  
  export interface Student {
    id: number;
    name: string; // Adjust according to your actual data structure
    // Add any other fields related to Student
  }


// types.ts
export interface Slot {
    id: number; // Unique identifier for the slot
    coach: number; // The ID of the coach to whom the slot belongs
    start_time: Date; // Start time of the slot as a Date object
    end_time: Date; // End time of the slot as a Date object
    booked: boolean; // Indicates if the slot is booked
    student?: number; // Optional: ID of the student who booked the slot
  }
  