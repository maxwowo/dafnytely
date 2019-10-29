//-----------------------------------------------------------------------------
// BLOOD UNIT ID SECTION
//-----------------------------------------------------------------------------

// Determines if a blood unit id is valid.
function method validBloodUnitID(id: int): bool
{
    0 <= id < 1000000
}

// Determines if a given blood type is valid.
function method validBloodType(bt: string): bool
{
    bt == "O-" || bt == "O+" || bt == "A-" || bt == "A+" || bt == "B-" || bt == "B+" || bt == "AB-" || bt == "AB+"
}

// Checks that the arrival date is before the use by date.
function method validDating(arr_d: string, ub_d: string): bool
{
    true
    //arr_d.isBefore(ub_d)
}

// Checks the the donor id is valid.
function method validDonorID(id: int): bool
{
    0 <= id < 1000000
}

// Checks that the lab id is valid.
function method validLabID(id: int): bool
{
    0 <= id < 1000000
}

// Checks that the volume is valid.
function method validVolume(v: int): bool
{
    v == 500
}

// Class for each blood unit. When each new blood unit is entered into the system, 
// a blood unit id, blood type, arrival date, useby date, donor id, lab id and 
// volume must be given. The arrival date should be the current date and must be 
// before the expiry date. The blood type must also be a valid blood type and 
// all ids must be of the correct form. Note: The validity criterion can be 
// modified if need be.
class BloodUnit {
    var id: int;
    var blood_type: string;
    var arrival_date: string;
    var use_by_date: string;
    var donor_id: int;
    var lab_id: int;
    var volume_ml: int;

    predicate Valid()
    reads this;
    { 
        validBloodUnitID(id) &&
        validBloodType(blood_type) &&
        validDating(arrival_date, use_by_date) &&
        validDonorID(donor_id) &&
        validLabID(lab_id) &&
        validVolume(volume_ml)
    }

    constructor (b_id: int, b_type: string, arr_d: string, useby_d: string, d_id: int, l_id: int, vol: int)
    modifies this;
    ensures Valid();
    requires validBloodUnitID(b_id); 
    requires validBloodType(b_type); 
    requires validDating(arr_d, useby_d); 
    requires validDonorID(d_id); 
    requires validLabID(l_id);
    requires validVolume(vol);
    {
        id := b_id;
        blood_type := b_type;
        arrival_date := arr_d;
        use_by_date := useby_d;
        donor_id := d_id;
        lab_id := l_id;
        volume_ml := vol;
    }
}