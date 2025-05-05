import React from "react";
import { Layout } from "antd";
import MainHeader from "./Component/Header/Header";
import MainFooter from "./Component/Footer/Footer";
import "./Layout.css";
import { Outlet, ScrollRestoration } from "react-router";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Layout>
        <MainHeader />
        <Content className="content">
          <Outlet />
        </Content>
        <MainFooter />
      </Layout>
    </>
  );
};
export default MainLayout;
