// NotificationPage.js
import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setNotifications } from '../redux/features/userSlice';
import axios from 'axios';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/get-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        // Ensure notifications are always set as an array
        dispatch(setNotifications({
          unreadNotifications: [], // empty the unread notifications
          readNotifications: Array.isArray(res.data.notifications) ? res.data.notifications : [], // make sure it's an array
        }));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/delete-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        // Remove all read notifications from Redux state, ensure it's an array
        dispatch(setNotifications({
          unreadNotifications: user.notification, // keep unread notifications as they are
          readNotifications: [], // clear all read notifications
        }));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong in notifications");
    }
  };

  return (
    <Layout>
      <h5 className="text-center">Notification Page</h5>
      <div style={{ padding: '0px 1rem' }}>
        <Tabs>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <p
                className="p-2"
                style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </p>
            </div>
            {Array.isArray(user?.notification) && user?.notification.map((notificationMsg) => (
              <div style={{ padding: '0 1rem' }}>
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <p
                className="p-2"
                style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </p>
            </div>
            {Array.isArray(user?.seennotification) && user?.seennotification.map((notificationMsg) => (
              <div style={{ padding: '0 1rem' }}>
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
