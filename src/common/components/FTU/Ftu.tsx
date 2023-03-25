import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import ReactJoyride, { CallBackProps, STATUS } from "react-joyride";
import useGetFtuSteps from "./hooks/useGetFtuSteps";
import FtuTooltip from "./components/FtuTooltip";
import { gql, useMutation } from "@apollo/client";
import { SET_USER_DATA } from "@/services/redux/slices/userSlice";

const COMPLETE_FTU = gql`
  mutation CompleteFTU {
    completeFTU
  }
`;

const Ftu: React.FC = () => {
  const steps = useGetFtuSteps();
  const { completedFTU } = useAppSelector((store) => store.user) ?? {};
  const [completeFtu] = useMutation(COMPLETE_FTU);
  const dispatch = useAppDispatch();

  const handleJoyrideCallback = useCallback(
    async ({ status }: CallBackProps) => {
      // @ts-ignore
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        await completeFtu();
        dispatch(SET_USER_DATA({ completedFTU: true }));
      }
    },
    []
  );

  return (
    <>
      <ReactJoyride
        styles={{ options: { zIndex: 99999 } }}
        run={!completedFTU}
        continuous
        showSkipButton
        hideBackButton
        disableCloseOnEsc
        disableOverlayClose
        hideCloseButton
        steps={steps}
        tooltipComponent={FtuTooltip}
        callback={handleJoyrideCallback}
        disableScrolling
      />
    </>
  );
};

export default Ftu;
