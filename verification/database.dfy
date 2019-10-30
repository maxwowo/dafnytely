class Database {
    var bloods: array<BloodUnit>;

    method add(bu: BloodUnit){}

    method delete(key:int)
    requires 0<=key<bloods.Length
    modifies this
    {

    }

    
}
class Blood{
    var blood_type: int; 
    var 
}