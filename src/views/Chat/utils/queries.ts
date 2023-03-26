import { ROLES } from "@/services/graphql/types/enums";
import { DocumentNode, gql } from "@apollo/client";

const FETCH_MEDICAL_STAFF = gql`
  query GetMyMedicalStaff {
    getMyMedicalStaff {
      _id
      contextId
      avatar
      firstName
      lastName
      role
    }
  }
`;

const FETCH_MEDIC_AND_PATIENTS = gql`
  query GetMyPatientsAndMedic {
    getMyPatientsAndMedic {
      _id
      contextId
      avatar
      firstName
      lastName
      role
    }
  }
`;

const FETCH_NURSES_AND_PATIENTS = gql`
  query GetMyPatientsAndNurses {
    getMyPatientsAndNurses {
      _id
      contextId
      avatar
      firstName
      lastName
      role
    }
  }
`;

export const chatQueries: Record<ROLES, DocumentNode> = {
  [ROLES.MEDIC]: FETCH_NURSES_AND_PATIENTS,
  [ROLES.NURSE]: FETCH_MEDIC_AND_PATIENTS,
  [ROLES.PATIENT]: FETCH_MEDICAL_STAFF,
};
