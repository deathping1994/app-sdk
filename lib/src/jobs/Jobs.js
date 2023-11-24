"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const Auth_1 = require("./Auth");
const CartQueuedJobs_1 = require("./Cart/CartQueuedJobs");
const Checkout_1 = require("./Checkout");
const Wishlist_1 = require("./Wishlist");
class Jobs {
    constructor(localStorageHandler, apolloClientManager) {
        this.auth = new Auth_1.AuthJobs(localStorageHandler, apolloClientManager);
        this.checkout = new Checkout_1.CheckoutJobs(localStorageHandler, apolloClientManager);
        this.wishlist = new Wishlist_1.WishlistJobs(localStorageHandler, apolloClientManager);
        this.cart = new CartQueuedJobs_1.CartQueuedJobs(localStorageHandler, apolloClientManager);
    }
}
exports.Jobs = Jobs;
//# sourceMappingURL=Jobs.js.map