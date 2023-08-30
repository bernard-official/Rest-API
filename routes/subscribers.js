const express= require('express');
const router = express.Router()
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

//Getting all
router.get('/', async (req,res)=> {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ messsage: err.message })
    }
})

//Getting One
// the :id means we are using a parameter
router.get('/:id', getSubscriber,(req,res)=> {
    // res.send(req.params.id)  has been commented because we want to use subscriber name
    res.send(res.subscriber.name)
})

//creating one
router.post('/', async (req,res)=> {
    const subscriber = new Subscriber ({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) 
    } catch (err) {
        res.status(400).json({messsage: err.message}) //incase the user gives us a bad data
    }
})
//updating one
router.patch('/', getSubscriber, async(req,res)=> {
    if (req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//deleting one
router.delete('/:id', getSubscriber, async (req,res)=> {
    try {
        await res.subscriber.remove()
        res.json({ message: "Deleted Subscriber "})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// notice how the rest of our router requires an id, we are going to 
//write a middlewARE FOR IT SO WE DONT REPEAT THE CODE
async function getSubscriber(req,res, next){
    try {
        subscriber= await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({ message:'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router