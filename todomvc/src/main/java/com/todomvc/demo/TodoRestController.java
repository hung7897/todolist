package com.todomvc.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
public class TodoRestController {

    @Autowired
    private TodoRepository todoRepository;
    //Get todos
    @GetMapping(value = "/api/todos")
    @CrossOrigin(origins = "http://localhost:3000")
    public Iterable<Todo> getTodos() {
        //return all todos
        return todoRepository.findAll();
    }
    //Add New todos
    @PostMapping(value="/api/todos")
    @CrossOrigin(origins = "http://localhost:3000")
    public void addTodo(@RequestBody Todo todo) {
        //save new todos
        todoRepository.save(todo);
    }
    //Delete todos
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(value="/api/todos/{id}")
    public void deleteTodo(@PathVariable("id") Long id) {
        //delete todos through id
        todoRepository.delete(id);
    }
    //Edit todos
    @PutMapping(value="/api/todos/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void editTodo(@PathVariable("id") Long id,@RequestBody Todo todo) {
        //find todos with id and set new value for it
        todoRepository.findOne(id).setValue(todo.getValue());
    }
    //Change todos's state
    @PutMapping(value="/api/todos/toggle/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void toggleTodo(@PathVariable("id") Long id) {
        //find todos with id and toggle
        todoRepository.findOne(id).toggle();
    }
    //Clear todos task
    @PostMapping(value="/api/todos/clearCompleted")
    @CrossOrigin(origins = "http://localhost:3000")
    public void clearCompleted() {
        //find the todos that completed True and delete it, using stream
        todoRepository.findByCompletedTrue().stream().forEach(todo -> todoRepository.delete(todo));
    }

}
