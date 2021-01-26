import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../shared/property.model';
import { PropertyService } from '../shared/property.service';

@Component({
  selector: 'app-property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.css']
})
export class PropertyProfileComponent implements OnInit {

    authUser: User;
    propertyActive: Property = new Property();
    onLoading: boolean = false;
    hasActiveProperty: boolean = true;

    constructor(
        private propertyService: PropertyService,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService
    ) { }

    ngOnInit(): void {
        this.onLoading = true;
        this.authUser = this.tokenService.currentUser;
        this.propertyService
            .getCurrentActivePropertyId(this.authUser.id).subscribe(
                property => {
                    this.onLoading = false;
                    this.propertyActive = property
                },
                error => {
                    this.onLoading = false;
                    this.hasActiveProperty = false;
                    this.toastService
                        .loadErrorToast("Imóvel ativo não encontrado"
                        + error,
                        "toast-bottom-center");
                }
            )
    }

}
