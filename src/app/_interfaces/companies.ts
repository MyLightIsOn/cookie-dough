export interface ICompany {
    [index: number]: {
        id: string; // ID
        field_3: string; // Name
        field_4_raw: object; // Country
        field_29: boolean; // Verified
        field_32_raw: number; // Review Stars
        field_32_raw_image?: string; // This field is created by the CreateReviewStars method in CompaniesServices
    };
}
