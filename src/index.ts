import axios from 'axios';
import cheerio from 'cheerio';
import Carriers from './Carriers';
import { IBusStop, IBusSchedule, ICarier } from './models';

export default class KiedyPrzyjedzie {
  currentCarrier: ICarier;

  constructor(carrier: ICarier) {
    this.currentCarrier = carrier;
  }

  async getBusStops(): Promise<IBusStop[]> {
    let BusStops: IBusStop[] = [];

    try {
      const response = await axios.get(`${this.currentCarrier.url}/stops`);

      const data = response.data;
      let results = data.match(/\[(.)*\]/g);
      results = JSON.parse(results);
      results.map(elem => {
        const busStop: IBusStop = {
          id: elem[0],
          number: elem[1],
          name: elem[2],
          latitude: elem[4],
          longitude: elem[3],
          location: {
            latitude: elem[4],
            longitude: elem[3]
          }
        };
        BusStops.push(busStop);
      });
    } catch (error) {
      console.error(error);
    }

    return BusStops;
  }

  async getBusStopSchedule(busStop: IBusStop): Promise<IBusSchedule[]> {
    let BusSchedule: IBusSchedule[] = [];
    const url: string = `${this.currentCarrier.url}/api/departures/${
      busStop.number
    }`;
    console.log(url);

    try {
      const response = await axios.get(url);
      const data = response.data;

      data.rows.map(row => {
        const busSchedule: IBusSchedule = {
          atStop: row.at_stop,
          directionId: row.direction_id,
          directionName: data.directions[row.direction_id],
          isEstimated: row.is_estimated,
          lineNumber: row.line_name,
          time: row.time,
          vehicleType: row.vehicle_type
        };

        BusSchedule.push(busSchedule);
      });
    } catch (error) {
      console.error(error);
    }
    return BusSchedule;
  }
}

Carriers.getCarriers().then(carriers => {
  let carrier = carriers.find(carrier => {
    return carrier.name === 'MZK Sp. z o.o. Opole';
  });
  console.log(carrier);

  const kp = new KiedyPrzyjedzie(carrier);

  kp.getBusStops().then(busStops => {
    let busStop = busStops.find(busStop => {
      return busStop.number === 260;
    });

    kp.getBusStopSchedule(busStop).then(schedule => {
      console.log(schedule);
    });
  });
});
