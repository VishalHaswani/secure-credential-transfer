import React, {useState} from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {FormControl} from 'baseui/form-control';
import {Input, MaskedInput} from 'baseui/input';
import {PaymentCard} from 'baseui/payment-card';
import {DisplayLarge, DisplayXSmall} from 'baseui/typography';
import {useStyletron} from 'baseui';

const getFormOverrides = (width: string) => {
  return {
    ControlContainer: {
      style: {
        width,
      },
    },
  };
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

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLButtonElement, Event>
  ): void => {
    event.preventDefault();
    // submitMutation.mutate(formData)
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
          <Button
            onClick={handleSubmit}
            // isLoading={submitMutation.isLoading}
          >
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
                      margin: '10px',
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
