export class Utils {

    static buildUrlParams(params: any): string {

        let url = '';
        for (const key in params) {
            let value = params[key];

            if (typeof value === 'string') {
                value = encodeURIComponent(value);
            }

            if (value || value === 0 || value === false) {
                url += `&${key}=${value}`;
            }
        }
        return url.substring(1);
    }

}