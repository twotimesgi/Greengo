import React from 'react'
import toast from "react-hot-toast"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import contractInfo from "../../../../contracts/abi/campaign.json"

type Props = {
    projectAddress: string
}

function ClaimRefundButton({ projectAddress }: Props) {

    const { config } = usePrepareContractWrite({
        addressOrName: projectAddress,
        contractInterface: JSON.stringify(contractInfo.abi),
        functionName: "getRefund",
    })

    const { writeAsync: claimRefund } = useContractWrite(config)

    const refund = async () => {
        toast.loading("Claiming refund...", {
            id: "refund-toast"
        })
        try {
            await claimRefund?.()
            toast.success("Refund claimed successfully", {
                id: "refund-toast"
            })
        }
        catch (e) {
            toast.error("Failed to claim refund", {
                id: "refund-toast"
            })
        }
    }

    return (
        <button
            className="btn btn-secondary"
            onClick={refund}>Get refunded!
        </button>
    )
}

export default ClaimRefundButton