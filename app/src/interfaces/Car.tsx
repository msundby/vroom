export interface Car {
    image: string | undefined;
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    available: boolean;
    description: string;
}