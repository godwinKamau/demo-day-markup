# demo-day-markup


A primary markup/API design for the Resilient Coder's Demo Day Project. Right now, it is a full-stack app with that keeps track of the user's geolocation and calls the geonames API to find the city. It then joins a room based off the location for people in the area to talk.

<hr>

## Sources: 

Tutorial from the socket.io tutorial: https://socket.io/docs/v4/tutorial/introduction
<br>
Video about chatrooms: https://www.youtube.com/watch?v=jD7FnbI76Hg#

<hr>

## Tech Stack

| Category  | Tools                               |
| --------- | ----------------------------------- |
| Backend   | Node.js, Express, Mongoose, MongoDB |
| Frontend  | EJS, HTML, CSS, JavaScript          |
| Dev Tools | Nodemon, dotenv                     |
| Other     | Socket                              |

<hr>

## Live Demo

https://demo-day-markup.onrender.com/

<hr>

### Installation & Setup

Make sure you have Node.js and MongoDB (or MongoDB Atlas) set up.

```
git clone <your-repo-url>
cd <project-folder>
npm install
```



### Environment Variables

Create a .env file:

```
MONGODB_URL=your_mongo_connection_string
```
<hr>

## Run the App

```
npm run dev
```

This runs the server using nodemon for automatic reload during development.

<hr>

## Features

- Geolocation capabilities 
- Chatroom
- MongoDB-backed storage for all 
- Full-stack Express + EJS templating
- Passport Strategies to hold user authentication and sessions

<hr>

## Future Improvements

- Separate UI's for customers and administrators

- More specific features used with geolocation.
    i.e limiting the scope of rooms, organizing the database around different cities, and contorlling access to features based off of geolocation.

- Changes to user schema to add point system based off of how many rooms they visit.


<hr>

## License

ISC