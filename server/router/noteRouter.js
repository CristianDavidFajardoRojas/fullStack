const versionMiddleware = require('../middleware/versionate');

const router = require('express').Router();
const noteController = require('../controller/noteController');
const historyController = require('../controller/historyController');
const layout = require('../view/notesView');
const layoutEdit = require('../view/editnoteView');
const layoutSearch = require('../view/searchView');
const layoutAdd = require('../view/addnoteView');
const {limit} = require('../middleware/limit');
const validator = require('../validator/noteValidator');



/**
 * GET/ Note
 * ! Versiones 1.0.0
 */
router.get("/:id/history", limit('get'), versionMiddleware("1.0.0"), historyController.findNoteChangeHistory);

router.get("/:id", limit('get'), versionMiddleware("1.0.0"), noteController.findNoteById);

router.get("/", limit('get'), versionMiddleware("1.0.0"), noteController.findAllNotes);

/**
 * POST/ Note
 * ! Versiones 1.0.0
 */
router.post("/search", limit('post'), versionMiddleware("1.0.0"), noteController.findNotesMatchingTitleOrDescription);

router.post("/:id/history", limit('post'), versionMiddleware("1.0.0"), historyController.save);

router.post("/", limit('post'), versionMiddleware("1.0.0"), validator.createNote, noteController.save);

/**
 * PUT/ Note
 * ! Versiones 1.0.0
 */
router.put("/:id", limit('put'), versionMiddleware("1.0.0"), validator.updateNote, noteController.updateNoteById);

/**
 * DELETE/ Note
 * ! Versiones 1.0.0
 */
router.delete("/:id", limit('delete'), versionMiddleware("1.0.0"), noteController.deleteNoteById);

router.use(layout);
router.use('/addNote', layoutAdd);
router.use('/edit', layoutEdit);
router.use('/search', layoutSearch );

module.exports = router;