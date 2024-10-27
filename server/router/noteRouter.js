const versionMiddleware = require('../middleware/versionate');

const router = require('express').Router();
const noteController = require('../controller/noteController');
const historyController = require('../controller/historyController');
const layout = require('../view/notesView');
const layoutEdit = require('../view/editnoteView');



/**
 * GET/ Note
 * ! Versiones 1.0.0
 */
router.get("/search", versionMiddleware("1.0.0"), noteController.findNotesMatchingTitleOrDescription);

router.get("/:id/history", versionMiddleware("1.0.0"), historyController.findNoteChangeHistory);

router.get("/:id", versionMiddleware("1.0.0"), noteController.findNoteById);

router.get("/", versionMiddleware("1.0.0"), noteController.findAllNotes);

/**
 * POST/ Note
 * ! Versiones 1.0.0
 */
router.post("/:id/history", versionMiddleware("1.0.0"), historyController.save);

router.post("/", versionMiddleware("1.0.0"), noteController.save);

/**
 * PUT/ Note
 * ! Versiones 1.0.0
 */
router.put("/:id", versionMiddleware("1.0.0"), noteController.updateNoteById);

/**
 * DELETE/ Note
 * ! Versiones 1.0.0
 */
router.delete("/:id", versionMiddleware("1.0.0"), noteController.deleteNoteById);

router.use(layout);
router.use('/edit', layoutEdit)

module.exports = router;