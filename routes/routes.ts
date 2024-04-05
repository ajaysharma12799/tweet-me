import { Request, Response, Router } from "express";
import UserRouter from "./user.routes"

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ msg: "Server is Live!!" });
});

router.use("/user", UserRouter);

export default router;
