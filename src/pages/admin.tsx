/* eslint-disable no-console */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { Form } from "src/components/form";
import { Layout } from "src/components/layout";
import { Panels } from "src/components/panel";
import { supabase } from "src/lib/supabaseClient";

const AdminContainer = ({ children }: { children: React.ReactNode }) => {
  const { user } = Auth.useUser();
  const [select, setSelect] = useState<number>(0);

  const deletePanel = async (id: number) => {
    const { data, error } = await supabase.from("panels").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log(data);
    setSelect(0);
  };

  const toggleFinish = async (id: number) => {
    const { data, error } = await supabase.from("panels").select("*").eq("id", id);
    if (error) {
      console.log(error);
    }
    if (data && data.length != 0) {
      const current = data[0].finished;
      await supabase.from("panels").update({ finished: !current }).eq("id", id);
    }
    setSelect(0);
  };

  if (user)
    return (
      <>
        <p className="text-center bg-red-100 text-gray-500 text-lg w-full mb-4">Admin Mode</p>
        <div className="sticky top-0 bg-gray-50 mb-2">
          <div className="grid grid-cols-2 justify-items-stretch mr-2 ml-2">
            <button
              className="bg-blue-100 m-2 text-gray-500 h-10 text-lg rounded-2xl border-blue-200 border-2"
              onClick={() => {
                toggleFinish(select);
              }}
            >
              Toggle Status
            </button>
            <button
              className="bg-blue-100 m-2 text-gray-500 h-10 text-lg rounded-2xl border-blue-200 border-2"
              onClick={() => {
                deletePanel(select);
              }}
            >
              Delete
            </button>
          </div>
          <Form />
          <hr className="mt-4" />
        </div>
        <Panels select={select} setSelect={setSelect} />
        <div className="flex justify-end m-4 h-10">
          <button
            className="justify-end bg-blue-100 text-center text-gray-500 text-lg w-40 rounded-xl"
            onClick={() => {
              return supabase.auth.signOut();
            }}
          >
            Sign out
          </button>
        </div>
      </>
    );
  return <> {children}</>;
};

const Admin = () => {
  return (
    <Layout>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <AdminContainer>
          <div className="mr-2 ml-2">
            <Auth supabaseClient={supabase} />
          </div>
        </AdminContainer>
      </Auth.UserContextProvider>
    </Layout>
  );
};

export default Admin;
