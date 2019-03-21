"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class KiedyPrzyjedzie {
    constructor(city) {
        this.busStopList = [];
        this.getBusStops = () => {
            axios_1.default
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
                    const busStop = {
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
        this.url = `http://${city}.kiedyprzyjedzie.pl/stops`;
    }
    getCarriers() {
        const carriersUrl = 'http://kiedyprzyjedzie.pl/gdzie-dziala';
        let carriers = [];
        axios_1.default
            .get(carriersUrl)
            .then(response => {
            let data = response.data;
            const $ = cheerio_1.default.load(data);
            $('.carriers-item').each((i, elem) => {
                const name = elem.childNodes[1].childNodes[1].attribs.src;
                const logo = elem.childNodes[1].childNodes[3].children[0].data || null;
                const url = elem.childNodes[3].children[1].children[1].attribs.href;
                console.log(name, logo, url);
            });
        })
            .catch(error => {
            console.error(error);
        });
        return carriers;
    }
}
exports.default = KiedyPrzyjedzie;
const kp = new KiedyPrzyjedzie('Opole');
kp.getCarriers();
// console.log(kp.busStopList);
//# sourceMappingURL=index.js.map