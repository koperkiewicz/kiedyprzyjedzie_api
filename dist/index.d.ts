import { IBusStop } from './models';
export default class KiedyPrzyjedzie {
    url: string;
    busStopList: IBusStop[];
    constructor(city: string);
    getBusStops: () => object;
}
