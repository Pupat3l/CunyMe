# CUNYme
## Full Stack Webapp (CIS 5800 - Baruch)
Group name and members: Team 1 - Pujan Patel, Sharon Feng, Nurul Chowdhury, Kinza Sheikh, and Danna Pastran.

## Description
CUNYme's purpose is to replace physical ID scanning with QR Code scanning for all the City University of New York students and faculty. The features would include QR Code scanning for personal identification and entering the CUNY facilities, submitting a printing request, viewing and ordering Tech Rentals, etc. This would make it more convenient and accessible to students by incorporating core features into one place.

## Business Problem
As of right now, CUNY students and faculty members have to swipe their physical ID cards to enter the CUNY buildings and other facilites. The swiping doesn't cause any issue, but the time taken to get swipe the card is the problem we are trying to fix. 
Many times if the card is not readed properly or the user swipes too quick or too slow, then the user's swipe fails and has to redo again which will cause delays and queues at the turnstiles. Our goal is to reduce the waiting time and make the process more efficient by developing a mobile 
that replaces ID scanning. CUNYme will not only be efficient but also will remove the risk of losing ID card and buying a replacement ID card to use.

## Tech Stack
- Front-end: HTML, Javascript, and CSS
- Back-end: Express.js server
- Database: MongoDB

## Core Features
- User Authentication (custom authorization system)
- Responsive Design
- CRUD Functionality with Database
- File uploads for printing requests
- Retreiving data from the Database (History)
- QR code generator

## Pre-reqs for usage
- Code editor (preferrably Visual Studio Code)
- Url to replace 'process.env.MONGODB_URL' (provided privately)
- Sign email and password (provided privately)

## Steps to use and interact with our web app
- Clone this repo
- Navigate to api directory from command prompt (cd api)
- Install dependencies from same command prompt (npm install)
- Navigate to db.js file and ensure that mango_url = Url from pre-req
- In command prompt, perform (npm start) this will start the back-end
- Check the terminal to see if 'MongoDB is connected'
  
- Go to your preferred web browser and enter 'http://localhost:5500/static/index.html'
- Interact with the website, sign in with email and password (provided privately) or you can sign up
- You can wish to create new printing request and then click on History to look at the printing submission from before or the ones you just did.

## Contact
Feel free to reach out if you have any questions: pujan.patel2002@gmail.com



