 var itemCount = 0;
  
 $(document).ready(function(){
  
    var objs=[];
    var temp_objs=[];
     
    $( "#btn_add_dopp" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#dopp_code").val(),
            "TEST_NAME" : $("#name_dopp").val(),
            "AMOUNT" : $("#dopp_amount").val(),
            "TYPE" : $("#select_dopp").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_dopp").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     
         $( "#xray_btn" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#xray_code").val(),
            "TEST_NAME" : $("#xray_name").val(),
            "AMOUNT" : $("#xray_amount").val(),
            "TYPE" : $("#xray_type").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_xray").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     
     
     $( "#usg_btn" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#usg_code").val(),
            "TEST_NAME" : $("#test_usg").val(),
            "AMOUNT" : $("#usg_amount").val(),
            "TYPE" : $("#select_usg").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_usg").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     
          $( "#btn_add_ct" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#ct_code").val(),
            "TEST_NAME" : $("#name_Ct").val(),
            "AMOUNT" : $("#ct_amount").val(),
            "TYPE" : $("#select_ct").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_ct").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
      $( "#btn_add_mri" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#mri_code").val(),
            "TEST_NAME" : $("#name_mri").val(),
            "AMOUNT" : $("#mri_amount").val(),
            "TYPE" : $("#select_mri").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_mri").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     
         $( "#btn_add_xrayprodu" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#xrayprodu_code").val(),
            "TEST_NAME" : $("#xrayprodu_name").val(),
            "AMOUNT" : $("#xrayprodu_amount").val(),
            "TYPE" : $("#select_xrayprodu").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_xrayprodu").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     $( "#btn_add_usgyprodu" ).click(function() {   
         
        var html = "";
         
        var obj={
            "ROW_ID" : itemCount,
            "INV_CODE" :  $("#usgyprodu_code").val(),
            "TEST_NAME" : $("#usgyprodu_name").val(),
            "AMOUNT" : $("#usgyprodu_amount").val(),
            "TYPE" : $("#select_usgyprodu").val()
        }   
     
        // add object
        objs.push(obj);
                     
        itemCount++;
        // dynamically create rows in the table
        html = "<tr id='tr"+ itemCount + "'><td>"+ obj['INV_CODE'] + "</td> <td>" +  obj['TEST_NAME'] + " </td>  <td>" +  obj['AMOUNT'] + " </td> <td>"+ obj['TYPE'] + "</td><td><input type='button'  id='" + itemCount + "' value='remove'></td> </tr>";            
         
        //add to the table
        $("#table_usgyprodu").append(html)
         
        // The remove button click
        $("#"+itemCount).click(function() {
            var buttonId = $(this).attr("id");
            //write the logic for removing from the array
            $("#tr"+ buttonId).remove();            
        });
         
    });
     
     
     $("#xray_img").click(function(){
                $("#div_xray").fadeToggle();
             });
             $("#usg_img").click(function(){
                $("#div_usg").fadeToggle();
             });
            $("#dopp_img").click(function(){
                $("#div_dopp").fadeToggle();
             });
            $("#ct_img").click(function(){
                $("#div_ct").fadeToggle();
             });
            $("#mri_img").click(function(){
                $("#div_mri").fadeToggle();
             });
            $("#xrayprodu_img").click(function(){
                $("#div_xrayprodu").fadeToggle();
             });
            $("#radiol_img").click(function(){
                $("#div_radio").fadeToggle();
             });
     
 });
  
 
    