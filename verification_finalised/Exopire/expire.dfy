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
   
   method Remove(key:int)
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

method discard_by_id (bloodArray: Dynamic_array, id: int) returns (result:bool)
    requires bloodArray!=null && !(id<0);
    //All ids need to be unique
    requires forall k,i:: 0<=k<i< |bloodArray.values| ==> bloodArray.values[i] != bloodArray.values[k]
    requires id >= 0;
    ensures result==true ==> (exists k:: 0<=k< old(|bloodArray.values|) && old(bloodArray.values[k]==id))
    modifies bloodArray;
{
    var i := 0;
    result := false;
    while (i< |bloodArray.values|)
    invariant 0<=i<= |bloodArray.values|;
    invariant result ==true ==> forall k:: 0<=k< |bloodArray.values| ==> bloodArray.values[k]!=id
    {
        if (bloodArray.values[i] == id){
            assert(bloodArray.values[i] == id);
            result:= true;
            bloodArray.Remove(i);
            return;
        }else{
            result:= false;
        }
        i:=i+1;
    }
    return;
}

 this;
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
   
   method Remove(key:int)
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




 this;
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
   
   method Remove(key:int)
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

method discard_by_id (bloodArray: Dynamic_array, id: int) returns (result:bool)
    requires bloodArray!=null && !(id<0);
    //All ids need to be unique
    requires forall k,i:: 0<=k<i< |bloodArray.values| ==> bloodArray.values[i] != bloodArray.values[k]
    requires id >= 0;
    ensures result==true ==> (exists k:: 0<=k< old(|bloodArray.values|) && old(bloodArray.values[k]==id))
    modifies bloodArray;
{
    var i := 0;
    result := false;
    while (i< |bloodArray.values|)
    invariant 0<=i<= |bloodArray.values|;
    invariant result ==true ==> forall k:: 0<=k< |bloodArray.values| ==> bloodArray.values[k]!=id
    {
        if (bloodArray.values[i] == id){
            assert(bloodArray.values[i] == id);
            result:= true;
            bloodArray.Remove(i);
            return;
        }else{
            result:= false;
        }
        i:=i+1;
    }
    return;
}


method discard_all (bloodArray: Dynamic_array, currentDate: int)
    requires bloodArray!=null && !(currentDate<0);
    //All ids need to be unique
    requires forall k,i:: 0<=k<i< |bloodArray.values| ==> bloodArray.values[i] != bloodArray.values[k]
    requires currentDate >= 0;
    modifies bloodArray;
    ensures forall k :: 0<=k<|bloodArray.values| ==> (bloodArray.values[k] >= currentDate)
    {
        var i:= 0;
        var remove := new Dynamic_array();
        assert(remove!=null);
        assert(|remove.values|==0);
        assert(remove.values==[]);

        while (i<|bloodArray.values|)
        invariant 0<=i<=|bloodArray.values|
        invariant forall k:: k in remove.values ==> bloodArray.values[k]< currentDate;
        {
            //If expires, then add to remove
            if(bloodArray.values[i] < currentDate){
                //unshift
                assert(bloodArray.values[i] < currentDate);
                remove.Add(0,i);
                assert(remove.values[0] ==i);
            }
            i:= i+1;
        }

        i:= 0;
        while (i<|remove.values|)
        invariant 0<=i<=|remove.values|
        {
            bloodArray.Remove(remove.values[i]);
            i:=i+1;
        }
    }


method get_all ((bloodArray: Dynamic_array){
    
}