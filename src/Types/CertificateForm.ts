export interface CertificateForm {
    type: string;
    number: number | null;
    notifiedBody: string;
    issueDate: string | null;
    expiryDate: string | null;
    file: File | null;
}