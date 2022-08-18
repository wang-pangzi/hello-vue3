import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "./index";
export interface StateType {
  theme?: string;
}
export interface globalProps  extends StoreModuleType<StateType>{
  state: StateType;
  mutations: {
    setTheme: Mutation<StateType>;
    };
    actions: {
    };
}
const initState = {
  theme: "settings.theme",
};

const StoreModel :globalProps= {
  namespaced: true,
  name: 'global',
  state: {
    ...initState
  },
  mutations: {
    setTheme(state, payload) {
      state.theme = payload;
    },
  },
  actions: {}
}



export default StoreModel;
