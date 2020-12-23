import { Timestamp } from "rxjs";

export interface Mensaje {
    texto?: string ;
    emisor: string ;
    correo: string;
    estado?: boolean;
    count?: number;
    fechaHora?: Date;
    telefono?: number;
}