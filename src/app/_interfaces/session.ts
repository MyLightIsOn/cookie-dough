import { ICompany } from './companies';

export interface ISession {
    session: {
        user: {
            id: string; // ID
            token: string; // JWT
            values: {
                field_22: {
                    email: string; // email address
                }
                field_44: string // username
                field_50: string // account type
                field_52?: string[] // company id
                field_53?: string // company name
            }
        }
        company?: ICompany;
    };
}
