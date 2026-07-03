import {ref} from "vue";
import {createCrudServices} from "@/Services/CrudServices.ts";

export function useCrud<T>(route: string) {
    const service = createCrudServices(route);

    const items = ref<T[]>([]);

    const getAll = async (params: Record<string, any> = {}) => {
        try {
            const response = await service.getList(params);
            items.value = response.data;

        } catch (error) {
            console.error(`Error fetching data ${error}`);
        }
    }

    const downloadFile = async (id: number) => {
        const response = await service.getFile(id);

        const contentType =
            typeof response.headers["content-type"] === "string"
            ? response.headers["content-type"]
            : 'application/octet-stream';

        const blob = new Blob([response.data], {
            type: contentType
        })

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        link.download = `certificate-${id}`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);


    }


    return {
        items,
        getAll,
        downloadFile
    }
}