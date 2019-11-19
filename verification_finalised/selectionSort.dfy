// Sorted predicate determines if an array a is sorted 
// between indicies low and hi
predicate Sorted(a: array<int>, low:int, high:int)
requires a != null // 1.9.7
requires 0 <= low <= high <= a.Length
reads a
{ 
   forall j,k:: low <= j < k < high ==> a[j] <= a[k] 
}

// Selection Sort Algorithm. Sorts an a array 'a' inplace.
// Ensures that 'a' is sorted and contains all its original elements. 
method SelectionSort(a: array<int>)
modifies a;
requires a != null;
ensures Sorted(a, 0, a.Length);
ensures multiset(a[..]) == multiset(old(a[..]));
{
   if (a.Length <= 1){
      return;
   }
   
   var i := 0;
   while(i < a.Length)
   invariant 0 <= i <= a.Length;
   invariant i >= 1 ==> (forall k :: i <= k < a.Length ==> a[i-1] <= a[k])
   invariant 1 <= i < a.Length ==> (a[i-1] <= a[i])
   invariant Sorted(a, 0, i)
   invariant multiset(a[..]) == multiset(old(a[..]));
   {
      var li := i;
      var j := i;
      while(j < a.Length)
      invariant 0 <= j <= a.Length;
      invariant 0 <= li < a.Length;
      invariant forall k :: i <= k < j ==> a[li] <= a[k];
      invariant a[li]<=a[i];
      invariant Sorted(a,0,i);
      invariant multiset(a[..]) == multiset(old(a[..]));
      invariant forall q :: 0 <= q < i ==> a[li] >= a[q];
      invariant 0 <= i <= li < a.Length;
      {
         if(a[j] < a[li]){
            li := j;
         }
         j := j + 1;
      }
      a[i], a[li] := a[li], a[i];
      i := i + 1;
   }
}