import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import "./style.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);


        try {
            let { data } = await axios.post("https://v1.turbotravel.uz/api/auth/signin", values);
            const token = data.data.tokens.accessToken.token;
            localStorage.setItem("token", token)
            navigate("/countries")
            toast.success("Muafaqiyatli Login")
        } catch (err) {
            console.log(err);
            toast.error("Iltimos Logini tekshiring")
        }

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className='form'>
            <Form
                layout='vertical'
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="PhoneNamber"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item label={null}>
                    <Button className='login-btn' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default LoginPage;