export interface IApiResponse {
    name: string
    fields: Record<string, Record<string, string>>
    createTime: string
    updateTime: string
}

export interface IApiResponseDocument {
    document: IApiResponse
    readTime: string
}
