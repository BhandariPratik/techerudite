
import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/connection.js';
import  routerConfig  from './app/v1/routes/index.js';

export const app = express();
let  server = http.createServer(app);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routerConfig(app);

connectDB().then(async() => {
  await server.listen(4000, () => {
      console.log(`Server listening on the port ${4000} ${new Date()} --------`);
    });
 
  })
  .catch((error) => {
    console.log(`Server configuration error >> ${error} \n-----`);
  });
export default app;
