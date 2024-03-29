import { cilPen, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";

function CowItem({
  item,
  index,
  setEditItem,
  setShowEditModal,
  deleteCow,
  handleSelect,
  cowsToSend,
}) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="form-check"
          disabled={item.isTransfered}
          onChange={(e) => handleSelect(e, item)}
          checked={cowsToSend.find((i) => i._id == item._id) ? true : false}
        />
      </td>
      <td>{index + 1}</td>
      <td>{item.cowNumber}</td>
      <td>{item.cowType}</td>
      <td>{item.registrationStatus}</td>
      <td>{item.registrationKg}</td>
      <td>{item.supplierName}</td>
      <td>{item.district.toUpperCase()}</td>
      <td>{item.isTransfered ? "Transfered" : "Not Transfered"}</td>
      <td>{item.isReceived ? "Yes" : "No"}</td>
      <td>
        <button
          onClick={() => {
            setEditItem(item);
            setShowEditModal(true);
          }}
          className="btn btn-primary"
        >
          <CIcon icon={cilPen} />
        </button>
        &nbsp;
        <button
          onClick={() => {
            deleteCow(item._id);
          }}
          className="btn btn-danger"
        >
          <CIcon icon={cilTrash} />
        </button>
      </td>
    </tr>
  );
}

export default CowItem;
