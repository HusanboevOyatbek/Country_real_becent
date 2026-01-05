import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Modal, Space, Table, Tag } from 'antd';
import axios from 'axios';






const DestPage = () => {

  const [prods, setProds] = useState([]);

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
      title_uz: record.title_uz,
      title_en: record.title_en,
      title_ru: record.title_ru,
      title_tr: record.title_tr,

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
        await axios.put(`https://v1.turbotravel.uz/api/prods/${currentRecord.id}`, values, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`https://v1.turbotravel.uz/api/prods`, values, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
      }
      // refresh list and close
      getprods();
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

  async function getprods() {
    try {
      let res = await axios.get(`https://v1.turbotravel.uz/api/prods`)
      setProds(res.data.data)

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getprods()
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
      dataIndex: 'title_uz',
      key: 'title_uz',
      render: text => <>{text}</>,
    },
    {
      title: 'Ingilischa',
      dataIndex: 'title_en',
      key: 'title_en',
    },
    {
      title: 'Ruscha',
      dataIndex: 'title_ru',
      key: 'title_ru',
    },
    {
      title: 'Turkcha',
      dataIndex: 'title_tr',
      key: 'title_tr',
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
      Shahar qoshish
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
          name="title_uz"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ingilischa"
          name="title_en"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Ruscha"
          name="title_ru"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Turkcha"
          name="title_tr"
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


    <Table columns={columns} loading={loading} dataSource={prods} />
  </>)
};
export default DestPage;