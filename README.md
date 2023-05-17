# Office Hours Waiting List

**Requirements and Specification Document**

2023-05-04**, version 1.5**

# Project Abstract

Office hours can get crowded and overwhelming for certain classes. When students arrive at office hours to get help, they sometimes have to wait aimlessly and in a room packed with students for an indefinite amount of time before they are able to receive the help they came for. This is stuffy and stress-inducing for students and teachers alike.

Office Hours Waiting List is designed to combat these difficulties by ensuring the most systematic and efficient waiting process as possible.

The goal of our web app is to allow students to be able to “check-in” to a waiting list and have the flexibility to leave and come back when they are notified of their turn. They will also be able to see their position in the queue in real-time, or leave the queue if necessary.

# Document Revision History

Rev. 1.0 2023-02-27: initial version

Rev. 1.1 2023-03-15: updated route information

Rev. 1.2 2023-03-28: updated database design

Rev. 1.3 2023-04-05: added user interface and use cases

Rev. 1.4 2023-04-21: added new firewall user stories as well as updated navigation of site and user interface pages as well as user requirements. Updated database design as well. Also added user cases for dashboard and other front end components

Rev 1.5 2023-05-04: updated the frontend screen designs and use cases to reflect new dashboard functionalities. Added system architecture and ER diagram.

# Customer

The customer for this app is for professors or teachers hosting office hours, and students attending those office hours. The teacher can start a waiting list for students attending the office hours. The students then enter this virtual waiting list when they arrive there. This virtual waiting list will remove the clutter of students congregating in the room waiting for their turn to get help. The customer has the ability to join the queue, look up their place in the queue, and leave the queue. They could also enter what they came to get help for, so teachers can see that in advance.

# User Requirements

1. User opens the application for the first time
    1. They are asked to either log in or sign up
        1. It takes them to the dashboard
    2. forgot password
        1. ability to enter their email and they will be sent a password reset link to their email
2. Home Page: The Dashboard
    1. user has the option to “start” or “join” an office hours waiting list
        1. start a waiting list
        2. join a waiting list
    2. user is able to see created waiting lists
        1. ability to enter this waiting list view
            1. Admin waiting list view features:
                1. see the code to join the waiting list
                2. delete their waiting list
                3. students names in FIFO order
                4. ability to “call” on someone and remove their name from the list
    3. user is able to see joined waiting lists
        1. ability to enter the joined waiting list view
            1. Joined waiting list view features:
                1. see their position in the waiting list
                2. ability to leave the queue

# Use Cases

This specific project involves numerous use cases for two different users. The first user will be the student and the second will be a TA or an instructor. We will first cover the student’s use cases. Firstly, a student will have the functionality to add or remove their name from the waiting list. They should also have the ability to add a description of the reason they need help, which can be read by the TA or instructor. Now, we will cover the TA or instructor’s use cases. A TA or instructor should have the ability to start their own waiting list, which any student can join. This waiting list will require a code to join. The TA or instructor will also have the ability to delete their waiting list. The instructor or TA will have the ability to see students’ names in the order they were queued as well as the description of the reason the student needs help. They will also have the ability to call someone off the list and remove their name from the list.

| Name | The application presents the ability to create a waiting list or join a waiting list on the dashboard |
| --- | --- |
| Actor | any user on this website |
| Trigger | on first time load of the application |
| Events | - user navigates to the home screen url of the website
- user will have the option to create a waiting list or join a waiting list |
| Exit Condition | the user has chosen the option to join or create a waiting list |
| Post-conditions | the application has navigated to create a list page or join a list page, depending on which option the user has selected |
| Acceptance Test | the user can proceed to fill in their details to create or join waiting list, or they can navigate to the home screen and reselect their option |

| Name | user is presented with form to create a room |
| --- | --- |
| Actor | any user - typically a TA |
| Trigger | user chooses the option to create a waiting list |
| Events | - user chooses to create a waiting list
- user will have fields to input in order to create a waiting list
- user will have the option to create list |
| Exit Condition | the user has chosen to create list |
| Post-conditions | the application has navigated to the waiting list page |
| Acceptance Test | the user can proceed to fill out the form or return to the home screen to reselect their option |

| Name | user is presented with form to join a room |
| --- | --- |
| Actor | any user - typically a student |
| Trigger | user chooses the option to join a room |
| Events | - user chooses to join a room
- user has to fill out the form which includes their first name, last name, and room code
- user clicks join to submit the form |
| Exit Condition | user clicks on the join button |
| Post-conditions | the application navigates to the page where the user can view their position in the waiting room |
| Acceptance Test | the user can proceed fill out the form or return to the home screen to reselect their option |

| Name | after creating a room: admin view of the waiting list |
| --- | --- |
| Actor | any user - typically TA |
| Trigger | user submits the form to create a room |
| Events | - user submits the form to create a room
- user is redirected to a page where they can view the current status of the waiting list |
| Exit Condition | user clicks button to destroy the waiting room |
| Post-conditions | the waiting list view is closed and the user is navigated back to the home screen |
| Acceptance Test | the user can remain on the waiting list page or they can destroy the waiting list and navigate back to the home screen |

| Name | after joining a room: view of position in the waiting list |
| --- | --- |
| Actor | any user - typically student |
| Trigger | student joined a room and is navigated to the room view |
| Events | - student joins a room
- student is navigated to a room view page |
| Exit Condition | the student will be able to view their position in the waiting list |
| Post-conditions | the student will be in the room view page |
| Acceptance Test | the student is in the room view page and can view their position in the waiting list |

| Name | leave the queue of waiting list |
| --- | --- |
| Actor | student |
| Trigger | student chooses to leave the queue of the waiting list |
| Events | - student clicks the leave waiting room button
- the student is removed from the waiting room queue |
| Exit Condition | student clicks the leave queue button |
| Post-conditions | the application navigates back to the landing page, where the user can choose to create or join a list |
| Acceptance Test | the student is navigated back to the landing page and left the queue for the waiting room |

| Name | admin destroy a waiting list |
| --- | --- |
| Actor | any user - typically TA |
| Trigger | user chooses option to destroy a waiting list |
| Events | - user clicks the destroy waiting room button
- the room is destroyed |
| Exit Condition | user clicks the destroy room button |
| Post-conditions | the application navigates back to the landing page, where the user can choose to create or join a list |
| Acceptance Test | the user is navigated to the landing page and the waiting list is destroyed |

| Name | Log In |
| --- | --- |
| Actor | any user |
| Trigger | user uses textbox to log in |
| Events | - user types name and password and hits enter |
| Exit Condition | log in button is hit |
| Post-conditions | the application navigates to the dashboard |
| Acceptance Test | successfully takes log in |

| Name | sign up |
| --- | --- |
| Actor | any user |
| Trigger | user uses textbox to sign up |
| Events | - user types email and password and hits enter |
| Exit Condition | sign up button is hit |
| Post-conditions | the application navigates to the sign up page |
| Acceptance Test | successfully signs up |

| Name | get all created lists |
| --- | --- |
| Actor | any user mostly TA |
| Trigger | user uses button to get all created lists |
| Events | - user clicks get created lists button |
| Exit Condition | get all created lists button is hit |
| Post-conditions | the application shows all created lists |
| Acceptance Test | successfully shows all created lists |

| Name | get all joined lists |
| --- | --- |
| Actor | any user mostly TA |
| Trigger | user uses button to get all joined lists |
| Events | - user clicks get joined lists button |
| Exit Condition | user hits get all joined lists button |
| Post-conditions | the application shows all joined lists |
| Acceptance Test | successfully gets joined lists |

# User Interface Requirements

The user interface is going to be made up of three separate entities. There is going to be a landing page that prompts the user with two separate choices. These options include starting a waiting list or joining a waiting list. After creating a waiting list, the host view will include some depiction of the code required to join the list. It will also show the queue in FIFO order which includes the name of the student and the description of the reason they need help. They will then have a button they can use to call/remove a student from the list. The student’s view will also include the list in FIFO order, but this time only includes the names. They will also have a button to leave the queue, and the ability to add/edit their description of the reason they need help.

1) Landing screen

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled.png)

- in this landing screen, the user is presented with two options
    - login
    - signup
- upon choosing their option, they will be redirected to a new page
    - if the user chooses to login, they will be redirected to a new page to login to their account
    - if the user choose to signup, they will be redirected to a new page to create a new account

2) Signup

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%201.png)

- required fields
    - email address
    - password
        - constraint: has to be at least 6 characters
    - confirm password
- upon hitting the signup button, their account is created, and the user is redirected to the login page

3) Login

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%202.png)

- upon login, the user is redirected to the Dashboard

4) Password Reset

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%203.png)

- user will receive a password reset link in their email

5) Dashboard

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%204.png)

- user is able to see
    - which account they have signed in with
    - their created and active waiting lists
        - ability to enter and navigate to the admin’s view of the waiting list
    - their joined and active waiting lists
        - ability to enter and navigate to the position page of the joined waiting list

6) Create a list

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%205.png)

- the user has selected to create a list in the Dashboard, and is presented with a form to create a list
- form fields include
    - first name
    - last name
    - room name
- a list will be created when the user clicks the “create” button

7) Join a list

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%206.png)

- the user has selected to join a list in the Dashboard, and is presented with a form to enter their name and room code
- form fields include
    - first name
    - last name
    - room code
- the user will be redirected to the Position page when they click “join”

8) Position in the waiting list view

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%207.png)

- The user has joined a room and can view their position, room name, room code, and TA name
- There is also an option for the user to ‘Leave Room’ which will make them leave the room and return to the Dashboard

9) admin’s view of the waiting list

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%208.png)

- The user has created a room and can view a list of users who join the room
- There is also an option for the user to ‘End Room’ which will close the room and return the user to the home page

# Security Requirements

There are a few security requirements in this application. 

1) The application uses a SQL database which may make it vulnerable to SQL injection attack. In order to protect against SQLi attacks we want to detect and filter malicious user inputs. We also want to restrict database access. To do this, we want to keep the routes to the database secret so users cannot perform SQLi attacks using the routes created for the post request.

2) If authentication is added, there needs to be protective measures added for the personal data. We want to make sure passwords are hashed since hashing has pre-image resistance and collision resistance. This means that the hash algorithm is one-way and cannot be undone and no two inputs can produce the same output. This is important so that the information in our database is secure and no one can create two passwords with the same output. We can also add a salt to the hashing algorithm for an extra layer of protection.

# System Requirements

- The system will depend on a computer that has our server
- We will need to target Unix and window because students and staff may use both
- Required memory would need to be 8 gigabytes as that is pretty standard
- A system that can contain a database will be required
- The speed requirement would need to be very fast considering people need to know when the TA are available as soon as it happens
- Mobile and all browsers should be able to use this application

# Specification

### System Design

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%209.png)

### Database ERD

![Untitled](Office%20Hours%20Waiting%20List%20c8fd931f568f4ad9a41436febd476028/Untitled%2010.png)

## Database design

Table 1 - **teaching_assistant**

| column name | data type |
| --- | --- |
| room_code_pk (primary key) | varchar(255) |
| teaching_assistant_first_name | varchar(255) |
| teaching_assistant_last_name | varchar(255) |
| time_created | datetime |
| time_destroyed | datetime |
| waiting_room_name | varchar(255) |
| user_id | varchar(255) |

Table 2 - **student**

| column name | data type |
| --- | --- |
| studentID_pk (unique to table) | int |
| student_first_name | varchar(255) |
| student_last_name | varchar(255) |
| time_entered | datetime |
| time_left | datetime |
| room_ID | varchar(255) |
| is_waiting | bit |
| user_id | varchar(255) |

## User Stories

| User story ID | User Story | Priority | Sprint | Estimated Story Points |
| --- | --- | --- | --- | --- |
| 0 | starter code and planning stage for our project | 1 | 0 | 14 |
| 1 | As a TA, I want to be able to create a new waiting list | 1 | 1 | 8 |
| 2 | As a student, I want to be able to join a waiting list | 1 | 1 | 6 |
| 3 | As a TA, I want to be able to see the status of my class waiting list | 1 | 1 | 6 |
| 4 | As a student, I want to be able to view my position in the waiting list | 1 | 2 | 6 |
| 5 | As a TA, I want to be able to destroy my waiting list when I am done with it | 2 | 2 | 5 |
| 6 | As a student, I want to be able to leave a waiting list | 2 | 2 | 8 |
| 7 | As a user, I want to be able to log in securely | 3 | 3 | 8 |
| 8 | As a TA, I want to be able to access my waiting list if I have accidentally navigated away from the page | 3 | 3 | 3 |
| 9 | As a student, I want to be able to access my waiting list status/ position if I have accidentally navigated away | 3 | 3 | 3 |
| 10 | As a student I would like to create or log in to an account | 3 | 3 | 3 |
| 11 | As a TA I would like to create or sign into an account | 3 | 3 | 3 |
| 12 | As a Student I want to see all joined lists | 3 | 3 | 2 |
| 13 | As a TA I want to see all created lists | 3 | 3 | 2 |

## Product Done Backlog

| User Story ID | Task | Priority | Sprint | Estimated Story Points |
| --- | --- | --- | --- | --- |
| 0 | create backend boilerplate code | 1 | 0 | 1 |
| 0 | create frontend react boilerplate code | 1 | 0 | 1 |
| 0 | sketch out db design | 1 | 0 | 2 |
| 0 | sketch out backend api design | 1 | 0 | 3 |
| 0 | create database | 1 | 0 | 2 |
| 0 | connect db to backend code | 1 | 0 | 2 |
| 0 | frontend figma design | 1 | 0 | 3 |
| 1 | home screen frontend component | 1 | 1 | 2 |
| 1 | create a waiting list frontend component | 1 | 1 | 2 |
| 1 | create a waiting list api | 1 | 1 | 2 |
| 1 | integrate create a waiting list frontend and api | 1 | 1 | 2 |
| 2 | join a waiting list frontend component | 1 | 1 | 2 |
| 2 | join a waiting list api | 1 | 1 | 2 |
| 2 | integrate join a waiting list frontend and api | 1 | 1 | 2 |
| 3 | get all students in a waiting list api | 1 | 1 | 2 |
| 3 | TA view: waiting list status frontend | 1 | 1 | 2 |
| 3 | integrate waiting list view with get all students in waiting list api | 1 | 1 | 2 |
| 4 | find student’s position in the waitlist api | 1 | 2 | 2 |
| 4 | view student’s position in the waitlist frontend page | 1 | 2 | 2 |
| 4 | connect find student’s api in the waitlist to the frontend | 1 | 2 | 2 |
| 5 | delete waiting list api | 1 | 2 | 2 |
| 5 | delete waiting list frontend | 1 | 2 | 1 |
| 5 | connect delete waiting list api to frontend | 1 | 2 | 2 |
| 6 | student leave room/ TA remove student from waitlist api | 1 | 2 | 2 |
| 6 | student leave room button in frontend | 1 | 2 | 1 |
| 6 | TA remove student button in frontend | 1 | 2 | 1 |
| 6 | connect student leave room/ TA remove student from waitlist api to frontend | 1 | 2 | 2 |
| 7 | create authentication for all students | 2 | 3 | 8 |
| 8/ 9 | create dashboard for users to access their current and past waitlists | 2 | 3 | 6 |
