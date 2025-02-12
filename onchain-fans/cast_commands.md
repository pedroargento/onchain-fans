
For Smart Contract `0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f`

Create Sale
```solidty
cast send --rpc-url http://127.0.0.1:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "listImage(bytes32,uint256)" \
    0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1 \
    1000000000000000000
```

Get info
```solidty
cast call --rpc-url http://127.0.0.1:8545 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "getAllImageSales()"
```

```solidty
cast call --rpc-url http://127.0.0.1:8545 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "getImageSale(bytes32)" \
    0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```

Perform Purchase
```solidty
cast send --rpc-url http://127.0.0.1:8545 \
    --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d \
    --value 1000000000000000000 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "buyImage(bytes32)" \
    0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```

Execute verification
```solidty
cast send --rpc-url http://127.0.0.1:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "runExecution(bytes)" \
    0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```

Withdraw assets
```solidty
cast send --rpc-url http://127.0.0.1:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f \
    "withdraw(bytes32)" \
    0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```
