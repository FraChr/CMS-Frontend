import {useCrud} from "@/Composables/UseCrud.ts";
import type {Certificate} from "@/Types/Certificate.ts";


export const crudFactory = {
    useCertificate: () => useCrud<Certificate>('certificates')
}