import {  useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import GreenSealPlatform from '../../build/contracts/GreenSealPlatform.json';
import GreenSealToken from '../../build/contracts/GreenSealToken.json';
import { Abi } from 'viem';

const platformAddress = process.env.NEXT_PUBLIC_CONTRACT_PLATFORM as `0x${string}`;
const tokenAddress = process.env.NEXT_PUBLIC_CONTRACT_TOKEN as `0x${string}`;

type ContractAddress = `0x${string}`;


export function useGetBalance(userAddress: string | undefined) {
  const { data, isError, isLoading } = useReadContract({
    address: tokenAddress,
    abi: GreenSealToken.abi,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  console.log('data:', data); // Should log the balance as a BigInt

  const balance = data;

  return { balance, isError, isLoading };
}



export function useContractPlatform(method: string, args: unknown[] = []) {
  return useContract(GreenSealPlatform.abi as Abi,platformAddress, method, args)
}


function useContract(contractAbi: Abi, contract: ContractAddress, method: string, args: unknown[] = []) {
  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract()

  const submit = async (): Promise<void> => {
    writeContract({
      address: contract,
      abi: contractAbi,
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
