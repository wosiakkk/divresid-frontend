import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Resident } from '../../residents/shared/resident.model';
import { UserProfileService } from '../shared/user-profile.service'

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {

    userAuth: Resident;

    constructor(
        private tokenService: TokenStorageService,
        private userProfileService: UserProfileService,
        private toastService: ToastMessagesService
    ) { }

    ngOnInit(): void {
        this.userAuth = this.tokenService.currentUser
        this.userProfileService.getById(this.userAuth.id).subscribe(
            u => this.userAuth = u,
            error => this.toastService
                .loadErrorToast("Problema ao carregar perfil",
                    "toast-bottom-center")
        )
    }

}
