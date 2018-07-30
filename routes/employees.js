var express = require('express');
var router = express.Router();
var models = require('../models');



//create employee
router.post('/create', (req, res, next) => {
    console.log('server hited');
    console.log('req body my : ', req.body.form.proj_id);
    const myproj_id = req.body.form.proj_id;
    const mykey = req.body.form.key;

    models.Project.findOne({
        where: {
            proj_id: req.body.form.proj_id
        }
    })
        .then(function (projectNewTable) {
            console.log('found table : ', projectNewTable);
            if (projectNewTable) {
                //create employee
                if (projectNewTable.owner_id == req.body.emp_id) {
                    console.log('cant enroll u r owner');
                    res.status(404);
                    return res.json({ success: false, msg: 'You are owner of this project ,cant enroll..' });

                }
                else if (projectNewTable.key != req.body.form.key) {
                    res.status(404);
                    return res.json({ success: false, msg: 'Key is not correct try again..' });
                }
                else {
                    models.employee.create(
                        {
                            emp_name: req.body.emp_name,
                            emp_id: req.body.emp_id,
                            owner_id: projectNewTable.owner_id,
                            proj_name: projectNewTable.name,
                            proj_id: req.body.form.proj_id,

                        }
                    )
                    res.json({
                        status: 200,
                        success: true,
                    });
                }
            }
            else {

                //project with this id not exist try different one
                res.status(404);
                return res.json({ success: false, msg: 'this project id is not exist..' });

            }
        });
});

//get employee list by project id
router.get('/:pid', (req, res) => {

    models.employee.findAll({
        where: {
            proj_id: req.params.pid
        }
    })
        .then(function (employeeNewTable) {
            console.log('found table : ', employeeNewTable);
            if (employeeNewTable) {

                //project with this id already exist try different one
                res.status = 200;
                return res.json(employeeNewTable);
            }

        })
});

module.exports = router;
