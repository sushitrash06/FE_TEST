import React, { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Button from "../../component/atom/button";
import TableMasterGate from "../../component/organism/gate-master-table";
import GerbangForm from "../../component/organism/gerbang-form";
import InputSearch from "../../component/atom/input-search";
import { ToastContainer } from "react-toastify";

const MasterGerbang: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const [keyword, setKeyword] = useState("");

  console.log(keyword);
  return (
    <div>
      <ToastContainer />
      <div className="mb-4 flex justify-between">
        <InputSearch
          onSearch={(e) => {
            setKeyword(e);
          }}
        />
        <Button
          variant="secondary"
          label="Tambah"
          icon={<IoMdAdd />}
          onClick={openModal}
        />
      </div>
      <GerbangForm setIsOpen={setIsOpen} show={isOpen} />
      <TableMasterGate keyword={keyword} />
    </div>
  );
};

export default MasterGerbang;
