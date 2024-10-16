import { useEffect, useMemo, useState } from "react";
import { translations } from "../../helpers";
import { addHours, differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";
import { useCalendarStore } from "../../hooks";

export const useModal = ({lang}) => {

    

    return {
        formValues,
        locale,
        titleClass,
        onInputChange,
        onDateChanged,
        onSubmit,
    };
};