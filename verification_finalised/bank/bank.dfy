// Blood bank class. Contains a sequence of integers, each 
// representing a hypothetical blood unit. The operations are defined
// on this sequence are all guarenteed to preserve the valid state of the 
// system. These operations include: adding units, removing units, querying the
// units, sorting the units.
class BloodBank {

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
    {
        units := [];
    }

    // Add an new unit to the system

    // Remove unit from the system

    // Filter units from the system
}

// Sort list of blood units

    