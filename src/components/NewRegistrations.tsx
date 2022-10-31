import { useEffect } from 'react';
import styled from 'styled-components';
import useEnsRegistrations from '../hooks/useEnsRegistrations';
import { useToasts } from 'react-toast-notifications';

const Wrapper = styled.div`
  height: 300px;
  overflow: scroll;
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

const NewRegistrations = () => {
  const { data = [], error } = useEnsRegistrations();
  const { addToast } = useToasts();

  useEffect(() => {
    data
      .filter((item) => {
        return ('#' + item.name.replace('.eth', '')).match(
          /^#([A-F0-9]{3}|[A-F0-9]{6})$/i
        );
      })
      .forEach((item) => {
        addToast(
          <div>
            <div>{item.name} just registred!</div>
            <a
              target="_blank"
              href={`https://etherscan.io/tx/${item.txId}`}
              rel="noreferrer"
            >
              see on etherscan
            </a>
          </div>
        ),
          {
            appearance: 'info',
            autoDismiss: true,
          };
      });
  }, [data.length]);

  if (!data) {
    return null;
  }
};

export default NewRegistrations;
