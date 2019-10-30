

const database = require("../model/db")
class Expire {

    static async discard_by_id(body){
        let t={status:true}   ;
        let i=0;
        database.db.bloods.forEach(blood=> {
            if(blood.id==body.id){
                if(!database.blood_expire(new Date(blood.use_by_date))){
                    t={status:"target blood is not expired"};
                }else{
                    database.db.delete_blood(i);
                }
                
            }
            i++;
        })
        return t;
        
    }
    static async discard_all(body){
        let i =0;
        let remove=[];
        database.db.bloods.forEach((blood,i)=> {

            if(database.blood_expire(new Date(blood.use_by_date))){
                remove.unshift(i);
            }
            i++;
        })
        remove.forEach(a=>database.db.delete_blood(a));
        return {status:database.db.bloods}
    }
    static async get_all(body){
        let r=[]
        database.db.bloods.forEach((blood)=> {
            if(database.blood_expire(new Date(blood.use_by_date))){
                r.push(blood);
            }
        })
        return {list:r};
    }


}

module.exports = Expire;