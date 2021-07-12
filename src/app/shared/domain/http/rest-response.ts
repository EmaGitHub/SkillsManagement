import { Message } from './message';

export class RestResponse<T> {

    data: T;

    info?: Message[];
    warnings?: Message[];
    errors?: Message[];
    
}
