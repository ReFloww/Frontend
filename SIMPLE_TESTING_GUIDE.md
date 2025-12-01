# ✅ SIMPLE TESTING GUIDE - USDT ↔ P2P Token

## 🎯 Your Setup (Simplified)

**All 6 products now share ONE P2P token:**
- TokenP2P: `0x7A968ba34b0F7eE9eb2Fb8e5C97267626757ffA1`
- MockUSDT: `0xe01c5464816a544d4d0d6a336032578bd4629F10`
- Network: Mantle Sepolia Testnet

## 📝 What Happens

### Investment Flow:
```
USDT (in wallet) → Invest → P2P tokens (in wallet)
```

### Redemption Flow:
```
P2P tokens (in wallet) → Redeem → USDT (in wallet)
```

---

## 🧪 TESTING STEPS

### Step 1: Check Your Wallet
1. Connect wallet to Mantle Sepolia testnet
2. Make sure you have some **Mock USDT**

**Don't have USDT?** Mint some:
```javascript
// Call the mint function on MockUSDT contract
// Contract: 0xe01c5464816a544d4d0d6a336032578bd4629F10
// Function: mint(address to, uint256 amount)
// Example: mint(yourAddress, 1000000000) // 1000 USDT
```

### Step 2: Test Investment (USDT → P2P)
1. Go to http://localhost:3000/market
2. Click on ANY product (they all use the same P2P token)
3. Enter amount (e.g., 100 USDT)
4. Click **"Invest & Mint Tokens"**
5. **First time:** You'll need to approve USDT
   - Approve in wallet
   - Click **"Invest & Mint Tokens"** again
6. Confirm minting transaction in wallet
7. **Wait for confirmation**

**Expected Result:**
- ✅ USDT balance decreases (e.g., 1000 → 900)
- ✅ P2P token balance increases (e.g., 0 → 100)

### Step 3: Test Redemption (P2P → USDT)
1. Still on product detail page
2. Click **"Withdraw"** tab
3. Enter P2P token amount (e.g., 50)
4. Click **"Burn Tokens & Withdraw"**
5. Confirm burn transaction in wallet
6. **Wait for confirmation**

**Expected Result:**
- ✅ P2P token balance decreases (e.g., 100 → 50)
- ✅ USDT balance increases (e.g., 900 → 950)

---

## ✅ SUCCESS CHECKLIST

After testing, verify:
- [ ] Can invest in ANY product
- [ ] USDT balance goes down when investing
- [ ] P2P token balance goes up after investment
- [ ] Can withdraw/redeem P2P tokens
- [ ] P2P token balance goes down when redeeming
- [ ] USDT balance goes up after redemption
- [ ] Transaction shows on Mantle Sepolia Explorer

---

## 🔍 How to Check Balances

### In the App:
- **USDT Balance:** Shows in "Investment Amount" section
- **P2P Balance:** Shows in "Tokens to Burn" section

### On Blockchain:
Visit Mantle Sepolia Explorer: https://sepolia.mantlescan.xyz/

**Check USDT Balance:**
```
https://sepolia.mantlescan.xyz/address/YOUR_WALLET_ADDRESS
```

**Check P2P Token Balance:**
```
https://sepolia.mantlescan.xyz/token/0x7A968ba34b0F7eE9eb2Fb8e5C97267626757ffA1?a=YOUR_WALLET_ADDRESS
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Connect Wallet" button doesn't work
**Solution:** Make sure you're on Mantle Sepolia network

### Issue: No USDT balance showing
**Solution:**
1. Verify you have USDT in your wallet
2. Check you're on the correct network
3. Try refreshing the page

### Issue: Transaction fails
**Solution:**
1. Make sure you have enough USDT
2. Check if you approved USDT first (for investment)
3. Make sure you have enough P2P tokens (for redemption)

### Issue: Approval needed every time
**Solution:** This is normal. After first approval, subsequent investments should work directly.

---

## 📊 Example Test Scenario

**Starting Balances:**
- USDT: 1000
- P2P: 0

**Action 1:** Invest 100 USDT in "Green Valley Farms"
- Result: USDT: 900, P2P: 100

**Action 2:** Invest 50 USDT in "Ocean Harvest Co."
- Result: USDT: 850, P2P: 150

**Action 3:** Redeem 75 P2P tokens from "Timber Works Ltd"
- Result: USDT: 925, P2P: 75

**Final Balances:**
- USDT: 925
- P2P: 75

---

## 🎉 You're Done!

If all steps work, your investment system is **fully functional** on testnet!

**Next steps** (optional):
- Deploy separate P2P tokens for each product
- Add interest distribution
- Build transaction history
- Add backend/database
