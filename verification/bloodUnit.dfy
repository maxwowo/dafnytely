

class BloodUnit {
    var id: int;
    var blood_type: string;
    var arrival_date: string;
    var use_by_date: string;
    var donor_id: int;
    var lab_id: int;
    var volume_ml: int;

    predicate Valid()
    reads this;
    { 

    }

    constructor (id_val: int, bt: string, ad: string, ubd: string, did: int, lid: int, v: int)
    ensures Valid()
    requires 0 <= id_val < 100000 
    ensures id==id_val
    requires bt == "O-" || bt == "O+" || bt == "A-" || bt == "A+" || bt == "B-" || bt == "B+" || bt == "AB-" || bt == "AB+"
    ensures blood_type==bt
    requires ad 
    ensures arrival_date==ad
    ensures use_by_date==ubd
    ensures donor_id==did
    ensures lab_id==lid
    ensures volume_ml=v
    {
    }
}