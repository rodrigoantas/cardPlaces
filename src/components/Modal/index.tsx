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
  sendData: (data: Omit<ICard, 'id' | 'country'>) => void;
}

const Modal: React.FC<IModalProps> = ({
  handleUpdateCard,
  editingCard = {} as ICard,
  isOpen,
  setIsOpen,
  sendData,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  const [selectedLocal, setSelectedLocal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    sendData({ date: selectedDate, local: selectedLocal });
  }, [sendData, selectedDate, selectedLocal]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
        event.preventDefault();
        sendData({ date: selectedDate, local: selectedLocal });
        handleUpdateCard(editingCard);
      } catch (err) {
        console.log(err);
      }
    },
    [editingCard, handleUpdateCard, sendData, selectedDate, selectedLocal],
  );

  return (
    <>
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
        <Form onSubmit={handleSubmit}>
          <h1>Editar cartão</h1>

          <div>
            <p>Local:</p>
            <input
              type="text"
              id="Local"
              name="Local"
              placeholder="Digite o local que quer conhecer"
              onChange={event => setSelectedLocal(event.currentTarget.value)}
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
              onChange={event => setSelectedDate(event.currentTarget.value)}
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
