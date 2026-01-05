import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { TbDirectionsFilled, TbFlagSearch } from 'react-icons/tb';
import { PiCityBold } from 'react-icons/pi';
import { FaHotel } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';
const { Header, Sider, Content } = Layout;
const Layoutadmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider style={{ height: "100vh", paddingTop: "20px" }} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div style={{display:"flex" , justifyContent:"center" , textAlign:"center"    }}>
                    <img style={{ maxWidth: "100%", width: "80px", height: "80px", borderRadius: "50%" , marginBottom:"20px" }} src="/imgs/countr.png" alt="" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <TbFlagSearch />,
                            label: <NavLink to={"countries"}>Countries</NavLink>,
                        },
                        {
                            key: '2',
                            icon: <PiCityBold />,
                            label: <NavLink to={"citys"}>citys</NavLink>,
                        },
                        {
                            key: '3',
                            icon: <FaHotel />,
                            label: <NavLink to={"hotels"}>Hotels</NavLink>,
                        },

                        {
                            key: '4',
                            icon: <MdOutlineTravelExplore />,
                            label: <NavLink to={"tours"}>Tours</NavLink>,
                        },


                        {
                            key: '5',
                            icon: <TbDirectionsFilled />,
                            label: <NavLink to={"dest"}>Destinations</NavLink>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        height:"80vh",
                        overflowY:"scroll",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Layoutadmin;