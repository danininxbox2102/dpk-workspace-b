import express, {Router} from "express";
import ExampleHandler from "@/structure/api/routers/handlers/ExampleHandler";
import DocumentHandler from "@/structure/api/routers/handlers/DocumentHandler";
import PracticeListHandler from "@/structure/api/routers/handlers/PracticeListHandler";
import addPractice from "./handlers/addPractice";

const router:Router = express.Router();
export const mainRouter = router;

// Example route with handler
router.get('/', new ExampleHandler().handle)

router.get('/document/:name', new DocumentHandler().handle)

router.get('/practices', new PracticeListHandler().handle)

router.post('/practice/new', new addPractice().handle)