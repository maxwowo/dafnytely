// Remove unit from the system, this function requires the unit 
// to be in the system since it does not make sense to remove a unit 
// which is not there. This function does not preserve the order of the list.
method RemoveUnit(unit: int)
requires unit in units;
ensures |units| == |old(units)| - 1;
ensures forall i :: (0<=i<|old(units)| && old(units[i]) != unit) ==> old(units[i]) in units; 
{
    var key := FindUnitIndex(unit);
    units := units[..key] + units[(key+1)..];
}

// Test 1: 
bank := new BloodBank();
bank.AddUnit(1); assert 1 in bank.units;
bank.AddUnit(2); assert 2 in bank.units;
bank.RemoveUnit(1); assert 1 !in bank.units; assert 2 in bank.units;
i2 := bank.FindUnitIndex(2); assert i2 == 0;