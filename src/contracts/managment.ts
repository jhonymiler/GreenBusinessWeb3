import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import GreenSealPlatform from '../../build/contracts/GreenSealPlatform.json';

const platformAddress = process.env.NEXT_PUBLIC_CONTRACT_PLATFORM as `0x${string}`;

export function useContractPlatform(method: string, args: unknown[] = []) {
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract()

  const submit = async (): Promise<void> => {
    writeContract({
      address: platformAddress,
      abi: GreenSealPlatform.abi,
      functionName: method,
      args: args,
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed, error } =
    useWaitForTransactionReceipt({
      hash,
    })

    if (error) {
      console.error(error)
    }

  return {
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    submit
  };
}
