"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class KiedyPrzyjedzie {
    constructor(city) {
        this.busStopList = [];
        this.getBusStops = () => {
            axios_1.default
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
                    const busStop = {
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
        this.url = `http://${city}.kiedyprzyjedzie.pl/stops`;
    }
    getCarriers() {
        const asdf;
        return asdf;
    }
}
exports.default = KiedyPrzyjedzie;
const kp = new KiedyPrzyjedzie('Opole');
kp.getBusStops();
console.log(kp.busStopList);
//# sourceMappingURL=index.js.map