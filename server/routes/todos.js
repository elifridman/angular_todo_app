const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
/* GET api listing. */
router.get('/', (req, res) => {
  Todo.find({}, function(err, todos){
    if(err){
      return res.send({
        error: err,
        msg: 'connection error'
      })
    }
    res.json(todos)
  })
});

router.get('/:id', (req, res) => {
  Todo.findById(req.params.id , function(err, todo){
    if(err){
      return res.send({
        error: err,
        msg: 'connection error'
      })
    }
    res.json(todo)
  })
});

router.post('/', (req, res, next) => {
  const todo =  new Todo(req.body);
  if(!todo.text || !(todo.isCompleted + '')){
    res.status(400);
    res.json({
      error: "Invalid Data"
    });
  }else{
    todo.save(todo, function(err, todos){
      if(err){
        return res.json({
          error: err,
          msg: 'connection error'
        })
      }
      res.send(todos)
    })
  }

});

router.put('/:id', (req, res, next) => {
  const todo = req.body;
  const updObj = {};
    updObj.isCompleted = todo.isCompleted
  if(todo.text){
    updObj.text = todo.text
  }
  if(!updObj){
    res.status(400);
    res.json({
      error: "Invalid Data"
    });
  }else{
    Todo.findByIdAndUpdate(todo._id, updObj, function(err, result){
      if(err){
        return res.json({
          error: err,
          msg: 'connection error'
        })
      }
      res.json(result)
    })
  }
});

router.delete('/:id', (req, res, next) => {
    Todo.findByIdAndRemove(req.params.id, function(err, result){
      if(err){
        return res.json({
          error: err,
          msg: 'connection error'
        })
      }
      res.json(result)
    })

});



module.exports = router;
