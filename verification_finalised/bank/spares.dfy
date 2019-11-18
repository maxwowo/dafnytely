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

    // GetAvailableUnits takes a criterion c and a number of blood units n and determines whether 
    // the blood bank has enough units satisfying the criterion. The criterion is the same as specified 
    // for OrderUnits
    method GetAvailableUnits(c: int) returns (res: seq<int>)
    requires c != 0;
    ensures units == old(units);
    ensures forall i :: 0<=i<|res| ==> res[i]%c == 0;
    ensures forall i :: 0<=i<|units| ==> units[i]%c == 0 ==> units[i] in res;
    {
        var index, limit := 0, |units|;  
        res := [];
        while index < limit
        decreases limit - index;
        invariant index <= limit;
        invariant forall i :: 0<=i<|res| ==> res[i]%c == 0;
        invariant forall i :: 0<=i<index ==> units[i]%c == 0 ==> units[i] in res;
        {
            if units[index]%c == 0 { res := res + [units[index]]; }
            index := index + 1;
        }
    }

    // OrderUnits removes the specified number of blood units from the bank which satisfy
    // a particular criterion. If there are not enough units to meet the specified number, 
    // the maximum amount available is returned. In the real implementation, the criterion 
    // may be the type and expiration date of each blood unit. To simulate this criterion with 
    // integers, the order function will take an integer 'criterion' and all numbers divisible 
    // by this criterion will be considered 'matches'.
    // OrderUnits modifies the blood bank units sequence.
    method OrderUnits(c: int, n: int) returns (results: seq<int>)
    requires c != 0;
    ensures |units| == |old(units)| - |results|;
    ensures forall i, j :: (0<=i<|units| && 0<=j<|units| && i != j) ==> units[i] != units[j];
    ensures forall i, j :: (0<=i<|results|&& 0<=j<|results| && i != j) ==> results[i] != results[j];
    ensures forall i :: (i in units ==> i !in results) && (i in results ==> i !in units);
    {
        // Variable decleration
        results := []; var new_units := [];
        var index, limit, count := 0, |units|, 0;

        // Main loop excecution
        while index < limit
        decreases limit - index;
        invariant index <= limit;
        invariant |new_units| == |units[..index]| - |results|;
        invariant forall i :: 0<=i<|results| ==> results[i] in units;
        invariant forall i :: 0<=i<|new_units| ==> new_units[i] in units;
        invariant forall i :: index<=i<|units| ==> units[i] !in results && units[i] !in new_units;
        invariant forall i, j :: (0<=i<|results|&& 0<=j<|results| && i != j) ==> results[i] != results[j];
        invariant forall i, j :: (0<=i<|new_units|&& 0<=j<|new_units| && i != j) ==> new_units[i] != new_units[j];
        invariant forall i :: 0<=i<|units[..index]| ==> (units[i] in results && units[i] !in new_units) || (units[i] !in results && units[i] in new_units);
        {
            if units[index]%c == 0 && count < n { 
                results := results + [units[index]]; 
                count := count + 1; 
            } else { 
                new_units := new_units + [units[index]]; 
            }

            index := index + 1;
        }

        // Set units equal to new units
        units := new_units;
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

//-----------------------------------------------------------------------------
// INTEGER INSERT SORT ALGORITHM
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// MAIN METHOD TESTING
//-----------------------------------------------------------------------------

method Main() {
    // Initialise blood bank and index variables
    var bank: BloodBank;
    var i1: int, i2: int, i3: int, i4: int, i5: int;
    var f1: seq<int>, f2: seq<int>;
    var available: seq<int>;
    var order: seq<int>;

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
    bank.AddUnit(4); assert bank.units == [1,2,3,4];
    available := bank.GetAvailableUnits(2); assert bank.units == [1,2,3,4];
}


    