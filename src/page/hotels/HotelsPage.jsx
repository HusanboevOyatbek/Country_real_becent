import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Modal, Space, Table, Tag } from 'antd';
import axios from 'axios';






const HotelsPage = () => {

  const [hotels, setHotels] = useState([]);

  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  //**Modal str */
  const showModal = () => {
    setIsEditing(false);
    setCurrentRecord(null);
    form.resetFields();
    setIsModalOpen(true)
  };

  const showEditModal = (record) => {
    setIsEditing(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      name_uz: record.name_uz,
      name_en: record.name_en,
      name_ru: record.name_ru,
      name_tr: record.name_tr,
    });
    setIsModalOpen(true);
  };

  const hadleOk = () => {
    setIsModalOpen(false);
  };

  const heandleOK = () => {
    setIsModalOpen(false)
  }
  //**Madal ent */
  //** Add Teachers str */
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let token = localStorage.getItem("token")
    try {
      if (isEditing && currentRecord) {
        await axios.put(`https://v1.turbotravel.uz/api/hotels/${currentRecord.id}`, values, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`https://v1.turbotravel.uz/api/hotels`, values, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
      }
      // refresh list and close
      gethotels();
      setIsModalOpen(false);
      form.resetFields();
      setIsEditing(false);
      setCurrentRecord(null);
    } catch (err) {
      console.log(err);

    }

  }


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  //** Add Teachers end */

  async function gethotels() {
    try {
      let res = await axios.get(`https://v1.turbotravel.uz/api/hotels`)
      setHotels(res.data.data)

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    gethotels()
  }, [])



  const columns = [

    {
      title: "Rasim",
      dataIndex: "image_src",
      key: "image_src",
      render: (text) => <img src={text} alt="rasim" />
    },


    {
      title: "O'zbekcha",
      dataIndex: 'name_uz',
      key: 'name_uz',
      render: text => <>{text}</>,
    },
    {
      title: 'Ingilischa',
      dataIndex: 'name_en',
      key: 'name_en',
    },
    {
      title: 'Ruscha',
      dataIndex: 'name_ru',
      key: 'name_ru',
    },
    {
      title: 'Turkcha',
      dataIndex: 'name_tr',
      key: 'name_tr',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (<>
    <Button type="primary" onClick={showModal}>
      Mexmon hona qoshish
    </Button>

    <Modal
      title="Basic Modal"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={hadleOk}
      onCancel={heandleOK}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        name="basic"
        labelCol={{ span: 32 }}
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >


        <Form.Item
          type="file"
          label="Rasim tanlang"
          name="images"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>



        <Form.Item
          label="O'zbekcha"
          name="name_uz"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ingilischa"
          name="name_en"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Ruscha"
          name="name_ru"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Turkcha"
          name="name_tr"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>



        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {isEditing ? 'Save' : 'Submit'}
          </Button>
        </Form.Item>

      </Form>
    </Modal>


    <Table columns={columns} loading={loading} dataSource={hotels} />
  </>)
};
export default HotelsPage;