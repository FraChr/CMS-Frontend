import apiClient from './Api.ts';

export const createCrudServices = (route: string) => ({
    getList: (params: Record<string, any> = {}) =>
        apiClient.get(`/${route}`, { params }),
    getFile: (id: number) => apiClient.get(`/${route}/${id}/file`, {
        responseType: "blob"
    }),
    uploadFile: (formData: FormData) => apiClient.post(`/${route}/upload`, formData)
})