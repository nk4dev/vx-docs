---
sidebar_position: 2
---

# nk4dev/vx User Guide

This page provides the quickest way to learn the basics of using `@nk4dev/vx`.

## Overview

`vx` is a toolkit for Web3 development. Its main features include:

- Multi-chain support (ethers.js v6)
- Wallet management
- Local development server
- Hardhat setup
- Obtaining gas information
- Managing RPC settings

## Prerequisites

- Node.js 18 or higher
- npm / pnpm / yarn (or any one of them)

## Installation

### Using as a global CLI

```bash
npm install -g @nk4dev/vx
```

### Add as a dependency to your project

```bash
npm install @nk4dev/vx
```

### One-off execution (no installation required)

```bash
npx vx3 <command>
```

## Basic CLI commands

```bash
vx3 create
vx3 rpc init
vx3 serve --debug
vx3 gas
vx3 setup hardhat
```

`pay` Example of sending money via command:

```powershell
$env:PRIVATE_KEY='0x...'
vx3 pay 0xRecipientAddress 0.01 --rpc http://127.0.0.1:8545
```

## Using the SDK from code

### TypeScript / ESM

```ts
import vx from '@nk4dev/vx';

const rpc = vx.getRpcUrl();
const block = await vx.getBlockNumber(rpc);
const gas = await vx.getGasFees(rpc);
```

### CommonJS

```js
const vx = require('@nk4dev/vx').default;
vx.getGasFees('http://127.0.0.1:8545').then(console.log);
```

## Sending Payments Programmatically

```ts
import vx from '@nk4dev/vx';

await vx.payment.sendPayment({
rpcUrl: 'http://127.0.0.1:8545',
privateKey: process.env.PRIVATE_KEY!,
to: '0xRecipientAddress',
amountEth: '0.01',
});
```

## Generate a React Component

```bash
npx vx3 generate component Payment --framework react
```

Integrate the generated component into React/Next.js as needed.