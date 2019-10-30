const database = require("../model/db")
class List {

    static async get_current(body){
        return {list:database.db.orders};

    }
    static async finish_order(body){
        let i =0;

        
        if(body.order_id<0 || body.order_id >=database.db.orders.length){
            return {status:"invalid index"};
        }
        while(i<database.db.orders.length){
            if(body.order_id===database.db.orders[i].id){
                database.db.delete_order(i)
                break;
            }
        }   
        return {status:true};
    }
    static async finish_order_all(body){
        while(database.db.orders.length>0){
            database.db.delete_order(0);
        }
        return {status:true};
    }
}

module.exports = List;