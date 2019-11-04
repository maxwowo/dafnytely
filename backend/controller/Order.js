
const schema = require('../model/db');
const OrderItem = require('../schema/Order');
const sort=(a,b)=>{
    let adate = new Date(a.use_by_date)
    let bdate= new Date ( b.use_by_date)
    if(adate>bdate)return 1;
    else return -1;
}
class Order {

    static async order_type_units(body){
        let blist = schema.db.bloods.sort(sort);
        let r =[];
        let remove = [];
        let current_units=0;
        let i =0;
        blist.forEach(blood=>{
            if(blood.type==body.type&&current_units<body.units&&new Date(blood.use_by_date)>new Date()){
                r.push(blood);
                remove.push(i);
                current_units++;
            }
            
            i++;
        })

        if(current_units!=body.units){
            return {status:"not enought blood"};
        }
        while(remove.length>0){
            let a = remove.pop()
            schema.db.delete_blood(a);
        }
        schema.db.add_order(new OrderItem(body.type,body.units,null,schema.db.order_id));
        return {list:r};



    }
    static async order_type_date_units(body){
        let blist = schema.db.bloods.sort(sort);
        let r =[];
        let remove = [];
        let current_units=0;
        let i =0;
        blist.forEach(blood=>{
            if(blood.type==body.type&&current_units<body.units&&new Date(blood.use_by_date)>new Date(body.date)){
                r.push(blood);
                remove.push(i);
                current_units++;
            }
            
            i++;
        })

        if(current_units!=body.units){
            return {status:"not enought blood"};
        }
        schema.db.add_order(new OrderItem(body.type,body.units,body.date,schema.db.order_id));
        while(remove.length>0){
            let a = remove.pop()
            schema.db.delete_blood(a);
        }
        return {list:r};
    }

}

module.exports = Order;
