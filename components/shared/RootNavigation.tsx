import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: any, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  navigationRef.isReady() && navigationRef.goBack();
};

export const reset = (name: any) => {
  navigationRef.isReady() && navigationRef.reset(name);
};
