
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

    // Constructor for blood bank takes no arguments and creates
    // an empty units sequence
    constructor () 
    modifies this;
    ensures |units| == 0; 
    {
        units := [];
    }

    // Determines wether the blood bank is in a valid state
    // The units must be distinct integers and the blood bank 
    // can only hold between 0 and 100,000 units 
    predicate Valid() 
    reads this;
    {
        0 <= |units| <= 100000 &&
        forall i, j :: (0<=i<|units|-1 && j==i+1) ==> units[i] < units[j]
    }

    // Predicate to determine if the bank is full or not
    predicate Full()
    reads this;
    {
        |units| == 100000
    }

    function method InsertIndex(index: int, val: int): bool
    reads this;
    requires 0<=index<=|units|;
    {
        forall i :: 0<=i<index ==> units[i] < val &&
        forall i :: index<=i<|units| ==> units[i] > val 
    }
    
    method FindInsertIndex(unit: int) returns (res: int)
    requires !Full();
    {
        var index:= 0;
        res := -1;
        while index < |units|
        decreases |units| - index;
        invariant 0<=index<=|units|;
        invariant res != -1 ==> 0<=res<=|units|;
        invariant res != -1 ==> InsertIndex(res, unit);
        {
            if InsertIndex(index, unit) { res := index; }
            index := index + 1;
        }
    }

    // Add an new unit to the system
    // This method ensures that an employee cannot add a unit if the storage is full,
    // and that the same unit cannot be added to the bank twice.
    method InsertUnit(unit: int, index: int) 
    requires !Full(); 
    requires unit !in units;
    requires 0<=index<=|units|;
    requires InsertIndex(index, unit);
    ensures 
    {
        
        units := units[..index] + [unit] + units[index..];
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
    //bank.AddUnit(1); //assert bank.units == [1];
    //bank.AddUnit(5); //assert bank.units == [1,2];
    //bank.AddUnit(2); //assert bank.units == [1,2,5];
    print bank.units;

}