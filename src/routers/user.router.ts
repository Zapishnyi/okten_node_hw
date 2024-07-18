import { Router } from "express";

import { users } from "../constants/urls";
import { userController } from "../controllers/user.controller";

const router = Router();

// Get All Users

router.get(users.all, userController.findAll);

// Get one user by ID

router.get(users.byId, userController.findOne);

//  Add one User

router.post(users.all, userController.addOne);

// Edit one user by ID

router.patch(users.byId, userController.updateOne);

// Replace one user by ID

router.put(users.byId, userController.replaceOne);

// Delete one user by ID

router.delete(users.byId, userController.deleteOne);

export const userRouter = router;
