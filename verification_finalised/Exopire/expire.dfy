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

method discard_by_id (bloodArray: array <int>, id: int, result:bool)
    requires bloodArray!=null && id != null;
    //All ids need to be unique
    requires forall k,i:: 0<=k<i ==> bloodArray[i] != bloodArray[k]
    requires id >= 0;
    ensures result==true ==> (exists k:: 0<=k<bloodArray.Length && bloodArray[k]==id)
{
    var i := 0;
    var result := false;
    while (i<bloodArray.Length)
    invariant 0<=i<=bloodArray.Length;
    invariant exists k:: 0<=k<bloodArray.Length 
    {
        if (bloodArray[i] < id){
            result: true;
        else{
            result: false;
        }
    }
        i:=i+1;
    }
}