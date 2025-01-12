const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')


const router = express.Router()

router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/addProject',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectAPI)

router.get('/api/getAllUserProject',jwtMiddleware,projectController.getAllUserProjectAPI)

router.get('/api/getHomeProjects',projectController.getHomeProjectAPI)

router.get('/api/getUserProject',projectController.getUserProjetAPI)

router.put('/api/editProject/:projectId',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectAPI)

router.delete('/api/deleteProject/:projectId',jwtMiddleware,projectController.deleteProjectAPI)




module.exports=router