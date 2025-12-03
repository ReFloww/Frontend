export const abi = [
    {
        type: "constructor",
        stateMutability: "nonpayable",
        inputs: [
            {
                name: "_usdtAddress",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ReentrancyGuardReentrantCall",
        inputs: [],
    },
    {
        type: "event",
        name: "Swapped",
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "user",
                type: "address",
                internalType: "address",
            },
            {
                indexed: true,
                name: "fromToken",
                type: "address",
                internalType: "address",
            },
            {
                indexed: true,
                name: "toToken",
                type: "address",
                internalType: "address",
            },
            {
                indexed: false,
                name: "amountIn",
                type: "uint256",
                internalType: "uint256",
            },
            {
                indexed: false,
                name: "amountOut",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "function",
        name: "swap",
        stateMutability: "nonpayable",
        inputs: [
            { name: "fromToken", type: "address", internalType: "address" },
            { name: "toToken", type: "address", internalType: "address" },
            { name: "amountIn", type: "uint256", internalType: "uint256" },
        ],
        outputs: [
            { name: "amountOut", type: "uint256", internalType: "uint256" },
        ],
    },
    {
        type: "function",
        name: "usdtToken",
        stateMutability: "view",
        inputs: [],
        outputs: [
            { name: "", type: "address", internalType: "contract IERC20" },
        ],
    },
] as const;
