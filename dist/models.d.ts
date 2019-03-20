export interface IBusStop {
    id: number;
    number: number;
    name: string;
    latitude: number;
    longtitude: number;
}
export interface ICarier {
    name: string;
    url: string;
    logo: string;
    country: Country;
}
export declare enum Country {
    PL = 0,
    CZ = 1
}
