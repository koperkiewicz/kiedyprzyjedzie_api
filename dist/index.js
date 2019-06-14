"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Carriers_1 = __importDefault(require("./Carriers"));
var KiedyPrzyjedzie = /** @class */ (function () {
    function KiedyPrzyjedzie(carrier) {
        this.currentCarrier = carrier;
    }
    // proxy: {
    //   host: 'frankfurt.proxy.kelvion.local',
    //   port: 8080
    // }
    KiedyPrzyjedzie.prototype.getBusStops = function () {
        return __awaiter(this, void 0, void 0, function () {
            var BusStops, response, data, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BusStops = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(this.currentCarrier.url + "/stops")];
                    case 2:
                        response = _a.sent();
                        data = response.data;
                        results = data.match(/\[(.)*\]/g);
                        results = JSON.parse(results);
                        results.map(function (elem) {
                            var busStop = {
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
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, BusStops];
                }
            });
        });
    };
    KiedyPrzyjedzie.prototype.getBusStopSchedule = function (busStop) {
        return __awaiter(this, void 0, void 0, function () {
            var BusSchedule, url, response, data_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BusSchedule = [];
                        url = this.currentCarrier.url + "/api/departures/" + busStop.number;
                        console.log(url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        data_1 = response.data;
                        data_1.rows.map(function (row) {
                            var busSchedule = {
                                atStop: row.at_stop,
                                directionId: row.direction_id,
                                directionName: data_1.directions[row.direction_id],
                                isEstimated: row.is_estimated,
                                lineNumber: row.line_name,
                                time: row.time,
                                vehicleType: row.vehicle_type
                            };
                            BusSchedule.push(busSchedule);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, BusSchedule];
                }
            });
        });
    };
    return KiedyPrzyjedzie;
}());
exports.default = KiedyPrzyjedzie;
Carriers_1.default.getCarriers().then(function (carriers) {
    var carrier = carriers.find(function (carrier) {
        return carrier.name === 'MZK Sp. z o.o. Opole';
    });
    console.log(carrier);
    var kp = new KiedyPrzyjedzie(carrier);
    kp.getBusStops().then(function (busStops) {
        var busStop = busStops.find(function (busStop) {
            return busStop.number === 260;
        });
        kp.getBusStopSchedule(busStop).then(function (schedule) {
            console.log(schedule);
        });
    });
});
//# sourceMappingURL=index.js.map