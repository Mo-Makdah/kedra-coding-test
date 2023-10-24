import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { paths } from "@/router/paths";
import BackArrowIcon from "@/components/icons/backArrowIcon";
import { Unit, UnitFormType } from "@/types/unit";
import { SelectOption } from "@/components/form/MUISelect";
import { Location } from "@/types/location";
import { getLocations } from "@/api/calls/location/getLocations.api";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import { getUnit } from "@/api/calls/unit/getUnit.api";
import { createUnit } from "@/api/calls/unit/createUnit.api";
import { updateUnit } from "@/api/calls/unit/updateUnit.api";
import UnitForm from "./UnitForm";
import { deleteUnit } from "@/api/calls/unit/deleteUnit.api";
import CompartmentsList from "./CompartmentsList";

const UnitDetailsPage = () => {
  const [unit, setUnit] = useState<Unit>();
  const [locations, setLocations] = useState<Location[]>();
  const [fetchError, setFetchError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const params = useParams();
  const unitId = params.id;

  const naviagate = useNavigate();

  const locationsOptions: SelectOption[] =
    locations?.map(({ id, address }) => ({
      value: id,
      label: address,
    })) ?? [];

  const getUnitHandler = async () => {
    if (!unitId) return;
    setFetchError("");
    const { data, errorMessage } = await getUnit(+unitId);

    if (data) {
      setUnit(data);
    } else {
      setFetchError(errorMessage);
    }
  };

  const getLocationsHandler = async () => {
    setFetchError("");

    const { data, errorMessage } = await getLocations();

    if (data) {
      setLocations(data);
      getUnitHandler();
    } else {
      setFetchError(errorMessage);
    }
  };

  const createUnitHandler = async (unit: UnitFormType) => {
    setSubmitLoading(true);
    setFormError("");

    const { data, errorMessage } = await createUnit(unit);
    if (data) {
      setUnit(data);
    } else {
      setFormError(errorMessage);
    }

    setSubmitLoading(false);
  };

  const updateUnitHandler = async (unit: UnitFormType) => {
    if (!unitId) {
      setFormError("Invalid unit ID");
      return;
    }
    setSubmitLoading(true);
    setFormError("");

    const { data, errorMessage } = await updateUnit(+unitId, unit);
    if (data) {
      setUnit(data);
    } else {
      setFormError(errorMessage);
    }

    setSubmitLoading(false);
  };

  const deleteUnitHandler = async () => {
    if (!unitId) {
      setFormError("Invalid unit ID");
      return;
    }
    setDeleteLoading(true);
    setFormError("");

    const { data, errorMessage } = await deleteUnit(+unitId);
    if (data) {
      setUnit(data);
      naviagate(paths.unitsPath);
    } else {
      alert(errorMessage);
    }

    setDeleteLoading(false);
  };

  const submitFormHandler = (unit: UnitFormType) => {
    const { locationId, macAddress, name } = unit;
    if (!locationId || !macAddress || !name) {
      setFormError("All fields are required");
      return;
    }

    if (unitId) {
      updateUnitHandler(unit);
    } else {
      createUnitHandler(unit);
    }
  };

  useEffect(() => {
    if ((unitId && +unitId < 1) || (unitId && isNaN(+unitId))) {
      setFetchError("Invalid unit ID");
      return;
    }

    getLocationsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <NavLink to={paths.unitsPath} className={styles.backButton}>
          <BackArrowIcon />
          <span>Details</span>
        </NavLink>
      </div>
      {fetchError ? (
        <div>{fetchError}</div>
      ) : (!!unitId && !unit) || !locations ? (
        <FullPageLoader />
      ) : (
        <>
          <div className={styles.title}>
            {unitId ? `Unit ID: ${unitId}` : "Create Unit"}
          </div>
          <UnitForm
            unit={unit}
            locationsOptions={locationsOptions}
            submitFormHandler={submitFormHandler}
            submitLoading={submitLoading}
            formError={formError}
            deleteLoading={deleteLoading}
            deleteUnitHandler={() => {
              deleteUnitHandler();
            }}
          />
          {!!unit && unitId && (
            <div className={styles.compartmentsListContainer}>
              <CompartmentsList
                compartments={unit?.compartments ?? []}
                setUnit={setUnit}
                unit={unit}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UnitDetailsPage;
