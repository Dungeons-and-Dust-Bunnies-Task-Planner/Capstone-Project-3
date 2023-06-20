package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TaskRestController {

    @Autowired
    private final TaskRepository tasksDao;

    public TaskRestController(TaskRepository tasksDao) {
        this.tasksDao = tasksDao;
    }

    @PostMapping("/complete-task")
    public ResponseEntity<Task> completeTask(@RequestParam("taskId") Long taskId) {
        Task task = tasksDao.findTaskById(taskId);
        if(task == null) {
            return ResponseEntity.notFound().build();
        }
        if (task.getTaskComplete() == 0){
            task.setTaskComplete(1);
        } else {
            task.setTaskComplete(0);
        }
        return ResponseEntity.ok(task);
    }
}
