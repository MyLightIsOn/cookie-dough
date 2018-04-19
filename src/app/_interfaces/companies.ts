export interface ICompany {
    id: string; // ID
    field_1: string; // Name
    field_2: string; // Address
    field_2_raw?: { // Address Object
        street: string,
        street2: string,
        city: string,
        state: string,
        zip: string,
        country: string
    };
    field_3?: string; // Logo
    field_3_raw?: { // Logo Object
        id: string,
        application_id: string,
        s3: boolean,
        type: string,
        filename: string,
        url: string
        thumb_url: string,
        size: number,
        field_key: string
    };
    field_4?: string; // Tagline
    field_5?: string; // Description
    field_6?: number; // Year Established
    field_7?: string; // Website
    field_7_raw?: {
        url: string
    };
    field_8?: string; // Email 1
    field_8_raw?: {  // Email 1 Object
        email: string
    };
    field_9?: string; // Email 2
    field_9_raw?: {   // Email 2 Object
        email: string
    };
    field_10_raw?: string; // Phone Number Object 1: area, country, formatted, full, numbers
    field_11_raw?: string; // Phone Number Object 2: area, country, formatted, full, numbers
    field_12_raw?: string; // Social Media 1
    field_13_raw?: string; // Social Media 2
    field_14_raw?: string; // Social Media 3
    field_15_raw?: string; // Business Hours
    field_16_raw?: any; // Array strings Company Type
    field_17: boolean; // Verified
    field_18?: number; // Company URL
    field_42?: number; // Reviews Average
    field_43?: number; // Total Reviews
}
