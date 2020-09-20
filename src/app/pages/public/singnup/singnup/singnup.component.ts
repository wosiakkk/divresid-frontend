import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css']
})
export class SingnupComponent implements OnInit {
  faUserPlus = faUserPlus;

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
        private publicService: PublicService,
        private toastoService: ToastMessagesService,
        private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.publicService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastoService
            .loadCreatedResourceSuccessMsg("Cadastro criado com sucesso!",
                "toast-bottom-center");
        this.router.navigateByUrl("/login");
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
