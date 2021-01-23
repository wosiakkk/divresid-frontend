import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { Goal } from "./goal.model";



@Injectable({
    providedIn: 'root'
})
export class GoalService extends BaseResourceService<Goal>{

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/goals", injector,
            Goal.fromJson, Goal.paginationFromJson);
    }

}