import { IBusStop, ICarier } from './models';
export default class KiedyPrzyjedzie {
    url: string;
    busStopList: IBusStop[];
    constructor(city: string);
    getCarriers(): ICarier[];
    getBusStops: () => object;
}
