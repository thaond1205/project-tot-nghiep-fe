import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Table, Switch, Popconfirm, Col, Form, Select, Tag, Row, notification, Popover, Image } from 'antd';



const { Option } = Select
function ListRoom(props) {

    const [rooms, setRooms] = useState([])
    const [hotels, setHotels] = useState([])
    const [idHotel, setIdHotel] = useState(0)
    const [idTypeRoom, setIdTypeRoom] = useState(null)
    const [typeRooms, setTypeRooms] = useState([])

    useEffect(() => {
        getHotels();
        getTypeRooms();
        if (idHotel !== 0) {
            getRooms();
        }
    }, [idHotel, idTypeRoom])

    const getTypeRooms = () => {
        api.get("/owner/typerooms").then(res => {
            setTypeRooms(res.data.data)
        })
    }

    const getHotels = () => {
        api.get("/owner/hotels").then(res => {
            setHotels(res.data.data)
        })
    }

    const getRooms = () => {
        const config = {
            params: {
                idHotel, idTypeRoom
            }
        }
        api.get("/owner/rooms", config).then((res) => {
            console.log(res);
            if (res.data !== null) {
                setRooms(res.data.data);
            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }



    function confirm(item) {
        var config = {
            method: 'put',
            url: `/owner/rooms/${item.id}`,
        };
        api(config).then(res => {
            console.log(res);

            const indexToUpdate = rooms.findIndex(
                (room) => room.id === item.id
            );
            const updateRooms = [...rooms]; // creates a copy of the array
            updateRooms[indexToUpdate].enabled = res.data.data.enabled
            updateRooms[indexToUpdate].description = res.data.data.description
            setRooms(updateRooms);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    const msgLockRoom = `B???n c?? ch???c mu???n kh??a ph??ng `
    const msgOpenRoom = `B???n c?? ch???c mu???n m??? kh??a ph??ng `

    const getImageTienIch = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_utilities/${image}`
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'T??n ph??ng',
            dataIndex: 'numberRoom',
            key: 'numberRoom',
        },
        {
            title: 'T??nh tr???ng ph??ng',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'M?? t??? ph??ng',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Th??? lo???i ph??ng',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
            render: nameTypeRoom => {
                let color;
                if (nameTypeRoom === "Ph??ng ????n") {
                    color = 'geekblue'
                } else if (nameTypeRoom === "Ph??ng ????i") {
                    color = 'green'
                }
                else if (nameTypeRoom === "Ph??ng vip") {
                    color = 'red'
                }
                return (
                    <Tag color={color} key={nameTypeRoom}>
                        {nameTypeRoom !== null ? nameTypeRoom.toUpperCase() : ""}
                    </Tag>
                )
            }
        },
        {
            title: 'Tr???ng th??i',
            key: 'enabled',
            dataIndex: 'enabled',
            render: (enabled, record) => (
                <Popconfirm placement="right" title={record.enabled ? `${msgLockRoom} ${record.numberRoom}` : `${msgOpenRoom} ${record.numberRoom}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checked={record.enabled} >
                    </Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Ti???n ??ch ph??ng',
            key: '1',
            dataIndex: 'imagesTienIch',
            render: (imagesTienIch, record, index) => {
                return (
                    <Popover
                        placement="left"
                        title={`Chi ti???t ti???n ??ch ph??ng`}
                        content={() => (
                            imagesTienIch.map((item, idx) => (
                                <p key={idx}>
                                    <Image width={150} src={getImageTienIch(item)} />
                                </p>
                            ))
                        )}
                        trigger="hover"
                    >
                        <a href="#!">Chi ti???t ti???n ??ch </a>
                    </Popover>
                )
            },
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
                        Qu???n l?? ph??ng
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh s??ch ph??ng
                    </li>
                </ol>
            </nav>
            <hr />
            <Row >
                <Col span={8} key={5}>
                    <Form.Item
                        name="gender"
                        label="Ch???n c?? s???"
                    >
                        <Select placeholder="Ch???n c?? s???" onChange={(id) => setIdHotel(id)}>
                            {hotels.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={8} key={7}>

                </Col>

                <Col span={8} key={6}>
                    <Form.Item
                        label="Ch???n lo???i ph??ng"
                    >
                        <Select placeholder="Ch???n lo???i ph??ng" onChange={(id) => setIdTypeRoom(id)}>
                            <Option key={Math.random().toString()} value={null}>T???t c??? lo???i ph??ng</Option>
                            {typeRooms.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Table columns={columns} dataSource={rooms} />
        </div>
    );
}

export default ListRoom;
