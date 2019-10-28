

const fs = require("fs");
const l = [
    {
        "id": 12345,
        "type": "A",
        "arrival_date": "2019_08_12",
        "use_by_date": "2019_09_12",
        "donor_id": "D_12345",
        "lab_id":   "L_12345",
        "volume_ml": 500 
    },
    {
        "id": 12344,
        "type": "A",
        "arrival_date": "2019_08_12",
        "use_by_date": "2019_09_12",
        "donor_id": "D_12345",
        "lab_id":   "L_12345",
        "volume_ml": 500 
    },
    {
        "id": 12343,
        "type": "A",
        "arrival_date": "2019_08_12",
        "use_by_date": "2019_09_12",
        "donor_id": "D_12345",
        "lab_id":   "L_12345",
        "volume_ml": 500 
    },
    {
        "id": 12342,
        "type": "A",
        "arrival_date": "2019_08_12",
        "use_by_date": "2019_09_12",
        "donor_id": "D_12345",
        "lab_id":   "L_12345",
        "volume_ml": 500 
    },
    {
        "id": 12341,
        "type": "A",
        "arrival_date": "2019_08_12",
        "use_by_date": "2019_09_12",
        "donor_id": "D_12345",
        "lab_id":   "L_12345",
        "volume_ml": 500 
    }
];
class Blood{
    constructor(item){
        this.id=item.id;
        this.type=item.type;
        this.arrival_date=item.arrival_date;
        this.use_by_date=item.use_by_date;
        this.donor_id=item. donor_id;
        this.lab_id=item.lab_id;
        this.volume_ml=item.volume_ml;
    }
}
class Db{
    constructor(){
        this.bloods=[];
        l.forEach(item=>{
            this.bloods.push(new Blood (item));
        })
    }
}

const database = new Db();
module.exports = {
    db: database,
    Blood: Blood
}
