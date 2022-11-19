import React from 'react'
import { useAccount, useFeeData } from "wagmi"
import campaignContractInfo from '../../../artifacts/contracts/Campaign.sol/Campaign.json'
import campaignContract from '../../../contracts/abi/campaign.json'
import { ethers, ContractFactory } from 'ethers';
import { useSigner } from 'wagmi'



function TestPage() {

    const { address } = useAccount()
    const { data: signer } = useSigner()


    const startDate = Math.floor(new Date().getTime() / 1000);
    const endDate = startDate + 100000;
    const amount = ethers.utils.parseUnits("0.01", "ether")

    const deployContract = async () => {
        console.log(signer)
        //@ts-ignore 
        const factory = new ContractFactory(campaignContract.abi, campaignContractInfo.bytecode, signer);
        const contract = await factory.deploy("Campaign", amount, startDate, endDate);
        console.log(contract.address);
        console.log(contract.deployTransaction);
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <button className='btn btn-primary' onClick={deployContract}>Deploy Contract</button>
        </div>
    )
}

export default TestPage