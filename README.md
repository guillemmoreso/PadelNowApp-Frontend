# PadelNow

## Description

PadelNow is a platform for all padel players that want to book a court instantly, compare prices and search locations without the hustle of registering in different websites.

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events and do my reservations.

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and send me to login and signup

**Edit my profile** - As a user I can edit the information on my profile and change my picture

**Club details** - As a user I want to see the clubs main information and court availability.

**Search Availability** - As a user I want to search by availability

**Book courts** - As a user I want to book padel courts

**Manage bookings** - As a user I want to have an agenda of my reservations and manage them in case of any unforeseen event.

**View clubs** - As a user I want to see all the clubs registered available in a map or list so that I can choose which ones I am interested and search for their prices, availability and general information.

**Filter clubs** - As a user I want to filter the clubs by name and location.

## Backlog

List of other features outside of the MVPs scope

User profile: - upload my profile picture - list of bookings created by the user

Geo Location: - add geolocation to events when creating - show event in a map in event detail page - show all events in a map in the event list page

Padel Clubs: rate their info

Create a list of my favourite clubs.

Create a detailed padel profile of each user

Create a different price range of the club's courts on an hourly basis

## Routes

- **/** – Homepage with the main info of the the app and a list of the most searched clubs
- **/signup** – Signup form
- **/login** – Login form
- **/map** – View all clubs in a map
- **/clubs** – View all clubs in a list
- **/clubs/:id** – Page to see the club details and CTA to book a court
- **/clubs/:id/booking** – Page to see the club courts availability
- **/bookings** – Page to manage all user bookings
- **/bookings/:id** – Page to edit a specific user booking
- **/profile** – Page to see the user profile
- **/profile/edit** – Page to edit the user details

## Models

User model

    {

    username: { type: String, required: true, unique: true },
    name: { type: String },
    surname: { type: String },
    hashedPassword: { type: String },
    img: { type: String },

    }

Booking model

    {

    user: { type: ObjectId, ref: 'User' },
    club: { type: ObjectId, ref: 'Club' },
    court: { type: ObjectId, ref: 'Court' },
    day: { type: Date },
    startingHour: { type: String },
    gameResult: { type: String },


    }

Club model

    {

    courts: [{ type: ObjectId, ref: 'Court' }],
    name: { type: String },
    description: { type: String},
    city: { type: String },
    logo: { type: String },
    clubImages: [{ type: String }],
    price: { type: Number },
    rating: { type: Number },
    comments: { type: String },
    location: { type: String },
    openingHours: [{ type: Number }],

    }

Court model

    {

    clubCourt: [{ type: ObjectId, ref: 'Club' }],
    courtName: { type: String },

    }

## Links

### Git

The url to your repository and to your deployed project

[Repository Frontend Link](http://github.com/)

[Repository Backend Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)
