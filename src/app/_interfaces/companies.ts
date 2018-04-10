export interface ICompany {
    id: string; // ID
    field_1: string; // Name
    field_2: string; // Address
    field_2_raw?: {
        street: string,
        street2: string,
        city: string,
        state: string,
        zip: string,
        country: string
    };
    field_3_raw?: object; // Company logo Object:
    // id, application id, s3, type, filename, url, thumb_url, size, field_key
    field_4?: string; // Tagline
    field_5?: string; // Description
    field_6?: number; // Year Established
    field_7?: string; // Website
    field_7_raw?: string; // Website Object: url
    field_8_raw?: string; // Email Object 1: email
    field_9_raw?: string; // Email Object 2: email
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
