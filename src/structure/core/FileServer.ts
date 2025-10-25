import dotenv from "dotenv";
import ApiServer from "../api/ApiServer";
import fs from "fs";
import winston from "winston";
import IConfig from "../../interfaces/IConfig";

export default class FileServer {

    static instance: FileServer;
    private logger: winston.Logger;
    private config: IConfig;


    /**
     * При использовании данного конструктора происходит инициализация файлового сервера
     * При попытке повторно создать Instance вернется уже имеющийся экземпляр
     * @returns FileServer instance
     * 
     */

    constructor() {
        if (FileServer.instance) {
            return FileServer.instance;
        }
        FileServer.instance = this;

        this.setup().then()
    }
    // Инициализация
    private async setup() {
        this.createLogger()
        this.loadConfig()
        new ApiServer()
    }

    // Загрузка файла конфигурации
    private loadConfig() {
        dotenv.config({path: './config/secret.env'})

        const configPath = "./config/config.json"

        if (!fs.existsSync(configPath)) {
            // Завершаем процесс т.к. Нет конфига
            this.logger.error("Config not found!")
            process.exit(1)
        }

        try {
            // Читаем json файл, и парсим строку в объект
            this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e: any) {
            this.logger.error(`Failed to parse config: ${e}`)
            process.exit(1)
        }

    }

    // Настройка logger'а
    private createLogger() {
        this.logger  = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: './log/combined.log' }),
            ],
        });

        this.logger.add(new winston.transports.Console({
            format: winston.format.cli(),
        }));
    }

    public getLogger(){
        return this.logger;
    }

    public getConfig(){
        return this.config;
    }
}