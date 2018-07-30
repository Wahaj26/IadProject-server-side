var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


//register or create user
router.post('/signup', (req, res, next) => {
    console.log('req body mymyym : ', req.body);
    console.log('req body my : ', req.body.userName);
    models.User.findOne({
        where: {
            userName: req.body.userName
        }
    })
        .then(function (userNewTable) {
            console.log('found table : ', userNewTable);
            if (userNewTable) {

                //user with this id already exist try different one
                res.status(404);
                return res.json({ success: false, msg: 'User with this Username already exist try different one' });
            }

            else {
                //create project success
                models.User.create(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        userName: req.body.userName,
                        password: req.body.password,
                        designation: req.body.designation

                    }
                )
                res.json({
                    status: 200,
                    success: true,
                });

            }
        });
});





//login
router.post('/signin', (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    models.User.findOne({
        where: {
            userName: req.body.userName
        }
    })
        .then(function (usersnewTable) {
            if (!usersnewTable) {
                res.status(404);
                return res.json({ success: false, msg: 'User not found' });
            }

            else if (usersnewTable.password == req.body.password) {
                // res === true
                res.json({
                    status: 200,
                    success: true,
                    userInfo: {
                        userName: usersnewTable.userName,
                        name: usersnewTable.name
                    }
                });

            }

            else {
                res.status(400);
                return res.json({ success: false, msg: 'Wrong password' });
            }

        });
});



//all user
router.get('/allUsers', (req, res) => {
    models.User.findAll().then(users => res.json(users))

})



module.exports = router;
