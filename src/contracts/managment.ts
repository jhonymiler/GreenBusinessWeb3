import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import GreenSealPlatform from '../../build/contracts/GreenSealPlatform.json';

const platformAddress = process.env.NEXT_PUBLIC_CONTRACT_PLATFORM as string;

export function useRegisterRecycler() {
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract()

  const submit = async () => {
    writeContract({
      address: platformAddress,
      abi: GreenSealPlatform.abi,
      functionName: 'registerRecycler',
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return {
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    submit
  };
}
