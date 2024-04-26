
import { NotificationOutlined } from "@ant-design/icons";
import {
    useGetIdentity
} from "@refinedev/core";
import { Realtime } from 'ably';
import { useChannel } from "ably/react";
import {
    Layout as AntdLayout,
    Avatar,
    Badge,
    Button,
    Checkbox,
    Col,
    Grid,
    Row,
    Space,
    Typography,
    theme
} from "antd";
import { useEffect, useState } from 'react';
const { Header: AntdHeader } = AntdLayout;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const Header = () => {
  const { token } = useToken();
  const { data: user } = useGetIdentity();
  const screens = useBreakpoint();
  const photoobj = user?.photo?.url || "";
  const [myphoto, setMyphoto] = useState(photoobj ? `http://localhost:1337${photoobj}` : "");
  const [showPopup, setShowPopup] = useState(false);
  const API_KEY = process.env.REACT_APP_ABLY_API_KEY;
  const CHANNEL_NAME = process.env.REACT_APP_ABLY_CHANNEL_NAME;
  // const ably = new Realtime({ key: API_KEY });
  // const channel = ably.channels.get(CHANNEL_NAME);
  // const [notifications, setNotifications] = useState(() => {
  //   // Load notifications from local storage or initialize an empty array
  //   const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
  //   return storedNotifications.map((notification) => ({ ...notification, read: false, selected: false }));
  // });
  //const [readStatus, setReadStatus] = useState(notifications.map(() => false));
  //const [selectedNotification, setSelectedNotification] = useState(null);

  // useEffect(() => {
  //   const ably = new Realtime({ key: API_KEY });
  //   const channel = ably.channels.get(CHANNEL_NAME);
  //   const handleNotification = (message) => {
  //       
  //     setNotifications((prevNotifications) => [
  //       ...prevNotifications,
  //       { ...message.data, read: false, selected: false },
  //     ]);
  //   };
  //   // Subscribe to the 'notification' channel
  //   channel.subscribe('sdltest', handleNotification);
  //   return () => {
  //     channel.unsubscribe();
  //     ably.close();
  //   };
  // }, []);

  // const handleNotificationIconClick = () => {
  //   setSelectedNotification(null);
  //   setShowPopup(!showPopup);
  // };

  // const handleViewDetails = (index) => {
  //   setNotifications((prevNotifications) => {
  //     const updatedNotifications = prevNotifications.map((notification, i) => ({
  //       ...notification,
  //       selected: i === index ? !notification.selected : false,
  //     }));
  //     return updatedNotifications;
  //   });
  // };

 

//   const handleMarkAsRead = (index) => {
//     setNotifications((prevNotifications) => {
//       const updatedNotifications = [...prevNotifications];
//       const readNotification = updatedNotifications[index];

//       // Remove the read notification from the array
//       const filteredNotifications = updatedNotifications.filter((notification) => notification !== readNotification);

//       // Save updated notifications to local storage
//       localStorage.setItem('notifications', JSON.stringify(filteredNotifications));

//       return filteredNotifications;
//     });
//   };
//   useChannel('sdltest', (message) => {
//     
//     setNotifications((prevNotifications) => [
//         ...prevNotifications,
//         { ...message.data, read: false, selected: false },
//       ]);
// });
  return (
    <AntdHeader
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? "space-between" : "end",
        }}
      >
        <Col xs={0} sm={12}>
        </Col>
        <Col>
          <Space size="middle" align="center">
            {/* <div>
              <Badge count={notifications.filter((notification) => !notification.read).length}>
                <NotificationOutlined onClick={handleNotificationIconClick} style={{ fontSize: '20px', cursor: 'pointer' }} />
              </Badge>
              
              {showPopup && (
                <div style={{ border: '1px solid #ccc', padding: '10px', position: 'absolute', top: '50px', right: '0', zIndex: 2, maxHeight: '400px', overflowY: 'auto' }}>
                  <ul>
                    {notifications.map((notification, index) => ( !notification.read && (
                      <li key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '5px', justifyContent: 'space-between' }}>
                        <strong>Name:</strong> {notification.name}<br />
                        <div>
                          <Checkbox checked={notification.read} onChange={() => handleMarkAsRead(index)}>
                    Mark as Read
                  </Checkbox>
                          <Button onClick={() => handleViewDetails(index)}>{notification.selected? '-' : '+'}</Button>
                        </div>
                        {notification.selected && (
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      <h3>Selected Notification Details:</h3>
                      <pre>{JSON.stringify(notification, null, 2)}</pre>
                    </div>
                  )}
                      </li>
                    )))}
                  </ul>
                </div>
              )}
            </div> */}
            <Text
              ellipsis
              strong
              style={{
                display: "flex",
              }}
            >
              {user?.email}
            </Text>
            <Avatar
              size="large"
              src={myphoto}
              alt={user?.email}
            />
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
export default Header;