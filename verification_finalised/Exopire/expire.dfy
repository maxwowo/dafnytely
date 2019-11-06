   method Remove(key:int) returns (newValues:seq<int>)
   requires Valid();
   ensures Valid();
   ensures (forall k::0<=k<|old(values)| && k !=key ==> old(values)[k] in values);
   modifies this;
   {
      if(key>=|values| || key <0 |||values|==0){
         return;
      }
      assert(|values|>0&&|values|>key);
      values := values[..key]+values[(key+1)..|values|];
      assert(|values|+1==|old(values)|);
      assert(forall k::0<=k<|old(values)| && k !=key ==> old(values)[k] in values);
      
   }



method discard_by_id (bloodArray: array?<int>, id: int) returns (result:bool)
    requires bloodArray!=null && !(id<0);
    //All ids need to be unique
    requires forall k,i:: 0<=k<i<bloodArray.Length ==> bloodArray[i] != bloodArray[k]
    requires id >= 0;
    ensures result==true ==> (exists k:: 0<=k<bloodArray.Length && bloodArray[k]==id)
{
    var i := 0;
    result := false;
    while (i<bloodArray.Length)
    invariant 0<=i<=bloodArray.Length;
    invariant result ==true ==> forall k:: 0<=k<bloodArray.Length ==> bloodArray[k]!=id
    {
        if (bloodArray[i] == id){
            result:= true;
            return result;
        }else{
            result:= false;
        }
        i:=i+1;
    }
    return result;
}