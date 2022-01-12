import React, { useState } from "react";
import { Upload, notification, Card, Form, Input, Button, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from '../../../services/api'


const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};


function CreateBranch() {
    const [form] = Form.useForm();
    const [listFile, setListFile] = useState([])
    const [hotel, setHotel] = useState({
        name: "",
        city: "",
        address: "",
        totalNumberRoom: 0
    })

    const formValue = {
        name: "",
        city: "",
        address: "",
        totalNumberRoom: 0
    }

    const handleChange = ({ fileList }) => {
        setListFile(fileList)
    };


    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setHotel({ ...hotel, [name]: value })
    };

    function onChangeNumber(value) {
        setHotel({ ...hotel, totalNumberRoom: value })
    }

    const resetForm = () => {
        setHotel(formValue)
    }

    function insert() {
        var data = new FormData();
        data.append("hotel", JSON.stringify(hotel))
        for (let i = 0; i < listFile.length; i++) {
            data.append('file', listFile[i].originFileObj);
        }
        var config = {
            method: 'post',
            url: '/owner/hotels/image_hotels',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
            resetForm();
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err.response);
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        insert();

        form.resetFields();
    };

    const [componentSize] = useState('default');

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý cơ sở
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thêm cơ sở
                    </li>
                </ol>
            </nav>
            <hr />
            <Card className="main-container">
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >

                    <Form.Item label="Tên cơ sở" name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống tên cơ sở!',
                            },
                        ]}>
                        <Input name="name" onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Thành phố" name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống thành phố!',
                            },
                        ]}>
                        <Input name="city" onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống địa chỉ!',
                            },
                        ]}>
                        <Input name="address" onChange={onChange} />
                    </Form.Item>

                    <Form.Item label="Tổng số phòng" name="totalNumberRoom"
                        rules={[
                            {
                                required: true,
                                message: 'Không được bỏ trống số phòng trong khách sạn!',
                            },
                        ]}>
                        <InputNumber name="totalNumberRoom" onChange={onChangeNumber} />
                    </Form.Item>

                    <Form.Item label="Ảnh khách sạn" name="image">
                        <Upload
                            multiple={true}
                            customRequest={dummyRequest}
                            onChange={handleChange}
                            listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm khách sạn
                        </Button>
                    </Form.Item>

                </Form>
            </Card>

        </div>
    );
}

export default CreateBranch;
