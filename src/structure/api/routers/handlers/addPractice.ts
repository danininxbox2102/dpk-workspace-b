import IApiHandler from "@/interfaces/IApiHandler";
import {Request, Response} from "express";
import RestError from "@/config/entities/RestError";

export default class addPractice implements IApiHandler {



    async handle(req: Request, res: Response) {
        const jsonBody = req.body;
        if (!jsonBody){
            return res.status(400).json(new RestError("NO_DATA", "You provided empty body"))
        }

        return res.status(503).send("This function isnt working now. Its under maintance. Please wait. Coded with Love TerComPy (SIP-24-2)")
    }
}