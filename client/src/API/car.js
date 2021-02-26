class Car{

    constructor(id, model, brand, category){
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.category = category;
    }


    static from(json){
        return Object.assign(new Car(), json);
    }
}

export default Car;

