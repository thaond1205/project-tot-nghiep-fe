import { Card, Form, Row, Input, Col, Upload, Button, notification, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../../services/api'


const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};
function AddUtilities(props) {

    const [form] = Form.useForm();
    const [tienIch, setTienIch] = useState({
        name: "",
        price: 0,
    })
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setLoading({
                    loading: false,
                    imageUrl,
                    imageName: info.file.originFileObj
                })
            );
        }

    };

    function insert() {
        var data = new FormData();
        data.append("utility", JSON.stringify(tienIch))
        if (loading.imageName) {
            data.append('file', loading.imageName);
        }
        var config = {
            method: 'post',
            url: '/owner/utilities/image_utilities',
            headers: {
                "content-type": "multipart/form-data",
            },
            data: data
        };
        api(config).then(res => {
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
    const [loading, setLoading] = useState({
        loading: false
    })

    const uploadButton = (
        <div>
            {loading.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (

        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Qu???n l?? ti???n ??ch
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Th??m ti???n ??ch
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Th??m ti???n ??ch
            </h3>
            <hr />
            <Card>
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{

                        prefix: '84',
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row>

                        <Col span={18} key={1}>
                            <Form.Item label="T??n" name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kh??ng ???????c b??? tr???ng t??n!',
                                    },
                                ]}>
                                <Input onChange={(e) => setTienIch({ ...tienIch, name: e.target.value })} name="name" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={2}>
                            <Form.Item label="Gi?? " name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kh??ng ???????c b??? tr???ng gi??!',
                                    },
                                ]}>
                                <InputNumber onChange={(val) => setTienIch({ ...tienIch, price: val })} name="price" />
                            </Form.Item>
                        </Col>
                        <Col span={18} key={3}>
                            <Form.Item label="???nh " name="image"
                            >
                                <Upload
                                    multiple={false}
                                    customRequest={dummyRequest}
                                    onChange={handleChange}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}>

                                    {loading.imageUrl ? <img src={loading.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    {/* <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div> */}
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ghost type="primary" htmlType="submit" style={{ marginLeft: '130px' }}>
                            Th??m ti???n ??ch
                        </Button>
                    </Form.Item>


                </Form>

            </Card>
        </div>
    );
}

export default AddUtilities;
