import express, {Router} from "express";
import ExampleHandler from "@/structure/api/routers/handlers/ExampleHandler";
import DocumentHandler from "@/structure/api/routers/handlers/DocumentHandler";

const router:Router = express.Router();
export const mainRouter = router;

// Example route with handler
router.get('/', new ExampleHandler().handle)

router.get('/document/:name', new DocumentHandler().handle)
