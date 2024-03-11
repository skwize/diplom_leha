const express = require("express");
const controller = require("../controllers/InventoryController");

const router = express.Router();

router.get("/inventory", controller.GetObjectsFromInventory);
router.post("/inventory/add", controller.AddObjectToInventory);
router.patch("/inventory/edit/:id", controller.EditInventoryObject);
router.delete("/inventory/remove/:id", controller.DeleteObjectFromInventory);

module.exports = router