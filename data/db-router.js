const express = require('express')
const shortid = require('shortid');
const DB = require('./db.js')

const router = express.Router()

function finder(id) {
    console.log(id)
    let found ;
    DB.findById(id)

    .then(db=>{
        found = db
        console.log(found)
        return found
        
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message: "Error retreiving data"
        })
    })
   
}


/**-----------------------GETS-------------------------- */

router.get('/',(req,res)=>{
    DB.find(req.query)
    .then(db=>{
        res.status(200).json(db)
    })

.catch(error=>{
    console.log("ERROR RETURNING DB GET RQ",error)
    res.status(500).json({
        message: " Error retrieving the DB"
    })
})
})

router.get('/:id',(req,res)=>{
   
    // let found;
    // DB.findById(req.params.id)
    // .then(db=>{
    //     found = db
    // })
    // .catch(error=>{
    //     console.log(error)
    //     res.status(500).json({
    //         message: "Error retreiving data"
    //     })
    // })
    // console.log(found)
    let found = finder(req.params.id)
   
    if(!found ){
        res.status(404).json({ message: "Id not found"})
    }
    else{

    DB.findById(req.params.id)
    .then(db=>{
        if(db){
            res.status(200).json(db)
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message: "Error retreiving data"
        })
    })
}
})

router.get('/:id/comments',(req,res)=>{
    let found = finder(req.params.id)
   
    if(!found ){
        res.status(404).json({ message: "Id not found"})
    }
    else{
    DB.findPostComments(req.params.id)
    .then(db=>{
        if(db){
            res.status(200).json(db)
        } 
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message: "Error retreiving data"
        })
    })
}
})


/**----------------------------POSTS----------------------------------------- */

router.post('/',(req,res)=>{

    if(!req.body.title || !req.body.message){
        res.status(400).json({message:"Please provide a title and/or message"})
 
}
    else{
        DB.insert(req.body)
        .then(entry=>{
            res.status(201).json(req.body)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                message: "Error adding the post"
            })
        })
    }
})


router.post('/:id/comments',(req,res)=>{

    
    let found = finder(req.params.id)
   
    if(!found ){
        res.status(404).json({ message: "Id not found"})
    }
    else{

    if(!req.body.text){
        res.status(400).json({message:"Please provide text for the comment"})
    }
    else{
    DB.insertComment(req.body)
    .then(entry=>{
        res.status(201).json(entry)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message: "Error adding the post"
        })
    })
        }
    }
})

/**-----------------------DELETE------------------------- */

router.delete('/:id',(req,res)=>{
    let found = finder(req.params.id)
   
    if(!found ){
        res.status(404).json({ message: "Id not found"})
    }

    else{
    DB.remove(req.params.id)
    .then(count => {
        if(count>0){
            res.status(200).json(newEntry)
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message: "Error removing post"})
    })
    }
})
    

/**-----------------------PUTS------------------------- */

router.put('/:id',(req,res)=>{
    const changes = req.body;
    DB.update(req.params.id, changes)
    .then(entry=>{
        if(entry){
             DB.findById(req.params.id)
             .then(returns=>{
                 let newentry = returns;
                 res.status(200).json(newentry)
             })
             .catch(error=>{
                 console.log(error)
                 res.status(500).json({message:"There was an error modifying post"})
             })
            
        }
        else{
            res.status(404).json({message:"Could not find post to modify"})
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message:"Error updating Post"
        })
    })
})

module.exports = router