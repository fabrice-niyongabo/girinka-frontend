import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { cilPen, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { errorHandler, toastMessage } from "src/helpers";
import { setShowFullPageLoader } from "src/actions/app";
import EditCandidate from "./edit-candidate";
const StolenCows = () => {
  const dispatch = useDispatch();
  const { token, roleId } = useSelector((state) => state.user);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/reports/sick/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCandidates(
            res.data.cows.filter(
              (item) =>
                item.cellApproval === "Approved" &&
                item.sectorApproval === "Approved"
            )
          );
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Sick Cows</strong>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Names</th>
                        <th>ID Number</th>
                        <th>Cow Number</th>
                        <th>Stolen Date</th>
                        <th>Description</th>
                        <th>Sector</th>
                        <th>Cell</th>
                        <th>Village</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.candidate?.names}</td>
                          <td>{item?.candidate?.idNo}</td>
                          <td>{item?.cow?.cowNumber}</td>
                          <td>{item?.date}</td>
                          <td>{item?.description}</td>
                          <td>{item?.sector}</td>
                          <td>{item?.cell}</td>
                          <td>{item?.village}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <EditCandidate
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editItem={editItem}
        fetchData={fetchData}
        token={token}
      />
    </>
  );
};

export default StolenCows;
