import express, {Router} from "express";
import ExampleHandler from "@/structure/api/routers/handlers/ExampleHandler";
import DocumentHandler from "@/structure/api/routers/handlers/DocumentHandler";
import PracticeListHandler from "@/structure/api/routers/handlers/PracticeListHandler";
import addPractice from "./handlers/addPractice";

const router:Router = express.Router();
export const mainRouter = router;

// Main router

//
router.get('/', new ExampleHandler().handle)

// Get document by its name
router.get('/document/:name', new DocumentHandler().handle)

// Get practice list
router.get('/practices', new PracticeListHandler().handle)

// Post new practice
router.post('/practice/new', new addPractice().handle)