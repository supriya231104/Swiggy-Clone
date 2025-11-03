export function applyFilter(restaurantData, filters) {
  // console.log(restaurantData);
  let filteredData = filters.reduce((acc, curr) => {
    switch (curr) {
      case "Rating 4.0+": 
        return handleRatingFourPlus(acc);

      case "Offers":
        return handleOffers(acc);

      case "Less than Rs. 300":
        return handleLessThanThreeHund(acc);

      case "Rs.300 - Rs.600":
        return handleBet3TO6(acc);
      case "Pure Veg":
        return handleVeg(acc);
      case "Fast Delivery":
        return handleFastDelivery(acc);
    }
  }, restaurantData);

  // console.log(filteredData);
  return filteredData;
}
function handleRatingFourPlus(restaurantData) {
  return restaurantData.filter((one) => {
    return one?.info?.avgRating > 4 ? one : "";
  });
}
function handleOffers(restaurantData) {
  return restaurantData.filter((one) => {
    return one?.info?.aggregatedDiscountInfoV3 ? one : "";
  });
}
function handleLessThanThreeHund(restaurantData) {
  return restaurantData.filter((one) => {
    const cost = parseInt(one.info.costForTwo.replace(/[^\d]/g, ""));
    if (cost < 300) {
      return one;
    }
  });
}
function handleBet3TO6(restaurantData) {
  return restaurantData.filter((one) => {
    const cost = parseInt(one.info.costForTwo.replace(/[^\d]/g, ""));
    if (cost >= 300 && cost <= 600) {
      return one;
    }
  });
}
function handleVeg(restaurantData) {
  return restaurantData.filter((one) => {
    return one?.info?.veg ? one : "";
  });
}
function handleFastDelivery(restaurantData){
  return restaurantData.filter((one)=>{
    return one?.info?.sla?.deliveryTime<30
  })
}

