import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private myTaskService:TaskService
        ){};

    @Get()
    getAllTasks():Promise<Task[]>{
        return this.myTaskService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string){
        return this.myTaskService.getTaskById(Number(id));
    }

    @Post()
    createMyTask(@Body()taskDto:CreateTaskDto):Promise<Task>{
        return this.myTaskService.createTask(taskDto);
    }

    @Put()
    updateMyTask(@Body()taskDto:UpdateTaskDto):Promise<Task>{
        return this.myTaskService.updateTask(taskDto);
    }

    @Delete(':id')
    removeMyTask(@Param('id') id: number){
        return this.myTaskService.removeTask(id);
    }
}
