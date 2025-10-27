import express from 'express'
import IConfig from "@/interfaces/IConfig";
import winston from "winston";
import cookieParser from "cookie-parser";
import cors from "cors"


import MicroService from "@/structure/core/FileServer";
import {mainRouter} from "@/structure/api/routers/mainRouter";
import rateLimit from "express-rate-limit";

export default class ApiServer {

    private server: express.Application
    private readonly port: number

    private readonly logger: winston.Logger
    private readonly config: IConfig


    /**
     * Создаем экземпляр API для обращения к файловому серверу
     * 
     */

    constructor() {
        this.logger = MicroService.instance.getLogger()
        this.config = MicroService.instance.getConfig()

        this.port = this.config.apiServerPort;

        if (!this.port) {
            this.logger.error(`No apiServerPort is specified in config.json`)
            process.exit(1)
        }

        this.server = express();
        this.setupMiddleware()
        this.listen()
    }

    private setupMiddleware(){
        this.server.use(cors({origin:this.config.corsOrigin}))
        
        const limiter = rateLimit({
            windowMs: 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
        })

            //this.server.use(limiter)


        this.server.use(express.json())
        this.server.use(cookieParser())
        this.server.use(mainRouter)
    }

    private listen(){
        this.server.listen(this.port, () => {
            this.logger.info(`✅ API server working on port ${this.port}`);
        });
    }

}