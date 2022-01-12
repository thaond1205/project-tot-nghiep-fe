import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { Card } from "antd";
import axios from "axios";
const { Meta } = Card;

function AppFeature() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/owner/hotels").then((res) => {
      console.log(res);
      setHotels(res.data.data);
    });
  }, []);

  const getImage = (image) => {
    var showImage = "";

    if (image.indexOf(",") !== -1) {
      var arr = image.split(",");
      showImage = arr[0];
    } else {
      showImage = image;
    }
    return `http://localhost:8080/api/rest/files/image_hotels/${showImage}`;
  };

  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Danh sách khách sạn</h2>
          <p>Các thương hiệu khách sạn đối tác hàng đầu</p>
        </div>
        <Row gutter={[16, 16]}>
          {hotels.map((item, index) => (
            <Col
              key={index}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
            >
              <Card
                hoverable
                cover={
                  <img
                    height={240}
                    width={300}
                    alt="Modern Design"
                    src={getImage(item.images)}
                  />
                }
              >
                <Meta title={item.name} />
                <Meta title={`Thành phố ${item.city}`} />
              </Card>
            </Col>
          ))}

          {/* <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image2} />}>
              <Meta title="Clean and Elegant" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image3} />}>
              <Meta title="Great Support" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image4} />}>
              <Meta title="Easy to customise" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image5} />}>
              <Meta title="Unlimited Features" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card hoverable cover={<img alt="Test" src={image6} />}>
              <Meta title="Advanced Options" />
            </Card>
          </Col> */}
        </Row>
      </div>
    </div>
  );
}

export default AppFeature;
