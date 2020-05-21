package com.todomvc.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity Class
 */

@Entity
public class Todo {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    String value;
    Boolean completed;
    //value getter
    public String getValue() {
        return value;
    }
    //value setter
    public void setValue(String value) {
        this.value = value;
    }
    public Boolean isCompleted(){   return completed; }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
    //id getter
    public Long getId() {
        return id;
    }
    //id setter
    public void setId(Long id) {
        this.id = id;
    }
    public void toggle() {
        this.completed=!this.completed;
    }
    //Override toString()
    @Override
    public String toString(){
        return "Todo : Id = " + id + ", Value = " + value + ", Completed : " + completed ;
    }
}
