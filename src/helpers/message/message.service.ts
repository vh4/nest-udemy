import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  Success() {
    return { responseMessage: 'completed successfully', responseCode: '00' };
  }

  InvalidMerchant() {
    return { responseMessage: 'Invalid merchant', responseCode: '03' };
  }

  DoNotHonor() {
    return { responseMessage: 'Do not honor', responseCode: '05' };
  }

  InvalidTransaction() {
    return { responseMessage: 'Invalid transaction', responseCode: '12' };
  }

  InvalidAmount() {
    return { responseMessage: 'Invalid amount', responseCode: '13' };
  }

  InvalidCardNumber() {
    return {
      responseMessage: 'Invalid card number (no such number)',
      responseCode: '14',
    };
  }

  NoSuchIssuer() {
    return { responseMessage: 'No such issuer', responseCode: '15' };
  }

  FormatError() {
    return {
      responseMessage: 'Format error / Invalid Signature',
      responseCode: '30',
    };
  }

  BankNotSupported() {
    return {
      responseMessage: 'Bank not supported by switch',
      responseCode: '31',
    };
  }

  RequestedFunctionNotSupported() {
    return {
      responseMessage: 'Requested function not supported',
      responseCode: '40',
    };
  }

  InsufficientFunds() {
    return { responseMessage: 'Insufficient funds', responseCode: '51' };
  }

  TransactionNotPermittedToCardholder() {
    return {
      responseMessage: 'Transaction not permitted to cardholder',
      responseCode: '57',
    };
  }

  TransactionNotPermittedToTerminal() {
    return {
      responseMessage: 'Transaction not permitted to terminal',
      responseCode: '58',
    };
  }

  SuspectedFraud() {
    return { responseMessage: 'Suspected Fraud', responseCode: '59' };
  }

  ExceedsAmountTransactionLimit() {
    return {
      responseMessage: 'Exceeds amount transaction limit',
      responseCode: '61',
    };
  }

  RestrictedCard() {
    return { responseMessage: 'Restricted card', responseCode: '62' };
  }

  ExceedsFrequencyTransactionLimit() {
    return {
      responseMessage: 'Exceeds frequency transaction limit',
      responseCode: '65',
    };
  }

  ResponseReceivedTooLate() {
    return {
      responseMessage: 'Response received too late',
      responseCode: '68',
    };
  }

  NoAccounts() {
    return { responseMessage: 'No accounts', responseCode: '83' };
  }

  LinkDown() {
    return { responseMessage: 'Link down', responseCode: '89' };
  }

  CutOfIsInProcess() {
    return { responseMessage: 'Cut off is in process', responseCode: '90' };
  }

  IssuerOrSwitchIsInoperative() {
    return {
      responseMessage: 'Issuer or switch is inoperative',
      responseCode: '91',
    };
  }

  UnableToRouteTransaction() {
    return {
      responseMessage: 'Unable to route transaction',
      responseCode: '92',
    };
  }

  DuplicateTransaction() {
    return { responseMessage: 'Duplicate transaction', responseCode: '94' };
  }

  SystemMalfunction() {
    return {
      responseMessage: 'System malfunction / system error',
      responseCode: '96',
    };
  }
}
