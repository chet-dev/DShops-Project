explain at least 3 common attacks and how the app mitigates user risk

3 common attacks outlined

# Avoiding Common Attacks

## Re-Entrancy

As described in the Solidity documentation, "Any interaction from a contract (A) with another contract (B) and any transfer of Ether hands over control to that contract (B). This makes it possible for B to call back into A before this interaction is completed."

Also, taken from another source https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html(https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html),

"...the malicious contract is reentering the initial contract, before the first instance of the function containing the call is finished. This attack can be used to repeatedly invoke functions that should only be executed once and was part of the most prominent hack in Ethereum history: the DAO exploit."

The DShops smart contract does not use 'call' or 'send'. The withdrawal pattern was implemented for the contract, where store owners withraw the balance, and the smart contract uses 'transfer' instead. 

However, in general, the withdrawal pattern could be susceptible to the Contantinople Reentrancy Attack in specific situations outlined in [Constantinople enables new Reentrancy Attack](https://medium.com/chainsecurity/constantinople-enables-new-reentrancy-attack-ace4088297d9) ...  

"Certain preconditions have to be met to make a contract vulnerable:
1. There must be a function A, in which a transfer/send is followed by a state-changing operation. This can sometimes be non-obvious, e.g. a second transfer or an interaction with another smart contract.
2. There has to be a function B accessible from the attacker which (a) changes state and (b) whose state changes conflict with those of function A.
3. Function B needs to be executable with less than 1600 gas
(2300 gas stipend - 700 gas for the CALL)."

The DShops contract is not in danger, as the withdrawal function and the rest of the functions in the contract do not meet the preconditions outlined above.

The withdrawal function in the contract also uses the Checks-Effects-Interactions pattern - "Checks first, after that effects to state variables and interactions last"

&nbsp;

## Integer Overflow and Underflow

### Overflow

If a uint is being added without limit, it would reach the maximum uint value (2^256) and will circle back to zero.

### Underflow

If a uint is made to be less than zero, it will cause an underflow and get set to its maximum value. 

Obviously, we do not want any overflows or underflows to happen in our contract. The DShop contract is using the OpenZeppelin SafeMath to do all the basic arithmetics, to mitigate the risks of overflow and underflow.

&nbsp;

## DoS with (Unexpected) revert

Excerpt taken from [Known Attacks
](https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert)"... example is when a contract may iterate through an array to pay users (e.g., supporters in a crowdfunding contract). It's common to want to make sure that each payment succeeds. If not, one should revert. The issue is that if one call fails, you are reverting the whole payout system, meaning the loop will never complete. No one gets paid because one address is forcing an error."

The above situation is similar to sending the storefront balance to the store owners in one goal. The DShops is using the Withdrawal Pattern, favoring Pull over Push payments.