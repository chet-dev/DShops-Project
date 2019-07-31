const contract = {
  address: '0x534b707ac5674c2402dF4CaA4A6227A28743cF10',
  abi: [
    {
      constant: false,
      inputs: [],
      name: 'unpause',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'isPauser',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'paused',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'renouncePauser',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'addPauser',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'pause',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
    { payable: false, stateMutability: 'nonpayable', type: 'fallback' },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'adminAddr', type: 'address' }],
      name: 'LogAssignUserAsAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'storeOwnerApplicantAddr', type: 'address' }],
      name: 'LogRequestToBeStoreOwner',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'storeOwnerAddr', type: 'address' }],
      name: 'LogApproveStoreOwner',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'storefrontUniqueId', type: 'bytes32' }],
      name: 'LogCreateStorefront',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'productCode', type: 'bytes32' }],
      name: 'LogCreateProduct',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'productCode', type: 'bytes32' }],
      name: 'LogDeleteProduct',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'productCode', type: 'bytes32' }],
      name: 'LogUpdateProduct',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'buyer', type: 'address' },
        { indexed: true, name: 'productCode', type: 'bytes32' }
      ],
      name: 'LogBuyProduct',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'storefrontUniqueId', type: 'bytes32' }],
      name: 'LogWithdrawBalanceFromStorefront',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'account', type: 'address' }],
      name: 'Paused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'account', type: 'address' }],
      name: 'Unpaused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'account', type: 'address' }],
      name: 'PauserAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'account', type: 'address' }],
      name: 'PauserRemoved',
      type: 'event'
    },
    {
      constant: true,
      inputs: [{ name: 'userAddr', type: 'address' }],
      name: 'isAdmin',
      outputs: [{ name: 'userIsAdmin', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'userAddr', type: 'address' }],
      name: 'assignUserAsAdmin',
      outputs: [{ name: 'index', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getAdminsCount',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'index', type: 'uint256' }],
      name: 'getAdminByIndex',
      outputs: [{ name: 'adminAddr', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getStoreOwnerApplicantsCount',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'index', type: 'uint256' }],
      name: 'getStoreOwnerApplicantByIndex',
      outputs: [
        { name: 'storeOwnerApplicantAddr', type: 'address' },
        { name: 'storeOwnerApplicantName', type: 'string' },
        { name: 'status', type: 'uint8' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'userAddr', type: 'address' }],
      name: 'isStoreOwnerApplicant',
      outputs: [{ name: 'userIsStoreOwnerApplicant', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: 'applicantAddr', type: 'address' },
        { name: 'applicantName', type: 'string' }
      ],
      name: 'requestToBeStoreOwner',
      outputs: [{ name: 'index', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'applicantAddr', type: 'address' }],
      name: 'approveStoreOwner',
      outputs: [{ name: 'index', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'userAddr', type: 'address' }],
      name: 'isStoreOwner',
      outputs: [{ name: 'userIsStoreOwner', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getStoreOwnersCount',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'index', type: 'uint256' }],
      name: 'getStoreOwnerByIndex',
      outputs: [
        { name: 'storeOwnerAddr', type: 'address' },
        { name: 'storeOwnerName', type: 'string' },
        { name: 'storefrontsCount', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'addr', type: 'address' }],
      name: 'getStoreOwner',
      outputs: [
        { name: 'storeOwnerIndex', type: 'uint256' },
        { name: 'storeOwnerName', type: 'string' },
        { name: 'storefrontsCount', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'newStorefrontName', type: 'string' }],
      name: 'createStorefront',
      outputs: [{ name: 'index', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getStorefrontsCount',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'storeOwnerAddr', type: 'address' }],
      name: 'getStorefrontsCountForStoreOwner',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'storeOwnerAddr', type: 'address' }, { name: 'index', type: 'uint256' }],
      name: 'getStorefrontForStoreOwnerByIndex',
      outputs: [
        { name: 'storefrontName', type: 'string' },
        { name: 'storefrontUniqueId', type: 'bytes32' },
        { name: 'productsCount', type: 'uint256' },
        { name: 'balance', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'index', type: 'uint256' }],
      name: 'getStorefrontByIndex',
      outputs: [
        { name: 'uniqueId', type: 'bytes32' },
        { name: 'storefrontName', type: 'string' },
        { name: 'storeOwner', type: 'address' },
        { name: 'productsCount', type: 'uint256' },
        { name: 'productCodes', type: 'bytes32[]' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'storefrontUniqueId', type: 'bytes32' }],
      name: 'getStorefront',
      outputs: [
        { name: 'storefrontName', type: 'string' },
        { name: 'storeOwner', type: 'address' },
        { name: 'productsCount', type: 'uint256' },
        { name: 'index', type: 'uint256' },
        { name: 'balance', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'uniqueId', type: 'bytes32' }],
      name: 'storefrontExists',
      outputs: [{ name: 'doesExist', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'productCode', type: 'bytes32' }],
      name: 'productExists',
      outputs: [{ name: 'doesExist', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: 'storefrontUniqueId', type: 'bytes32' },
        { name: 'productCode', type: 'bytes32' },
        { name: 'newProductName', type: 'string' },
        { name: 'price', type: 'uint256' },
        { name: 'availQty', type: 'uint256' },
        { name: 'infoHash', type: 'string' },
        { name: 'imageHash', type: 'string' }
      ],
      name: 'createProduct',
      outputs: [{ name: 'index', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'productCode', type: 'bytes32' }, { name: 'newPrice', type: 'uint256' }],
      name: 'updateProductPrice',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'productCode', type: 'bytes32' }],
      name: 'deleteProduct',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getProductsCount',
      outputs: [{ name: 'count', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'productCode', type: 'bytes32' }],
      name: 'getProduct',
      outputs: [
        { name: 'productName', type: 'string' },
        { name: 'price', type: 'uint256' },
        { name: 'availQty', type: 'uint256' },
        { name: 'index', type: 'uint256' },
        { name: 'infoHash', type: 'string' },
        { name: 'imageHash', type: 'string' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'index', type: 'uint256' }],
      name: 'getProductByIndex',
      outputs: [
        { name: 'productCode', type: 'bytes32' },
        { name: 'productName', type: 'string' },
        { name: 'price', type: 'uint256' },
        { name: 'availQty', type: 'uint256' },
        { name: 'infoHash', type: 'string' },
        { name: 'imageHash', type: 'string' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: 'storefrontUniqueId', type: 'bytes32' }, { name: 'index', type: 'uint256' }],
      name: 'getProductForStorefrontByIndex',
      outputs: [
        { name: 'productCode', type: 'bytes32' },
        { name: 'productName', type: 'string' },
        { name: 'price', type: 'uint256' },
        { name: 'availQty', type: 'uint256' },
        { name: 'infoHash', type: 'string' },
        { name: 'imageHash', type: 'string' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'productCode', type: 'bytes32' }, { name: 'buyQty', type: 'uint256' }],
      name: 'buyProduct',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'storefrontUniqueId', type: 'bytes32' }],
      name: 'withdrawBalanceFromStorefront',
      outputs: [{ name: 'success', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}
export default contract
