# FHE Rank - Privacy-Preserving Educational Ranking System

A decentralized application that enables confidential student score management and ranking using Fully Homomorphic Encryption (FHE) powered by Zama's FHEVM protocol. This system allows teachers to upload encrypted student scores and students to view their encrypted rankings without ever exposing sensitive academic data on-chain or to unauthorized parties.

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.27-orange.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.26.0-yellow.svg)](https://hardhat.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple.svg)](https://docs.zama.ai/fhevm)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Advantages](#advantages)
- [Technology Stack](#technology-stack)
- [Problems Solved](#problems-solved)
- [Architecture](#architecture)
- [Smart Contract](#smart-contract)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Overview

FHE Rank is a revolutionary educational technology platform that leverages blockchain and homomorphic encryption to create a transparent yet private system for managing student academic performance. Traditional educational systems face challenges with data privacy, centralized control, and lack of transparency. FHE Rank addresses these issues by storing all student scores and rankings as encrypted data on the blockchain while maintaining the ability to compute rankings without ever decrypting the underlying scores.

### What Makes This Special?

Unlike traditional encrypted systems where data must be decrypted before processing, FHE Rank uses **Fully Homomorphic Encryption (FHE)** which allows mathematical operations (comparisons, rankings) to be performed directly on encrypted data. This means:

- Scores remain encrypted from submission to storage to ranking calculation
- No centralized authority ever sees unencrypted student data
- Students maintain control over who can decrypt and view their scores
- The blockchain provides immutable audit trails and transparency
- Rankings are calculated on-chain using encrypted values

## Key Features

### For Students

- **Self-Score Submission**: Students can submit their own encrypted scores directly to the smart contract
- **Privacy-Preserving Viewing**: View encrypted score and rank data without exposing actual values
- **User-Controlled Decryption**: Only students can authorize decryption of their own data using cryptographic signatures
- **Transparent Rankings**: Verify their position in rankings without revealing actual scores
- **Immutable Records**: All submissions are permanently recorded on blockchain

### For Teachers (Contract Owners)

- **Batch Score Upload**: Efficiently upload multiple student scores in a single transaction
- **Individual Score Management**: Update or submit scores for individual students
- **Student Roster Management**: View all registered students and their participation
- **Gas-Optimized Operations**: Batch operations reduce transaction costs
- **Role-Based Access Control**: Only designated teachers can upload scores

### Technical Features

- **End-to-End Encryption**: Scores encrypted client-side before blockchain submission
- **On-Chain Ranking Calculation**: Rankings computed using FHE operations without decryption
- **Zero-Knowledge Proofs**: Cryptographic proofs validate encrypted inputs without revealing values
- **EIP-712 Signatures**: Secure authorization for decryption requests
- **Real-Time Updates**: Automatic rank recalculation after each score submission
- **Wallet Integration**: RainbowKit support for easy Web3 wallet connection

## Advantages

### 1. Privacy by Design

Traditional educational systems store grades in plaintext databases vulnerable to breaches. FHE Rank ensures:

- **Encrypted Storage**: All scores stored as `euint32` encrypted integers on-chain
- **No Plaintext Exposure**: Data never decrypted during ranking calculations
- **Student Consent**: Decryption only possible with student's cryptographic signature
- **Selective Disclosure**: Students control who can view their actual scores

### 2. Decentralization & Transparency

- **Immutable Records**: Blockchain guarantees tamper-proof academic records
- **Transparent Operations**: All score submissions and ranking updates publicly verifiable
- **No Single Point of Failure**: Distributed blockchain eliminates centralized database risks
- **Trustless System**: Smart contract logic eliminates need to trust administrators

### 3. Advanced Cryptography

- **Homomorphic Encryption**: Perform computations on encrypted data without decryption
- **Quantum-Resistant**: FHE provides security against future quantum computing threats
- **Zero-Knowledge Proofs**: Validate data integrity without revealing content
- **Cryptographic Access Control**: FHEVM's allowance system controls data access

### 4. Developer-Friendly Architecture

- **Modern Tech Stack**: React 19, TypeScript, Vite, Hardhat
- **Type Safety**: Full TypeScript implementation with TypeChain contract bindings
- **Comprehensive Testing**: Unit tests, integration tests, and testnet validation
- **Modular Design**: Reusable components and custom React hooks
- **Well-Documented**: Inline code comments and external documentation

### 5. Cost-Effective Operations

- **Batch Processing**: Upload multiple scores in single transaction
- **Optimized Gas Usage**: Efficient smart contract design minimizes costs
- **Layer 2 Ready**: Architecture compatible with L2 scaling solutions
- **Testnet Development**: Free Sepolia testnet for development and testing

### 6. User Experience

- **Intuitive Interface**: Clean, responsive React UI
- **Wallet Integration**: One-click wallet connection with RainbowKit
- **Real-Time Feedback**: Loading states and transaction status updates
- **Role-Based UI**: Dynamic interface adapts to user role (student/teacher)
- **Error Handling**: Comprehensive validation and user-friendly error messages

## Technology Stack

### Smart Contract Layer

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Solidity** | 0.8.27 | Smart contract programming language |
| **Hardhat** | 2.26.0 | Development environment and testing framework |
| **FHEVM Solidity** | 0.8.0 | Zama's FHE library for encrypted operations |
| **FHEVM Hardhat Plugin** | 0.1.0 | Hardhat integration for FHE development |
| **Zama FHE Oracle** | 0.1.0 | Decryption oracle for encrypted data |
| **OpenZeppelin Contracts** | 5.1.0 | Secure contract components (Ownable) |
| **TypeChain** | 9.1.0 | TypeScript bindings for contracts |
| **Hardhat Deploy** | 0.13.0 | Deployment management system |

### Frontend Application

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.0.0 | UI framework |
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **Vite** | 7.0.4 | Build tool and dev server |
| **Wagmi** | 2.17.0 | React hooks for Ethereum |
| **Viem** | 2.37.6 | TypeScript Ethereum library |
| **Ethers.js** | 6.15.0 | Contract interaction utilities |
| **RainbowKit** | 2.2.8 | Wallet connection UI |
| **Zama Relayer SDK** | 0.2.0 | FHE decryption client |
| **TanStack Query** | 5.89.0 | Server state management |

### Development Tools

- **ESLint** - Code linting and style enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Mocha & Chai** - Testing frameworks
- **Solidity Coverage** - Code coverage reporting
- **Hardhat Gas Reporter** - Gas usage analysis
- **Etherscan Plugin** - Contract verification

### Infrastructure

- **Sepolia Testnet** - Primary deployment network
- **Infura** - Ethereum RPC provider
- **Zama Relayer** - Decryption service
- **IPFS Ready** - Can store frontend on IPFS

## Problems Solved

### 1. Academic Privacy Breaches

**Problem**: Traditional educational systems store student grades in centralized databases vulnerable to:
- Data breaches exposing sensitive academic records
- Unauthorized access by administrators or hackers
- Privacy violations without student consent
- Permanent exposure of poor academic performance

**Solution**: FHE Rank stores all scores as encrypted data on-chain. Even with full blockchain access, no one can view actual scores without the student's cryptographic authorization. Teachers can manage grades, and rankings can be calculated, all while data remains encrypted.

### 2. Centralized Control & Trust Issues

**Problem**: Students must trust:
- Schools to maintain accurate records
- Administrators not to alter grades
- Centralized systems to remain available
- Single databases not to lose data

**Solution**: Smart contract logic ensures tamper-proof records. All score submissions are permanently recorded with cryptographic proofs. No single authority can alter historical data. The decentralized blockchain ensures 24/7 availability without reliance on any single organization.

### 3. Ranking Transparency vs. Privacy Dilemma

**Problem**: Traditional systems face a dilemma:
- Publishing rankings exposes individual student scores
- Keeping grades private prevents ranking verification
- Students cannot verify their rank without revealing scores
- No way to prove fair ranking calculation

**Solution**: FHE enables encrypted ranking calculations. Students can verify their rank position through encrypted comparisons without exposing actual scores. The smart contract performs ranking logic transparently on-chain, but operates on encrypted values.

### 4. Data Portability & Ownership

**Problem**: Students don't truly own their academic records:
- Records locked in proprietary school systems
- Difficult to transfer between institutions
- No student control over data sharing
- Vendor lock-in with educational software

**Solution**: Blockchain-based records are permanently accessible and portable. Students control decryption keys and can selectively share verified records with future employers or educational institutions. The open standard enables easy integration with other systems.

### 5. Batch Processing Efficiency

**Problem**: Processing grades for large classes:
- Individual database updates are time-consuming
- Risk of partial failures leaving inconsistent state
- High administrative overhead
- Difficult to audit bulk operations

**Solution**: Smart contract's `batchSubmitScores` function processes multiple student records in a single atomic transaction. Either all scores are recorded successfully, or none are, ensuring data consistency. Gas optimization reduces transaction costs.

### 6. Audit Trail & Accountability

**Problem**: Traditional systems lack:
- Immutable audit logs of grade changes
- Cryptographic proof of submission time
- Transparent history of updates
- Non-repudiation guarantees

**Solution**: Every interaction with the smart contract is permanently recorded on blockchain with:
- Cryptographic timestamps
- Immutable transaction history
- Public verifiability of all operations
- Non-repudiable cryptographic signatures

### 7. Cross-Institution Verification

**Problem**: Verifying academic credentials requires:
- Contacting issuing institutions
- Trusting self-reported grades
- Vulnerable to diploma mills
- Time-consuming verification processes

**Solution**: Blockchain-based records provide:
- Instant cryptographic verification
- Immutable proof of academic achievement
- Decentralized trust without contacting schools
- Integration potential with credential verification systems

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Student    │  │   Teacher    │  │    Rank      │     │
│  │ Submission   │  │    Panel     │  │   Viewer     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Web3 Integration Layer                    │
│     Wagmi + Viem + RainbowKit + Zama Relayer SDK           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Ethereum Blockchain (Sepolia)               │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         EncryptedRanking Smart Contract             │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │    Storage: euint32 scores & ranks          │  │   │
│  │  │    mapping(address => StudentRecord)         │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │    Functions:                                 │  │   │
│  │  │    - submitMyScore()                         │  │   │
│  │  │    - submitScoreFor()                        │  │   │
│  │  │    - batchSubmitScores()                     │  │   │
│  │  │    - getEncryptedScore()                     │  │   │
│  │  │    - getEncryptedRank()                      │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Zama FHE Infrastructure                  │
│     - FHEVM Protocol (On-chain FHE operations)              │
│     - Zama Relayer (Decryption oracle)                      │
│     - Cryptographic Gateway                                  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Score Submission Flow

1. **Student Input**: User enters score in frontend (0-4,294,967,295)
2. **Client-Side Encryption**: Zama SDK encrypts score locally to `euint32`
3. **Generate Proof**: Create zero-knowledge proof of valid encryption
4. **Transaction**: Submit encrypted score + proof to smart contract
5. **On-Chain Storage**: Contract stores encrypted score in mapping
6. **Rank Calculation**: Contract recalculates all ranks using FHE comparison
7. **Event Emission**: Contract emits events for frontend updates
8. **UI Update**: Frontend reflects successful submission

#### Decryption Flow

1. **Request Initiation**: Student clicks "Decrypt" button
2. **Fetch Encrypted Handle**: Retrieve `euint32` handle from contract
3. **EIP-712 Signature**: User signs decryption authorization message
4. **Relayer Request**: Submit handle + signature to Zama Relayer
5. **Cryptographic Verification**: Relayer validates signature and permissions
6. **Decryption**: Relayer decrypts value using Zama infrastructure
7. **Return Result**: Decrypted plaintext returned to frontend
8. **Display**: Show actual score/rank to user

#### Batch Upload Flow (Teacher)

1. **Form Input**: Teacher enters multiple student addresses and scores
2. **Validation**: Frontend validates all addresses and score ranges
3. **Batch Encryption**: Encrypt all scores locally with single proof
4. **Transaction**: Submit arrays to `batchSubmitScores()`
5. **Atomic Processing**: Contract processes all records in single transaction
6. **Rank Recalculation**: Recalculate ranks once after all insertions
7. **Event Batch**: Emit events for all processed students
8. **Confirmation**: Frontend shows success with student count

### Security Model

#### Access Control Layers

1. **Smart Contract Level**:
   - `onlyOwner` modifier restricts teacher functions
   - Student functions validate `msg.sender` matches student address
   - FHEVM allowance system controls encrypted data access

2. **Cryptographic Level**:
   - Zero-knowledge proofs validate encrypted inputs
   - EIP-712 signatures authorize decryption requests
   - FHE ensures data privacy during computation

3. **Application Level**:
   - Frontend validates inputs before encryption
   - Wallet signatures required for all transactions
   - Role-based UI prevents unauthorized function access

## Smart Contract

### Contract: `EncryptedRanking.sol`

Location: `contracts/EncryptedRanking.sol`

#### Core Data Structures

```solidity
struct StudentRecord {
    euint32 score;    // Encrypted score (0 to 4,294,967,295)
    euint32 rank;     // Encrypted rank position
    bool exists;      // Existence flag
}

mapping(address => StudentRecord) public records;
address[] private studentAddresses;
```

#### Key Functions

##### Student Functions

**`submitMyScore(externalEuint32 encryptedScore, bytes calldata inputProof)`**
- Allows students to submit their own encrypted scores
- Validates the encrypted input using zero-knowledge proof
- Automatically recalculates all rankings
- Emits `ScoreUpdated` event
- Access: Any student (caller becomes student address)

##### Teacher Functions (Owner Only)

**`submitScoreFor(address student, externalEuint32 encryptedScore, bytes calldata inputProof)`**
- Teacher uploads single student score
- Used for individual updates or corrections
- Recalculates rankings after update
- Emits `ScoreUpdated` event
- Access: Contract owner only

**`batchSubmitScores(address[] calldata students, externalEuint32[] calldata encryptedScores, bytes calldata inputProof)`**
- Efficiently upload multiple student scores in one transaction
- Validates array lengths match
- Processes all students atomically
- Single rank recalculation after all insertions
- Emits `ScoreUpdated` for each student
- Access: Contract owner only

##### View Functions

**`getEncryptedScore(address student) → euint32`**
- Returns encrypted score handle for a student
- Requires student record exists
- Can be decrypted via Zama Relayer

**`getEncryptedRank(address student) → euint32`**
- Returns encrypted rank handle for a student
- Rank automatically updated when any score changes

**`hasScore(address student) → bool`**
- Check if student has submitted a score
- Used for conditional UI rendering

**`getStudents() → address[]`**
- Returns array of all registered student addresses
- Used by teacher panel to show roster

#### Internal Functions

**`_recalculateRanks()`**
- Computes rankings for all students using FHE comparison
- Uses `FHE.gt()` (greater than) to compare encrypted scores
- Rank = 1 + count(scores > my_score)
- Operates entirely on encrypted data
- Called automatically after score submissions

**`_addStudent(address student)`**
- Adds student to tracking array if not exists
- Ensures each student appears only once

#### Events

```solidity
event ScoreUpdated(address indexed student, euint32 encryptedScore, euint32 encryptedRank);
```

#### Security Features

1. **Ownable Pattern**: Uses OpenZeppelin's `Ownable` for teacher access control
2. **Input Validation**: Checks array lengths and record existence
3. **Cryptographic Proofs**: Validates all encrypted inputs with proofs
4. **Access Permissions**: `FHE.allowThis()` and `FHE.allow()` control data access
5. **Reentrancy Safety**: No external calls during state changes

#### Gas Optimization

- Batch processing reduces transaction count
- Single rank recalculation after batch operations
- Efficient array storage for student tracking
- Memory usage optimized in loops

## Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 10 or higher (or yarn/pnpm)
- **Git**: For cloning the repository
- **Wallet**: MetaMask or compatible Web3 wallet
- **Sepolia ETH**: For testnet deployment and transactions

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fhe-rank.git
   cd fhe-rank
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd app
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Private key for contract deployment (no 0x prefix)
   PRIVATE_KEY=your_private_key_here

   # Infura API key for Ethereum RPC access
   INFURA_API_KEY=your_infura_api_key

   # Etherscan API key for contract verification
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

   Create a `.env` file in the `app/` directory:

   ```bash
   # Deployed contract address
   VITE_ENCRYPTED_RANKING_ADDRESS=0xYourContractAddress

   # WalletConnect project ID (optional)
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

5. **Compile smart contracts**

   ```bash
   npm run compile
   ```

### Quick Start for Development

1. **Start local Hardhat node** (Terminal 1)

   ```bash
   npx hardhat node
   ```

2. **Deploy contracts to local network** (Terminal 2)

   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Update frontend contract address**

   Copy the deployed contract address and update `app/.env`:

   ```bash
   VITE_ENCRYPTED_RANKING_ADDRESS=0xLocalContractAddress
   ```

4. **Start frontend development server** (Terminal 3)

   ```bash
   cd app
   npm run dev
   ```

5. **Access the application**

   Open browser to `http://localhost:5173`

### Deployment to Sepolia Testnet

1. **Get Sepolia ETH**

   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Request testnet ETH for your deployment wallet

2. **Deploy contract**

   ```bash
   npm run deploy:sepolia
   ```

3. **Verify contract on Etherscan** (optional)

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

4. **Update frontend configuration**

   Update `app/.env` with deployed address:

   ```bash
   VITE_ENCRYPTED_RANKING_ADDRESS=0xYourSepoliaContractAddress
   ```

5. **Build and deploy frontend**

   ```bash
   cd app
   npm run build
   # Deploy dist/ folder to hosting service (Vercel, Netlify, etc.)
   ```

## Usage

### For Students

#### Submit Your Score

1. **Connect Wallet**: Click "Connect Wallet" and approve connection
2. **Navigate**: Go to "Submit Score" tab
3. **Enter Score**: Input your score (0-4,294,967,295)
4. **Submit**: Click "Submit Score" button
5. **Sign Transaction**: Approve the transaction in your wallet
6. **Wait**: Transaction processes and score is encrypted on-chain
7. **Confirmation**: Success message appears when complete

#### View Your Rank

1. **Navigate**: Go to "View Rank" tab
2. **View Encrypted**: See your encrypted score and rank handles
3. **Decrypt** (optional):
   - Click "Decrypt Score" or "Decrypt Rank"
   - Sign EIP-712 message to authorize decryption
   - Wait for Zama Relayer to process request
   - View your actual score/rank

### For Teachers (Contract Owners)

#### Upload Batch Scores

1. **Connect Owner Wallet**: Connect the wallet used to deploy the contract
2. **Navigate**: "Teacher Console" tab appears automatically
3. **Enter Data**:
   - Fill in student addresses (Ethereum addresses)
   - Enter corresponding scores
4. **Add Rows**: Click "+ Add Row" for more students
5. **Submit Batch**: Click "Submit Batch Scores"
6. **Sign Transaction**: Approve the transaction
7. **Wait**: All scores processed in single transaction
8. **Confirmation**: Success message shows number of students updated

#### Update Individual Score

1. **Navigate**: Go to "Teacher Console" tab
2. **Use Single Entry**: Can also use batch form with single row
3. **Alternative**: Use Hardhat task CLI for individual updates

   ```bash
   npx hardhat task:submit-score --student 0xStudentAddress --score 95 --network sepolia
   ```

### CLI Tasks (Hardhat)

#### Get Deployed Contract Address

```bash
npx hardhat task:address --network sepolia
```

#### List All Students

```bash
npx hardhat task:get-students --network sepolia
```

#### Submit Score (CLI)

```bash
npx hardhat task:submit-score \
  --student 0x1234567890123456789012345678901234567890 \
  --score 95 \
  --network sepolia
```

#### Decrypt Score (CLI)

```bash
npx hardhat task:decrypt-score \
  --student 0x1234567890123456789012345678901234567890 \
  --network sepolia
```

#### Decrypt Rank (CLI)

```bash
npx hardhat task:decrypt-rank \
  --student 0x1234567890123456789012345678901234567890 \
  --network sepolia
```

## Project Structure

```
fhe-rank/
├── contracts/                      # Smart contracts
│   └── EncryptedRanking.sol       # Main ranking contract
│
├── deploy/                         # Deployment scripts
│   └── deploy.ts                  # Hardhat deploy script
│
├── tasks/                          # Custom Hardhat tasks
│   ├── accounts.ts                # Account management
│   └── EncryptedRanking.ts        # Contract interaction tasks
│
├── test/                           # Test files
│   ├── EncryptedRanking.ts        # Local unit tests
│   └── EncryptedRankingSepolia.ts # Sepolia integration tests
│
├── types/                          # TypeChain generated types
│   └── contracts/                 # Contract type definitions
│
├── app/                            # React frontend application
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   ├── RankingApp.tsx     # Main app container
│   │   │   ├── RankViewer.tsx     # Score/rank viewer
│   │   │   ├── ScoreSubmission.tsx # Student submission form
│   │   │   └── TeacherPanel.tsx   # Batch upload interface
│   │   │
│   │   ├── config/                # Configuration files
│   │   │   ├── contracts.ts       # Contract ABI and address
│   │   │   └── wagmi.ts           # Wagmi/RainbowKit config
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useZamaInstance.ts # FHE instance management
│   │   │   └── useEthersSigner.ts # Ethers.js integration
│   │   │
│   │   ├── styles/                # CSS stylesheets
│   │   │   ├── App.css           # Main app styles
│   │   │   ├── Header.css        # Header styles
│   │   │   ├── RankViewer.css    # Rank viewer styles
│   │   │   ├── ScoreSubmission.css # Submission form styles
│   │   │   └── TeacherPanel.css  # Teacher panel styles
│   │   │
│   │   ├── main.tsx               # App entry point
│   │   └── App.tsx                # Root component
│   │
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   └── vite.config.ts             # Vite configuration
│
├── docs/                           # Documentation
│   ├── zama_doc_relayer.md        # Zama Relayer docs
│   └── zama_llm.md                # Zama FHE docs
│
├── hardhat.config.ts               # Hardhat configuration
├── package.json                    # Root dependencies
├── tsconfig.json                   # TypeScript configuration
├── .gitignore                      # Git ignore rules
├── .env                            # Environment variables (not in git)
└── README.md                       # This file
```

### Key Directories Explained

- **`contracts/`**: Solidity smart contracts with FHE operations
- **`deploy/`**: Hardhat-deploy scripts for automated deployment
- **`tasks/`**: Custom CLI commands for contract interaction
- **`test/`**: Comprehensive test suites (local + testnet)
- **`app/src/components/`**: Modular React UI components
- **`app/src/hooks/`**: Reusable React hooks for Web3 and FHE
- **`app/src/config/`**: Centralized configuration management
- **`types/`**: Auto-generated TypeScript types from contracts

## Testing

### Local Unit Tests

Run tests on local Hardhat network with mocked FHE:

```bash
npm run test
```

Test suite includes:
- Student self-score submission
- Teacher score submission for students
- Batch score uploads
- Rank calculation verification
- Access control testing
- Edge case validation

### Sepolia Integration Tests

Test on live Sepolia testnet with real Zama infrastructure:

```bash
npm run test:sepolia
```

Sepolia tests validate:
- Real FHE encryption/decryption
- Zama Relayer integration
- Live blockchain interaction
- End-to-end workflows

### Code Coverage

Generate coverage report:

```bash
npm run coverage
```

View coverage report in `coverage/index.html`

### Gas Usage Analysis

View gas costs for all functions:

```bash
npm run test
# Gas reporter output appears in terminal
```

### Test Structure

#### Local Tests (`test/EncryptedRanking.ts`)

```typescript
describe("EncryptedRanking", () => {
  describe("Batch Score Submission", () => {
    it("should allow owner to submit batch scores and calculate ranks");
    it("should reject non-owner batch submissions");
  });

  describe("Student Self-Submission", () => {
    it("should allow students to submit their own scores");
    it("should update rank after student submission");
  });

  describe("Teacher Single Submission", () => {
    it("should allow owner to update individual student scores");
  });
});
```

#### Sepolia Tests (`test/EncryptedRankingSepolia.ts`)

```typescript
describe("EncryptedRanking on Sepolia", () => {
  it("should deploy and initialize contract");
  it("should submit encrypted score and verify on-chain");
  it("should decrypt score using Zama Relayer");
  it("should calculate and decrypt rank");
});
```

### Manual Testing Checklist

Frontend testing checklist:

- [ ] Wallet connects successfully
- [ ] Student can submit score
- [ ] Transaction confirmation appears
- [ ] Encrypted handles display correctly
- [ ] Decryption button triggers signature
- [ ] Decrypted values appear correctly
- [ ] Teacher panel shows for owner
- [ ] Batch upload processes multiple students
- [ ] Error messages display appropriately
- [ ] Loading states show during transactions

## Deployment

### Local Development Deployment

1. **Start local node**:
   ```bash
   npx hardhat node
   ```

2. **Deploy to local network**:
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Interact via console**:
   ```bash
   npx hardhat console --network localhost
   ```

### Sepolia Testnet Deployment

#### Prerequisites

- Sepolia ETH in deployment wallet
- Infura API key configured
- Environment variables set

#### Deployment Steps

1. **Compile contracts**:
   ```bash
   npm run compile
   ```

2. **Deploy to Sepolia**:
   ```bash
   npm run deploy:sepolia
   ```

3. **Note contract address** from deployment output

4. **Verify on Etherscan** (optional):
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

#### Update Frontend Configuration

Edit `app/.env`:

```bash
VITE_ENCRYPTED_RANKING_ADDRESS=0xYourDeployedContractAddress
```

#### Deploy Frontend

**Option 1: Vercel**

```bash
cd app
npm run build
# Deploy dist/ folder to Vercel
```

**Option 2: Netlify**

```bash
cd app
npm run build
netlify deploy --prod --dir=dist
```

**Option 3: IPFS**

```bash
cd app
npm run build
# Upload dist/ folder to IPFS via Pinata or similar
```

### Mainnet Deployment (Future)

Currently configured for Sepolia testnet. For mainnet deployment:

1. **Update `hardhat.config.ts`** with mainnet configuration
2. **Audit smart contracts** professionally
3. **Test extensively** on testnet
4. **Prepare deployment wallet** with sufficient ETH
5. **Deploy with caution** - mainnet transactions are irreversible
6. **Monitor contract** after deployment

### Deployment Scripts

Custom deployment script with detailed logging:

```typescript
// deploy/deploy.ts
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployment = await deploy("EncryptedRanking", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`EncryptedRanking deployed to: ${deployment.address}`);
};
```

## Future Roadmap

### Phase 1: Core Enhancements (Q2 2025)

#### 1.1 Advanced Grading Features
- **Weighted Scores**: Support multiple assignment categories with different weights
- **Grade Curves**: Apply grade curves to encrypted distributions
- **Percentile Calculations**: Show student's percentile rank
- **Historical Tracking**: Track score progression over time
- **GPA Calculation**: Compute encrypted cumulative GPA

#### 1.2 Multi-Course Support
- **Course Management**: Create and manage multiple courses per contract
- **Cross-Course Rankings**: Compare performance across different subjects
- **Semester Isolation**: Separate data by academic terms
- **Course Registration**: Students enroll in specific courses
- **Course Metadata**: Store course names, descriptions, instructors

#### 1.3 Enhanced Privacy Controls
- **Anonymous Rankings**: Show rankings without revealing identities
- **Selective Disclosure**: Share specific scores with designated parties
- **Parent Access**: Controlled access for guardians with student consent
- **Time-Locked Grades**: Automatic grade release at specified times
- **Privacy Policies**: Student-configurable privacy settings

### Phase 2: Scalability & Performance (Q3 2025)

#### 2.1 Layer 2 Integration
- **Optimistic Rollups**: Deploy to Arbitrum or Optimism
- **ZK-Rollups**: Explore zkSync or StarkNet integration
- **Gas Optimization**: Reduce transaction costs 10x
- **Throughput Increase**: Handle 100x more students per contract
- **Cross-Chain Bridge**: Support multiple blockchain networks

#### 2.2 Efficient Data Structures
- **Merkle Trees**: Efficient proof of grade inclusion
- **Packed Storage**: Compress on-chain storage requirements
- **Lazy Rank Calculation**: Calculate ranks only when requested
- **Incremental Updates**: Update only affected ranks
- **Batch Optimizations**: Further optimize batch operations

#### 2.3 Caching & Indexing
- **The Graph Integration**: Index blockchain events for fast queries
- **Off-Chain Indexer**: Fast historical data retrieval
- **Frontend Caching**: Reduce redundant blockchain calls
- **Event Subscriptions**: Real-time updates via WebSocket

### Phase 3: Advanced Features (Q4 2025)

#### 3.1 Collaborative Features
- **Peer Assessment**: Encrypted peer grading system
- **Group Projects**: Shared scores for team assignments
- **Discussion Forums**: Link grades to course discussions
- **Study Groups**: Private encrypted study groups
- **Leaderboards**: Optional public leaderboards with consent

#### 3.2 Analytics & Insights
- **Performance Dashboard**: Visual analytics for students
- **Class Statistics**: Encrypted aggregate statistics for teachers
- **Trend Analysis**: Identify improving/declining performance
- **Predictive Models**: AI-powered grade predictions (privacy-preserving)
- **Comparative Analysis**: Compare performance across cohorts

#### 3.3 Credential System
- **NFT Certificates**: Mint NFTs for grade achievements
- **Verifiable Credentials**: W3C Verifiable Credentials standard
- **Diploma Issuance**: Blockchain-based diploma verification
- **Skill Badges**: Granular skill achievement tokens
- **Transcript Generation**: Exportable blockchain transcripts

### Phase 4: Ecosystem Expansion (2026)

#### 4.1 Third-Party Integrations
- **LMS Integration**: Connect with Canvas, Blackboard, Moodle
- **SIS Integration**: Sync with Student Information Systems
- **HR Platforms**: Direct integration with job application platforms
- **University Systems**: Partnership with academic institutions
- **API Gateway**: RESTful API for external integrations

#### 4.2 Mobile Applications
- **iOS App**: Native iOS application
- **Android App**: Native Android application
- **Push Notifications**: Grade update notifications
- **Offline Support**: View cached grades offline
- **Biometric Security**: Fingerprint/Face ID for decryption

#### 4.3 Advanced Cryptography
- **Multi-Party Computation**: Collaborative computation on encrypted data
- **Threshold Encryption**: Require multiple parties for decryption
- **Zero-Knowledge Proofs**: Prove grade ranges without revealing exact scores
- **Secure Enclaves**: Hardware-based security for key management
- **Post-Quantum Cryptography**: Future-proof encryption schemes

### Phase 5: Governance & Sustainability (2026+)

#### 5.1 Decentralized Governance
- **DAO Formation**: Community-governed protocol development
- **Governance Tokens**: Token-based voting on upgrades
- **Proposal System**: Community feature requests
- **Treasury Management**: Transparent funding allocation
- **Protocol Upgrades**: Community-approved smart contract upgrades

#### 5.2 Sustainability Model
- **Fee Structure**: Sustainable transaction fee model
- **Institutional Licensing**: Paid licenses for universities
- **Premium Features**: Optional paid advanced features
- **Grant Programs**: Funding for educational institutions
- **Open Source Sustainability**: Balance open source with revenue

#### 5.3 Academic Partnerships
- **Pilot Programs**: Partner with schools for beta testing
- **Research Collaborations**: Academic research on FHE education
- **Standardization**: Work toward industry standards
- **Accreditation**: Seek educational accreditation recognition
- **Global Expansion**: Multi-language, multi-region support

### Research & Development Goals

#### Short-Term R&D
- Optimize FHE operation gas costs
- Explore alternative FHE schemes
- Improve decryption latency
- Enhance user experience flows
- Security audit and penetration testing

#### Long-Term R&D
- Fully on-chain AI model training on encrypted grades
- Quantum-resistant cryptographic protocols
- Cross-chain identity management
- Decentralized storage integration (Filecoin, Arweave)
- Homomorphic machine learning for grade prediction

### Community & Adoption Goals

- **10,000+ Students**: Onboard 10,000 students by end of 2025
- **100+ Institutions**: Partner with 100 educational institutions
- **Open Source Community**: Build active contributor community
- **Educational Resources**: Comprehensive tutorials and documentation
- **Developer Grants**: Fund developers building on platform

### Success Metrics

- Transaction volume and user growth
- Gas cost reduction percentage
- Decryption latency improvements
- User satisfaction scores
- Academic institution adoption rate
- Developer ecosystem growth
- Smart contract security audit results

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or reporting issues, your help makes FHE Rank better.

### How to Contribute

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/fhe-rank.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: description of your feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for review and feedback

### Contribution Guidelines

#### Code Style

- **TypeScript**: Use strict TypeScript with proper types
- **Solidity**: Follow Solidity style guide and best practices
- **Comments**: Write clear, concise comments for complex logic
- **Naming**: Use descriptive variable and function names
- **Formatting**: Run linter before committing

#### Testing Requirements

- All new features must include tests
- Maintain or improve code coverage
- Test both success and failure cases
- Include integration tests for complex features

#### Documentation

- Update README.md for user-facing changes
- Add inline code comments for complex logic
- Update JSDoc/NatSpec documentation
- Include examples for new features

#### Security

- Never commit private keys or sensitive data
- Report security vulnerabilities privately
- Follow secure coding best practices
- Request security review for cryptographic changes

### Areas for Contribution

We especially welcome contributions in:

- **Smart Contract Optimizations**: Gas reduction, efficiency improvements
- **Frontend UX**: UI/UX enhancements, accessibility
- **Testing**: Additional test coverage, edge cases
- **Documentation**: Tutorials, examples, translations
- **Bug Fixes**: Issue resolution, error handling
- **Performance**: Speed improvements, optimization
- **Security**: Audits, vulnerability fixes

### Reporting Issues

Found a bug or have a suggestion? Please create an issue:

1. Check if issue already exists
2. Use issue templates
3. Provide detailed description
4. Include reproduction steps
5. Add relevant logs/screenshots

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on collaboration
- Maintain professional communication

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

### What This Means

- ✅ **Commercial Use**: Can be used in commercial applications
- ✅ **Modification**: Can modify the source code
- ✅ **Distribution**: Can distribute the software
- ✅ **Private Use**: Can use privately
- ❌ **Patent Grant**: Does NOT grant patent rights
- ⚠️ **Liability**: No liability or warranty provided
- ⚠️ **Attribution**: Must include copyright notice and license

### License Text

```
Copyright (c) 2025, FHE Rank Contributors
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted (subject to the limitations in the disclaimer
below) provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its contributors
  may be used to endorse or promote products derived from this software
  without specific prior written permission.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

See [LICENSE](LICENSE) file for full license text.

### Third-Party Licenses

This project uses third-party libraries with their own licenses:

- **Zama FHEVM**: BSD-3-Clause-Clear
- **OpenZeppelin Contracts**: MIT License
- **React**: MIT License
- **Hardhat**: MIT License
- **Ethers.js**: MIT License

See individual `node_modules/` packages for their licenses.

## Support

### Getting Help

#### Documentation

- **Zama FHEVM Docs**: https://docs.zama.ai/fhevm
- **Hardhat Docs**: https://hardhat.org/docs
- **React Docs**: https://react.dev/
- **Wagmi Docs**: https://wagmi.sh/

#### Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/fhe-rank/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/yourusername/fhe-rank/discussions)
- **Zama Discord**: [Join Zama community](https://discord.gg/zama)
- **Email**: support@fhe-rank.example.com (if applicable)

#### FAQ

**Q: Why are transactions failing?**
A: Ensure you have sufficient Sepolia ETH for gas fees. Check that your wallet is connected to Sepolia network.

**Q: How long does decryption take?**
A: Decryption via Zama Relayer typically takes 10-30 seconds depending on network conditions.

**Q: Can I use this on mainnet?**
A: Currently configured for Sepolia testnet. Mainnet deployment requires additional auditing and configuration.

**Q: Are scores really private?**
A: Yes, scores are encrypted end-to-end using FHE. Even blockchain validators cannot see actual score values.

**Q: What's the maximum score value?**
A: Scores use `euint32`, supporting values from 0 to 4,294,967,295.

**Q: Can students change their scores?**
A: Students can resubmit scores, which will update their record. Previous submissions are preserved in blockchain history.

**Q: How are ties handled in rankings?**
A: Students with identical scores receive the same rank. The next rank accounts for the number of tied students.

**Q: Can I fork this for my own use?**
A: Yes! This project is open source under BSD-3-Clause-Clear license. Feel free to fork and customize.

### Professional Support

For institutions or enterprises requiring dedicated support:

- Custom deployment assistance
- Integration consulting
- Security auditing
- Training and onboarding
- SLA-backed support contracts

Contact: enterprise@fhe-rank.example.com (if applicable)

---

## Acknowledgments

### Built With

- **Zama FHEVM**: Groundbreaking fully homomorphic encryption for Ethereum
- **OpenZeppelin**: Secure smart contract libraries
- **Hardhat**: Ethereum development environment
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript

### Inspiration

This project was inspired by:
- Growing concerns about student data privacy
- Advances in homomorphic encryption technology
- The need for transparent yet private educational systems
- Blockchain's potential for immutable record-keeping

### Special Thanks

- **Zama Team**: For developing FHEVM and providing excellent documentation
- **Ethereum Community**: For building the decentralized web
- **Open Source Contributors**: For the amazing tools and libraries

---

**Built with ❤️ for privacy-preserving education**

*FHE Rank - Empowering students with privacy, transparency, and control over their academic data*

---

## Quick Links

- **Live Demo**: [https://fhe-rank-demo.vercel.app](https://fhe-rank-demo.vercel.app) *(example)*
- **Documentation**: [https://docs.fhe-rank.example.com](https://docs.fhe-rank.example.com) *(example)*
- **GitHub**: [https://github.com/yourusername/fhe-rank](https://github.com/yourusername/fhe-rank)
- **Discord**: [Join our community](https://discord.gg/example)
- **Twitter**: [@FHERank](https://twitter.com/example)

---

*Last Updated: 2025-10-18*
