import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../shared/property.model';
import { PropertyService } from '../shared/property.service';

@Component({
  selector: 'app-property-rules-view',
  templateUrl: './property-rules-view.component.html',
  styleUrls: ['./property-rules-view.component.css']
})
export class PropertyRulesViewComponent implements OnInit {

    authUser : User;
    propertyActive: Property;

    constructor(
        private propertyService: PropertyService,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService
    ) 
    { }

    ngOnInit(): void {
        this.authUser = this.tokenService.currentUser;
        this.propertyService
            .getCurrentActivePropertyId(this.authUser.id).subscribe(
                propery => this.propertyActive = propery,
                error => this.toastService
                    .loadErrorToast("Problema ao carregar imóvel ativo"
                        + error,
                        "toast-bottom-center")
            )
    }

}
