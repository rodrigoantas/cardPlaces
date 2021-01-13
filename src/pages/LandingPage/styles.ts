import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  width: 100%;
  background-color: black;
  img {
    padding: 20px;
    margin-left: 20px;
  }
`;

export const Container = styled.div`
  background-color: #4f9419;
  padding: 20px;
  font-size: 16px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    justify-content: center;

    div:nth-child(3) input {
      width: 238px;
      height: 48px;
      padding: 11px 15px;
      border-radius: 7px;
      border: none;
    }

    div {
      margin-right: 40px;

      p {
        font-size: 16px;
        line-height: 18.75px;
        color: white;
        font-weight: 400;
      }

      select {
        color: gray;
        width: 303px;
        height: 48px;
        border-radius: 4px;
        padding: 0 10px;
        font-size: 16px;
        line-height: 18.75px;
        border: none;
      }

      input {
        width: 455px;
        height: 48px;
        border-radius: 7px;
        border: none;
        padding: 11px 15px;
      }
    }

    button {
      background-color: #006c18;
      color: white;
      height: 49px;
      border-radius: 7px;
      border: 0;
      width: 203px;
      margin-top: auto;
      transition: 0.2s;
      font-size: 18px;
      line-height: 21px;

      &:hover {
        background: ${shade(0.2, '#006c18')};
      }
    }
  }

  @media (max-width: 1500px) {
    form {
      button {
        width: 200px;
        height: 40px;
      }

      div:nth-child(3) input {
        width: 200px;
        height: 40px;
      }
      div {
        input {
          width: 200px;
          height: 40px;
        }
        select {
          width: 200px;
          height: 40px;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    form {
      flex-direction: column;
      display: flex;
      justify-content: center;

      button {
        margin: 30px 0 0 0;
        width: auto;
      }
      div:nth-child(3) input {
        width: 400px;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 0;

        input {
          width: 400px;
        }
        select {
          width: 400px;
        }

        p {
          margin: 15px 0;
          text-align: center;
        }
      }
    }
    @media (max-width: 800px) {
      form {
        div:nth-child(3) input {
          width: 250px;
        }
        div {
          input {
            width: 250px;
          }
          select {
            width: 250px;
          }
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin: 30px;

  div {
    margin: 0 15px;
  }
`;

export const CardUpperside = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ababab;
  min-height: 104px;

  div:nth-child(1) {
    margin: 10px;
    width: 100%;
    img {
      width: 55px;
      height: 35px;
    }
    p {
      width: 100%;
      margin-top: 15px;
      text-transform: uppercase;
      color: #4f9419;
      font-weight: bold;
      margin-bottom: 10px;
      padding-bottom: 20px;
      line-height: 18px;
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 10px;
    height: 15px;

    button {
      height: 15px;
      width: 15px;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 24px;
      background: transparent;
      color: transparent;
      img {
        background: transparent;
        color: transparent;
      }
    }
  }
`;
export const CardDownside = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 10px;

  p {
    font-size: 16px;
    line-height: 19px;
    margin-top: 10px;
  }
`;
