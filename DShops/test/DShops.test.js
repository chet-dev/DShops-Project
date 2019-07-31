/*global web3 artifacts contract*/
/*eslint no-undef: "error"*/
// Import all required modules from openzeppelin-test-helpers
const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers')
const { expect } = require('chai')
const should = require('chai').should()

const DShops = artifacts.require('DShops')

let instance

contract('DShops', accounts => {
  /// set up accounts
  const Admin = accounts[0]
  const Admin2 = accounts[1]
  const Alice = accounts[2]
  const Bob = accounts[3]
  const Charlie = accounts[4]

  const AliceStorefront_Name_1 = "ALICE'S HANDBAGS"
  const AliceStorefront_Name_2 = "ALICE'S SHOES"
  const BobStorefront_Name_1 = "BOB'S GADGETS"

  const AliceProduct_Name_1 = 'HANDBAG A'
  const AliceProduct_Name_2 = 'HANDBAG B'
  const AliceProduct_Name_3 = 'SHOES A'
  const BobProduct_Name_1 = 'GADGET A'
  const BobProduct_Name_2 = 'GADGET B'

  const AliceStorefronts = [
    {
      name: AliceStorefront_Name_1,
      uniqueId: web3.utils.soliditySha3(AliceStorefront_Name_1),
      products: [
        {
          code: web3.utils.asciiToHex(AliceProduct_Name_1),
          name: AliceProduct_Name_1,
          price: web3.utils.toWei(new BN(2), 'ether'),
          availQty: new BN(5),
          infoHash: '',
          imageHsh: ''
        },
        {
          code: web3.utils.asciiToHex(AliceProduct_Name_2),
          name: AliceProduct_Name_2,
          price: web3.utils.toWei(new BN(2), 'ether'),
          availQty: new BN(5),
          infoHash: '',
          imageHsh: ''
        }
      ]
    },
    {
      name: AliceStorefront_Name_2,
      uniqueId: web3.utils.soliditySha3(AliceStorefront_Name_2),
      products: [
        {
          code: web3.utils.asciiToHex(AliceProduct_Name_3),
          name: AliceProduct_Name_3,
          price: web3.utils.toWei(new BN(2), 'ether'),
          availQty: new BN(5),
          infoHash: '',
          imageHsh: ''
        }
      ]
    }
  ]
  const BobStorefronts = [
    {
      name: BobStorefront_Name_1,
      uniqueId: web3.utils.soliditySha3(BobStorefront_Name_1),
      products: [
        {
          code: web3.utils.asciiToHex(BobProduct_Name_1),
          name: BobProduct_Name_1,
          price: web3.utils.toWei(new BN(2), 'ether'),
          availQty: new BN(5),
          infoHash: '',
          imageHsh: ''
        },
        {
          code: web3.utils.asciiToHex(BobProduct_Name_2),
          name: BobProduct_Name_2,
          price: web3.utils.toWei(new BN(2), 'ether'),
          availQty: new BN(5),
          infoHash: '',
          imageHsh: ''
        }
      ]
    }
  ]

  before(async function() {
    instance = await DShops.new()
  })

  describe('assignUserAsAdmin()', function() {
    context('Admin assigns another user as Admin2', function() {
      it('should add user to the admin list', async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.assignUserAsAdmin.call(Admin2, { from: Admin })

        /// first in the array, therefore index should be 0
        expect(returnVal.toString()).equal('1')

        /// update the state
        const result = await instance.assignUserAsAdmin(Admin2, { from: Admin })
        expect(result.logs[0].args.adminAddr).equal(Admin2)

        /// check it matches with the newly assigned admin address
        const addr = await instance.getAdminByIndex(1, { from: Admin })
        expect(result.logs[0].args.adminAddr).equal(addr)
      })
    })
  })

  describe('requestToBeStoreOwner()', function() {
    context('Alice requests to become a store owner', function() {
      it('should add Alice into the list of store owner applicants', async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.requestToBeStoreOwner.call(Alice, 'Alice', { from: Alice })

        /// first in the array, therefore index should be 0
        expect(returnVal.toString()).equal('0')

        /// update the state
        const result = await instance.requestToBeStoreOwner(Alice, 'Alice', { from: Alice })
        expect(result.logs[0].args.storeOwnerApplicantAddr).equal(Alice)
      })
    })

    context('Bob requests to become a store owner', function() {
      it('should add Bob into the list of store owner applicants', async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.requestToBeStoreOwner.call(Bob, 'Bob', { from: Bob })

        /// second in the array, therefore index should be 1
        expect(returnVal.toString()).equal('1')

        /// update the state
        const result = await instance.requestToBeStoreOwner(Bob, 'Bob', { from: Bob })
        expect(result.logs[0].args.storeOwnerApplicantAddr).equal(Bob)
      })
    })
  })

  describe('approvedStoreOwner()', function() {
    context('Admin approves Alice to become a store owner', function() {
      it('should add Alice into the list of approved store owners', async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.approveStoreOwner.call(Alice, { from: Admin })

        /// first in the array, therefore index should be 0
        expect(returnVal.toString()).equal('0')

        /// update the state
        const result = await instance.approveStoreOwner(Alice, { from: Admin })
        expect(result.logs[0].args.storeOwnerAddr).equal(Alice)
      })
    })

    context('Admin2 approves Bob to become a store owner', function() {
      it('should add Bob into the list of approved store owners', async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.approveStoreOwner.call(Bob, { from: Admin2 })

        /// Second in the array, therefore index should be 1
        expect(returnVal.toString()).equal('1')

        /// update the state
        const result = await instance.approveStoreOwner(Bob, { from: Admin2 })
        expect(result.logs[0].args.storeOwnerAddr).equal(Bob)
      })
    })
  })

  describe('createStorefront()', function() {
    context(`Alice creates 2 storefronts`, function() {
      it(`should create a storefront called ${AliceStorefronts[0].name}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createStorefront.call(AliceStorefronts[0].name, {
          from: Alice
        })

        /// first in the array, therefore index should be 0
        expect(returnVal.toString()).equal('0')

        /// update the state
        const result = await instance.createStorefront(AliceStorefronts[0].name, {
          from: Alice
        })
        expect(result.logs[0].args.storefrontUniqueId).equal(AliceStorefronts[0].uniqueId)
      })

      it(`should create a storefront called ${AliceStorefront_Name_2}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createStorefront.call(AliceStorefronts[1].name, {
          from: Alice
        })

        /// second in the array, therefore index should be 0
        expect(returnVal.toString()).equal('1')

        /// update the state
        const result = await instance.createStorefront(AliceStorefronts[1].name, {
          from: Alice
        })
        expect(result.logs[0].args.storefrontUniqueId).equal(AliceStorefronts[1].uniqueId)
      })
    })
    context(`Bob creates 1 storefront`, function() {
      it(`should create a storefront called ${BobStorefront_Name_1}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createStorefront.call(BobStorefronts[0].name, {
          from: Bob
        })

        /// third in the array, therefore index should be 2
        expect(returnVal.toString()).equal('2')

        /// update the state
        const result = await instance.createStorefront(BobStorefronts[0].name, {
          from: Bob
        })
        expect(result.logs[0].args.storefrontUniqueId).equal(BobStorefronts[0].uniqueId)
      })
    })
  })

  describe('createProduct()', function() {
    context(`Alice creates 2 products in storefront ${AliceStorefronts[0].name}`, function() {
      it(`should create a product called ${AliceStorefronts[0].products[0].name}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createProduct.call(
          AliceStorefronts[0].uniqueId,
          AliceStorefronts[0].products[0].code,
          AliceStorefronts[0].products[0].name,
          AliceStorefronts[0].products[0].price,
          AliceStorefronts[0].products[0].availQty,
          AliceStorefronts[0].products[0].infoHash,
          AliceStorefronts[0].products[0].imageHsh,
          {
            from: Alice
          }
        )

        /// first in the array, therefore index should be 0
        expect(returnVal.toString()).equal('0')

        /// update the state
        const result = await instance.createProduct(
          AliceStorefronts[0].uniqueId,
          AliceStorefronts[0].products[0].code,
          AliceStorefronts[0].products[0].name,
          AliceStorefronts[0].products[0].price,
          AliceStorefronts[0].products[0].availQty,
          AliceStorefronts[0].products[0].infoHash,
          AliceStorefronts[0].products[0].imageHsh,
          {
            from: Alice
          }
        )
        expect(result.logs[0].args.productCode).equal(
          web3.utils.padRight(AliceStorefronts[0].products[0].code, 64)
        )
      })

      it(`should create a product called ${AliceStorefronts[0].products[1].name}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createProduct.call(
          AliceStorefronts[0].uniqueId,
          AliceStorefronts[0].products[1].code,
          AliceStorefronts[0].products[1].name,
          AliceStorefronts[0].products[1].price,
          AliceStorefronts[0].products[1].availQty,
          AliceStorefronts[0].products[1].infoHash,
          AliceStorefronts[0].products[1].imageHsh,
          {
            from: Alice
          }
        )

        /// second in the array, therefore index should be 1
        expect(returnVal.toString()).equal('1')

        /// update the state
        const result = await instance.createProduct(
          AliceStorefronts[0].uniqueId,
          AliceStorefronts[0].products[1].code,
          AliceStorefronts[0].products[1].name,
          AliceStorefronts[0].products[1].price,
          AliceStorefronts[0].products[1].availQty,
          AliceStorefronts[0].products[1].infoHash,
          AliceStorefronts[0].products[1].imageHsh,
          {
            from: Alice
          }
        )
        expect(result.logs[0].args.productCode).equal(
          web3.utils.padRight(AliceStorefronts[0].products[1].code, 64)
        )
      })
    })

    context(`Alice creates 1 product in storefront ${AliceStorefronts[1].name}`, function() {
      it(`should create a product called ${AliceStorefronts[1].products[0].name}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createProduct.call(
          AliceStorefronts[1].uniqueId,
          AliceStorefronts[1].products[0].code,
          AliceStorefronts[1].products[0].name,
          AliceStorefronts[1].products[0].price,
          AliceStorefronts[1].products[0].availQty,
          AliceStorefronts[1].products[0].infoHash,
          AliceStorefronts[1].products[0].imageHsh,
          {
            from: Alice
          }
        )

        /// third in the array, therefore index should be 2
        expect(returnVal.toString()).equal('2')

        /// update the state
        const result = await instance.createProduct(
          AliceStorefronts[1].uniqueId,
          AliceStorefronts[1].products[0].code,
          AliceStorefronts[1].products[0].name,
          AliceStorefronts[1].products[0].price,
          AliceStorefronts[1].products[0].availQty,
          AliceStorefronts[1].products[0].infoHash,
          AliceStorefronts[1].products[0].imageHsh,
          {
            from: Alice
          }
        )
        expect(result.logs[0].args.productCode).equal(
          web3.utils.padRight(AliceStorefronts[1].products[0].code, 64)
        )
      })
    })

    context(`Bob creates 1 product in storefront ${BobStorefronts[0].name}`, function() {
      it(`should create a product called ${BobStorefronts[0].products[0].name}`, async () => {
        /// call would not actually make any changes to the state
        const returnVal = await instance.createProduct.call(
          BobStorefronts[0].uniqueId,
          BobStorefronts[0].products[0].code,
          BobStorefronts[0].products[0].name,
          BobStorefronts[0].products[0].price,
          BobStorefronts[0].products[0].availQty,
          BobStorefronts[0].products[0].infoHash,
          BobStorefronts[0].products[0].imageHsh,
          {
            from: Bob
          }
        )

        /// fourth in the array, therefore index should be 3
        expect(returnVal.toString()).equal('3')

        /// update the state
        const result = await instance.createProduct(
          BobStorefronts[0].uniqueId,
          BobStorefronts[0].products[0].code,
          BobStorefronts[0].products[0].name,
          BobStorefronts[0].products[0].price,
          BobStorefronts[0].products[0].availQty,
          BobStorefronts[0].products[0].infoHash,
          BobStorefronts[0].products[0].imageHsh,
          {
            from: Bob
          }
        )
        expect(result.logs[0].args.productCode).equal(
          web3.utils.padRight(BobStorefronts[0].products[0].code, 64)
        )
      })
    })

    context(`Bob creates 1 product in storefront ${AliceStorefronts[0].name}`, function() {
      it(`should reject and revert`, async () => {
        /// call would not actually make any changes to the state
        await expectRevert(
          instance.createProduct(
            AliceStorefronts[0].uniqueId,
            BobStorefronts[0].products[1].code,
            BobStorefronts[0].products[1].name,
            BobStorefronts[0].products[1].price,
            BobStorefronts[0].products[1].availQty,
            BobStorefronts[0].products[1].infoHash,
            BobStorefronts[0].products[1].imageHsh,
            {
              from: Bob
            }
          ),
          'Returned error: VM Exception while processing transaction: revert msg.sender must be the store owner of the storefront! -- Reason given: msg.sender must be the store owner of the storefront!.'
        )
      })
    })
  })

  describe('updateProductPrice()', function() {
    context(
      `Alice updates the price of the product ${AliceStorefronts[0].products[0].name}`,
      function() {
        it('should update the price of the product', async () => {
          /// get the price of the product before the price update
          const beforeUpdate = await instance.getProduct.call(
            AliceStorefronts[0].products[0].code,
            { from: Alice }
          )
          const beforePrice = beforeUpdate.price
          const updateToPrice = beforeUpdate.price * 2

          /// update the price
          await instance.updateProductPrice(
            AliceStorefronts[0].products[0].code,
            web3.utils.toBN(updateToPrice),
            {
              from: Alice
            }
          )

          /// get the price of the product after the price update
          const afterUpdate = await instance.getProduct.call(AliceStorefronts[0].products[0].code, {
            from: Alice
          })

          const afterPriceString = afterUpdate.price.toString()
          const updateToPriceString = updateToPrice.toString()
          const beforePriceString = beforePrice.toString()

          /// check if the price is updated correctly
          expect(afterPriceString).equal(updateToPriceString)

          /// the price after update should not equal to the price before update
          expect(afterPriceString).not.equal(beforePriceString)
        })
      }
    )
    context(
      `Bob updates the price of the product ${AliceStorefronts[0].products[0].name}`,
      function() {
        it('should reject and revert', async () => {
          const updateToPrice = AliceStorefronts[0].products[0].price * 2
          await expectRevert(
            instance.updateProductPrice(
              AliceStorefronts[0].products[0].code,
              web3.utils.toBN(updateToPrice),
              {
                from: Bob
              }
            ),
            'Returned error: VM Exception while processing transaction: revert msg.sender must be the store owner of the product! -- Reason given: msg.sender must be the store owner of the product!.'
          )
        })
      }
    )
  })

  describe('buyProduct()', function() {
    context(
      `Charlie pays the required amount for the product ${AliceStorefronts[1].products[0].name}`,
      function() {
        it(`should increase the balance of storefront/contract and decrease Charlie's balance`, async () => {
          const buyQty = new BN(1)
          const payAmount = AliceStorefronts[1].products[0].price.mul(buyQty)

          const startingContractBalance = web3.utils.toBN(
            await web3.eth.getBalance(instance.address)
          )
          const startingCharlieBalance = web3.utils.toBN(await web3.eth.getBalance(Charlie))

          const hash = await instance.buyProduct(AliceStorefronts[1].products[0].code, buyQty, {
            from: Charlie,
            value: payAmount
          })

          const gasUsed = hash.receipt.gasUsed
          const tx = await web3.eth.getTransaction(hash.tx)
          const gasPrice = tx.gasPrice
          const gasCost = gasUsed * gasPrice

          const endingContractBalance = web3.utils.toBN(await web3.eth.getBalance(instance.address))
          const endingDannyBalance = web3.utils.toBN(await web3.eth.getBalance(Charlie))
          const amountPayable = AliceStorefronts[1].products[0].price.mul(buyQty)

          /// Expect Contract's balance to increase by the expected payable amount
          endingContractBalance.should.be.bignumber.equal(
            startingContractBalance.add(amountPayable)
          )

          /// Expect Charlie's blance to decrease by the amount paid for the product
          endingDannyBalance.should.be.bignumber.equal(
            startingCharlieBalance.sub(amountPayable).sub(web3.utils.toBN(gasCost))
          )

          const AliceBalance = await instance.getStorefront.call(AliceStorefronts[1].uniqueId, {
            from: Alice
          })
          /// Expect the storefront's balance (sales not actual ether) to increase by the amountPayable
          expect(AliceBalance.balance.toString()).equal(amountPayable.toString())
        })
      }
    )

    context(
      `Charlie pays more than the required amount for the product ${
        AliceStorefronts[1].products[0].name
      }`,
      function() {
        it(`should update the balances accordingly and refund excess to Charlie`, async () => {
          const buyQty = new BN(1)
          /// add more to the payAmount to simulate over paying
          const payAmount = AliceStorefronts[1].products[0].price.mul(buyQty).add(new BN(1000000))

          const startingContractBalance = web3.utils.toBN(
            await web3.eth.getBalance(instance.address)
          )
          const startingCharlieBalance = web3.utils.toBN(await web3.eth.getBalance(Charlie))

          const hash = await instance.buyProduct(AliceStorefronts[1].products[0].code, buyQty, {
            from: Charlie,
            value: payAmount // paying more than he should
          })

          const gasUsed = hash.receipt.gasUsed
          const tx = await web3.eth.getTransaction(hash.tx)
          const gasPrice = tx.gasPrice
          const gasCost = gasUsed * gasPrice

          const endingContractBalance = web3.utils.toBN(await web3.eth.getBalance(instance.address))
          const endingCharlieBalance = web3.utils.toBN(await web3.eth.getBalance(Charlie))
          const amountPayable = AliceStorefronts[1].products[0].price.mul(buyQty)

          /// Expect Contract's balance to increase by the expected payable amount
          endingContractBalance.should.be.bignumber.equal(
            startingContractBalance.add(amountPayable)
          )

          /// Expect Charlie's balance to decrease by the expected payable amount plus gasCost
          /// Expect the excess amount refunded
          endingCharlieBalance.should.be.bignumber.equal(
            startingCharlieBalance.sub(amountPayable).sub(web3.utils.toBN(gasCost))
          )
        })
      }
    )

    context(
      `Charlie pays less than the required amount for the product ${
        AliceStorefronts[1].products[0].name
      }`,
      function() {
        it(`should reject the purchase by Charlie and revert`, async () => {
          const buyQty = new BN(1)
          const payAmount = AliceStorefronts[1].products[0].price.mul(buyQty).sub(new BN(1000000))

          await expectRevert(
            instance.buyProduct(AliceStorefronts[1].products[0].code, buyQty, {
              from: Charlie,
              value: payAmount
            }),
            'Returned error: VM Exception while processing transaction: revert Insufficient funds to complete transaction! -- Reason given: Insufficient funds to complete transaction!.'
          )
        })
      }
    )
  })

  describe('withdrawBalanceFromStorefront()', function() {
    context(
      `Alice withdraws the balance from her storefront ${AliceStorefronts[1].name}`,
      function() {
        it(`should empty the storefront balance and increase Alice's account balance`, async () => {
          const startingContractBalance = web3.utils.toBN(
            await web3.eth.getBalance(instance.address)
          )
          const startingAliceBalance = await web3.utils.toBN(await web3.eth.getBalance(Alice))

          const storefrontStartingBalance = await instance.getStorefront.call(
            AliceStorefronts[1].uniqueId,
            {
              from: Alice
            }
          )

          const hash = await instance.withdrawBalanceFromStorefront(AliceStorefronts[1].uniqueId, {
            from: Alice
          })
          const gasUsed = hash.receipt.gasUsed
          const tx = await web3.eth.getTransaction(hash.tx)
          const gasPrice = tx.gasPrice
          const gasCost = gasUsed * gasPrice

          const endingContractBalance = await web3.utils.toBN(
            await web3.eth.getBalance(instance.address)
          )
          const endingAliceBalance = await web3.utils.toBN(await web3.eth.getBalance(Alice))

          const AliceBalanceDiff = endingAliceBalance.sub(startingAliceBalance)

          const storefrontEndingBalance = await instance.getStorefront.call(
            AliceStorefronts[1].uniqueId,
            {
              from: Alice
            }
          )

          const storefrontStartBalanceStr = storefrontStartingBalance.balance.toString()
          const storefrontEndBalanceStr = storefrontEndingBalance.balance.toString()

          /// Expect storefront Alice to have a non zero balance (from previous sales)
          expect(parseInt(storefrontStartBalanceStr)).greaterThan(0)

          /// Expect storefront Alice to have a zero balance after withdrawal of balance
          expect(storefrontEndBalanceStr).equal('0')

          /// Expect Contract's ending balance reduced by the amount of the storefront balance withdrawal
          endingContractBalance.should.be.bignumber.equal(
            startingContractBalance.sub(storefrontStartingBalance.balance)
          )

          const adjustedStorefrontStartingBalance = await web3.utils
            .toBN(storefrontStartingBalance.balance)
            .sub(new BN(gasCost))
          const actual = await web3.utils.fromWei(AliceBalanceDiff)
          const expected = await web3.utils.fromWei(adjustedStorefrontStartingBalance)

          /// Expect Alice's account balance to increase by the amount of the storefront balance withdrawal
          expect(actual.toString()).equal(expected.toString())
        })
      }
    )
  })

  describe('deleteProduct()', function() {
    context(`Alice deletes 2 products from her storefront ${AliceStorefronts[0].name}`, function() {
      it(`should delete 2 products from the storefront ${AliceStorefronts[0].name}`, async () => {
        await instance.deleteProduct(AliceStorefronts[0].products[0].code, {
          from: Alice
        })
        await instance.deleteProduct(AliceStorefronts[0].products[1].code, {
          from: Alice
        })
        const result = await instance.getStorefront.call(AliceStorefronts[0].uniqueId, {
          from: Alice
        })
        expect(result.productsCount.toString()).equal('0')
      })
    })

    context(
      `Bob deletes 1 product from Alice's storefront ${AliceStorefronts[1].name}`,
      function() {
        it(`should reject and revert`, async () => {
          await expectRevert(
            instance.deleteProduct(AliceStorefronts[1].products[0].code, {
              from: Bob
            }),
            'Returned error: VM Exception while processing transaction: revert msg.sender must be the store owner of the product! -- Reason given: msg.sender must be the store owner of the product!.'
          )
        })
      }
    )
  })
})
