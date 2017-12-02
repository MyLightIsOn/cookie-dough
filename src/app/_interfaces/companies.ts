export interface ICompany {
    [index: number]: {
        id: string;
        field_3: string;
        field_4_raw: object;
        field_29: boolean;
        field_32_raw: number;
        field_32_raw_image?: string; // This field is created by the CreateReviewStars method in CompaniesServices
    };
}
