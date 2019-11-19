// Predicate to determine if an array is sorted
function method Sorted(a: array<int>, start: int, end: int): bool
reads a;
requires a != null;
requires 0<=start<=end;
requires start<=end<=a.Length;
{
    forall i, j :: (start<=i<end && start<=j<end && i < j) ==> a[i] <= a[j]
}

// Bubble Sort
method BubbleSort(a: array<int>) 
modifies a;
requires a != null;
//ensures Sorted(a, 0, a.Length);
ensures multiset(a[..]) == multiset(old(a[..]));
{
    var rev := a.Length;
    while rev > 0
    decreases rev;
    invariant 0<=rev<=a.Length;
    invariant multiset(a[..]) == multiset(old(a[..]));
    {
        var index, limit := 0, a.Length-1;
        while index < limit
        decreases limit - index;
        invariant 0<=index<=limit;  
        invariant multiset(a[..]) == multiset(old(a[..]));
        invariant index > 0 ==> a[index-1] <= a[index];
        {
            if a[index] > a[index+1] { a[index], a[index+1] := a[index+1], a[index]; }
            index := index + 1;
        }
        rev := rev - 1;
    }
}

method Main() {
    var a := new int[4];
    a[0], a[1], a[2], a[3] := 4,3,2,1;
    BubbleSort(a);
    print a[..], "\n";
}

