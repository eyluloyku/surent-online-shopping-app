import Router from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import cors from "cors";

const router = Router();

router.get("/details", auth, (req, res) => {
	res.status(200).json({ message: "user authenticated." });
});

/*
router.get("/getsalesMan", auth, roleCheck(["sales_man"]), (req, res) => {
	res.status(200).json({ message: "user authenticated." });
});

router.get("/getprodMan", auth, roleCheck(["prod_man"]), (req, res) => {
	res.status(200).json({ message: "user authenticated." });
});

router.get("/getLoggedInUserRole",cors(), auth, (req, res) => {
	res.status(200).json({ role: req.user.roles[0] });
  });
*/


export default router;