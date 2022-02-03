import { Server } from "./server";


export interface CustomResponse {
    timeStamp: Date;
    statuscode: number;
    reason : string;
    message : string;
    developerMessage: string;
    data : {servers?: Server[], server?: Server }
}