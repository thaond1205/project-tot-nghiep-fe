import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Divider, Table, Switch, Popconfirm, Col, Form, Select, Tag } from 'antd';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const { Option } = Select
function ListRoom(props) {

    const [rooms, setRooms] = useState([])
    const [hotels, setHotels] = useState([])
    const [idHotel, setIdHotel] = useState(0)

    useEffect(() => {
        const getHotels = () => {
            api.get("/owner/hotels").then(res => {
                setHotels(res.data.data)
            })
        }
        const getRooms = () => {
            const config = {
                params: {
                    id: idHotel
                }
            }
            api.get("/owner/rooms", config).then((res) => {
                console.log(res);
                if (res.data !== null) {
                    setRooms(res.data.data);
                } else {
                    console.log(res.message);
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
        getHotels();
        if (idHotel !== 0) {
            getRooms();
        }
    }, [idHotel])




    function confirm(item) {
        // console.log(item);
        // const setIsEnabled = item.isEnabled === 0 ? 1 : 0;
        // item.isEnabled = setIsEnabled;
        // var data = new FormData();
        // data.append("hotel", JSON.stringify(item))

        // var config = {
        //     method: 'put',
        //     url: `/owner/hotels/image_hotels/${item.id}`,
        //     headers: {
        //         "content-type": "multipart/form-data",
        //     },
        //     data: data
        // };
        // api(config).then(res => {

        //     const indexToUpdate = hotels.findIndex(
        //         (hotel) => hotel.id === item.id
        //     );
        //     const updateHotels = [...hotels]; // creates a copy of the array

        //     updateHotels[indexToUpdate].isEnabled =
        //         item.isEnabled === 0 ? 0 : 1;
        //     setHotels(updateHotels);
        //     notification["success"]({
        //         message: res.data.message,
        //     });
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    const msgLockHotel = `Bạn có chắc muốn khóa `
    const msgOpenHotel = `Bạn có chắc muốn mở khóa `

    const columns = [

        {
            title: 'Tên phòng',
            dataIndex: 'numberRoom',
            key: 'numberRoom',
        },
        {
            title: 'Mô tả phòng',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Thể loại phòng',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
            render: nameTypeRoom => {
                let color = nameTypeRoom === "Phòng đơn" ? 'geekblue' : 'green';
                return (
                    <Tag color={color} key={nameTypeRoom}>
                        {nameTypeRoom !== null ? nameTypeRoom.toUpperCase() : ""}
                    </Tag>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'isEnabled',
            dataIndex: 'isEnabled',
            render: (enabled, record) => (
                <Popconfirm placement="right" title={record.isEnabled === 1 ? `${msgLockHotel} ${record.name}` : `${msgOpenHotel} ${record.name}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checked={record.enabled} >
                    </Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link>Update {`Phòng ${record.numberRoom}`} </Link>
                    <Divider type="vertical" />
                </span>
            ),
        },
    ];



    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#!">Admin</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý phòng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <Col span={8} key={5}>
                <Form.Item
                    name="gender"
                    label="Chọn cơ sở"
                >
                    <Select placeholder="Chọn cơ sở" onChange={(id) => setIdHotel(id)}>
                        {hotels.map((item, index) => (
                            <Option key={index} value={item.id}>{item.city}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Table columns={columns} dataSource={rooms} />
        </div>
    );
}

export default ListRoom;
