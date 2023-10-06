var express = require('express');
var router = express.Router();
var checklistsCtrl = require('../controllers/checklists');

// GET routes
router.get('/', checklistsCtrl.index);

router.get('/new', checklistsCtrl.new);

router.get('/:id', checklistsCtrl.show);


router.get('/:id/edit', checklistsCtrl.edit);

//POST routes
router.post('/', checklistsCtrl.create);


router.delete('/:id', checklistsCtrl.delete);

router.put('/:id', checklistsCtrl.updateProjects);

router.put('/:id/update', checklistsCtrl.updateTasks);



module.exports = router;