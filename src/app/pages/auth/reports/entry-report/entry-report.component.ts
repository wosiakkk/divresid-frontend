import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry-service';
import { CategoryService } from '../../categories/shared/category.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { User } from 'src/app/security/models/user.model';

@Component({
  selector: 'app-entry-report',
  templateUrl: './entry-report.component.html',
  styleUrls: ['./entry-report.component.css']
})
export class EntryReportComponent implements OnInit {

    expenseTotal: any = 0;
    revenueTotal: any = 0;
    balance: any = 0;

    expenseChartData: any;
    revenueChartData: any;

    charOptions = {
        scales:{
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    categories: Category[] = [];
    entries: Entry[] = [];

    @ViewChild('month') month: ElementRef = null;
    @ViewChild('year') year: ElementRef = null;

    constructor(
        private entryService: EntryService,
        private categoryService: CategoryService,
        private tokenStorageService: TokenStorageService
    ) { }

     ngOnInit(): void {
         this.categoryService.getAllByAuthUser(
                new User(this.tokenStorageService.getUser().id)
            )
            .subscribe(categories => this.categories = categories);
        console.log('Categorias carregadas para reports: ' + JSON.stringify(this.categories));
    }

    public generateReports() {
        //pegando os valores do DOM
        const month = this.month.nativeElement.value;
        const year = this.year.nativeElement.value;

        if(!month || !year)
            alert("è necessário selecionar mês e ano!");
        else    
            console.log();
    }

}
