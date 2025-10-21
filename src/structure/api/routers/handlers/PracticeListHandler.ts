import IApiHandler from "@/interfaces/IApiHandler";
import {Request, Response} from "express";
import fs from "fs-extra";
import FileServer from "@/structure/core/FileServer";
import path from "node:path";

export default class PracticeListHandler implements IApiHandler {

    async handle(req: Request, res: Response) {

        const file = path.resolve(FileServer.instance.getConfig().dataDir, "practiceList.json");

        if (!fs.existsSync(file)) return res.status(404).json({error: "practiceList.json not found"});

        res.status(200).sendFile(file)
    }
}