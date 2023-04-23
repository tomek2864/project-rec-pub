interface Car {
    model: string;
    color: string;
    productionYear: number;
    manufacturer: string;
    seats: number;
    engineDisplacement: number;
    countryOfOrigin: string,
    dealerName: string,
}

const cars: Car[] = [
    {
        model: "Audi A4",
        color: "black",
        productionYear: 2019,
        manufacturer: "Audi",
        seats: 5,
        engineDisplacement: 2.0,
        countryOfOrigin: "Włochy",
        dealerName: "Audi Motors"
    },
    {
        model: "BMW 3 Series",
        color: "white",
        productionYear: 2020,
        manufacturer: "BMW",
        seats: 5,
        engineDisplacement: 2.0,
        countryOfOrigin: "Niemcy",
        dealerName: "DE Motors"
    },
    {
        model: "Mercedes-Benz C-Class",
        color: "gray",
        productionYear: 2021,
        manufacturer: "Mercedes-Benz",
        seats: 5,
        engineDisplacement: 2.0,
        countryOfOrigin: "Niemcy",
        dealerName: "DE Motors"
    },
    {
        model: "Toyota Corolla",
        color: "blue",
        productionYear: 2020,
        manufacturer: "Toyota",
        seats: 5,
        engineDisplacement: 1.8,
        countryOfOrigin: "Japonia",
        dealerName: "Japan Motors"
    },
    {
        model: "Honda Civic",
        color: "red",
        productionYear: 2019,
        manufacturer: "Honda",
        seats: 5,
        engineDisplacement: 1.5,
        countryOfOrigin: "Japonia",
        dealerName: "Japan Motors"
    },
    {
        model: "Ford Mustang",
        color: "yellow",
        productionYear: 2022,
        manufacturer: "Ford",
        seats: 4,
        engineDisplacement: 5.0,
        countryOfOrigin: "USA",
        dealerName: "American Motors"
    },
    {
        model: "Chevrolet Camaro",
        color: "black",
        productionYear: 2021,
        manufacturer: "Chevrolet",
        seats: 4,
        engineDisplacement: 6.2,
        countryOfOrigin: "USA",
        dealerName: "American Motors"
    },
    {
        model: "Dodge Challenger",
        color: "orange",
        productionYear: 2000,
        manufacturer: "Dodge",
        seats: 5,
        engineDisplacement: 5.7,
        countryOfOrigin: "USA",
        dealerName: "American Motors"
    },
    {
        model: "Nissan GT-R",
        color: "silver",
        productionYear: 2022,
        manufacturer: "Nissan",
        seats: 4,
        engineDisplacement: 3.8,
        countryOfOrigin: "Polska",
        dealerName: "MotorPol"
    },
    {
        model: "Porsche 911",
        color: "red",
        productionYear: 2021,
        manufacturer: "Porsche",
        seats: 4,
        engineDisplacement: 3.0,
        countryOfOrigin: "Polska",
        dealerName: "MotorPol"
    },
];

export default cars