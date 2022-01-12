import React, { useEffect, useState } from "react";
import { notification, Card, Form, Input, Button, InputNumber, Image } from "antd";
import api from '../../../services/api'
import { Link } from "react-router-dom";


function EditHotel(props) {
    const { match, history } = props;

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)
    const [hotel, setHotel] = useState({
        name: "",
        city: "",
        address: "",
        totalNumberRoom: 0,
        images: ""
    })

    useEffect(() => {
        const getHotelById = () => {
            api.get(`/owner/hotels/${match.params.id}`).then(res => {
                console.log(res);
                setHotel(res.data.data)
                setLoading(true)

            });
        }
        getHotelById();
    }, [match.params.id])



    useEffect(() => {
        form.setFieldsValue({
            name: hotel.name,
            city: hotel.city,
            address: hotel.address,
            totalNumberRoom: hotel.totalNumberRoom,
        });
        var arr = hotel.images.split(",")
        setFileList(arr)
    }, [loading])


    const onChange = (event) => {
        const target = event.target;
        let name = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;
        setHotel({ ...hotel, [name]: value })
    };

    function onChangeNumber(value) {
        setHotel({ ...hotel, totalNumberRoom: value })
    }



    function update() {
        var config = {
            method: 'put',
            url: '/owner/hotels',
            data: hotel
        };
        api(config).then(res => {
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err);
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const onFinish = () => {
        update();
        form.resetFields();
        setFileList([])
        history.goBack();
    };

    const getImage = (image) => {

        return `http://localhost:8080/api/rest/files/image_hotels/${image}`
    }

    const [componentSize] = useState('default');


    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#!">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý cơ sở
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Sửa cơ sở
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
                        name: hotel.name
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
                        <Input disabled name="name" onChange={onChange} />
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
                        <Input name="address" value={hotel.address} onChange={onChange} />
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

                    <Form.Item label="Ảnh khách sạn" name="image" valuePropName="fileList">
                        {
                            fileList.map((item, index) => (
                                <Image key={index}
                                    width={100}
                                    height={70}
                                    src={getImage(item)}
                                />
                            ))
                        }

                        {/* <Upload
                            multiple={true}
                            customRequest={dummyRequest}
                            onChange={handleChange}
                            itemRender={fileList}
                            listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload> */}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sửa khách sạn
                        </Button>
                        <Link style={{ marginLeft: "20px" }} className="ant-btn ant-btn-danger" to="/admin/hotel">
                            Quay lại
                        </Link>
                    </Form.Item>

                </Form>
            </Card>
        </>
    );
}

export default EditHotel;