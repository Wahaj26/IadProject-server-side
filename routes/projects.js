var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


//create project
router.post('/createProject', (req, res, next) => {
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

                //project with this id already exist try different one
                res.status(404);
                return res.json({ success: false, msg: 'project with this id already exist try different one' });
            }

            else {
                //create project success
                models.Project.create(
                    {
                        name: req.body.form.name,
                        proj_id: req.body.form.proj_id,
                        key: req.body.form.key,
                        owner_id: req.body.ui

                    }
                )
                res.json({
                    status: 200,
                    success: true,
                });

            }
        });
});

//get own project list
router.get('/myProjects/:id', (req, res) => {

    models.Project.findAll({
        where: {
            owner_id: req.params.id
        }
    })
        .then(function (projectNewTable) {
            console.log('found table : ', projectNewTable);
            if (projectNewTable) {

                //project with this id already exist try different one
                res.status = 200;
                return res.json(projectNewTable);
            }

        })
})

//get enrolled project list
router.get('/enrolledProjects/:id', (req, res) => {

    models.employee.findAll({
        where: {
            emp_id: req.params.id
        }
    })
        .then(function (projectNewTable) {
            console.log('found table : ', projectNewTable);
            if (projectNewTable) {

                //project with this id already exist try different one
                res.status = 200;
                return res.json(projectNewTable);
            }

        })
})





//post : enroll in project
router.post('/enrollProject', (req, res, next) => {
    const proj_id = req.body.proj_id;
    const key = req.body.key;
    models.Project.findOne({
        where: {
            proj_id: req.body.proj_id
        }
    })
        .then(function (projectNewTable) {
            if (!projectNewTable) {
                res.status(404);
                return res.json({ success: false, msg: 'Project not found' });
            }

            else if (projectNewTable.key == req.body.key) {
                // res === true
                //enroll current user in project as a employee
                res.json({
                    status: 200,
                    success: true,
                    userInfo: {
                        userName: localStorage.getItem('loginedUserId'),
                        name: projectNewTable.name
                    }
                });

            }

            else {
                res.status(400);
                return res.json({ success: false, msg: 'Wrong key' });
            }

        });
});

module.exports = router;
