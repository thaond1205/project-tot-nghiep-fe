import React, { useState, useEffect } from "react";
import api from "../../../services/api"
import { Divider, Table, Switch, Popconfirm, notification } from 'antd';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ListHotel(props) {

    const [hotels, setHotels] = useState([])

    useEffect(() => {
        getHotels();
    }, [])

    const getHotels = () => {

        api.get("/owner/hotels").then((res) => {
            console.log(res);
            if (res.data !== null) {
                setHotels(res.data.data);
            } else {
                console.log(res.message);
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const getImage = (image) => {
        var showImage = "";

        if (image.indexOf(",") !== -1) {
            var arr = image.split(",")
            showImage = arr[0]
        } else {
            showImage = image
        }
        return `http://localhost:8080/api/rest/files/image_hotels/${showImage}`
    }


    function confirm(item) {
        var config = {
            method: 'put',
            url: `/owner/hotels/${item.id}`,
            headers: {
                "content-type": "multipart/form-data",
            },

        };
        api(config).then(res => {
            const indexToUpdate = hotels.findIndex(
                (hotel) => hotel.id === item.id
            );
            const updateHotels = [...hotels]; // creates a copy of the array

            updateHotels[indexToUpdate].isEnabled = res.data.data.isEnabled
            setHotels(updateHotels);
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            notification["error"]({
                message: err.response.data.message,
            });
        })
    }

    const msgLockHotel = `Bạn có chắc muốn khóa `
    const msgOpenHotel = `Bạn có chắc muốn mở khóa `

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => <img alt="" width="100px" src={getImage(images)} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: text => <span>{text}</span>,
        },
        {
            title: 'Thành phố',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tổng số phòng',
            key: 'totalNumberRoom',
            dataIndex: 'totalNumberRoom',
            sorter: (a, b) => a.totalNumberRoom - b.totalNumberRoom
        },
        {
            title: 'Trạng thái',
            key: 'isEnabled',
            dataIndex: 'isEnabled',
            render: (isEnabled, record) => (
                <Popconfirm placement="right" title={record.isEnabled === 1 ? `${msgLockHotel} ${record.name}` : `${msgOpenHotel} ${record.name}`} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Switch checked={isEnabled} ></Switch>
                </Popconfirm>
            )
        },
        {
            title: 'Action',
            key: 'index',
            render: (text, record) => (
                <span>
                    <Link to={`/admin/hotel/update/${record.id}`}>Update {record.name}</Link>
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
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý cơ sở
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Danh sách cơ sở
                    </li>
                </ol>
            </nav>
            <hr />
            <Table columns={columns} dataSource={hotels} />
        </div>
    );
}

export default ListHotel;
