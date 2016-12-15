var itemCount = 0;

  
 $(document).ready(function(){
 var objs=[];
    var temp_objs=[];
     $( "#btn_add_consultant_services" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "SERVICE_CODE" :  $("#consultant_service_code").val(),
            "SERVICE_NAME" : $("#consultant_service_name").val(),
            "SERVICE_AMOUNT" : $("#consultant_service_amount").val(),
             "COST_PRICE" : $("#consultant_service_cost").val(),
             "OTHERS" : $("#consultant_service_others").val(),
            "TYPE" : $("#select_consultant_service_type").val()
        }   
     
        // add object
        objs.push(obj);
                    
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td><input type='checkbox'  id='ch" + itemCount + "' value='remove'></td> <td>"+ obj['SERVICE_CODE'] + "</td> <td>" +  obj['SERVICE_NAME'] + " </td>  <td>" +  obj['SERVICE_AMOUNT'] + " </td> <td>" +  obj['COST_PRICE'] + " </td> <td>"+ obj['TYPE'] + "</td> <td>" +  obj['OTHERS'] + " </td> <td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_consultant_services").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });

$( "#btn_add_services" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "SERVICE_CODE" :  $("#clinical_service_code").val(),
            "SERVICE_NAME" : $("#clinical_service_name").val(),
            "SERVICE_AMOUNT" : $("#clinical_service_amount").val(),
             "COST_PRICE" : $("#clinical_service_cost").val(),
            "OTHERS" : $("#clinical_service_others").val(),
            "TYPE" : $("#select_service_type").val()
        }   
     
        // add object
        objs.push(obj);
                    
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td><input type='checkbox'  id='ch" + itemCount + "' value='remove'></td> <td>"+ obj['SERVICE_CODE'] + "</td> <td>" +  obj['SERVICE_NAME'] + " </td>  <td>" +  obj['SERVICE_AMOUNT'] + " </td> <td>" +  obj['COST_PRICE'] + " </td> <td>"+ obj['TYPE'] + "</td> <td>" +  obj['OTHERS'] + " </td> <td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_clinical_services").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
 });