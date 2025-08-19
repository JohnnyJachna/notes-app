import { Footer, FooterCopyright } from "flowbite-react";

const AppFooter = () => {
  return (
    <Footer container className="mt-auto">
      <div className="w-full flex justify-center">
        <FooterCopyright year={new Date().getFullYear()} />
      </div>
    </Footer>
  );
};

export default AppFooter;
