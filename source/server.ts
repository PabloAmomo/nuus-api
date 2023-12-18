import dotenv from 'dotenv'; 
import express, { Express } from 'express';
import http from 'http';
import setRouterFeeds from './feeds/routes/routes';
import cors from 'cors';

/** Load environment variables */
dotenv.config(); 

/** Express */
const router: Express = express();
router.use(cors());

/** Parse the request and Takes care of JSON data */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Routes - Add all Domains when needed */
setRouterFeeds(router);

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 8008;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));