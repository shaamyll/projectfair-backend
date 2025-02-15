const projects = require('../Models/projectSchema');




exports.addProjectAPI = async (req, res) => {
    console.log("Inside add project API");

    const { title, language, github, website, overview } = req.body
    const projectImg = req.file.filename
    const userId = req.payload //from jwt middleware


    try {

        const project = await projects.findOne({ github })

        if (project) {
            res.status(401).json("Project already existing")
        }
        else {
            const newProject = new projects({ title, language, github, website, overview, projectImg, userId })

            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(406).json(err)
    }
}






exports.getHomeProjectAPI = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch (err) {
        res.status(406).json(err)
    }
}






exports.getAllUserProjectAPI = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        title:{
            $regex:searchKey,
            $options:"i"
        }
    }
    
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch (err) {
        res.status(406).json(err)
    }
}






exports.getParticularUserProjetAPI = async (req, res) => {
    console.log("Inside User Project APi");

    const userId = req.payload

    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    }
    catch (err) {
        res.status(406).json(err)
    }
}





exports.editProjectAPI = async (req, res) => {
    console.log("Inside edit project API");

    const { title, language, github, website, overview, projectImg } = req.body
    const updateImg = req.file ? req.file.filename : projectImg
    const userId = req.payload //from jwt middleware
    const { projectId } = req.params


    try {

        const project = await projects.findByIdAndUpdate(
            { _id: projectId },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImg: updateImg
            }
        )
        await project.save()
        res.status(200).json(project)

    }

    catch (err) {
        res.status(406).json(err)
    }
}






exports.deleteProjectAPI = async (req, res) => {
    console.log("Inside delete  API");
    const { projectId } = req.params
    console.log(projectId);

    try {

        const project = await projects.findByIdAndDelete({ _id: projectId })
        res.status(200).json(project)

    }

    catch (err) {
        res.status(406).json(err)
    }
}


