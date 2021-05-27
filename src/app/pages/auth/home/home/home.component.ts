import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { EntryService } from '../../entries/shared/entry-service';
import { Entry } from '../../entries/shared/entry.model';
import { InventoryService } from '../../inventory/shared/inventory.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Task } from '../../tasks/shared/task.model';
import { CurrencyPipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { TaskService } from '../../tasks/shared/task.service';
import { TaskEvent } from './shared/event.model'
import { Goal } from '../../goals/shared/goal.model';
import { GoalService } from '../../goals/shared/goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    activeProperty: Property = new Property();
    residents: User[] = [];
    currentTasks: Task[] = [];
    currentEntries: Entry[]= [];
    loading: boolean;
    authUser: User;
    currentMonth: number;
    currentYear: number;
    expenseTotal: any = 0;
    revenueTotal: any = 0;
    balance: any = 0;
    balanceUnformatted: any;
    showEntries: boolean = false;
    events: any[] = [];
    options: any;
    goals: Goal[] = [];

    
    constructor(
        private change: ChangeDetectorRef,
        private tokenService: TokenStorageService,
        private inventory: InventoryService,
        private propertyService: PropertyService,
        private entryService: EntryService,
        private currencyPipe: CurrencyPipe,
        private taskService: TaskService,
        private goalsService: GoalService
    ) { }

    async ngOnInit() {
        
        this.change.detectChanges();
        this.loading = true;
        this.authUser = new User(this.tokenService.getUser().id);
        this.activeProperty = await this.loadActiveProperty(this.authUser)
            .catch(() => {return new Property()});
        setTimeout(() => {
            if(this.activeProperty.id !== null &&  this.activeProperty.id > 0){
                this.residents = this.activeProperty.residents;
                if(this.residents.length > 4){
                    this.residents.length = 4;
                }
            }
            this.currentMonth = new Date().getMonth() +1;
            this.currentYear = new Date().getFullYear();
            this.entryService.getByMonthAndYear
                ( this.currentMonth,this.currentYear,this.authUser)
                    .subscribe(this.setValues.bind(this));
            this.taskService.getAllActive(this.activeProperty)
                .subscribe(this.setEvents.bind(this));
                    this.change.detectChanges();
            this.loading = false;
    }, 700 ); 
    }


    loadActiveProperty(user: User): Promise<Property>{
        return this.propertyService
            .getCurrentActivePropertyId(user.id).toPromise().catch(
                error => {console.log('error: ' , error); return new Property; }
            );
    }

    loadEntries(month: number, year: number, user:User):Promise<Entry[]>{
        return this.entryService
            .getByMonthAndYear(month,year,user).toPromise();
    }

    setValues(currentEntries: Entry[]){
        Object.keys(currentEntries).forEach(e=>{
            if(currentEntries[e] != undefined)
               this.currentEntries.push(currentEntries[e]);
            }
        );
        if(this.currentEntries.length > 0){
            this.showEntries = true;
            let expenseTotal = 0;
            let revenueTotal = 0;

            this.currentEntries.forEach(entry => {
                if(entry.type == 'revenue')
                    revenueTotal += entry.amount;
                else
                    expenseTotal += entry.amount; 
            })

            this.revenueTotal = this.currencyPipe
                                    .transform(revenueTotal, 'BRL');
            this.expenseTotal = this.currencyPipe
                                    .transform(expenseTotal, 'BRL');
            this.balance = this.currencyPipe
                                    .transform(
                                        (revenueTotal-expenseTotal), 'BRL');
            this.balanceUnformatted = (revenueTotal-expenseTotal);

            this.goalsService.getAllActive(this.authUser).subscribe(
                goals => {
                    this.goals = goals;
                    if(goals.length > 3){
                        this.goals.length = 3;
                    }
                    this.goals.forEach(g=> {
                        g.percent = 
                            (((revenueTotal-expenseTotal) * 100) / g.value)
                                .toFixed(2);
                    })
                }
            );
        }
    }

    setEvents(task: Task[]){
        Object.keys(task).forEach(e=>{
            if(task[e] != undefined)
               this.currentTasks.push(task[e]);
            }
        );
        this.currentTasks.forEach(t =>{
            let taskEvent = new TaskEvent();
            taskEvent.title = t.name + ' - ' + t.targetUser.name;
            taskEvent.date = t.date;
            this.events.push(taskEvent);
        })

        this.calendarOptions.events = this.events;
    }


    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        events: [],
        locale: 'pt-br'
      };

}
