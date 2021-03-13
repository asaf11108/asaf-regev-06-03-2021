export interface LocationHttpResponse {
    Key: string;
    LocalizedName: string;
}

//@ts-ignore
export type Location = Record<Uncapitalize<keyof LocationHttpResponse>, string>;