import IApiHandler from "@/interfaces/IApiHandler";
import {Request, Response} from "express";
import fs from "fs-extra";
import FileServer from "@/structure/core/FileServer";
import path from "node:path";

export default class DocumentHandler implements IApiHandler {


    /**
     * 
     * @param req name* - обязательный параметр, в котором задается имя документа, который необходимо получить
     * @param res обработчик данных, который вернет либо документ, либо код ошибки в зависимости от полученного документа
     * @returns Либо документ, либо ошибку
     */
    async handle(req: Request, res: Response) {

        const docName = req.params.name;

        if (!docName) return res.status(400).json({error: "No document name provided"});

        const file = path.join(FileServer.instance.getConfig().docDir, docName);

        if (!fs.existsSync(file)) return res.status(404).json({error: "Document not found"});

        fs.readFile(file, (err, data) => {
           if (err) {
               res.status(500).json({error: "Something went wrong while reading document"});
               return;
           }

           res.status(200).send(Buffer.from(data.buffer))
       });
    }
}