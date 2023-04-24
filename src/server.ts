import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Constants, NodeEnv, Logger } from '@utils';
import { router } from '@router';
import { ErrorHandling } from '@utils/errors';
import { Server } from 'http';
import http from 'http';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();

// crear el servidor http
const server = createServer(app);

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

// chat
const io = new SocketServer(server);

io.on('connection', (socket) => {
  console.log(`Un nuevo cliente se ha conectado con el ID: ${socket.id}`);

  // Maneja los mensajes enviados por el cliente
  socket.on('chat:message', (message) => {
    console.log(`Mensaje recibido del cliente con ID ${socket.id}: ${message}`);

    // Reenvía el mensaje a todos los clientes conectados
    socket.emit('chat:message', `hola esto es un ${message}`);
  });

  // desconexión del cliente
  socket.on('disconnect', () => {
    console.log(`El cliente con ID ${socket.id} se ha desconectado`);
  });
});

server.listen(Constants.PORT, () => {
  Logger.info(`Server listening on port ${Constants.PORT}`);
});

export default app;
