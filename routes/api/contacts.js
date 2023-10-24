const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const addValidate = validateBody(schemas.addSchema);
const uppdateFavoriteSchema = validateBody(schemas.updateFavoriteSchema);

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getContactsById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, addValidate, ctrl.uppdateContact);
router.patch(
  "/:contactId/favorite",
  isValidId,
  uppdateFavoriteSchema,
  ctrl.uppdateFavorite
);

module.exports = router;
