//-----------------------------------------------------------------------------
// Blood Bank Class
//-----------------------------------------------------------------------------

// Blood bank class. Contains a sequence of integers, each 
// representing a hypothetical blood unit. The operations are defined
// on this sequence are all guarenteed to preserve the valid state of the 
// system. These operations include: adding units, removing units, querying the
// units, sorting the units.
class {:autocontracts} BloodBank {

    // Sequence of integers representing blood units
    var units: seq<int>;

    // Determines wether the blood bank is in a valid state
    // The units must be distinct integers and the blood bank 
    // can only hold between 0 and 100,000 units 
    predicate Valid() 
    reads this;
    {
        0 <= |units| <= 100000 &&
        forall i, j :: (0<=i<|units| && 0<=j<|units| && i != j) ==> units[i] != units[j]
    }

    // Constructor for blood bank takes no arguments and creates
    // an empty units sequence
    constructor () 
    modifies this;
    ensures |units| == 0; 
    {
        units := [];
    }

    // Predicate to determine if the bank is full or not
    predicate Full()
    reads this;
    {
        |units| == 100000
    }

    // Add an new unit to the system
    // This method ensures that an employee cannot add a unit if the storage is full,
    // and that the same unit cannot be added to the bank twice.
    method AddUnit(unit: int) 
    requires !Full(); 
    requires unit !in units;
    ensures unit in units;
    ensures units == old(units) + [unit]
    {
        var index, limit := 0, |units|;
        while unit > units[index] && index < limit
        decreases limit - index;
        invariant index <= limit;
        invariant forall i :: 0<=i<index ==> units[i] < unit;
        {
            index := index + 1;           
        }
        if index == limit 
        { units := units[..index] + [unit]; }
        else 
        { units := units[..index] + [unit] + units[index+1..]; }
    }
}

method Main() {
    // Initialise blood bank and index variables
    var bank: BloodBank;
    var i1: int, i2: int, i3: int, i4: int, i5: int;
    var f1: seq<int>, f2: seq<int>;
    var available: seq<int>;
    var order: seq<int>;

    // Test 1: Tests functionality of AddUnit, FindUnitIndex and RemoveUnitByIndex
    bank := new BloodBank();
    bank.AddUnit(1); //assert bank.units == [1];
    bank.AddUnit(5); //assert bank.units == [1,2];
    bank.AddUnit(2); //assert bank.units == [1,2,5];
    print bank.units;
}