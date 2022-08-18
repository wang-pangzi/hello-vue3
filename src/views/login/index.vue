<template>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="账号" name="name" :rules="[{ required: true, message: '请输入账号' }]">
            <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
interface FormState {
    name: string;
    password: string;
}
export default defineComponent({
    setup() {
        const formState = reactive<FormState>({
            name: '',
            password: '',
        });
        const onFinish = (values: any) => {
            console.log('Success:', values);
            axios.get('api/user/login?name='+values.name+'&password='+values.password, values).then(res => {
                    message.success ('登录成功');           
            }).catch(err =>{
                message.error('账号或密码错误');
            })

        }


        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);

        };
        return {
            formState,
            onFinishFailed,
            onFinish
        };
    },
});
</script>