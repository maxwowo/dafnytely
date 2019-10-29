//-----------------------------------------------------------------------------
// DATE CLASS SECTION
//-----------------------------------------------------------------------------

// Detemrines if a year is in the specified time range,
// in this case between the year 2000 and 2999
function method validYear(y: int): bool 
{
    2000 <= y < 2999
}

// Determines if a month is valid.
function method validMonth(m: int): bool
{
    1 <= m <= 12
}

// Returns true if a given month and day are a valid combination. For 
// Febuary, a day can range between 1 and 29, for April, 
// June, September and November a day can range between 1 and 30 and for 
// all other months a day can range between 1 and 31.
function method validDay(m: int, d: int): bool
{
    (m in [4,6,9,11] && 1<=d<=30) || (m in [1,3,5,7,8,12] && 1<=d<=31) || (m == 2 && 1<=d<=29)
}

// Returns true if a date is valid as determined by the function methods,
// validYear, validMonth and validDate
function method validDate(y: int, m: int, d: int): bool
{
    validYear(y) && validMonth(m) && validDay(m, d)
}

// Returns true if date1 is before date2
function method isBeforeFM(d1: Date, d2: Date): bool
requires d1 != null;
requires d2 != null;
reads d1; reads d2;
{
    d1.year <= d2.year && d1.month <= d2.month && d1.day <= d2.day && !(d1.year == d2.year && d1.month == d2.month && d1.day == d2.day)
}

// Date Class: the date class holds the year, month and day of a particular date 
// as integer values. The minimum date is day: 1, month: 1, year: 2000 and the 
// maximum date is day: 31, month: 12, year: 2999.
// The class invariant requires every date satisfies the validDate function method. 
class Date {
    var year: int;
    var month: int;
    var day: int;

    predicate Valid()
    reads this;
    {
        validDate(year, month, day)
    }

    constructor(y: int, m: int, d: int)
    modifies this;
    ensures Valid();
    requires validDate(y, m, d);
    {
        year := y; month := m; day := d;
    }

    method isBefore(d: Date) returns (b: bool)
    ensures Valid();
    requires Valid();
    requires d != null;
    ensures d.Valid();
    requires d.Valid();
    ensures b == isBeforeFM(this, d);
    {
        return isBeforeFM(this, d);
    }
}

//-----------------------------------------------------------------------------
// BLOOD UNIT CLASS SECTION
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
    var arrival_date: Date;
    var use_by_date: Date;
    var donor_id: int;
    var lab_id: int;
    var volume_ml: int;

    predicate Valid()
    reads this;
    reads arrival_date; reads use_by_date;
    { 
        validBloodUnitID(id) &&
        validBloodType(blood_type) &&
        arrival_date != null && use_by_date != null &&
        isBeforeFM(arrival_date, use_by_date) &&
        validDonorID(donor_id) &&
        validLabID(lab_id) &&
        validVolume(volume_ml)
    }

    constructor (b_id: int, b_type: string, arr_d: Date, useby_d: Date, d_id: int, l_id: int, vol: int)
    modifies this;
    ensures Valid();
    requires arr_d != null; requires useby_d != null;
    requires validBloodUnitID(b_id); 
    requires validBloodType(b_type); 
    requires isBeforeFM(arr_d, useby_d); 
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

//-----------------------------------------------------------------------------
// MAIN FUNCTION METHOD FOR TESTING
//-----------------------------------------------------------------------------
method Main() {

    // Test Date class and is before method
    var d1: Date := new Date(2016, 2, 1);
    var d2: Date := new Date(2016, 3, 2);
    print d1.day; print "-"; print d1.month; print "-"; print d1.year; print "\n";
    print d2.day; print "-"; print d2.month; print "-"; print d2.year; print "\n";
    var b: bool := isBeforeFM(d1,d2);
    print "d1 is before d2: "; print b; print "\n";
}