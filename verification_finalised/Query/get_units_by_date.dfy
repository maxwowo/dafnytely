class Dynamic_array{
   var values: seq<int>;
   predicate Valid()
   reads this;
   {
      |values|>=0
   }
   constructor ()
   modifies this;
   ensures Valid();
   ensures |values|==0;
   {
      values:=[];
   }
   
   method Length() returns (num:int)
   requires Valid();
   ensures Valid();
   ensures num==|values|
   {
      num:=|values|;
   }
   
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
   
   
   
   method Add(key:int,value:int)
   requires Valid();
   requires 0<=key<=|values|
   ensures Valid();
   ensures |values|==|old(values)|+1;
   ensures (values[key]==value);
   ensures (forall k:: 0<=k<|old(values)| ==> old(values)[k] in values);
   ensures (forall k:: (k in values <==> k in old(values) || k==value ));
   ensures (forall k:: (!( k in old(values) || k==value )) ==>(! (k in values)));
   modifies this;
   {
      var tmp_seq:=[value];
      assert(|tmp_seq|==1);
      var newValues := values[..key]+tmp_seq[0..|tmp_seq|]+values[key..|values|];
      assert(|newValues|==|values|+1);
      assert(0<=key<|newValues|);
      assert(newValues[key]==value);
      assert(forall k:: 0<=k<|values| ==> values[k] in newValues);
      values:=newValues;
   }
   
   
   
   method Change(newValues: seq<int>)
   requires Valid();
   ensures Valid();
   modifies this;
   {
      values:=newValues;
   }
   

}


method get_units_by_date(dates : Dynamic_array,target:int) returns (results: Dynamic_array)
requires dates!=null
ensures results!=null
ensures (forall k:: 0<=k< |dates.values|==> (dates.values[k]>=target==>dates.values[k] in results.values))
ensures forall k:: k in results.values==> k>=target;
{
   var i:=0;
   results:= new Dynamic_array();
   assert(results!=null);
   assert(|results.values|==0);
   assert(results.values==[]);
   assert(forall k:: 0<=k<|results.values|==>results.values[k]>=target);
   assert(forall k:: 0<=k<i ==> (dates.values[k]<target==>!(dates.values[k] in results.values)));
   while (i< |dates.values|)
   invariant i<=|dates.values|;
   invariant (results!=null);
   invariant forall k:: k in results.values==> k>=target ;
   invariant forall k:: 0<=k<i ==> (dates.values[k]>=target==>dates.values[k] in results.values);
   {
  
      if(dates.values[i]>=target)
      {
         assert(dates.values[i]>=target);
         results.Add(|results.values|,dates.values[i]);
         assert(dates.values[i] in results.values);
      }
      assert(dates.values[i]>= target ==>dates.values[i] in results.values);
      i:=i+1;
   }
}