import { atom } from "recoil";

export const activeUser = atom({
  key: "activeUser",
  default: {
    complete: false,
    selectType: false,
    userData: false,
    selectWorkshops: [],
  },
});

export const userListState = atom({
  key: "userListState",
  default: [],
});

export const stepState = atom({
  key: "stepState",
  default: 1,
});

export const userFormSubmitState = atom({
  key: "userFormSubmitState",
  default: false,
});

export const userFormSaveState = atom({
  key: "userFormSaveState",
  default: false,
});

export const statusState = atom({
  key: "statusState",
  default: false,
});
