package com.example.capstoneprojectteam3.controllers;

import com.example.capstoneprojectteam3.models.Task;
import com.example.capstoneprojectteam3.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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


    @PostMapping("/complete-task")
    public ModelAndView completeTask(@RequestParam("taskId") Long taskId) {
        Task task = tasksDao.findTaskById(taskId);
        Long battleId = task.getBattle().getId();
        if(task == null) {
            System.out.println("Could not find taskId to Complete Task!");
        }
        if (task.getTaskComplete() == 0){
            task.setTaskComplete(1);
            System.out.println("taskId: " + taskId + " " + task.getTaskBody() + " task marked as complete!");
            tasksDao.save(task);
        } else {
            task.setTaskComplete(0);
            System.out.println("taskId: " + taskId + " " + task.getTaskBody() + " task marked as NOT -Complete!");
            tasksDao.save(task);
        }

        // Create a ModelAndView object and set the view name and model attributes
        ModelAndView modelAndView = new ModelAndView("redirect:/battlegrounds/"+ battleId); // Replace "viewName" with the actual name of your HTML view
        return modelAndView;
    }
}
