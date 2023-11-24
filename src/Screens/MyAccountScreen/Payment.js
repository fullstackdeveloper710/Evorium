

import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet, Modal} from 'react-native';
import Button from '../../Components/Button';

import InputFields from '../../Components/InputFields';
import Header from '../../Components/Header';
import {leftArrow, paymentCard} from '../../Assets';
import {
  CardField,
  useStripe,
  CardForm,
  CardFormView,
  StripeProvider,
  CardFieldInput,
  CardElement,
  useElements,
} from '@stripe/stripe-react-native';
import {blankCheck} from '../../Assets';
import ApiClient from '../../api/apiClient';
import {API_Initilization, API_PaymentConfirm} from '../../api/apiUrl';
import Loading from '../../Components/Loading';

function PaymentScreen({route, navigation}) {
  const {_id, price} = route?.params;
  const {confirmPayment, createPaymentMethod, createToken} = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  const [cardInfo, setCardInfo] = useState(null);

  const fetchCardDetails = cardDetails => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const _paymentHandle = async () => {
    try {
      setIsLoading(true);
      if (!!cardInfo) {
        try {
          const response = await createToken({...cardInfo, type: 'Card'});
          console.log('my response response--', response);
          if (response?.token) {
            const payload = {
              token: response?.token?.id,
              amount: price,
              program_id: _id,
            };

            const res = await ApiClient.post(
              API_Initilization,
              payload,
              global.token,
            );
           
            if (res.status === 200) {
            
              if (res.data.status == 'success') {
                const forConfirmation = await confirmPayment(
                  res.data.responseData.client_secret,
                  {
                    paymentMethodType: 'Card',
                  },
                );
                // console.log('for contirmation', forConfirmation);
                if (forConfirmation.paymentIntent.status === 'Succeeded') {
                  const payload = {
                    payment_intent_id: forConfirmation?.paymentIntent?.id,
                    program_id: _id,
                  };
                  const resConfirmPayment = await ApiClient.post(
                    API_PaymentConfirm,
                    payload,
                    global.token,
                  );
                  console.log(
                    payload,
                    'store confirm payment ---',
                    JSON.stringify(resConfirmPayment),
                  );
                  if (resConfirmPayment.status === 201) {
                    navigation.goBack();
                    alert(resConfirmPayment.data.responseMessage);
                    setIsLoading(false);
                  } else {
                    alert(resConfirmPayment.data.responseMessage);
                    setIsLoading(false);
                  }
                } else {
                  alert(forConfirmation.error.message);
                  setIsLoading(false);
                }
              }
            } else {
              setIsLoading(false);
              alert(res.data.message.type);
            }
          } else {
            alert(response?.error?.localizedMessage);
            setIsLoading(false);
          }
        } catch (err) {
          // alert('Error raised during create token!');
          alert(err);
          console.log(err, '******');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>
      <View
        style={{
          backgroundColor: '#1F043B',
          height: '100%',
        }}>
        <Header
          iconName={leftArrow}
          headingText={'Payment'}
          fontSize={18}
          fontWeight={700}
          color={'#FFF'}
          back={() => navigation.goBack()}
        />
        <View
          style={{
            // justifyContent: 'center',
            backgroundColor: '#1F043B',
            // height: '100%',
          }}>
          <Image
            source={paymentCard}
            resizeMode="contain"
            style={{
              height: '15%',
              width: '90%',
              marginVertical: 25,
              alignSelf: 'center',
            }}
          />
         
          <CardForm
            autofocus
            onFormComplete={cardDetails => {
              if (cardDetails.complete) {
                fetchCardDetails(cardDetails);
                // console.log(cardDetails, '----------');
              }
            }}
            style={{height: 210, marginHorizontal: 15}}
            cardStyle={{
              backgroundColor: '#1F043B',
              textColor: '#ffffff',
              placeholderColor: '#9181AD',
            }}
            postalCodeEnabled={false}
            dangerouslyGetFullCardDetails={false}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
              // fetchCardDetails(cardDetails);
            }}
          />

          <Button
            btnName="Pay"
            onClick={_paymentHandle}
            top={10}
            disabled={!cardInfo}
            backgroundColor={!cardInfo ? '#ae00ff5e' : '#AE00FF'}
          />
        </View>
      </View>
    </View>
  );
}

const Payment = ({route, navigation}) => {
  return (
    <StripeProvider
      publishableKey={config.stripe_pub_key}
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreen navigation={navigation} route={route} />
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 300,
    height: 180,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    left: 10,
    top: 10,
  },
  cardHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  cardLogo: {
    width: 60,
    height: 40,
  },
  cardBody: {
    flex: 2,
    padding: 20,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 12,
    color: 'gray',
  },
  cardName: {
    fontSize: 16,
  },
  cardDate: {
    fontSize: 16,
  },
});
