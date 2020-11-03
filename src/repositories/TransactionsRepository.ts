import Transaction from '../models/Transaction';

// DTO -> Data Transfer Object
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((total, { value }) => total + value, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((total, { value }) => total + value, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public transWithBalance(): TransWithBalance {
    const { transactions } = this;
    const balance = this.getBalance();

    const transactionsPlusBalance = {
      transactions,
      balance,
    };

    return transactionsPlusBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
