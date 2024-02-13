// import { MEMResponseObject } from "mem-sdk";
import axios from "axios";

import { Inputs, MEMResponseObject } from "../types";

export async function writeFunction(
  id: string,
  inputs: Inputs,
  network: string,
): Promise<MEMResponseObject | any> {
  if (id.endsWith(".mem")) {
    id = await resolveMemName(id);
  }

  if (network === "mainnet") {
    const url = `https://api.mem.tech/api/transactions`;
    // Set the headers for the request
    const headers = {
      "Content-Type": "application/json",
    };

    const writeInputs = [
      {
        input: inputs,
      },
    ];

    const options = {
      method: "POST",
      headers: headers,
      data: {
        functionId: id,
        inputs: writeInputs,
      },
    };

    const response = await axios.post(url, options.data, {
      headers: options.headers,
    });

    if (response.statusText === "OK") {
      console.log(response);
      const data = await response.data;
      return data as MEMResponseObject;
    }

    throw new Error(response.statusText);
  }

  if (network === "testnet") {
    const url = `https://mem-testnet.xyz/write`;
    // Set the headers for the request
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method: "POST",
      headers: headers,
      data: {
        function_id: id,
        input: JSON.stringify(inputs),
      },
    };

    const response = await axios.post(url, options.data, {
      headers: options.headers,
    });

    if (response.statusText === "OK") {
      const data = await response.data;
      return data as MEMResponseObject;
    }

    throw new Error(response.statusText);
  }
}

export async function resolveMemName(funcName: string): Promise<any> {
  try {
    const name: string = funcName.split(".mem")[0];

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.get(
      "https://api.mem.tech/api/state/GJn1h75nIAyMW5XWgzraL-Ldxr2Zb38WlLEVwk6CBDs",
    );

    if (response.statusText === "OK") {
      const data = response?.data?.names;
      if (name in data) {
        return data[name] as any;
      }
    }
    throw new Error(response.statusText);
  } catch (error) {
    return null;
  }
}
