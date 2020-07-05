import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry-service';
import { CategoryService } from '../../categories/shared/category.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { User } from 'src/app/security/models/user.model';
import { CurrencyPipe } from '@angular/common';


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

    chartOptions = {
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
        private tokenStorageService: TokenStorageService,
        private currencyPipe: CurrencyPipe
    ) { }

     ngOnInit(): void {
        this.categoryService.getAllByAuthUser(
                new User(this.tokenStorageService.getUser().id)
            )
            .subscribe(categories => this.categories = categories);
    }

    public generateReports() {
        this.entries = [];
        //pegando os valores do DOM(estudar problema de segurança)
        const month = this.month.nativeElement.value;
        const year = this.year.nativeElement.value;

        if(!month || !year)
            alert("é necessário selecionar mês e ano!");
        else    
            this.entryService.getByMonthAndYear
                (month,year,new User(this.tokenStorageService.getUser().id))
                    .subscribe(this.setValues.bind(this));  
    }

    private setValues(entriesResponse: any[]) {
        Object.keys(entriesResponse).forEach(e=>{
                if(entriesResponse[e] != undefined)
                   this.entries.push(entriesResponse[e]);
                }
        );
        this.calculateBalance();
        this.setChartData();
    }

    private calculateBalance(){
        let expenseTotal = 0;
        let revenueTotal = 0;

        this.entries.forEach(entry => {
            if(entry.type == 'revenue')
                revenueTotal += entry.amount;
            else
                expenseTotal += entry.amount; 
        })
        
        this.revenueTotal = this.currencyPipe.transform(revenueTotal, 'BRL');
        this.expenseTotal = this.currencyPipe.transform(expenseTotal, 'BRL');
        this.balance = this.currencyPipe
                                .transform((revenueTotal-expenseTotal), 'BRL');
    }

    private setChartData() {
        this.revenueChartData = this
            .getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
        this.expenseChartData = this
            .getChartData('expense', 'Gráfico de Despesas', '#E03131');
    }

    private getChartData(entrytype: string, title: string, color: string) {
        const chartData = []; //será um array de obj
    
        this.categories.forEach(category => {
            //filtrando laçamentos pela categoria e tipo
            const filteredEntries = this.entries.filter(
                entry => (entry.categoryId == category.id) 
                        && (entry.type == entrytype) 
            );
    
            //se for encontrado lançamentos, então soma-se o valor dles e add ao chartdata
            //só irá mostrar categorias que tenham dados
            if (filteredEntries.length > 0) {
                const totalAmount = filteredEntries.reduce(
                    (total, entry) => total + entry.amount, 0
                )
    
                chartData.push({
                    categoryName: category.name,
                    totalAmount: totalAmount
                })
            }
        });
    
        return {
            labels: chartData.map(item => item.categoryName),
            datasets: [{
                label: title,
                backgroundColor: color,
                data: chartData.map(item => item.totalAmount)
            }]
        }
    }
}
