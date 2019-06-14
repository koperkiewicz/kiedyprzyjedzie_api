import { IBusStop, IBusSchedule, ICarier } from './models';
export default class KiedyPrzyjedzie {
    currentCarrier: ICarier;
    constructor(carrier: ICarier);
    getBusStops(): Promise<IBusStop[]>;
    getBusStopSchedule(busStop: IBusStop): Promise<IBusSchedule[]>;
}
