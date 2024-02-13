import { writeFunction } from "./write";
import { MEMResponseObject } from "../types";
import { MethodFn } from "@kwilteam/extensions";

export const write: MethodFn = async ({ metadata, inputs }) => {
  const function_id = metadata["function_id"];
  const network = metadata["network"];

  if (!["mainnet", "testnet"].includes(network)) {
    throw new Error(
      "invalid network. Please choose either 'mainnet' or 'testnet'",
    );
  }

  if (!function_id) {
    throw new Error("Invalid function id supplied");
  }

  const funcInputs: any = JSON.parse(inputs[0].toString());
  let res: string = "";

  if (network === "mainnet") {
    const txid: MEMResponseObject = await writeFunction(
      function_id,
      funcInputs,
      "mainnet",
    );
    res = txid.data.pseudoId;
  }

  if (network === "testnet") {
    const txid: MEMResponseObject = await writeFunction(
      function_id,
      funcInputs,
      "testnet",
    );
    res = txid.data.pseudoId;
  }

  return res;
};
