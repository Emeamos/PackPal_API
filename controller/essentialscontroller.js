import essential from "../model/essentialsmodel.js";
import User from "../model/usermodel.js";

export const addEssentialController = async(req, res)=> {
    const {essentials} = req.body;
    console.log(req.body);
    try {
        const addEssentials = new essential({
            essentials,
            user: req.userAuth
        })
        await addEssentials.save();
        console.log(req.userAuth);

        res.json({
            status:"success",
            data:addEssentials

        })
        
    } catch (error){
        res.json(error.message)
    }
}

export const getAllEssentialController = async (req, res) => {
  try {

    const getEssentials = await essential.find(req.userAuth)
    
    res.json({
        status: "success",
        data: getEssentials
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteEssential = async (req, res) => {
    try {
      const deletedEssential = await essential.findByIdAndDelete(req.params.id)
  
      if (deletedEssential) {
        return res.status(200).json({
          status: 'Essential deleted successfully'
        })
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Essential not found',
        })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

export const updateEssential = async (req, res) => {
    try {
      const { essentials } = req.body
  
      const foundEssential = await essential.findById(req.params.id)
  
      if (!foundEssential) {
        return res.status(404).json({ message: 'Essential not found' })
      }
  
      foundEssential.essentials = essentials
      
  
      await foundEssential.save()
  
      res.status(200).json(foundEssential)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

export const getEssential = async (req, res) => {
    try {
      const foundEssential = await essential.findById(req.params.id)
  
      if (!foundEssential) {
        return res.status(404).json({ message: 'Essential not found' })
      }
      const userEssential = await foundEssential.filter(u => u.user == req.userAuth)
      res.status(200).json({status: "success", data: userEssential})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}