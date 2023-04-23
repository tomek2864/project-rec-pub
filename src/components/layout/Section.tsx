import { FC, ReactNode } from "react";

const Section: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <section className="layout py-12 my-auto flex flex-col items-center justify-center text-center">
      {children}
    </section>
  );
};

export default Section;
