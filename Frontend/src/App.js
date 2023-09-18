import "./App.css";
import CustomerSignIn from "./Components/CustomerSignIn";
import CustomerRegister from "./Components/CustomerRegister";
import EmployeeSignIn from "./Components/EmployeeSignIn";
import AdminSignIn from "./Components/AdminSignIn";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomerDashboard from "./Components/CustomerDashboard";
import { AuthProvider } from "./Utility/AuthProvider";
import CustomerShowAllMyTransaction from "./Components/CustomerShowAllMyTransaction";
import CustomerDeposit from "./Components/CustomerDeposit";
import CustomerWithdraw from "./Components/CustomerWithdraw";
import CustomerBankTransfer from "./Components/CustomerBankTransfer";
import CustomerMyLoans from "./Components/CustomerMyLoans";
import CustomerApplyLoan from "./Components/CustomerApplyLoan";
import CustomerLoanPayment from "./Components/CustomerLoanPayment";
import CustomerMyLockers from "./Components/CustomerMyLockers";
import CustomerApplyForLocker from "./Components/CustomerApplyForLocker";
import CustomerLockerPayment from "./Components/CustomerLockerPayment";
import CustomerCloseLocker from "./Components/CustomerCloseLocker";
import CustomerMyCreditCards from "./Components/CustomerMyCreditCards";
import CustomerApplyForCreditCard from "./Components/CustomerApplyForCreditCard";
import CustomerCloseCreditCard from "./Components/CustomerCloseCreditCard";
import CustomerMyGiftCardsPurchased from "./Components/CustomerMyGiftCardsPurchased";
import CustomerBuyGiftCard from "./Components/CustomerBuyGiftCard";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import EmployeeAllAccounts from "./Components/EmployeeAllAccounts";
import EmployeeAllCustomers from "./Components/EmployeeAllCustomers";
import EmployeeShowAllTransactions from "./Components/EmployeeShowAllTransactions";
import EmployeeAllLoans from "./Components/EmployeeAllLoans";
import EmployeeAllLockers from "./Components/EmployeeAllLockers";
import EmployeeAllCreditCards from "./Components/EmployeeAllCreditCards";
import AdminDashboard from "./Components/AdminDashboard";
import AdminAllEmployees from "./Components/AdminAllEmployees";
import AdminRegisterEmployee from "./Components/AdminRegisterEmployee";
import Navbar from "./Components/Landing Pages/Navbar";
import Footer from "./Components/Landing Pages/Footer";
import Home from "./Components/Landing Pages/Home";
import Contact from "./Components/Landing Pages/Contact";
import Service from "./Components/Landing Pages/Service";
import About from "./Components/Landing Pages/About";
import { useEffect } from "react";
import ForgotPassword from "./Components/ForgotPassword";
import VendorSignIn from "./Components/VendorSignIn";
import TeamLeaderSignIn from "./Components/TeamLeaderSignIn";
import VendorDashboard from "./Components/VendorDashboard";
import VendorMyReports from "./Components/VendorMyReports";
import VendorMarkProductivity from "./Components/VendorMarkProductivity";
import TeamLeaderDashboard from "./Components/TeamLeaderDashboard";
import TeamLeaderAllReports from "./Components/TeamLeaderAllReports";
import AdminAllVendors from "./Components/AdminAllVendors";
import AdminRegisterVendor from "./Components/AdminRegisterVendor";
import AdminAllTeamLeaders from "./Components/AdminAllTeamLeaders";
import AdminRegisterTeamLeader from "./Components/AdminRegisterTeamLeader";
import AdminRetriveReports from "./Components/AdminRetriveReports";

function App() {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "6e2bad756c646f714635a9ec7e66877d",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  });

  return (
    <div className="App">
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Landing Pages ---------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />

          {/* Customer -------------------- */}

          <Route path="/customer-login" element={<CustomerSignIn />}></Route>
          <Route
            path="/customer-register"
            element={<CustomerRegister />}
          ></Route>
          <Route
            path="/customer-dashboard"
            element={<CustomerDashboard />}
          ></Route>
          <Route
            path="/customer-show-all-my-transaction"
            element={<CustomerShowAllMyTransaction />}
          ></Route>
          <Route path="/customer-deposit" element={<CustomerDeposit />}></Route>
          <Route
            path="/customer-withdraw"
            element={<CustomerWithdraw />}
          ></Route>
          <Route
            path="/customer-bank-transfer"
            element={<CustomerBankTransfer />}
          ></Route>
          <Route
            path="/customer-my-loans"
            element={<CustomerMyLoans />}
          ></Route>
          <Route
            path="/customer-apply-loan"
            element={<CustomerApplyLoan />}
          ></Route>
          <Route
            path="/customer-loan-payment"
            element={<CustomerLoanPayment />}
          ></Route>
          <Route
            path="/customer-my-lockers"
            element={<CustomerMyLockers />}
          ></Route>
          <Route
            path="/customer-apply-for-locker"
            element={<CustomerApplyForLocker />}
          ></Route>
          <Route
            path="/customer-locker-payment"
            element={<CustomerLockerPayment />}
          ></Route>
          <Route
            path="/customer-close-locker"
            element={<CustomerCloseLocker />}
          ></Route>
          <Route
            path="/customer-my-credit-cards"
            element={<CustomerMyCreditCards />}
          ></Route>
          <Route
            path="/customer-apply-for-credit-card"
            element={<CustomerApplyForCreditCard />}
          ></Route>
          <Route
            path="/customer-close-credit-card"
            element={<CustomerCloseCreditCard />}
          ></Route>
          <Route
            path="/customer-my-gift-cards"
            element={<CustomerMyGiftCardsPurchased />}
          ></Route>
          <Route
            path="/customer-buy-gift-card"
            element={<CustomerBuyGiftCard />}
          ></Route>

          {/* Employee -------------------- */}

          <Route path="/employee-login" element={<EmployeeSignIn />}></Route>
          <Route
            path="/employee-dashboard"
            element={<EmployeeDashboard />}
          ></Route>
          <Route
            path="/employee-all-accounts"
            element={<EmployeeAllAccounts />}
          ></Route>
          <Route
            path="/employee-all-customers"
            element={<EmployeeAllCustomers />}
          ></Route>
          <Route
            path="/employee-show-all-transactions"
            element={<EmployeeShowAllTransactions />}
          ></Route>
          <Route
            path="/employee-all-loans"
            element={<EmployeeAllLoans />}
          ></Route>
          <Route
            path="/employee-all-lockers"
            element={<EmployeeAllLockers />}
          ></Route>
          <Route
            path="/employee-all-credit-cards"
            element={<EmployeeAllCreditCards />}
          ></Route>

          {/* Admin -------------------- */}

          <Route path="/admin-login" element={<AdminSignIn />}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
          <Route
            path="/admin-all-employees"
            element={<AdminAllEmployees />}
          ></Route>
          <Route
            path="/admin-add-employee"
            element={<AdminRegisterEmployee />}
          ></Route>
          <Route
            path="/admin-all-vendors"
            element={<AdminAllVendors />}
          ></Route>
          <Route
            path="/admin-add-vendor"
            element={<AdminRegisterVendor />}
          ></Route>
          <Route
            path="/admin-all-teamleaders"
            element={<AdminAllTeamLeaders />}
          ></Route>
          <Route
            path="/admin-add-teamleader"
            element={<AdminRegisterTeamLeader />}
          ></Route>
          <Route
            path="/admin-retrive-reports"
            element={<AdminRetriveReports />}
          ></Route>

          {/* Vendor -------------------- */}

          <Route path="/vendor-login" element={<VendorSignIn />}></Route>
          <Route path="/vendor-dashboard" element={<VendorDashboard />}></Route>
          <Route
            path="/vendor-my-reports"
            element={<VendorMyReports />}
          ></Route>
          <Route
            path="/vendor-mark-productivity"
            element={<VendorMarkProductivity />}
          ></Route>

          {/* Team Leader -------------------- */}

          <Route
            path="/teamleader-login"
            element={<TeamLeaderSignIn />}
          ></Route>
          <Route
            path="/teamleader-dashboard"
            element={<TeamLeaderDashboard />}
          ></Route>
          <Route
            path="/teamleader-all-reports"
            element={<TeamLeaderAllReports />}
          ></Route>
        </Routes>
        <Footer></Footer>
      </AuthProvider>
    </div>
  );
}

export default App;
