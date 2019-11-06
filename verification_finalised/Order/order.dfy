// Lean blood unit class for development of order algorithms
class {:autocontracts} BloodUnit {
    var id: int;
    var blood_type: int;
    var use_by_date: int;

    predicate Valid()
    {
        0 <= id < 1000000   &&
        0 <= blood_type < 8  &&
        0 <= use_by_date < 1000000
    }

    constructor (id_: int, blood_type_: int, use_by_date_: int)
    requires 0 <= id_ < 1000000;
    requires 0 <= blood_type_ < 8;
    requires 0 <= use_by_date_ < 1000000;
    {
        id, blood_type, use_by_date := id_, blood_type_, use_by_date_;
    }
}

// Lean blood order class
class {:autocontracts} BloodOrder {

    // Holds a sequece of blood units for a particular customer
    var customer_id: int;
    var blood_units: set<BloodUnit>;

    // Determines if a blood order is valid
    predicate Valid()
    {
        |blood_units| > 0 &&
        0 <= customer_id < 1000000
    }

    // Creates a new blood order
    constructor (customer_id_: int, blood_units_: set<BloodUnit>)
    requires 0 <= customer_id_ < 1000000 && |blood_units_| > 0;
    ensures  customer_id == customer_id_ && blood_units == blood_units_;
    {
        customer_id := customer_id_;
        blood_units := blood_units_;
    }
}

// Lean blood bank class for development of order algortihms
class {:autocontracts} BloodBank {

    // Holds a sequence of blood units making up the blood bank
    var units: seq<BloodUnit>;

    // Ensures that the blood bank is in a valid state
    predicate Valid()
    {
        |units| >= 0
    }

    // Creates an empty blood bank
    constructor ()
    ensures |units| == 0;
    {
        units := [];
    }

    // Gets the length of the sequece of blood units
    method Length() returns (length: int)
    ensures  length == |units|
    {
        length := |units|;
    }

    // Add new blood unit to bank
    method AddUnit(u: BloodUnit) 
    ensures u in units; 
    {
        units := units + [u];
    }

    // Takes out an order 
    //method order_type_units(type: int, num: int) returns (order: seq<BloodUnit>)
    //{
    //}
}

method Main() {
    // Create new blood bank
    var bank := new BloodBank();

    // Create new blood units
    var u1 := new BloodUnit(0, 0, 0);
    var u2 := new BloodUnit(1, 1, 1);
    var u3 := new BloodUnit(2, 0, 1);
    var u4 := new BloodUnit(3, 2, 0);
    var u5 := new BloodUnit(4, 2, 1);

    // Add new blood units to the bank
    bank.AddUnit(u1); 

    // Print Statements
    print bank.units, "\n";
}

//method order_type_date_units(db: array<bloodUnits>, type: string, date: int) returns (order: seq<bloodUnit>)
//method order_type_units(bBank: seq<BloodUnit>, btype: int, units: int) returns (bloodBank: seq<BloodUnit>, order: seq<BloodUnit>)


