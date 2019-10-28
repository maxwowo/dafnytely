// Determines if a given string is a valid date between the year
// 2000 and 2999 of the format dd-mm-yyyy 
function method IsValidDate(date: string) returns (b: bool)
{
    var ints: string = "0123456789";
    var months: string = "0,1,2,3,4,5,6,7,8,9,10,11,12";

    if date[5]!=date[2]!='-' { return false; }

    if year[0] != 2 || year[1] !in ints || year[2] !in ints || year[3] !in ints { return false; }

    if month
    var year: string := date[6..];
    var month: string := date[3..5]
    var day: string := date[0..2];

}

function method IsBefore(date1: string, date2: string) returns (b: bool) 

{
}

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