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
Order.prototype.sideCost = function () {
  return this.sidePrice;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; //////////////////////IMPORTANT!!! How to add contents of an array together
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
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#landing-content").hide();
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var crust = $("select#crust").val();
    var cheese = $("select#cheese").val();
    var toppings = $("select#toppings").val();
    var flavor = $("select#flavor").val();
    var pizzaDetails = (customSize + " - " + crust + ", " + cheese + ", " + toppings + ", " + meat);
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
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });
  $("#checkout-btn").click(function() {
    location.reload();
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var state = $("select#county-select").val();
    var newAddress = new Address(streetAddress, city, county)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
});
