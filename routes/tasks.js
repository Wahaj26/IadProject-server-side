var express = require('express');
var router = express.Router();
var models = require('../models');

//create task
router.post('/create', (req, res, next) => {

    console.log('bodydd', req.body.form.deadline.date);
    models.task.create({
        task: req.body.form.task,
        deadline: req.body.form.deadline.jsdate,
        status: req.body.form.status,
        proj_id: req.body.proj_id,
        emp_id: req.body.emp_id,
        owner_id: req.body.owner_id

    }
    )
    res.json({
        status: 200,
        success: true,
    });
})


//get task list by project id & employee id
router.get('/admin/:pid/:eid', (req, res) => {

    models.task.findAll({
        where: {
            proj_id: req.params.pid, emp_id: req.params.eid
        }
    })
        .then(function (taskNewTable) {
            console.log('found table : ', taskNewTable);
            if (taskNewTable) {
                //project with this id already exist try different one
                res.status = 200;
                return res.json(taskNewTable);
            }

        })
});

//delete task list by project id & employee id
router.delete('/deleteTask/:tid', function (req, res) {
    console.log('id', req.params.tid);
    models.task.destroy({
        where: {
            id: req.params.tid
        }
    })
        .then(status => res.status(201).json({
            error: false,
            message: 'task has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

//update task status by task id
router.put('/updateTask/:tid', function (req, res, next) {
    const task_id = req.params.tid;
    models.task.update({
        status: req.body.status,
    }, {
            where: {
                id: task_id
            }
        })
        .then(status => res.status(201).json({
            error: false,
            message: 'status has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

module.exports = router;