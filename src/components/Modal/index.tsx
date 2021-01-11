import React, { useCallback, useState, useEffect, FormEvent } from 'react';

import ReactModal from 'react-modal';
import InputMask from 'react-input-mask';
// import api from '../../services/api';

import { Form } from './styles';

interface ICard {
  id: number;
  country: { name: string; flag: string };
  local: string;
  date: string;
}
interface IModalProps {
  handleUpdateCard: (card: ICard) => void;
  editingCard: ICard;
  setIsOpen: () => void;
  isOpen: boolean;
  sendData: (data: Omit<ICard, 'id' | 'country'>) => object;
}

const Modal: React.FC<IModalProps> = ({
  handleUpdateCard,
  editingCard,
  isOpen,
  setIsOpen,
  sendData,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  // const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // eslint-disable-next-line no-param-reassign
  // sendData = { local: selectedLocal, date: selectedDate };

  // const data = useMemo(()=> {
  //   { local: selectedLocal, date: selectedDate }
  // }, [])

  // const toggleModal = useCallback(() => {
  //   setModalStatus(!modalStatus);
  // }, [modalStatus]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
        event.preventDefault();
        sendData({ date: selectedDate, local: selectedLocal });
        handleUpdateCard(editingCard);
      } catch (err) {
        console.log(err);
      }

      // console.log(editingCard);
      // console.log(sendData);
    },
    [editingCard, handleUpdateCard, sendData, selectedDate, selectedLocal],
  );

  return (
    <>
      {/* <button type="button" onClick={toggleModal}>
        open
      </button> */}
      <ReactModal
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {/* <button type="button" onClick={toggleModal}>
          x
        </button> */}
        <Form onSubmit={handleSubmit}>
          <h1>Editar cartão</h1>
          <div>
            <p>Local:</p>
            <input
              type="text"
              id="Local"
              name="Local"
              placeholder="Digite o local que quer conhecer"
              onChange={event => setSelectedLocal(event.target.value)}
              value={selectedLocal}
            />
          </div>

          <div>
            <p>Data:</p>
            <InputMask
              type="text"
              mask="99/9999"
              id="Date"
              name="Date"
              placeholder="mês/ano"
              onChange={event => setSelectedDate(event.target.value)}
              value={selectedDate}
            />
          </div>
          <button type="submit">
            <p>Editar</p>
          </button>
        </Form>
      </ReactModal>
    </>
  );
};

export default Modal;
