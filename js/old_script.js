const submit_button = document.getElementById('submit_btn');
const table = document.getElementById('result_table');
const form = document.getElementById('form');

const min_y_value = -5;
const max_y_value = 5;

//Создаем уведомление
function CreateNTFN(text, colour, ntfn_name){
  var ntfn = document.createElement('div');
  ntfn.className = ntfn_name;
  ntfn.style.color = colour;
  ntfn.innerHTML = text;
  return ntfn;
}
//Меняем цвет кнопки
function changeColorSelect(buttonId) {
  if (CurrentButtonId) {
      var PreviousButton = document.getElementById(CurrentButtonId);
      PreviousButton.classList.remove('chosen');
  }
  var button = document.getElementById(buttonId);
  button.classList.add('chosen');
  CurrentButtonId = buttonId;
}
// Проверка на число
function isNumber(s){
  return !isNaN(s) && isFinite(s);
}

/////////////////////////////////////////////////////////////////////////////

//Обработка X
var CurrentButtonId;
var x_values = [];

document.querySelectorAll(".x_value_class").forEach(function (button) {
  button.addEventListener("click", function (event) {
      x_values.push(event.target.value);
      changeColorSelect(button.id);
  });
});

function Is_x_correct(x_value){
  if (x_value != null){
    document.querySelectorAll('.box_error_x').forEach(e => e.remove());  
    if(x_value < -4 || x_value > 4 ){
      var error = CreateNTFN('Ты че с иском сделал а?', 'red', 'box_error_x');
      submit_button.parentElement.insertBefore(error, submit_button);  
      return false;};
      return true;

    // document.querySelectorAll('.box_error_x').forEach(e => e.remove());
    
  }
  else {
    document.querySelectorAll('.box_error_x').forEach(e => e.remove());
    var error = CreateNTFN('Plese choose X', 'red', 'box_error_x');
    submit_button.parentElement.insertBefore(error, submit_button);
    return false;
  }
}

//Проверка Y
var y_contain = document.querySelector(".y_value_class");
var y_value;

function Is_y_correct(y_contain){
  y_value = y_contain.value.replace(',','.');
  if (y_value){
    if(y_value >= min_y_value && y_value <= max_y_value){
      document.querySelectorAll('.box_error_y').forEach(e => e.remove());    
      return true;
    }
    else {
      document.querySelectorAll('.box_error_y').forEach(e => e.remove());
      var error = CreateNTFN('Incorrect y', 'red', 'box_error_y');
      submit_button.parentElement.insertBefore(error, submit_button);
      return false;
    }
  }
  document.querySelectorAll('.box_error_y').forEach(e => e.remove());
  var error = CreateNTFN('Y must be not empty', 'red', 'box_error_y');
  submit_button.parentElement.insertBefore(error, submit_button);
 return false;  
}

// ОБработка R
var checkboxes = document.querySelectorAll(".R_value_class");
var R_values = [];

function Is_R_correct(check_this){
  if (check_this.length == 0 ){
    document.querySelectorAll('.box_error_R').forEach(e => e.remove());   
    var error = CreateNTFN('choose box of R', 'red', 'box_error_R');
    submit_button.parentElement.insertBefore(error, submit_button);
    return false;
  }
  else {
    document.querySelectorAll('.box_error_R').forEach(e => e.remove()); 
    for (var i = 0; i < check_this.length; i++ ){
      if(check_this[i] > 5 || check_this[i] < 1 ){ 
        var error = CreateNTFN('Ты че с R сделал а?', 'red', 'box_error_x');
        submit_button.parentElement.insertBefore(error, submit_button);  
        return false;};
    } 
    return true;
  }
}

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    R_values = 
      Array.from(checkboxes)
      .filter(i => i.checked)
      .map(i => i.value)
  })
});

/////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
  $.ajax({
    url: 'php/load.php',
    method: "POST",
    dataType: "html",
    success: function(data){
      console.log(data);
      $("#result_table>tbody").html(data);
    },
    error: function(error){
      console.log(error);	
    },
  })
})


document.getElementById("reset_btn").addEventListener("click", function () {
  console.log("Жопа кака");

  if(CurrentButtonId){
    var button = document.getElementById(CurrentButtonId);
    button.classList.remove('chosen');}

  $.ajax({
    url: 'php/reset.php',
    method: "POST",
    dataType: "html",
    success: function(data){
      console.log(data);
      $("#result_table>tbody").html(data);
    },
    error: function(error){
      console.log(error);	
    },
  })
  
});


form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  if (Is_x_correct(x_values[x_values.length - 1]) && Is_y_correct(y_contain) && Is_R_correct(R_values)) // Провекра
  {
    var formData = new FormData(form);
    var x = x_values[x_values.length - 1];
    var y = y_value;
    // var y = formData.get('y_value_name');
    // var R = R_values[R_values.length - 1];
    var R = R_values;
    console.log(x, y, R);

    for (var i = 0; i < R.length; i++ ){
      console.log("x_value_name=" + x + "&y_value_name=" + y + "&R_value_name=" + R[i] + "&timezone=" + new Date().getTimezoneOffset());

      $.ajax({
        url: 'php/server.php',
        method: "POST",
        data: "x_value_name=" + x + "&y_value_name=" + y + "&R_value_name=" + R[i] + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",
  
        success: function(data){
          console.log("Succses");
          
          $("#result_table>tbody").html(data);
          location.assign("https://se.ifmo.ru/~s339904/table.html");
          // window.location = url("https://se.ifmo.ru/~s339904/table.html");
        },
        error: function(error){
          console.log("жопа как");
          $(".submit_btn").attr("disabled", false);	
        },
      })
  
    }
  } 
  else
  {
    console.log("не прошло");}
}); 


