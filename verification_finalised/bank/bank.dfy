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
    requires !Full(); 
    requires unit !in units;
    ensures unit in units;
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

    // Remove unit from the system by index, this function requires the unit 
    // to be in the system since it does not make sense to remove a unit 
    // which is not there. This function preserves the order of the list.
    method RemoveUnitByIndex(index: int)
    requires 0<=index<|units|;
    ensures units == old(units[..index]) + old(units[(index+1)..]);
    {
        units := units[..index] + units[(index+1)..];
    }
}

// Main method for testing functionality of BloodBank class
method Main() {
    // Initialise blood bank and index variables
    var bank: BloodBank;
    var i1: int, i2: int, i3: int, i4: int, i5: int;

    // Test 1: Tests functionality of AddUnit, FindUnitIndex and RemoveUnitByIndex
    bank := new BloodBank();
    bank.AddUnit(1); assert bank.units == [1];
    bank.AddUnit(2); assert bank.units == [1,2];
    bank.AddUnit(5); assert bank.units == [1,2,5];
    i2 := bank.FindUnitIndex(2); assert bank.units[i2] == 2;
    bank.RemoveUnitByIndex(i2); assert bank.units == [1,5];
    i5 := bank.FindUnitIndex(5); assert bank.units[i5] == 5;
    bank.RemoveUnitByIndex(i5); assert bank.units == [1];
    bank.AddUnit(4); assert bank.units == [1,4];
    bank.AddUnit(2); assert bank.units == [1,4,2];
    bank.AddUnit(3); assert bank.units == [1,4,2,3];
    i2 := bank.FindUnitIndex(2); assert bank.units[i2] == 2;
    i3 := bank.FindUnitIndex(3); assert bank.units[i3] == 3;
    i4 := bank.FindUnitIndex(4); assert bank.units[i4] == 4;
    bank.RemoveUnitByIndex(i4); assert bank.units == [1,2,3];
}


    