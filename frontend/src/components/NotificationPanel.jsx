import "./NotificationPanel.css";

import { Trash2 } from "lucide-react";

import { useUI } from "../context/UIContext";

const NotificationPanel = () => {

    const {

        notifications,

        markRead,

        markAllRead,

        deleteNotification,

    } = useUI();

    return (

        <div className="notification-panel">

            <div className="notification-header">

                <h3>Notifications</h3>

                <button onClick={markAllRead}>

                    Mark all

                </button>

            </div>

            {

                notifications.length === 0

                    ?

                    <p className="empty">

                        No Notifications

                    </p>

                    :

                    notifications.map(item => (

                        <div

                            key={item.id}

                            className={`notification-item ${

                                item.read

                                    ?

                                    ""

                                    :

                                    "unread"

                            }`}

                            onClick={()=>

                                markRead(item.id)

                            }

                        >

                            <div>

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.message}

                                </p>

                                <small>

                                    {item.time}

                                </small>

                            </div>

                            <Trash2

                                size={18}

                                onClick={(e)=>{

                                    e.stopPropagation();

                                    deleteNotification(item.id);

                                }}

                            />

                        </div>

                    ))

            }

        </div>

    );

};

export default NotificationPanel;