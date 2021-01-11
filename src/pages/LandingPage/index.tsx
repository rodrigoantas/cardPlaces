import React, { useCallback, FormEvent, useState, useEffect } from 'react';

import InputMask from 'react-input-mask';
import Modal from '../../components/Modal';

import {
  Card,
  CardDownside,
  CardUpperside,
  Container,
  Content,
  Header,
} from './styles';
import logo from '../../assets/logo.svg';
import Editbutton from '../../assets/editbutton.svg';
import Deletebutton from '../../assets/deletebutton.svg';

import countriesAPI from '../../services/countries-api';
import api from '../../services/api';

interface ICountries {
  name?: string;
}

interface ICard {
  id: number;
  country: { name: string; flag: string };
  local: string;
  date: string;
}

interface IsendData {
  local: string;
  date: string;
}

const LandingPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [cards, setCards] = useState<ICard[]>([]);
  const [allCountries, setAllCountries] = useState<ICountries[]>([]);
  const [editingCard, setEditingCard] = useState<ICard>({} as ICard);
  const [editingData, setEditingData] = useState<IsendData>({} as IsendData);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const sendData = useCallback(async (data: IsendData): Promise<void> => {
    console.log(data);
    setEditingData(data);
  }, []);

  const toggleEditModal = useCallback((): void => {
    setEditModalIsOpen(!editModalIsOpen);
  }, [editModalIsOpen]);

  useEffect(() => {
    async function loadAllCountries() {
      await countriesAPI.get('/all').then(response => {
        setAllCountries(response.data);
      });
    }
    loadAllCountries();
  }, []);

  useEffect(() => {
    async function loadCountries() {
      await api.get('/').then(response => {
        setCards(response.data);
      });
    }
    loadCountries();
  }, []);

  const handleAddCountry = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (selectedCountry === '0') {
        alert('Selecione um país!');
        return;
      }

      if (selectedLocal === '') {
        alert('Digite um local!');
        return;
      }

      if (selectedDate === '') {
        alert('Digite uma data!');
        return;
      }

      const response = await countriesAPI.get(`/name/${selectedCountry}`);
      const country = response.data;

      const card = await api.post('/', {
        country: country[0],
        local: selectedLocal,
        date: selectedDate,
      });

      setCards([...cards, card.data]);
    },
    [selectedCountry, selectedLocal, selectedDate, cards],
  );

  const handleUpdateCard = useCallback(
    async (card: ICard): Promise<void> => {
      try {
        toggleEditModal();
        // console.log(card);
        // console.log(card);
        console.log(editingData);

        const response = await api.put(`/${card.id}`, {
          ...card,
          ...editingData,
        });

        setCards(
          cards.map(mappedCard => {
            if (mappedCard.id === card.id) {
              return { ...response.data };
            }
            return mappedCard;
          }),
        );
      } catch (err) {
        console.log(err);
      }

      // console.log(card);

      // console.log(editingData);
    },
    [toggleEditModal, editingData, cards],
  );

  const handleDeleteCountry = useCallback(
    async deleteCardId => {
      await api.delete(`/${deleteCardId}`);

      setCards(cards.filter(card => card.id !== deleteCardId));
    },
    [cards],
  );

  return (
    <>
      <Header>
        <img src={logo} alt="" />
      </Header>

      <Container>
        <form onSubmit={handleAddCountry}>
          <div>
            <p>País</p>
            <select
              id="Country"
              name="Country"
              onChange={event => setSelectedCountry(event.target.value)}
              value={selectedCountry}
              placeholder="Selecione um país"
            >
              <option selected value={0}>
                Selecione um país...
              </option>
              {allCountries.map(country => {
                return <option key={country.name}>{country.name}</option>;
              })}
            </select>
          </div>

          <div>
            <p>Local</p>
            <input
              type="text"
              id="Local"
              name="Local"
              onChange={event => setSelectedLocal(event.target.value)}
              value={selectedLocal}
              placeholder="Digite o local que quer conhecer"
            />
          </div>
          <div>
            <p>Data</p>
            <InputMask
              type="text"
              mask="99/9999"
              id="Date"
              name="Date"
              onChange={event => setSelectedDate(event.target.value)}
              value={selectedDate}
              placeholder="mês/ano"
            />
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </Container>

      <Content>
        {cards.map(card => {
          return (
            <>
              <Card key={card.id}>
                <CardUpperside>
                  <div>
                    <img src={card.country.flag} alt={card.country.name} />
                    <p>{card.country.name}</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCard(card);
                        toggleEditModal();
                      }}
                    >
                      <img src={Editbutton} alt="Edit Button" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCountry(card.id)}
                    >
                      <img src={Deletebutton} alt="Delete Button" />
                    </button>
                  </div>
                </CardUpperside>

                <CardDownside>
                  <p>
                    Local: &nbsp;
                    {card.local}
                  </p>
                  <p>
                    Meta: &nbsp;
                    {card.date}
                  </p>
                </CardDownside>
              </Card>
            </>
          );
        })}
      </Content>
      <Modal
        sendData={sendData}
        setIsOpen={toggleEditModal}
        isOpen={editModalIsOpen}
        editingCard={editingCard}
        handleUpdateCard={handleUpdateCard}
      />
    </>
  );
};

export default LandingPage;
