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
}

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

    }

    constructor (id_val: int, bt: string, ad: string, ubd: string, did: int, lid: int, v: int)
    ensures Valid()
    requires 0 <= id_val < 100000 
    ensures id==id_val
    requires bt == "O-" || bt == "O+" || bt == "A-" || bt == "A+" || bt == "B-" || bt == "B+" || bt == "AB-" || bt == "AB+"
    ensures blood_type==bt
    requires ad 
    ensures arrival_date==ad
    ensures use_by_date==ubd
    ensures donor_id==did
    ensures lab_id==lid
    ensures volume_ml=v
    {
    }
}