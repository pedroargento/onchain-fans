# onchain-fans
Decentralized image selling utilizing Cartesi Coprocessor.

## **The Solution**  

This dApp was created for the Cartesi Coprocessor experiment week allows users to sell a blurred version of an image, upload it to a smart contract, and reveal the original image once a target number of sales is reached.  

---

## **The Problem It Solves**  

In digital content sales, ensuring fair distribution and incentivizing purchases can be challenging. Current models often struggle with:  

- **Pre-sale Trust Issues**: Buyers may be hesitant to purchase digital content without assurance of receiving the full-quality version.  
- **Lack of Transparency**: Creators have no verifiable way to prove that the full version of an asset will be released after a specific condition is met.  
- **Centralized Content Control**: Traditional platforms require intermediaries to manage digital content sales and distribution.  

---

## **What People Can Use It For**  

The solution provides a **trustless** and **decentralized** way to sell digital content based on **community-driven incentives**.  

- **Artists & Content Creators** can sell digital art, images, or exclusive content while ensuring that buyers collectively unlock the full-quality version once a pre-set goal is met.  
- **Crowdsourced Unlocking of Content** allows multiple buyers to contribute towards a goal instead of relying on a single purchase.  
- **Blockchain-Based Transparency** guarantees that the original image will only be revealed after reaching the required sales threshold.  
- **Decentralized Monetization** provides a censorship-resistant way for creators to distribute digital content without relying on centralized platforms.  

---

## **How It Makes Existing Tasks Easier & Safer**  

- ✅ **Incentivized Sales**: Buyers are more likely to participate when they see clear conditions for unlocking the full image.  
- ✅ **Trustless Mechanism**: Smart contracts enforce the rules, eliminating the need for third-party trust.  
- ✅ **Proof of Purchase**: Buyers have on-chain records of their purchases, ensuring transparency.  
- ✅ **No Middlemen**: Reduces fees and risks associated with centralized platforms controlling digital sales.

---

## Running the Solution

Starting the Backend:
cd into server directory (/onchain-fans)
```bash
cartesi-coprocessor start-devnet
cartesi-coprocessor pubish --network devnet
```

Copy the machine hash gotten after publishing the coprocessor program
```bash
cartesi-coprocessor address-book
```

cd into the `contracts/src` directory
```bash
cartesi-coprocessor deploy --contract-name OnchainFans --network devnet --constructor-args <task_issuer_address> <Machine Hash>
```

cd into the frontend folder
```bash
npm install
npm run dev
```
