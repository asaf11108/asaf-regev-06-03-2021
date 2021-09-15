export interface LocationHttpResponse {
    Key: string;
    LocalizedName: string;
}

export type Location = Record<Uncapitalize<keyof LocationHttpResponse>, string>;