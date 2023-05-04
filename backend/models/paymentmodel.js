
import mongoose from "mongoose"
const schema = mongoose.Schema;

const paymentMethodSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['credit-card', 'debit-card', 'paypal', 'google-pay', 'apple-pay'],
    required: true
  },
  cardHolderName: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  cardNumber: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  expiryMonth: {
    type: Number,
    min: 1,
    max: 12,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  expiryYear: {
    type: Number,
    min: new Date().getFullYear(),
    max: new Date().getFullYear() + 10,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  cvv: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  paypalEmail: {
    type: String,
    required: function() {
      return this.method === 'paypal';
    }
  },
  googlePayEmail: {
    type: String,
    required: function() {
      return this.method === 'google-pay';
    }
  },
  applePayEmail: {
    type: String,
    required: function() {
      return this.method === 'apple-pay';
    }
  }
})

export default paymentMethodSchema;
