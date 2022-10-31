import { gql, GraphQLClient } from 'graphql-request';
import { stringIsHex } from '../utils/regex';
import { colors } from './extra';
import webColors from '../config/webcolors.json';
import wikiColors from '../config/wikicolors.json';
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

const client = new GraphQLClient(
  'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  {
    fetch: fetch,
  }
);

export const getEns = async (color: string) => {
  const result = await client.request<any>(ensQuery, {
    name: `${color}.eth`.toLowerCase(),
  });

  const [match] = result.domains;
  if (match) {
    let ensName;
    // const provider = new ethers.providers.JsonRpcProvider(
    //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    // );

    // try {
    //   ensName = await provider.lookupAddress(
    //     ethers.utils.getAddress(match.owner.id)
    //   );
    // } catch (e) {
    //   console.log('!!');
    //   console.error(e);
    // }

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

const holderQuery = gql`
  query GetEnsHoldings($address: String) {
    domains(where: { owner: $address }) {
      labelName
      name
    }
  }
`;

export const getUserHoldings = async (address: string): Promise<string[]> => {
  const result = await client.request<any>(holderQuery, {
    address: address.toLowerCase(),
  });

  return result.domains
    .filter((domain) => stringIsHex('#' + domain.labelName))
    .map((domain) => domain.labelName);
};

const topQuery = gql`
  query GetTop($names: [String]) {
    domains(where: { name_in: $names, owner_contains: "0x" }, first: 999) {
      labelName
      name
      owner {
        id
      }
    }
  }
`;

export const getTopNames = async (): Promise<
  { hex: string; available: boolean; name: string }[]
> => {
  const names = webColors.map(
    (c) => c.hex.replace('#', '').toLowerCase() + '.eth'
  );
  const result = await client.request<any>(topQuery, {
    names,
  });

  console.log(names, result.domains);
  return webColors.map((color) => ({
    ...color,
    available: !result.domains.some(
      (domain) =>
        domain.labelName.toLowerCase() ===
        color.hex.replace('#', '').toLowerCase()
    ),
  }));
};

const registrationQuery = gql`
  query GetRegistrations($blockNr: Int) {
    registrationEvents(
      where: { blockNumber_gt: $blockNr }
      orderDirection: desc
      orderBy: blockNumber
      first: 5
    ) {
      id
      blockNumber
      transactionID
      __typename
      registration {
        id
        domain {
          labelName
          name
        }
        registrationDate
      }
    }
  }
`;

export const getRegistrations = async (
  blockNr: number = 0
): Promise<
  {
    name: string;
    txId: string;
    blockNr: number;
  }[]
> => {
  console.log({ blockNr });
  const result = await client.request<any>(registrationQuery, {
    blockNr,
  });

  console.log({ result, blockNr });
  return result.registrationEvents
    .filter((event) => event.__typename === 'NameRegistered')
    .map((event) => ({
      name: event.registration.domain.name,
      txId: event.transactionID,
      blockNr: event.blockNumber,
    }));
};
