// Business Logic
var totalPriceArray = []; //Only global variable in code
function Order (customSize, cheese) {
  this.customSize = customSize;
  this.crust = 0;
  this.cheese = cheese;
  this.toppings = 100;
  this.flavor = 200;
  this.pizzaPrice = 0;
  this.sidePrice = 100;
}
Order.prototype.pizzaCost = function () {
  if (this.customSize === "Small 10 in.") {
    this.pizzaPrice += 600;
  } else if (this.customSize === "Medium 14 in.") {
    this.pizzaPrice += 850;
  } else if (this.customSize === "Large 18 in.") {
    this.pizzaPrice += 1100;
  }
  if (this.cheese === "cheese") {
    this.pizzaPrice += 200;
  } else if (this.cheese === "light cheese") {
    this.pizzaPrice += 100;
  } else if (this.cheese === "extra cheese") {
    this.pizzaPrice += 250;
  }
  this.pizzaPrice += this.crust;
  this.pizzaPrice += this.toppings;
  this.pizzaPrice += this.flavor;
  return this.pizzaPrice;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement];
  }
  return cartTotalPrice;
}
function Address (streetAddress, city, county) {
  this.streetAddress = streetAddress;
  this.city = city;
  this.county = county;
  this.deliveryAddress = (streetAddress + "  " + city + ", " + county);
}
//User Interface Logic
$(document).ready(function(event) {

  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var crust = $("select#crust").val();
    var cheese = $("select#cheese").val();
    var toppings = $("select#toppings").val();
    var flavor = $("select#flavor").val();
    var pizzaDetails = (customSize + " - " + crust + ", " + cheese + ", " + toppings + ", "  + flavor);
    var newPizzaOrder = new Order(customSize, cheese);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #crust, #cheese, #toppings, #flavor").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });
///Checkout Btn
  $("#checkout-btn").click(function() {
    location.reload();
  });
});
