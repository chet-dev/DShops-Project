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

The **DShops-Project** contains two main subfolders, **DShops** and **dshopsvue**.

**DShops** is a truffle project which contains the DShops.sol Solidity smart contract. You can run truffle test, migrate and compile within this folder.

**dshopsvue** is a Vue JS project which contains all the frontend codes that interacts with the smart contract using web3.js and a Dapp browser such as MetaMask. You can start a development webserver and run this web app from this folder.

### Recommended Requirements

+ You should be running a linux virtual machine, I am using Ubuntu 19.04 within a VM (Parallels for Mac)

+ You should be using the node package manager NPM

+ You should have [**ganace-cli**](https://github.com/trufflesuite/ganache-cli) installed

+ You will need a Dapp browser. I am using MetaMask.

&nbsp;

### Test The Smart Contract in DShops subfolder

#### Step 1

Clone this github repo.

```
$ git clone https://github.com/chet-dev/DShops-Project.git
```

### Step 2

Go into the main project folder.
```
$ cd DShops-Project
```

You will see the two subfolders DShops and dshopsvue.

### Step 3

Go into the DShops folder

```
$ cd DShops
```

### Step 4

Npm install the required packages locally.

```
$ npm install
```

### Step 5

Run your ganache-cli

```
$ ganache-cli
```

### Step 6

Run the truffle test

```
$ truffle test
```

The tests should run and you will see they will all pass.

### Step 7

Run the truffle migrate to generate the contract artifacts.

```
$ truffle migrate
```
The migration should run and the contract would be compiled and deployed successully in your ganache instance. You should see a build folder generated. Our frontend web app would require the artifacts generated in this build folder. Now you are ready to set up for the frontend web app.

&nbsp;

### Test The Frontend Web App in dshopsvue subfolder

Please complete the steps in [**Test The Smart Contract in DShops subfolder**](Test-The-Smart-Contract-in-DShops-subfolder) first, before following the steps below.

#### Step 1

From the subfolder DShops, go into the dshopsvue subfolder. 

```
$ cd ../dshopsvue
```

#### Step 2

Npm install all the required packages locally.

```
$ npm install
```

#### Step 3

Run a script to help you to extract the deployed contract address and ABI from the DShops build folder into the **src** subfolder of your current directory.

```
$ ./getabi.sh
```
A file named **DShops.abi.js** containing the contract address and ABI would be generated within the **src** subfolder. 

    Note: You can also edit this DShops.abi.js to change the contract address later to the one I deployed to the Rinkeby Testnet, to test the same smart contract on Rinkeby. 

#### Step 4

You can now build the web app. The build process should complete successfully, and a development webserver should start automatically to serve the web app. It would provide you the links and port numbers for you to test the web app locally, using your web browser.

```
$ npm run serve
```

