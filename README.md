# PadelNow

![PadelNow](https://res.cloudinary.com/dalhi9ynf/image/upload/v1574093605/padelnow-logo_ejpecb.png)

## Description

PadelNow is an application made for padelers that want to book a court easily, compare prices, explore new locations and connect with other padelers without hustles.

## User Stories

- **404:** As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **Signup:** As a user I want to sign up on the webpage so that I can see all the events and do my reservations.
- **Login:** As a user I want to be able to log in on the webpage so that I can get back to my account.
- **Logout:** As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Delete Account:** As a user I want to be able to delete my account and personal information.
- **Homepage:** As a user I want to be able to access the homepage so that I see what the app is about, filter the clubs available and redirect me to login and signup.
- **Edit my Profile:** As a user I can edit the information on my profile and change my picture.
- **Clubs:** As a user I want to see the clubs main information and court availability.
- **Search Availability:** As a user I want to search clubs availability by day and hour.
- **Bookings:** As a user I want to book padel courts and save the booking date in the app.
- **Map:** As a user I want to find all the clubs on a map.
- **Manage Bookings:** As a user I want to have an agenda of my reservations, cancel the booking in case of any unforeseen event and register each result.
- **Explore Clubs:** As a user I want to see all the clubs registered available in a map or list so that I can choose which ones I am interested and search for their prices, availability and general information.
- **Filter Clubs:** As a user I want to filter the clubs by name and location.
- **Save my Stats:** As a user I want to see my games stats and unlock badges.
- **Save my Favorite Clubs:** As a user I want to save my favorite clubs and dedicate a view to it as a shortcut.
- **Search Players:** As a user I want to see each user registered stats.
- **Send Petitions:** As a user I want to stay connected with other players and send them petitions.
- **Save Friends:** As a user I want to keep track of my friend's performance.

## Backlog

Users:

- Send messages and chat with my connections.
- Receive coupons depending on my actions in the app.
- Insert my card to do the bookings through PadelNow.
- Create tournaments.

Clubs:

- Enable a geolocation feature to sort the clubs by proximity.
- Insert different courts per Club with different price ranges.

Bookings:

- Enable open bookings to let other players register until the court is full (4 players).
- Invite other users and notify them once a booking is done.

# Client

## Pages

| url                          | public | Functionality                 |
| ---------------------------- | ------ | ----------------------------- |
| `/`                          | true   | landing page                  |
| `/signup`                    | true   | Signup user                   |
| `/login`                     | true   | login user                    |
| `/search`                    | false  | user profile                  |
| `/reservation`               | false  | confirm booking               |
| `/clubs`                     | false  | get all clubs                 |
| `/clubs/:id`                 | false  | get club details              |
| `/bookings`                  | false  | get all bookings              |
| `/bookings/:id`              | false  | get booking details           |
| `/profile`                   | false  | get all profile routes        |
| `/profile/favorites`         | false  | get club favorites list       |
| `/profile/results`           | false  | get player results list       |
| `/profile/results/:id`       | false  | modify result                 |
| `/profile/friends`           | false  | get player friends            |
| `/profile/friends/petitions` | false  | list of petitions             |
| `/profile/friends/search`    | false  | search app users              |
| `/profile/edit-profile`      | false  | edit main profile information |
| `/player`                    | false  | modify player stats           |
| `/player/:id`                | false  | see player stats              |
| `/map`                       | false  | explore clubs on a map        |

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.profileUpdate(user)
  - auth.userDelete()

- Booking Service

  - bookings.getAllUserBookings()
  - bookings.getBookingById(id)
  - bookings.bookingDelete(id)
  - bookings.newBooking(newReservation)
  - bookings.gameResult(bookingResult)

- Clubs Service

  - clubs.getAllClubs()
  - clubs.getClubById(id)
  - clubs.saveClubToFavorites(id)
  - clubs.dataPickerClubDetail(search)

- Profile Service
  - profile.getAllFavoriteClubs()
  - profile.getAllUserBookings()
  - profile.getAllUserFriends()
  - profile.getAllUsers()
  - profile.uploadAvatarImg(user)
  - profile.getUserById(id)
  - profile.savePetition(id)
  - profile.getPetitions()
  - profile.acceptPetition(id)
  - profile.denyPetition(id)
  - profile.uploadImage(avatarImgUpload)
  - profile.profileStats(stats)

### Contexts

- AuthContext

  - handleLogin
  - handleSignup
  - handleProfileUpdate
  - handleLogout
  - handleUserDelete
  - handlePostPhoto

- BookingContext
  - handleHourChange
  - handleDateChange

# Server

## Models

User model

```
username - String // required & unique
name - String
surname - String
hashedPassword - String
avatarImg - String // default -> "McLovin Driving License Picture"
level - String // default -> Undefined
clubs - ObjectID<Club> // Array
friends - ObjectID<User> // Array
petitions - ObjectID<User> // Array

```

Booking model

```
user - ObjectID<User>
club - ObjectID<Club>
court - ObjectID<Court>
day - Date
startingHour - Number
gameResult - String // default -> "TBC"

```

Club model

```
courts - ObjectID<Court> // Array
name - String
city - String
clubImages - String // Array
location - String
price - Number
openingHours - Number // Array
geometry - Object - type:String & coordinates array

```

Court model

```
clubCourt - ObjectID<Club>
courtName - String

```

## API Endpoints (backend routes)

## API routes:

### auth

| Method | Route           | Functionality                                                                 |
| ------ | --------------- | ----------------------------------------------------------------------------- |
| GET    | api/auth/me     | Check session status                                                          |
| POST   | api/auth/signup | Log in user to app and set user to session (Body: username, email, password)  |
| POST   | api/auth/login  | Register user to app and set user to session (Body: username, mail, password) |
| GET    | api/auth/logout | Log out user from app and remove session                                      |

### bookings

| Method | Route                          | Functionality                                    |
| ------ | ------------------------------ | ------------------------------------------------ |
| GET    | api/bookings                   | All user upcoming bookings sorted by date        |
| GET    | api/bookings/:bookingId        | Booking details                                  |
| POST   | api/bookings/:bookingId/delete | Delete an specific from the booking details page |

### clubs

| Method | Route                    | Functionality                                                                |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| GET    | api/clubs                | Gives back all the opinions that haven't been responded by the user          |
| GET    | api/clubs/:clubId        | Club details                                                                 |
| POST   | api/clubs/:clubId        | Receive user search inputs from a club page and return the club availability |
| PUT    | api/clubs/:clubId/switch | Manage user favorite clubs                                                   |

### map

| Method | Route   | Functionality   |
| ------ | ------- | --------------- |
| GET    | api/map | Obtain map data |

### player

| Method | Route                         | Functionality                |
| ------ | ----------------------------- | ---------------------------- |
| GET    | api/player/:playerId          | Stats from a PadelNow player |
| PUT    | api/player/:playerId          | Edit user level              |
| PUT    | api/player/:playerId/petition | Manage user petitions        |

### profile

| Method | Route                                                | Functionality                                    |
| ------ | ---------------------------------------------------- | ------------------------------------------------ |
| PUT    | api/profile/edit-profile                             | Edits user profile                               |
| POST   | api/profile/edit-profile/delete                      | User account is deleted                          |
| PUT    | api/profile/edit-profile/upload                      | User avatar image                                |
| GET    | api/profile/favorites                                | A list of user favorite clubs                    |
| GET    | api/profile/results                                  | A list of all past bookings to edit game results |
| PUT    | api/profile/results/:bookingId                       | Update game result                               |
| GET    | api/profile/friends                                  | The list of friends                              |
| GET    | api/profile/friends/users                            | All app users to send friend petitions           |
| GET    | api/profile/friends/petitions                        | All petitions received                           |
| PUT    | api/profile/friends/petitions/:petitionUserId/accept | Accept petitions                                 |
| PUT    | api/profile/friends/petitions/:petitionUserId/deny   | Deny petitions                                   |

### reservation

| Method | Route                   | Functionality    |
| ------ | ----------------------- | ---------------- |
| GET    | api/reservation/:clubId | Club data        |
| POST   | api/reservation/:clubId | New club booking |

### search

| Method | Route      | Functionality                                                   |
| ------ | ---------- | --------------------------------------------------------------- |
| GET    | api/search | All clubs that have availability at the current hour range      |
| POST   | api/search | Receive search from user and return the clubs with availability |

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/guillemmoreso/starterkit-frontend-m3)

[Server repository Link](https://github.com/guillemmoreso/starterkit-backend-m3)

[Deploy Link Backend](http://heroku.com)

[Deploy Link Frontend](https://padelnow.netlify.com/)

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/guillemmoreso/deck-704fbd)
