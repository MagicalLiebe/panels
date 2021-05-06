import type { VFC } from "react";
import { useState } from "react";
import { Form } from "src/components/form";
import { Layout } from "src/components/layout";
import { Panels } from "src/components/panel";

const Home: VFC = () => {
  const [select, setSelect] = useState<number>(0);

  return (
    <Layout>
      <Form />
      <Panels select={select} setSelect={setSelect} />
    </Layout>
  );
};

export default Home;
