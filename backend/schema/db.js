

const fs = require("fs");
const l = [
    {
        "type": "A",
        "arrival_date": "2019-08-12",
        "use-by-date": "2019-09-12",
        "donor-id": "D-12345",
        "lab-id":   "L-12345",
        "volume-ml": 500 
    },
    {
        "type": "A",
        "arrival_date": "2019-08-12",
        "use-by-date": "2019-09-12",
        "donor-id": "D-12345",
        "lab-id":   "L-12345",
        "volume-ml": 500 
    },
    {
        "type": "A",
        "arrival_date": "2019-08-12",
        "use-by-date": "2019-09-12",
        "donor-id": "D-12345",
        "lab-id":   "L-12345",
        "volume-ml": 500 
    },
    {
        "type": "A",
        "arrival_date": "2019-08-12",
        "use-by-date": "2019-09-12",
        "donor-id": "D-12345",
        "lab-id":   "L-12345",
        "volume-ml": 500 
    },
    {
        "type": "A",
        "arrival_date": "2019-08-12",
        "use-by-date": "2019-09-12",
        "donor-id": "D-12345",
        "lab-id":   "L-12345",
        "volume-ml": 500 
    }
];
class Db{
    constructor(){
        this.bloods=[];
        l.forEach(item=>{
            this.bloods.push(item);
        })
    }
}

const database = new Db();
module.exports =database;