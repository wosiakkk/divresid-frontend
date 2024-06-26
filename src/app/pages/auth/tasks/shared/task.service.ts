import { Injectable, Injector } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Property } from "../../properties/shared/property.model";
import { BaseTaskService } from "./base-task.service";
import { Task } from "./task.model";


@Injectable({
    providedIn: 'root'
})
export class TaskService extends BaseTaskService{

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/tasks",
        injector, Task.fromJson, Task.paginationFromJson);
    }

    updateTaskStatus(id: any){
        const url = `${this.apiPath}/done`;
        return this.http.put(url,id).pipe(
            catchError(this.handleError)
        )
    }

}