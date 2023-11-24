import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

function CustomPaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async () => {
    // Handle payment processing with Stripe API here
  };

  return (
    <View>
      <Text>Card Number</Text>
      <TextInput
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="1234 5678 9012 3456"
      />
      <Text>Expiry</Text>
      <TextInput value={expiry} onChangeText={setExpiry} placeholder="MM/YY" />
      <Text>CVC</Text>
      <TextInput value={cvc} onChangeText={setCvc} placeholder="CVC" />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
}

export default CustomPaymentForm;
