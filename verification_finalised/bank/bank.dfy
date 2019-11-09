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

    // CheckAvailableUnits takes a criterion c and a number of blood units n and determines whether 
    // the blood bank has enough units satisfying the criterion. The criterion is the same as specified 
    // for OrderUnits
    method CheckAvailableUnits(c: int, n: int) returns (result: bool)
    requires n > 0;
    requires c != 0;
    {
        
    }

    // OrderUnits removes the specified number of blood units from the bank which satisfy
    // a particular criterion. If there are not enough units to meet the specified number, 
    // the maximum amount available is returned. In the real implementation, the criterion 
    // may be the type and expiration date of each blood unit. To simulate this criterion with 
    // integers, the order function will take an integer 'criterion' and all numbers divisible 
    // by this criterion will be considered 'matches'.
    // OrderUnits modifies the blood bank units sequence.
    method OrderUnits(c: int, n: int) returns (results: seq<int>)
    requires n > 0;
    requires c != 0;
    ensures |results| <= n;
    ensures |results| == 0 ==> forall i :: i in units ==> i%c != 0;
    ensures |results| >  0 ==> forall i :: i in result ==> (i%c == 0 && i !in units);
    {
    }

    // FilterUnits returns a sequence of all units in the blood bank which satisfy a particular 
    // criterion c. The criterion works in the same manner as the criterion for OrderUnits. 
    // FilterUnits does not modifiy the blood bank units sequence. FilterUnits does not guarantee
    // the order of the results
    method FilterUnits(c: int) returns (results: seq<int>)
    requires c != 0;
    ensures units == old(units);
    ensures forall i :: i in results <==> (i%c == 0 && i in units);
    {
        results := [];
        var index, limit := 0, |units|;
        
        while index < limit
        decreases limit - index;
        invariant index <= limit;
        invariant forall i :: i in results <==> (i%c == 0 && i in units[..index]);
        {
            if units[index]%c == 0 { results := results + [units[index]]; }
            index := index + 1;
        }
    }
}

// Main method for testing functionality of BloodBank class
method Main() {
    // Initialise blood bank and index variables
    var bank: BloodBank;
    var i1: int, i2: int, i3: int, i4: int, i5: int;
    var f1: seq<int>, f2: seq<int>;

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
    f1 := bank.FilterUnits(2); assert 2 in f1 && 4 in f1 && 1 !in f1 && 3 !in f1;
    f2 := bank.FilterUnits(3); assert 3 in f2 && 1 !in f2 && 2 !in f2 && 4 !in f2;
    i2 := bank.FindUnitIndex(2); assert bank.units[i2] == 2;
    i3 := bank.FindUnitIndex(3); assert bank.units[i3] == 3;
    i4 := bank.FindUnitIndex(4); assert bank.units[i4] == 4;
    bank.RemoveUnitByIndex(i4); assert bank.units == [1,2,3];
}


    