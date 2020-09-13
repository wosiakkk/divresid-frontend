import { User } from 'src/app/security/models/user.model';

export abstract class BaseResourceModel {
    id?: number;
    user: User;
}