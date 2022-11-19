import React from 'react'
import toast from "react-hot-toast"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import contractInfo from "../../../../contracts/abi/campaign.json"


type Props = {
    projectAddress: string
}

function CollectFundsButton({ projectAddress }: Props) {

    const { config } = usePrepareContractWrite({
        addressOrName: projectAddress,
        contractInterface: JSON.stringify(contractInfo.abi),
        functionName: "claimFunds",
    })

    const { writeAsync: claimFunds } = useContractWrite(config)

    const collect = async () => {
        toast.loading("Collecting funds...", {
            id: "collect-toast"
        })
        try {
            await claimFunds?.()
            toast.success("Funds collected successfully", {
                id: "collect-toast"
            })
        }
        catch (e) {
            toast.error("Failed to collect funds", {
                id: "collect-toast"
            })
        }
    }

    return (
        <button
            className="btn btn-primary"
            onClick={collect}>Collect Funds
        </button>
    )
}

export default CollectFundsButton