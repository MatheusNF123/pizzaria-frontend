import { ReactNode } from "react";
import Head from "next/head";

import Header from "../../src/components/header";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#212121",
        }}
      >
        <Header />
        {children}
      </div>
    </>
  );
}
