import { Injectable, Injector } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { User } from "src/app/security/models/user.model";
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

    getAllActive(user: User){
        const url = `${this.apiPath}/active?user=${user.id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)
        );
    }
}