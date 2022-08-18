import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "./index";

export interface UserProps  extends StoreModuleType<StateType>{
    state: StateType;
    mutations: {
        setUserName: Mutation<StateType>;
      };
      actions: {
      };
}
export interface StateType {
    isLogin: boolean;
    userName?: string;
}
const initState: StateType={
    isLogin: true,
    userName:"11111"
}
//createStore接收一个泛型来定义根state的类型
const StoreModel: UserProps = {
    namespaced: true,
    name: 'user',
    state: {
        ...initState
    },
    mutations: {
        setUserName(state, payload) {
            state.userName = payload;
        },

    },
    actions:{}
};

export default StoreModel;
