//-----------------------------------------------------------------------------
// INTEGER INSERT SORT ALGORITHM
//-----------------------------------------------------------------------------

predicate Sorted(a: array<int>, lo: int, hi: int)
requires a != null;
reads a;
{
    forall j,k :: 0<=lo<=j<k<hi<a.Length ==> a[j]<=a[k]
}

method InsertionSortSwap(a: array<int>)
requires a != null;
requires a.Length>1;
ensures Sorted(a, 0, a.Length);
ensures multiset(a[..]) == multiset(old(a[..]));
modifies a
{
    var up := 1;
    while (up < a.Length)
    invariant 1 <= up <= a.Length;
    invariant Sorted(a, 0, up);
    invariant multiset(a[..]) == multiset(old(a[..]));
    {
        var down := up;
        while (down >= 1 && a[down-1] > a[down])
        invariant 0 <= down <= up;
        invariant forall i,j :: (0<=i<j<=up && j!=down)==>a[i]<=a[j];
        invariant multiset(a[..]) == multiset(old(a[..]));
        {
            a[down-1], a[down] := a[down], a[down-1];
            down  := down - 1;
        }
        up := up+1;
    }
}

//-----------------------------------------------------------------------------
// MAIN METHOD TESTING
//-----------------------------------------------------------------------------

method Main() {
    var a: array<int> := new int[6];
    a[0], a[1], a[2], a[3], a[4], a[5] := 4,5,9,1,86,34;
    print a[..], "\n";
    InsertionSortSwap(a);
    print a[..], "\n";
    assert Sorted(a, 0, a.Length);
}