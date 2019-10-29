function method validYear(y: int): bool 
{
    2000 <= y < 3000
}

function method validMonth(m: int): bool
{
    1 <= m < 13 
}

function method validDay(m: int, d: int): bool
{
    (m in [4,6,9,11] && 1<=d<=30) || (m in [1,3,5,7,8,12] && 1<=d<=31) || (m == 2 && 1<=d<=29)
}

function method validDate(y: int, m: int, d: int): bool
{
    validYear(y) && validMonth(m) && validDay(m, d)
}

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