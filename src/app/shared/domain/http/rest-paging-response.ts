import { RestResponse } from './rest-response';

export class RestPagingResponse<T> extends RestResponse<T> {

    totalItems: number;

}
