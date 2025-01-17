# Soundex: The Decentralized Marketplace for Music Ownership

## Problem Statement
Develop a blockchain-based platform to address the critical challenge of fair royalty distribution in the media and entertainment industry.

## Team Otis

| Name | Email | Contact |
|------|--------|---------|
| Aadi Joshi | aadi.joshi24@vit.edu | 9146010210 |
| Ajaya Nandiyawar | ajaya.nandiyawar24@vit.edu | 8073358383 |

## The Challenge

Current centralized music streaming platforms face several critical issues:

The centralization of control leads to data privacy concerns, potential censorship, and lack of transparency. Artists often struggle with unfair royalty payment structures that don't adequately compensate them for their work. Geographic restrictions and licensing limitations prevent universal access to music. Copyright disputes must be handled through traditional support channels or legal systems, lacking technological solutions.

## Problems in Classical Method:
![image](https://github.com/user-attachments/assets/504b4d43-2568-4315-9ad6-c120dbb2795b)

## Solution Overview

Soundex revolutionizes music distribution through blockchain technology, providing:

- A transparent and equitable revenue sharing model ensuring fair artist compensation
- Direct artist control over music rights without label dependency
- User rewards for platform engagement
- Blockchain-secured privacy and data protection

## Key Features of Soundex
![image](https://github.com/user-attachments/assets/e4bdeaea-a575-4a96-a876-13b522647f93)

## Technical Architecture

### Technology Stack

**Frontend**
- Framework: React
- Build Tool: Webpack

**Backend**
- Smart Contracts: Solidity
- Blockchain Platform: Ethereum
- Development Framework: Truffle
- Deployment: Pinata

**Storage**
- Off-chain Storage: IPFS
- Service: NFT.Storage

**Wallet**
- Integration: MetaMask

### Key Implementation Features

1. **Smart Contract Price Adjustment**
   - Dynamic pricing system based on community engagement
   - Automated value adjustment based on popularity metrics

2. **Hybrid Storage Architecture**
   - IPFS for decentralized song storage
   - Blockchain for transaction and ownership records

3. **Real-time MetaMask Integration**
   - Seamless wallet connectivity
   - Responsive user interface for transactions

4. **Artist-Centric Economics**
   - Direct artist support through purchases
   - Integrated donation system

### API Integration

1. **IPFS**
   - Purpose: Decentralized file storage
   - Key Method: `ipfsClient.put([file])` for content storage and CID generation

2. **Pinata**
   - Purpose: IPFS and blockchain connectivity
   - Features: Streamlined file management and retrieval

3. **React Toastify**
   - Purpose: User notification system
   - Methods: `toast.success()` and `toast.error()` for real-time feedback

## User/Backend/Blockchain Flow Diagram
![image](https://github.com/user-attachments/assets/ad3021b2-e62b-4287-8302-3e5962f9a4d4)

## Project Access

Repository: [https://github.com/aadi-joshi/soundex](https://github.com/aadi-joshi/soundex)

The platform combines these technologies to create a transparent, fair, and efficient marketplace for music ownership and distribution, directly addressing the challenges in current royalty distribution systems.
