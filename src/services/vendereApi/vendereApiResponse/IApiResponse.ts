export interface IApiResponse {
    name: string
    fields: Record<string, Record<string, string>>
    createTime: string
    updateTime: string
}
