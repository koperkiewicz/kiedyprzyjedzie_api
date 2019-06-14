import axios from 'axios';
import cheerio from 'cheerio';
import { ICarier, Country } from './models';

export default class Carriers {
  static async getCarriers(): Promise<ICarier[]> {
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
}
