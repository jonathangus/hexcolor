import { ethers } from 'ethers';
import request, { gql } from 'graphql-request';
import { stringIsHex } from '../utils/regex';
import { ENS } from '@ensdomains/ensjs';

const ensQuery = gql`
  query GetEns($name: String) {
    domains(where: { name: $name, owner_contains: "0x" }) {
      labelName
      name
      owner {
        id
        domains {
          labelName
        }
      }
    }
  }
`;
export const getEns = async (color: string) => {
  const result = await request<any>(
    'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    ensQuery,
    {
      name: `${color}.eth`.toLowerCase(),
    }
  );

  const [match] = result.domains;
  if (match) {
    let ensName;
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    );

    // const a = await provider.resolveName(match.owner.id);

    // const ENSInstance = new ENS();
    // await ENSInstance.setProvider(provider);
    // const profile = await ENSInstance.getProfile(
    //   ethers.utils.getAddress(match.owner.id)
    // );
    // console.log(a);

    // if (provider) {
    //   ensName = await provider.lookupAddress(match.owner.id);
    //   console.log('ENS NAME', ensName);
    // }

    console.log(match.owner.domains);
    return {
      available: false,
      ensName,
      owner: match.owner.id,
      alsoOwns: match.owner.domains
        .filter(
          (domain: { labelName: string }) =>
            domain.labelName.toLowerCase() !== color.toLowerCase()
        )
        .filter((domain) => stringIsHex('#' + domain.labelName))
        .map((domain) => domain.labelName),
    };
  }
  return {
    available: true,
  };
};
