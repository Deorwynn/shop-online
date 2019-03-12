testApp.controller('cartItemsTemplateCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.removeItemFromCart = function() {

        let spanText = event.target.parentNode.parentNode.firstElementChild.innerText;
        let indexOfItem = itemsInCart.itemsAdded.indexOf(spanText);
        let indexOfItemStore; 

        for(i=0; i < women.length; i++ ) {
            if(women[i].itemsForSale.includes(spanText)) {
                indexOfItemStore = women[i].itemsForSale.indexOf(spanText);
                $rootScope.itemsInStore = women[i].itemsForSale;
                $rootScope.itemsStock = women[i].stock;
            } else if(men[i].itemsForSale.includes(spanText)) {
                indexOfItemStore = men[i].itemsForSale.indexOf(spanText);
                $rootScope.itemsInStore = men[i].itemsForSale;
                $rootScope.itemsStock = men[i].stock;
            }
        }
        
        if($rootScope.cartQty[indexOfItem] > 0) {
            $rootScope.cartQty[indexOfItem] --;
            $rootScope.itemsStock[indexOfItemStore] ++;
            $rootScope.priceOverall = parseFloat((parseFloat($rootScope.priceOverall) - parseFloat($rootScope.cartPrices[indexOfItem])).toFixed(2));
        }

        if($rootScope.usedVoucher && $rootScope.cartQty.length == 1) {
            $rootScope.priceOverall = parseFloat((parseFloat($rootScope.priceOverall) + parseFloat($rootScope.voucherTotal)).toFixed(2));
            $rootScope.usedVoucher = false;
            $rootScope.usedVoucher5 = false;
            $rootScope.usedVoucher10 = false;
            $rootScope.usedVoucher15 = false;
            $rootScope.whichVoucher = null;
            $rootScope.voucherTotal = 0;
        }

        if($rootScope.cartQty[indexOfItem] == 0) {
            $rootScope.cart.splice(indexOfItem,1);
            $rootScope.cartQty.splice(indexOfItem,1);
            $rootScope.cartPrices.splice(indexOfItem,1);
        }

        if($rootScope.cartItems > 0) {
            $rootScope.cartItems --;
        }

        return (
            $rootScope.priceOverall, 
            $rootScope.cartItemIndex = indexOfItem,
            $rootScope.buttonIndex,
            $rootScope.itemAdded = $rootScope.itemsInStore[indexOfItem]
            )
    };

}])
        .component("cartItemsTemplate", {
            bindings: {
                item: "@",
                price: "@",
                qty: "@"
            },
            templateUrl: "cartItemsTemplate.html"
        });;