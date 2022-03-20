import Footer from "./footer";
import Header from "./header";

export default function Layout({ styles, children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}