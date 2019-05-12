export interface Response {
    create(param: any);
    band(x: number);
    band(x: number, y: number);
    crossover(a: string, b: Function);
    ready(l: Function);
}
