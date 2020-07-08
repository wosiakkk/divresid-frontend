import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators"
import { Pageable } from "../interfaces/pageable.interface"
import { User } from 'src/app/security/models/user.model';



export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;
    public totalElements: number;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T,
        protected paginationJsonDataToResourceFn: (jsonData: any) => T
    ){
        this.http = injector.get(HttpClient);
    }

    getNumberOfResources(user : User):Observable<number>{
      const url = `${this.apiPath}/pagination/count?user=${user.id}`;
      return this.http.get(url).pipe(
        catchError(this.handleError)
      )
    }

    getAllPagination(pageable: Pageable,user : User): Observable<T[]>{
      if(pageable.sort === null)
          pageable.sort = "not";
      const url = `${this.apiPath}/pagination?page=${pageable.page}&size=${pageable.size}&searchString=${pageable.sort}&user=${user.id}`;
      return this.http.get(url).pipe(
        map(this.jsonDataToResourcesPagination.bind(this)),
        catchError(this.handleError)
      );
    }

    getAll(): Observable<T[]>{
        return this.http.get(this.apiPath).pipe(
          map(this.jsonDataToResources.bind(this)),
          catchError(this.handleError)  
        )
    }
    
    getAllByAuthUser(user : User): Observable<T[]>{
        const url = `${this.apiPath}/resources/user?user=${user.id}`
        return this.http.get(url).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<T>{
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handleError)
        );
    }
      
    create(resource: T): Observable<T>{
        return this.http.post(this.apiPath, resource).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handleError)
        )
    }
    
    update(resource: T): Observable<T>{
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
           map(() => resource,
           catchError(this.handleError)
          )
        );
    }
    
    delete(id: number): Observable<any>{
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
          map(() => null),
          catchError(this.handleError)
        );
    }


    //Métodos
    protected jsonDataToResourcesPagination(jsonData: any): T[]{
        const resources: T[] = [];
        jsonData.content.forEach(
          elemento => resources.push(this.jsonDataToResourceFn(elemento))
        );
        this.totalElements =  jsonData.totalElements;
        return resources;
    }

    protected jsonDataToResources(jsonData: any): T[]{
        const resources: T[] = [];
        jsonData.forEach(
          elemento => resources.push( this.jsonDataToResourceFn(elemento) )
        );
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T{
        return  this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any>{
        console.log('Error na requisição =>', error);
        return throwError(error);
    }
}
