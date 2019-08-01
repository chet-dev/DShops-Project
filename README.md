# DShops-Project

### DShops is an online marketplace that operates on the blockchain.

**Shoppers** can browse a master list of products or view products by storefronts to buy products posted by the **Store Owners** using cryptocurrency (ETH).

Anyone with a wallet address can apply to become a **Store Owner**. It is up to the **Admin** to approve the application.

This marketplace can be managed by a group of administrators (**Admins**). **Store Owners** can manage their products and storefront's balance.

## User Stories


### Contract Owner

When the smart contract is first initiated, the contract owner is automatically assinged as an **admin**. Therefore, the contract owner can do anything that an admin can do in the web app. In the event of an emergency, only the contract owner can perform the circuit breaker actions **Pause** and **Unpause**. The circuit breaker function can be accessed via the Admin page.

### Admin

When an admin opens the web app, the web app reads the admin's wallet address to determine whether he/she is an admin. If the user is an admin, the app will redirect the user to the admin page. An admin can assign another user to become an admin. An admin can add a user to the list of **Store Owner Applicants** for consideration of approval to become an approved **Store Owner**. Any admin can then approve the **Store Owner Applicant** and put the applicant into the list of approved **Store Owners**.


### Store Owner

When an approved store owner logs into the web app, the app will recognize the user as a store owner and redirects him/her to the Store Owner page. A store owner can add one or more storefronts. A store owner can see and manage a list of storefronts created by him/her. 

A store owner can go into one of his/her storefronts to manage the storefront's products. A store owner can add or remove a product. When adding a product, *the store owner can choose to upload product information (long description) and an image to the [**InterPlanetary File System (IPFS)**](https://ipfs.io/)* .

A store owner can also update the price of the product he/she created. A store owner can also withdraw the storefront's balance (collected from sales), if the balance is more than zero.

### Shopper

When a shopper logs into the web app, the app checks the shopper's wallet address. Since the shopper is not an admin or store owner, the app redirects the shopper to the Shopper page.

From the Shopper page, a shopper can choose to view a master list of products by all storefronts, or view a list of storefronts by different store owners.

A shopper can choose to view any product on the list. He/she can go into a specific product and view the product details such as the product code, name, unit price and available quantity. If there are stored IPFS product description and image, they would be displayed to the shopper too, even though they may take quite a while to load the first time.

A shopper can purchase any product, if he/she has sufficient funds for the purchase and that the product is in stock. A successful purchase would deduct the payment amount (plus gas) from the shopper wallet, and the storefront's balance would increase by the payment amount. If the shopper pays more than he/she should, the excess would be refunded to him/her. If he has insufficient funds, the transaction would be rejected or reverted.

## Known Issues

This web app is not of production quality and it relies on the web3.js (web3@1.0.0-beta.55). The "loading screen spinner" will get stuck at times, because it relies on the transaction "on confirmation" and sometimes it does not trigger. If this happens to you, while using the app, please refresh the page, you will see the blockchain transaction was actually successul.

## How To Set Up The Project For Local Testing

The **DShops-Project** contains two main subfolders, DShops and dshopsvue.

