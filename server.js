const path = require('path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const connectToMongo = require('./db')
const MongoStore = require('connect-mongo')
const port = 3000
const formatMessage = require('./utils/messages.js')
const { userJoin, getCurrentUser,userLeave,getRoomUsers } = require('./utils/users.js')
const morgan = require('morgan')

const { createServer } = require('node:http');
const { Server } = require('socket.io')

const app = express();
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
const User = require('./User')
connectToMongo()
const env = require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: process.env.mongoURI })
}));



//============passport stuff
const strategy = new localStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app);

//============Chatroom stuff
const server = createServer(app);       
const io = new Server(server, {
    connectionStateRecovery: {}
})
const botName = 'Bot'

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username , room.house)
        console.log(user)
        socket.join(room.house)
        //Welcome user
        socket.emit('welcome', formatMessage(botName, `Welcome to House ${room.house}!`))      //sends message to the client-side JS
        //Announces presence to other users
        socket.broadcast.to(user.room).emit('welcome', formatMessage(botName,`${user.username} has joined the chat`))

        //send room info
        io.to(user.room).emit('roomUsers', {
            room:user.room,
            users: getRoomUsers(user.room)
        })
    })
    
    socket.on('chat message', (msg) => {
        const user = getCurrentUser(socket.id)
        console.log('message: ' + msg)
        console.log(user.room)
        io.to(user.room).emit('chat message', formatMessage(user.username, msg))
    })
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        // console.log('user disconnected');
        if (user) {
            io.to(user.room).emit('welcome', formatMessage(botName,`${user.username} has disconnected`))

            //send room info
        io.to(user.room).emit('roomUsers', {
            room:user.room,
            users: getRoomUsers(user.room)
        })
        }
        //tells everyone a user has left
        
    });
})
//==================

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})