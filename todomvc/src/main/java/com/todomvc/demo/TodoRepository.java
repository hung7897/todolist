package com.todomvc.demo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TodoRepository extends CrudRepository<Todo, Long> {

    List<Todo> findByValue(String value);

    List<Todo> findByCompletedTrue();

}