import { ICompany } from './companies';

export interface ISession {
    session: {
        user: {
            id: string; // ID
            token: string; // JWT
            values: {
                field_19: {
                    email: string; // email address
                }
                field_34?: string[] // company id
                field_50: string // username
                field_51: string // company name
            }
        }
        company?: ICompany;
    };
}
