const testApp = angular.module('testApp', ['ngRoute']);
    

testApp.run(function($rootScope) {

    // initialise variables
    $rootScope.cartItems = 0;
    $rootScope.priceOverall = parseFloat(0).toFixed(2);
    $rootScope.voucherMessage = "Have a voucher?";
    $rootScope.voucher5 = 5; // fancyClothes55
    $rootScope.voucher10 = 10; // fancyClothes66
    $rootScope.voucher15 = 15; // fancyClothes77
    $rootScope.usedVoucher = false;
    $rootScope.usedVoucher5 = false;
    $rootScope.usedVoucher10 = false;
    $rootScope.usedVoucher15 = false;
    $rootScope.whichVoucher = null;
    $rootScope.voucherTotal = 0;

    // Set active link in the nav-bar
    $rootScope.setActiveLink = function(index) {

        let button = document.querySelectorAll(".nav-item");

        // reset voucher message in cart
        $rootScope.voucherMessage = "Have a voucher?";

        if(button.length > 0) {

            for( i=0; i < button.length; i++ ) {
                button[i].classList.remove("active");
            }
    
            button[index].classList.add("active");

        }
        
    }

    // Handle submitting vouchers
    $rootScope.submitVoucher = {
        submitButton: document.getElementById("submitButton"),
        submit: function() {
            const userInputBox = document.getElementById("userInput");
            let userInputValue = userInputBox.value;
            let voucherBuyMore;
            let voucherValid;
            const voucherUsed = "This voucher has been used already. Please use a different voucher.";
            const voucherInvalid = "Voucher ID not valid, please try again"

            // Check which voucher has been used
            if(userInputValue === "fancyClothes55") {
                if($rootScope.usedVoucher5 === false) {
                    voucherValid = "Congratulations, you just got £5.00 discount!"
                    $rootScope.whichVoucher = $rootScope.voucher5;
                    $rootScope.voucherShow = false;
                    $rootScope.usedVoucher5 = true;
                    $rootScope.usedVoucher = true;
                    $rootScope.voucherMessage = voucherValid;
                    $rootScope.priceOverall -= $rootScope.whichVoucher;
                    $rootScope.voucherTotal += $rootScope.whichVoucher;
                } else {
                    $rootScope.voucherMessage = voucherUsed;
                }
            } else if(userInputValue === "fancyClothes66") {
                if($rootScope.usedVoucher10 === false && $rootScope.priceOverall > 50) {
                    voucherValid = "Congratulations, you just got £10.00 discount!"
                    $rootScope.whichVoucher = $rootScope.voucher10;
                    $rootScope.voucherShow = false;
                    $rootScope.usedVoucher10 = true;
                    $rootScope.usedVoucher = true;
                    $rootScope.voucherMessage = voucherValid;
                    $rootScope.priceOverall -= $rootScope.whichVoucher;
                    $rootScope.voucherTotal += $rootScope.whichVoucher;
                } else if($rootScope.usedVoucher10 === false && $rootScope.priceOverall < 50) {
                    voucherBuyMore = "This voucher is valid only for orders above £50.00. Please add more items to your shopping cart!"
                    $rootScope.voucherMessage = voucherBuyMore;
                } else if($rootScope.usedVoucher10) {
                    $rootScope.voucherMessage = voucherUsed;
                }
            } else if(userInputValue === "fancyClothes77") {
                // check if one of the items in the shopping cart are shoes
                let itemFound = false;
                for (let i = 0; i < women[0].itemsForSale.length; i++) {
                    if ($rootScope.cart.indexOf(women[0].itemsForSale[i]) > -1) {
                        itemFound = true;
                    }
                }
                for (let i = 0; i < men[0].itemsForSale.length; i++) {
                    if ($rootScope.cart.indexOf(men[0].itemsForSale[i]) > -1) {
                        itemFound = true;
                    }
                }
                
                if($rootScope.usedVoucher15 === false && $rootScope.priceOverall > 75 && itemFound) {
                    voucherValid = "Congratulations, you just got £15.00 discount!"
                    $rootScope.whichVoucher = $rootScope.voucher15;
                    $rootScope.voucherShow = false;
                    $rootScope.usedVoucher15 = true;
                    $rootScope.usedVoucher = true;
                    $rootScope.voucherMessage = voucherValid;
                    $rootScope.priceOverall -= $rootScope.whichVoucher;
                    $rootScope.voucherTotal += $rootScope.whichVoucher;
                } else if($rootScope.usedVoucher15 === false && $rootScope.priceOverall < 75 || itemFound === false) {
                    voucherBuyMore = "This voucher is valid only for orders above £75.00 and containing at least 1 pair of shoes!"
                    $rootScope.voucherMessage = voucherBuyMore;
                } else if($rootScope.usedVoucher15) {
                    $rootScope.voucherMessage = voucherUsed;
                }
            } else {
                $rootScope.voucherShow = true;
                $rootScope.voucherMessage = voucherInvalid;
            }

            userInputBox.value = null;

            return (
                $rootScope.voucherShow,
                $rootScope.whichVoucher,
                $rootScope.voucherTotal,
                $rootScope.usedVoucher5,
                $rootScope.usedVoucher10,
                $rootScope.usedVoucher15,
                $rootScope.usedVoucher
            )
        }
    }

    // Change colour of the navbar on scroll-down
    window.onscroll = function changeNav(){
        var navBar = document.getElementById('nav-bg'),
            links = document.querySelectorAll(".navbar-dark .navbar-nav .nav-link")
            jumbotron = document.getElementById('jumbotron'),
            jumbotronTop = jumbotron.getBoundingClientRect().top
    
        if(jumbotronTop < 0) {
            navBar.classList.add("opaque");
            for(l=0; l<links.length; l++) {
                links[l].classList.add("scrolled");
            }
            
        } else if(jumbotronTop >= 0) {
            navBar.classList.remove("opaque");
            for(l=0; l<links.length; l++) {
                links[l].classList.remove("scrolled");
            }
        }
    }

});

testApp.config(function($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainCtrl'
        })

        .when('/cart', {
            templateUrl : 'pages/cart.html',
            controller  : 'cartCtrl'
        })

});


testApp.controller('mainCtrl', function($scope) {

    $scope.message = 'Find your style!';

});

testApp.controller('cartCtrl', ['$scope', function($scope) {

    $scope.message = 'View and edit items in your shopping cart';

}]);

// Change active category of clothes from the items.js file
testApp.controller('repeatCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.changeTopic = function(topic) {

        switch(topic) {
            case 0:
                selectedTopic = women[0];
                break;
            case 1:
                selectedTopic = women[1];
                break;
            case 2:
                selectedTopic = women[2];
                break;
            case 3:
                selectedTopic = men[0];
                break;
            case 4:
                selectedTopic = men[1];
                break;
            case 5:
                selectedTopic = men[2];
                break;
        }

        return (
            $rootScope.itemsInStore = selectedTopic.itemsForSale,
            $rootScope.itemsPrices = selectedTopic.prices,
            $rootScope.itemsStock = selectedTopic.stock
        )

    }

    // PAY and reset all cart-related variables
    $scope.checkoutAndPay = function() {
        console.log(itemsInCart.quantity)
        return (
            $rootScope.cart = [],
            $rootScope.priceOverall = 0,
            $rootScope.cartQty = [],
            $rootScope.cartPrices = [],
            $rootScope.cartItems = 0,
            itemsInCart.itemsAdded = [],
            itemsInCart.prices = [],
            itemsInCart.quantity = []
        )
    }

}]);