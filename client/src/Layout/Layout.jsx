import { useState } from "react";
import { Sidebar } from "../Component";
import { AccountSettings } from "../Page";
const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-screen w-full dark:bg-dark">
      <div className="flex gap-5 p-5 h-full">
        <Sidebar setIsModalOpen={setIsModalOpen} />
        <main className="w-full h-full">
          <div className="border border-defaultBorder w-full h-full shadow-lg dark:border-defaultBorderDark dark:bg-gray rounded-xl">
            <div className="py-6">{children}</div>
          </div>
        </main>
      </div>
      <AccountSettings
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Layout;
