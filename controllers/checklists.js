const Checklist = require('../models/checklist');
module.exports = {
    index,

};

async function index(req, res) {
    const checklistsAll = await Checklist.find({})
    res.render('checklists/index', {
        checklists: checklistsAll
    });
};