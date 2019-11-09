method add(existingBloods: seq<int>, addedBloods: seq<int>, addedBloodsExpired: seq<bool>, resultBloods: seq<bool>)
requires forall i :: 0 <= i < |existingBloods| ==> 0 <= existingBloods[i] <= 3;
requires forall i :: 0 <= i < |addedBloods| ==> 0 <= addedBloods[i] <= 3;
ensures true in addedBloodsExpired ==> |resultBloods| == |existingBloods|;
ensures !(true in addedBloodsExpired) ==> (|resultBloods| == |existingBloods + addedBloods|)
{
    var i: nat := 0;

    while (i < |addedBloodsExpired|)
    invariant 0 <= i <= |addedBloodsExpired|;
    invariant forall j :: 0 <= j < i ==> addedBloodsExpired[j] == false;
    {
        if (addedBloodsExpired[i] == true) {
            return;
        }
        i := i + 1;
    }

    existingBloods := existingBloods + addedBloods;
}
