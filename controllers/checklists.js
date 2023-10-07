const Checklist = require('../models/checklist');
module.exports = {
    index,
    show,
    new: newChecklist,
    create,
    delete: deleteChecklist,
    edit,
    updateProjects,
    updateTasks,
    update
    
};


function newChecklist(req, res) {
    res.render('checklists/new', {errorMsg: ''});
};

async function edit(req,res) {
    const checklist = await Checklist.findById(req.params.id);
    res.render('checklists/edit', {
        title: 'Edit-To-Do',
        checklist
    });
};


async function create(req, res) {
    try {
        await Checklist.create(req.body);
        res.redirect('/')
    }
    catch (err) {
        res.render('checklists/new', {errorMsg: err.message});
    }
};

async function show(req, res) {
    console.log('Showing checklist ', req.params.id)
    const selectedProject = await Checklist.findById(req.params.id);
    res.render('checklists/show', {
        checklist: selectedProject
    });
};

async function index(req, res) {
    const checklistsAll = await Checklist.find({})
    res.render('checklists/index', {
        checklists: checklistsAll
    });
};

async function update(req, res) {
    try {
        const dueDate = new Date(req.body.dueDate);

        const updatedData = {
            projectName: req.body.projectName,
            tasks: req.body.tasks,
            timeExpected: req.body.timeExpected,
            dueDate: dueDate
        };

        const selectedChecklist = await Checklist.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!selectedChecklist) {
            return res.status(404).send('No Checklist found with this id');
        } else {
            console.log(selectedChecklist);
            return res.redirect(`/${selectedChecklist.id}`);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function updateTasks(req, res) {
    try {
        const selectedChecklist = await Checklist.findByIdAndUpdate(req.params.id, {
            $set: {
                [`tasksCompletionStatus.${req.body.index}`]: req.body.checked
            }
        }, { new: true });

        if (!selectedChecklist) {
            return res.status(404).send('No Checklist found with this id');
        } else {
            console.log(selectedChecklist);
            return res.json(selectedChecklist);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

async function updateProjects(req, res) {
    try {
        const selectedChecklist = await Checklist.findById(req.params.id);

        if (!selectedChecklist) {
            return res.status(404).send('No Checklist found with this id');
        }

        selectedChecklist.completed = !selectedChecklist.completed;
        await selectedChecklist.save();

        console.log(selectedChecklist);
        return res.redirect('/'); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

async function deleteChecklist(req,res) {
    try {
        const checklist = await Checklist.findByIdAndDelete(req.params.id);
        if(!checklist) {
            return res.status(404).send('No project found with this id');
        } else {
            console.log(checklist);
            return res.redirect('/');
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
};