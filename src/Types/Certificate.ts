export interface Certificate {
    id: number;
    type: string;
    number: number;
    notifiedBody: string;
    issueDate: Date;
    expiryDate: Date;
}