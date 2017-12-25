export interface ICompany {
    [index: number]: {
        id: string; // ID
        field_3: string; // Name
        field_4?: string; // Address
        field_4_raw?: object; // Address Object with lat and long optional:  country, zip, state, city, street2, street
        field_5_raw?: object; // Company logo Object:
        // id, application id, s3, type, filename, url, thumb_url, size, field_key
        field_6?: string; // Tagline
        field_7?: string; // Description
        field_8?: number; // Year Established
        field_9?: string; // Website
        field_9_raw?: string; // Website Object: url
        field_10_raw?: string; // Email Object 1: email
        field_11_raw?: string; // Email Object 2: email
        field_12_raw?: string; // Phone Number Object 1: area, country, formatted, full, numbers
        field_13_raw?: string; // Phone Number Object 2: area, country, formatted, full, numbers
        field_14_raw?: string; // Social Media 1
        field_15_raw?: string; // Social Media 2
        field_16_raw?: string; // Social Media 3
        field_17_raw?: string; // Business Hours
        field_28_raw?: any; // Array strings Company Type
        field_29: boolean; // Verified
        field_31?: number; // Number of reviews
        field_32_raw: number; // Review Stars
        field_32_raw_image?: string; // This field is created by the CreateReviewStars method in CompaniesServices
        field_33?: string; // Company URL
    };
}
