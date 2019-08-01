# Design Pattern Decisions

## Mapping Iteration

Mapping, mapping(_KeyType => _ValueType) in solidity is very useful, but you cannot iterate a mapping as it is only a keccak hash to some storage value. However, it is possible to implement a data structure to overcome this limitation.

In the project, there are many mappings that need to be iterated. We can achieve this by simply storing the _KeyType in an array.

In the project, a product can be referenced by a bytes32 productCode and returns a ProductStruct. For the iteration, we have a separate bytes32 array to store each bytes32 productCode, by pushing the bytes32 productCode into the bytes32[] array.

```
mapping(bytes32 => ProductStruct) private products; 
bytes32[] private productIndexes;
```

If we want to iterate the products, we can first get the length of the bytes32[] array of productCodes (named productIndexes) and then we can loop from array index 0 to the the array length - 1. 

In the contract, we have a function getProductsCount() to get the length of the products, and we have a function getProductByIndex(bytes32 index) to return the product details. Therefore, in our web app, we can first call the getProductsCount() to obtain the products count and then call getProductByIndex(i), where i is the index of 0 to the count - 1.

This mapping iteration design pattern is a subset of the larger implementation of the Solidity CRUD by Rob Hitchens (https://medium.com/robhitchens/solidity-crud-part-1-824ffa69509a), which is also implemented in this project.


## Withdrawal Pattern

In our smart contract, a store owner can withdraw his/her storefront's balance (collected sales). Instead of sending the funds from the contract to the store owners, the DShops smart contract implements the withdrawal pattern, where the store owner is responsible for withdrawing the balance. The store owner has to initiate or send a transaction in order to withdraw the funds into his/her account.

The withdrawal pattern is a better way in terms of security, costs and complexity compared to sending the funds to all store owners at once, as the contract does not have to handle the situations when the sending of funds fail.

One failed transaction could stop other store owners from getting the funds, if the contract send the funds directly to all the store owners.

Sending the funds directly to a recipient should be avoided, as a contract does not know whether the recipient is a malicious contract that is designed to reject the funds sent to it.

In the DShops smart contract, the withdrawal pattern is implemented.

```
 function withdrawBalanceFromStorefront(bytes32 storefrontUniqueId)
        public
        whenNotPaused
        returns (bool success)
    {
        require(storefrontExists(storefrontUniqueId), "Storefront does not exist!");
        require(
            msg.sender == storefronts[storefrontUniqueId].storeOwner,
            "Must be the owner to withdraw balance!"
        );
        uint256 balanceToWithdraw = storefronts[storefrontUniqueId].balance;
        require(balanceToWithdraw > 0, "The balance must be more than zero to withdraw!");
        storefronts[storefrontUniqueId].balance = (storefronts[storefrontUniqueId].balance).sub(
            balanceToWithdraw
        );
        emit LogWithdrawBalanceFromStorefront(storefrontUniqueId);
        msg.sender.transfer(balanceToWithdraw); // transfer balance back to store owner
        return true;
    }
```