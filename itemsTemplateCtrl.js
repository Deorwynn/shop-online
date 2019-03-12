testApp.controller('itemsTemplateCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.addItemToCart = function() {

        let spanText = event.target.parentNode.parentNode.firstElementChild.innerText;
        let indexOfItem = $rootScope.itemsInStore.indexOf(spanText);
        let indexOfItemCart;

        if($rootScope.priceOverall == 0) {
            $rootScope.priceOverall = parseFloat($rootScope.priceOverall);
        }

        if($rootScope.itemsStock[indexOfItem] > 0) {
        
            $rootScope.cartItems ++;
            $rootScope.itemsStock[indexOfItem] --;
           
            $rootScope.itemAdded = $rootScope.itemsInStore[indexOfItem];
            $rootScope.itemAddedPrice = $rootScope.itemsPrices[indexOfItem];

            $rootScope.priceOverall += $rootScope.itemAddedPrice;

            if(!itemsInCart.itemsAdded.includes($rootScope.itemAdded)) {
                itemsInCart.itemsAdded.push($rootScope.itemAdded);
                itemsInCart.prices.push($rootScope.itemAddedPrice);
                itemsInCart.quantity.push(1);
            } else {
                indexOfItemCart = itemsInCart.itemsAdded.indexOf(spanText);
                itemsInCart.quantity[indexOfItemCart] ++;
            }

        }

        $rootScope.priceOverall = parseFloat($rootScope.priceOverall);

        console.log("added ", $rootScope.cart)

        return (
            $rootScope.priceOverall,
            $rootScope.buttonIndex = indexOfItem,
            $rootScope.itemAdded,
            $rootScope.voucherShow = true,
            $rootScope.cart = itemsInCart.itemsAdded,
            $rootScope.cartQty = itemsInCart.quantity,
            $rootScope.cartPrices = itemsInCart.prices
            )
    };

}])
        .component("itemsTemplate", {
            bindings: {
                item: "@",
                price: "@",
                stock: "@"
            },
            templateUrl: "itemsTemplate.html"
        });;