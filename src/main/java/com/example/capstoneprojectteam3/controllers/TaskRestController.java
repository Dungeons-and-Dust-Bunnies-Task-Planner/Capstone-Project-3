package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/task")
public class TaskRestController {

    @Autowired
    private final TaskRepository tasksDao;

    public TaskRestController(TaskRepository tasksDao) {
        this.tasksDao = tasksDao;
    }

    @GetMapping("/task-list")
    public List<Task> getTaskListById(@RequestParam(name = "battleId") Long battleId){
        List<Task> tasks = tasksDao.findAllByBattleId(battleId);
        return tasks;
    }


    @PostMapping("/task-complete")
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
