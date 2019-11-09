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
        forall i, j :: (0<=i<|units|&& 0<=j<|units| && i != j) ==> units[i] != units[j]
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
    requires !Full(); requires unit !in units;
    ensures units == old(units) + [unit]
    {
        units := units + [unit];
    }

    // Finds the index of a given unit, if the unit does not exist 
    // the function returns -1
    method FindUnitIndex(unit: int) returns (key: int)
    ensures units == old(units);
    ensures key == -1 ==> unit !in units;
    ensures key >=  0 ==> (key < |units| && units[key] == unit);    
    ensures unit in units ==> (0<=key<|units| && units[key] == unit);
    {
        key := -1;
        var index := 0; var limit := |units|;
        
        while index < limit 
        decreases limit - index;
        invariant index <= limit;
        invariant key == -1 ==> unit !in units[..index];
        invariant key >=  0 ==> (key < |units| && units[key] == unit);
        {
            if unit == units[index] { key := index; }
            index := index + 1;
        }
    }

    // Remove unit from the system, this function requires the unit 
    // to be in the system since it does not make sense to remove a unit 
    // which is not there.
    method RemoveUnit(unit: int)
    requires unit in units;
    ensures |units| == |old(units)| - 1;
    ensures forall i :: (0<=i<|old(units)| && old(units[i]) != unit) ==> old(units[i]) in units; 
    {
        var key := FindUnitIndex(unit);
        units := units[..key] + units[(key+1)..];
    }

    // Filter units from the system
}

// Sort list of blood units


method Main() {
    var bank := new BloodBank();

    // Test 1: 
    bank.AddUnit(1); assert 1 in bank.units;
    bank.AddUnit(2); assert 2 in bank.units;
    bank.RemoveUnit(1); assert 1 !in bank.units; assert 2 in bank.units;
    var i2 := bank.FindUnitIndex(2); assert i2 == 0;
}


    