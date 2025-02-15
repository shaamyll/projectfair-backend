const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')


const router = express.Router()

router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/addProject',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectAPI)

router.get('/api/getAllUserProjects',jwtMiddleware,projectController.getAllUserProjectAPI)

router.get('/api/getHomeProjects',projectController.getHomeProjectAPI)

//TO get Particular User Projects
router.get('/api/getParticularUserProject',jwtMiddleware,projectController.getParticularUserProjetAPI)

router.put('/api/editProject/:projectId',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectAPI)

router.delete('/api/deleteProject/:projectId',jwtMiddleware,projectController.deleteProjectAPI)




module.exports=router