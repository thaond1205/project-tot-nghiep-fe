import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import AppHeader from "./components/common/header";
import AppFooter from "./components/common/footer";
import AppHome from "./views/home";
import AdminLayout from "./components/admin/layouts/AdminLayout";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        {/* <Route path="/loginAdmin" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/booking" component={HotelDetails} test="thao"></Route>
        <Route path="/payment" component={PaymentBookingMain}></Route>
        <Route path="/" component={Home}></Route> */}

        <Route
          path="/"
          component={() => (
            <Layout className="mainLayout">
              <Header>
                <AppHeader />
              </Header>
              <Content>
                <AppHome />
              </Content>
              <Footer>
                <AppFooter />
              </Footer>
            </Layout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
