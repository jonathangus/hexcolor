import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SiweMessage } from 'siwe';
import { useAccount, useSigner } from 'wagmi';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.5;
  }
`;
type Props = { color: string };

const Upvote = ({ color }: Props) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const queryClient = useQueryClient();
  const { data: colorCount } = useQuery(['count', color], async () => {
    const { data } = await axios.get(`/api/current-count?color=${color}`);
    return data.count;
  });

  const { mutateAsync, isLoading } = useMutation(async () => {
    try {
      const message = await createSiweMessage(
        address,
        `I love the beautiful color #${color}`
      );

      const signature = await signer.signMessage(message);
      const { data } = await axios.post('/api/count', {
        message,
        signature,
        color,
      });

      queryClient.setQueryData(['count', color], data.count);
    } catch (e) {}
  });

  async function createSiweMessage(address, statement) {
    const res = await axios.get('/api/nonce');
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement,
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce: res.data,
    });
    return message.prepareMessage();
  }

  if (isLoading) {
    return <div>....</div>;
  }

  return (
    <Wrapper
      title="Liking this color? Try to upvote it"
      onClick={() => mutateAsync()}
    >
      {colorCount || 0} {'upvotes ❤️'}
    </Wrapper>
  );
};

export default Upvote;
