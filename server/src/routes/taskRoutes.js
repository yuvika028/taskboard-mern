const router = require('express').Router();
const c = require('../controllers/taskController');
const { asyncHandler } = require('../middleware/errorHandler');

router.get('/', asyncHandler(c.list));
router.post('/', asyncHandler(c.create));
router.put('/:id', asyncHandler(c.update));
router.delete('/:id', asyncHandler(c.remove));

module.exports = router;
