<div align="center">
  <img src="src/assets/img/logo.jpg" alt="MoneyGuard Logo" width="120" />
  <h1>MoneyGuard</h1>
  <p><strong>The Ultimate Personal Finance Tracker</strong></p>
  <p>
    <a href="https://money-guard-sable.vercel.app/dashboard">Live Demo</a> ·
    <a href="https://github.com/TeamReactors/MoneyGuard/issues">Report Bug</a> ·
    <a href="https://github.com/TeamReactors/MoneyGuard/pulls">Request Feature</a>
  </p>
</div>

---

## 🚀 Overview

MoneyGuard is a modern, secure, and intuitive web application for managing your
personal finances. Track your income, expenses, currency rates, and visualize
your financial health with beautiful charts and dashboards. Built with teamwork,
passion, and cutting-edge technologies.

## ✨ Features

- User authentication & registration
- Add, edit, delete transactions
- Real-time balance and statistics dashboard
- Currency conversion & live rates
- Interactive charts for analytics
- Responsive design for all devices
- Protected and restricted routes
- Fast, modern UI with Vite & React

## 🛠️ Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **State Management:** Redux
- **Routing:** React Router
- **Charts:** Chart.js
- **API:** Custom services (currency, transactions)
- **Deployment:** Vercel
- **Linting:** ESLint

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/TeamReactors/MoneyGuard.git
cd MoneyGuard

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🖥️ Usage

1. Register or log in to your account.
2. Add your transactions (income/expense).
3. View your balance, statistics, and charts.
4. Explore currency rates and conversions.
5. Enjoy a seamless experience on any device!

## 📁 Folder Structure

```
MoneyGuard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddTransactionForm/
│   │   ├── App/
│   │   ├── Balance/
│   │   ├── ButtonAddTransactions/
│   │   ├── Chart/
│   │   ├── Currency/
│   │   ├── CurrencyChart/
│   │   ├── CurrencyTab/
│   │   ├── EditTransactionForm/
│   │   ├── Header/
│   │   ├── HomeTab/
│   │   ├── Loader/
│   │   ├── LoginForm/
│   │   ├── ModalAddTransaction/
│   │   ├── ModalEditTransaction/
│   │   ├── Navigation/
│   │   ├── NotFound/
│   │   ├── PrivateRoute.jsx
│   │   ├── RegistrationForm/
│   │   ├── RestrictedRoute.jsx
│   │   ├── StatisticsDashboard/
│   │   ├── StatisticsTable/
│   │   ├── TransactionsFilter/
│   │   ├── TransactionsItem/
│   │   └── TransactionsList/
│   ├── hooks/
│   ├── pages/
│   │   ├── CurrencyPage/
│   │   ├── Dashboard/
│   │   ├── LoginPage/
│   │   ├── RegistationPage.jsx
│   │   ├── StatisticPage/
│   │   └── StatisticsTab.jsx
│   ├── redux/
│   │   ├── auth/
│   │   ├── store.js
│   │   └── transactions/
│   ├── services/
│   │   └── currencyService.js
│   └── utils/
│       ├── colorSelect.js
│       ├── timeUtils.js
│       └── transactionUtils.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contributing

We welcome contributions from everyone! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team & Contact

Made with ❤️ by TeamReactors.

- [GitHub Team](https://github.com/TeamReactors)
- For questions, contact us via
  [issues](https://github.com/TeamReactors/MoneyGuard/issues) or email:
  https://discord.gg/79edTz5EuF

---

> "Guard your money, master your future."
