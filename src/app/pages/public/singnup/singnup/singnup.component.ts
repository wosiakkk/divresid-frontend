import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.publicService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
