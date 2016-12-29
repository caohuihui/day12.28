var arr=[1,2,3,4,5,6,7,8,9,10]; 

    function splitArray(arr,size){

        var result = [];
        var tempArray;

        for(var i = 0; i < arr.length; i++){  
            if(i%size=="0" ){
                if(tempArray){
                    result.push(tempArray);
                }
                tempArray = [];           
            }
     
            tempArray[tempArray.length]=arr[i];
            if(i+1 == arr.length){
                result.push(tempArray);
            }

        }

        return result;
        
    }
    console.log(splitArray(arr,3));   //[[1,2,3],[4,5,6],[7,8,9],[10]]