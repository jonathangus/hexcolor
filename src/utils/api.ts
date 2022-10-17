import { ethers } from 'ethers';
import { gql, GraphQLClient } from 'graphql-request';
import { stringIsHex } from '../utils/regex';
import { ENS } from '@ensdomains/ensjs';
// import nodeFetch from 'node-fetch';

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
  const client = new GraphQLClient(
    'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    {
      fetch: fetch,
    }
  );

  const result = await client.request<any>(ensQuery, {
    name: `${color}.eth`.toLowerCase(),
  });

  const [match] = result.domains;
  if (match) {
    let ensName;
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    );

    console.log('res-_--');
    const a = await provider.resolveName(match.owner.id);
    console.log(a);
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
