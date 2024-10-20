import { create } from "zustand";

// Define your Zustand store
const useStore = create((set) => ({
  // Initial state
  count: 0,
  previousPage: "/dashboard",
  jobTitle: "",
  jobDescription: "",
  userFullName: "",
  userEmailAddress: "",
  userPhoneNumber: "403-688-3933",
  userWebsite: "",
  userAddress: "",
  userDegree: [],
  userLanguage: [],

  // Actions to update the state
  setJobTitle: (title) => set((state) => ({ jobTitle: title })),
  setJobDescription: (description) =>
    set((state) => ({ jobDescription: description })),
  setPreviousPage: (page) => set((state) => ({ previousPage: page })),
  setUserFullName: (name) => set((state) => ({ userFullName: name })),
  setUserEmailAddress: (email) => set((state) => ({ userEmailAddress: email })),
  setUserPhoneNumber: (phone) => set((state) => ({ userPhoneNumber: phone })),
  setUserWebsite: (website) => set((state) => ({ userWebsite: website })),
  setUserAddress: (address) => set((state) => ({ userAddress: address })),
  setUserDegree: (degree) =>
    set((state) => ({
      userDegree: [
        ...state.userDegree,
        {
          degreeName: degree.degreeName,
          degreeInstitution: degree.degreeInstitution,
          degreeEndDate: degree.degreeEndDate,
          shortDesc: degree.shortDesc,
        },
      ],
    })),
  setUserLanguage: (language) =>
    set((state) => ({
      userLanguage: [
        ...state.userLanguage,
        {
          languageName: language.languageName,
          languagePercentage: language.languagePercentage,
        },
      ],
    })),
}));

export default useStore;
