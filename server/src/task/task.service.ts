import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entity/task.entity';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    constructor(
        @InjectRepository(TaskEntity)
        private tasksRepository: Repository<TaskEntity>,
    ) { }

    getAllTasks(): Promise<TaskEntity[]> {
        return this.tasksRepository.find();
    }

    getTaskById(id: number): Promise<Task> {
        return this.tasksRepository.findOne({ id: id });
    }

    createTask(task: Task): Promise<Task> {
        return this.tasksRepository.save(task);
    }

    async updateTask(task: Task): Promise<Task> {
        let findTask = await this.tasksRepository.findOne({ id: task.id });
        findTask = {
            id: findTask.id,
            ...task,
        };
        return this.tasksRepository.save(findTask);
    }

    async removeTask(id: number) {
        let task = await this.tasksRepository.findOne({ id: id });
        await this.tasksRepository.delete({id:id});
        return task;
    }
}


