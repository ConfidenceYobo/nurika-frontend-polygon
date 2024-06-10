import { TransactionResponse } from "ethers";
import BigNumber from "bignumber.js";
import { getContractCall } from "./";
import { useERC721 } from "../useContract";
import { BIG_TEN } from "@/constants";
import { getERC721Address } from "@/utils/address";

interface Props {
  amount: number;
  numTokens: number;
  variant: number;
}

export function useBuyNFTCallback(): {
  handleBuy: (props: Props) => Promise<TransactionResponse>;
} {
  const { contractCall } = getContractCall();

  const erc721Contract = useERC721(getERC721Address());

  const handleBuy = async (props: Props): Promise<TransactionResponse> => {
    const amount = new BigNumber(props.amount)
      .times(BIG_TEN.pow(18))
      .toString(10);

    if (!erc721Contract) {
      console.error("tokenContract is null");
      return;
    }

    const functionName = "mint";

    try {
      const estimatedGas = await erc721Contract[functionName].estimateGas(
        props.numTokens,
        props.variant,
        {
          value: amount,
        }
      );

      const response = await contractCall(
        erc721Contract,
        functionName,
        [props.numTokens, props.variant],
        {
          value: amount,
          gasLimit: estimatedGas,
        }
      );

      return response;
    } catch (error: any) {
      console.error("Error: ", error);

      if (error.reason) {
        throw error.reason;
      }

      if (error.code && error.code === "CALL_EXCEPTION") {
        // eslint-disable-next-line no-throw-literal
        throw "Please verify you have enough funds to cover gas and transaction fee and try again";
      }

      throw error;
    }
  };

  return { handleBuy };
}
