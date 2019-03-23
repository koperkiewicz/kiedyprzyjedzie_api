import axios from 'axios';
import cheerio from 'cheerio';
import { IBusStop, ICarier, Country } from './models';

export default class KiedyPrzyjedzie {
  url: string;
  busStopList: IBusStop[] = [];

  constructor(city: string) {
    this.url = `http://${city}.kiedyprzyjedzie.pl/stops`;
  }

  async getCarriers(): Promise<ICarier[]> {
    const carriersUrl: string = 'http://kiedyprzyjedzie.pl/gdzie-dziala';
    let carriers: ICarier[] = [];

    try {
      let response = await axios.get(carriersUrl);
      const $ = cheerio.load(response.data);

      $('.carriers-item').each((i, elem) => {
        const name = $(elem).find('.center > .area')[0].children[0].data;

        const url = $(elem).find('.js-expand > .service > a').length
          ? $(elem).find('.js-expand > .service > a')[0].attribs.href
          : null;

        const logo = $(elem).find('.center > img').length
          ? 'http://kiedyprzyjedzie.pl' +
            $(elem).find('.center > img')[0].attribs.src
          : null;

        let country = url ? url.match(/\.(pl|cz)/)[1].toUpperCase() : null;

        const carrier: ICarier = {
          name,
          url,
          logo,
          country: Country[country]
        };

        carriers.push(carrier);
      });
    } catch (error) {
      console.error(error);
    }

    // console.log(1, carriers);

    return carriers;
  }

  // proxy: {
  //   host: 'frankfurt.proxy.kelvion.local',
  //   port: 8080
  // }

  async getBusStops(): Promise<IBusStop[]> {
    let BusStops: IBusStop[] = [];
    const response = await axios.get(this.url);

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

    return BusStops;
  }
}

const kp = new KiedyPrzyjedzie('Opole');
let dupa = kp.getCarriers().then(res => {
  // console.log(res);
});

console.log(kp.getBusStops());

let a = 1;
// console.log(kp.busStopList);
