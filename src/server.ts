import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';


import { Constants, NodeEnv, Logger } from '@utils';
import { router } from '@router';
import { ErrorHandling } from '@utils/errors';

const app = express();

// Set up request logger
if (Constants.NODE_ENV === NodeEnv.DEV) {
  app.use(morgan('tiny')); // Log requests only in development environments
}

// Set up request parsers
app.use(express.json()); // Parses application/json payloads request bodies
app.use(express.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded request bodies
app.use(cookieParser()); // Parse cookies

// Set up CORS
app.use(
  cors({
    origin: Constants.CORS_WHITELIST,
  })
);

app.use('/api', router);

app.use(ErrorHandling);

app.listen(Constants.PORT, () => {
  Logger.info(`Server listening on port ${Constants.PORT}`);
});

// Chat:
// const httpServer = createServer(app);
// const io = new Server(httpServer);


// httpServer.listen(Constants.PORT, () => {
//   Logger.info(`Server listening on port ${Constants.PORT}`);
// });

// const users: Record<string, Socket> = {};

// io.on('connection', (socket: Socket) => {
//   const { userId } = socket.handshake.query;
//   users[userId] = socket;
//   console.log(`User ${userId} connected`);

//   socket.on('message', ({ to, message }) => {
//     const toSocket = users[to];
//     if (toSocket) {
//       toSocket.emit('message', { from: userId, message });
//     }
//   });

//   socket.on('disconnect', () => {
//     delete users[userId];
//     console.log(`User ${userId} disconnected`);
//   });

// });






