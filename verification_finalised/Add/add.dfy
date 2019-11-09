class {:autocontracts} BloodBank {

    var bloods: seq<int>;

    predicate Valid()
    {
        |bloods| >= 0 && forall i :: 0 <= i < |bloods| ==> 0 <= bloods[i] <= 3
    }

    method add(addedBloods: seq<int>, addedBloodsExpired: seq<bool>)
    requires forall i :: 0 <= i < |addedBloods| ==> 0 <= addedBloods[i] <= 3;
    requires |addedBloods| == |addedBloodsExpired|;
    ensures true in addedBloodsExpired ==> bloods == old(bloods);
    ensures !(true in addedBloodsExpired) ==> bloods == old(bloods) + addedBloods;
    modifies this;
    {
        var i: nat := 0;

        while (i < |addedBloodsExpired|)
        invariant 0 <= i <= |addedBloodsExpired|;
        invariant forall j :: 0 <= j < i ==> addedBloodsExpired[j] == false;
        decreases |addedBloodsExpired| - i;
        {
            if (addedBloodsExpired[i] == true) {
                return;
            }
            i := i + 1;
        }

        // bloods := bloods + addedBloods;

        var j: nat := 0;
        while (j < |addedBloods|)
        invariant 0 <= j <= |addedBloods|;
        invariant bloods == old(bloods) + addedBloods[0..j];
        decreases |addedBloods| - j;
        {
            var addedBlood := addedBloods[j];
            bloods := bloods + [addedBlood];
            j := j + 1;
        }
    }
} 
