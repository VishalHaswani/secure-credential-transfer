import React, {useState} from 'react';
import {useStyletron} from 'baseui';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input, MaskedInput} from 'baseui/input';
import {PaymentCard} from 'baseui/payment-card';
import {DisplayLarge, DisplayXSmall} from 'baseui/typography';
import {useMutation} from '@tanstack/react-query';

import {encrypt} from '../util/EncryptionAndDecryption';
import {EncryptedRequestBody} from '../../types';
import {bankPublicKey, clientPrivateKey, TDESPassphrase} from '../constants';

const getFormOverrides = (width: string) => {
  return {
    ControlContainer: {
      style: {
        width,
      },
    },
  };
};

const postCreditCardData = async (
  encryptedRequestBody: EncryptedRequestBody
): Promise<boolean> => {
  const URL = 'http://localhost:3000/apiv1/pay';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptedRequestBody),
  };
  const response = await fetch(URL, request);
  const responseBody = await response.json();
  return responseBody?.isSuccesful as boolean;
};

interface CardDetailsInput {
  cardNumber: number | '';
  expDate: string;
  cvv: number | undefined;
  pin: number | undefined;
}

const Home = () => {
  const [formData, setFormData] = useState<CardDetailsInput>({
    cardNumber: '',
    expDate: '',
    cvv: undefined,
    pin: undefined,
  });
  const [css] = useStyletron();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const submitMutation = useMutation({
    mutationFn: postCreditCardData,
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLButtonElement, Event>
  ): void => {
    event.preventDefault();
    const sampleData = {
      cardNumber: '1234567887654321',
      expDate: '09/25',
      cvv: '123',
      pin: '123456',
    };
    const plaintextData = JSON.stringify(sampleData);
    const encryptedData = encrypt(
      plaintextData,
      TDESPassphrase,
      clientPrivateKey,
      bankPublicKey
    );
    submitMutation.mutate(encryptedData);
  };

  return (
    <>
      <center>
        <DisplayLarge marginBottom="scale500">NET BANKING</DisplayLarge>
        <DisplayXSmall>A secure Portal for online transcations</DisplayXSmall>
      </center>
      <Block
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '60%',
          margin: 'auto',
        })}
      >
        <Block
          className={css({
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            margin: 'auto',
          })}
        >
          <FormControl
            label="Card Number"
            overrides={getFormOverrides('250px')}
          >
            <PaymentCard
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
            />
          </FormControl>
          <FormControl
            label="Expiry Date"
            overrides={getFormOverrides('100px')}
          >
            <MaskedInput
              value={formData.expDate}
              onChange={handleChange}
              placeholder="MM/YY"
              mask="99/99"
            />
          </FormControl>
          <FormControl label="CVV" overrides={getFormOverrides('100px')}>
            <MaskedInput
              value={formData.cvv}
              onChange={handleChange}
              placeholder="000"
              mask="999"
            />
          </FormControl>
          <FormControl label="PIN" overrides={getFormOverrides('200px')}>
            <Input
              value={formData.cvv}
              onChange={handleChange}
              placeholder="XXXX"
              type="password"
            />
          </FormControl>
          <Button onClick={handleSubmit} isLoading={submitMutation.isLoading}>
            Submit
          </Button>
        </Block>
        <Block
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignContent: 'center',
            width: '200px',
            height: '300px',
          })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => {
            return (
              <Button
                key={num}
                overrides={{
                  Root: {
                    style: {
                      marginTop: '10px',
                      marginRight: '10px',
                      marginBottom: '10px',
                      marginLeft: '10px',
                    },
                  },
                }}
              >
                {num}
              </Button>
            );
          })}
        </Block>
      </Block>
    </>
  );
};

export default Home;
