import apiClient from './Api.ts';

export const createCrudServices = <T>(route: string) => ({
    getList: (params: Record<string, any> = {}) =>
        apiClient.get<T[]>(`/${route}`, { params }),

    getFile: (id: number) =>
        apiClient.get(`/${route}/${id}/file`, {
        responseType: "blob"
    }),
    getTypes: () => apiClient.get<string[]>(`/${route}/types`),

    postFile: (formData: FormData) => apiClient.post(`/${route}/upload`, formData)
})