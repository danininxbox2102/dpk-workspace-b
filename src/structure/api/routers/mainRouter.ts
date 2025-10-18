import express, {Router} from "express";
import ExampleHandler from "@/structure/api/routers/handlers/ExampleHandler";

const router:Router = express.Router();
export const mainRouter = router;

// Example route with handler
router.get('/', new ExampleHandler().handle)
