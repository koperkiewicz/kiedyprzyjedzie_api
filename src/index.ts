import axios from 'axios';
import cheerio from 'cheerio';
import { IBusStop, ICarier, Country } from './models';

export default class KiedyPrzyjedzie {
  url: string;
  busStopList: IBusStop[] = [];

  constructor(city: string) {
    this.url = `http://${city}.kiedyprzyjedzie.pl/stops`;
  }

  getCarriers(): ICarier[] {
    const carriersUrl: string = 'http://kiedyprzyjedzie.pl/gdzie-dziala';
    let carriers: ICarier[] = [];

    axios
      .get(carriersUrl)
      .then(response => {
        let data = response.data;
        const $ = cheerio.load(data);
        $('.carriers-item').each((i, elem) => {
          const name = elem.childNodes[1].childNodes[1].attribs.src;
          const logo = elem.childNodes[1].childNodes[3].children[0].data; // trzeba obsluzyc brak logo
          const url = elem.childNodes[3].children[1].children[1].attribs.href;
          console.log(name, logo, url);
        });
      })
      .catch(error => {
        console.error(error);
      });

    return carriers;
  }

  getBusStops = (): object | null => {
    axios
      .get(this.url, {
        proxy: {
          host: 'frankfurt.proxy.kelvion.local',
          port: 8080
        }
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
            longtitude: elem[4]
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
kp.getCarriers();
// console.log(kp.busStopList);
