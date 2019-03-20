import axios from 'axios';
import { IBusStop, ICarier, Country } from './models';

export default class KiedyPrzyjedzie {
  url: string;
  busStopList: IBusStop[] = [];

  constructor(city: string) {
    this.url = `http://${city}.kiedyprzyjedzie.pl/stops`;
  }

  getCarriers(): ICarier[] {
    const asdf: ICarier[];
    return asdf;
  }

  getBusStops = (): object | null => {
    axios
      .get(this.url, {
        proxy: {
          host: 'frankfurt.proxy.kelvion.local',
          port: 8080,
        },
      })
      .then(response => {
        const data = response.data;
        let results = data.match(/\[(.)*\]/g);
        results = JSON.parse(results);
        results.map(elem => {
          const busStop: IBusStop = {
            id: elem[0],
            number: elem[1],
            name: elem[2],
            latitude: elem[3],
            longtitude: elem[4],
          };
          this.busStopList.push(busStop);
        });
        // console.log(results);
        return results;
      })
      .catch(error => {
        console.log(error);
      });

    return null;
  };
}

const kp = new KiedyPrzyjedzie('Opole');
kp.getBusStops();
console.log(kp.busStopList);
