import
{
    useEffect,
    useState
} from "react";
import liff from "@line/liff";

export default function sendMessages() {

    const sendMessage = () => {
        const sendMessage = async () => {
            await liff.sendMessages([
                {
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": {
                        "type": "bubble",
                        "size": "kilo",
                        "header": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "image",
                                                    "url": "https://cdn-icons-png.flaticon.com/512/18604/18604789.png",
                                                    "size": "full",
                                                    "gravity": "center",
                                                    "align": "center",
                                                    "aspectMode": "cover"
                                                }
                                            ],
                                            "cornerRadius": "none",
                                            "flex": 3,
                                            "justifyContent": "center"
                                        },
                                        {
                                            "type": "filler",
                                            "flex": 1
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": "ยืนยันการแจ้งเรื่อง",
                                                    "color": "#000000",
                                                    "size": "lg",
                                                    "flex": 4,
                                                    "weight": "bold"
                                                },
                                                {
                                                    "type": "separator",
                                                    "color": "#000000"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "รอหน่วยงานรับเรื่อง",
                                                    "color": "#0e0e0e",
                                                    "margin": "4px",
                                                    "size": "xs"
                                                }
                                            ],
                                            "flex": 15
                                        }
                                    ],
                                    "alignItems": "center",
                                    "justifyContent": "space-between"
                                }
                            ],
                            "paddingAll": "12px",
                            "spacing": "md",
                            "paddingTop": "16px",
                            "alignItems": "center",
                            "justifyContent": "flex-start",
                            "backgroundColor": "#EF454D",
                            "paddingBottom": "16px"
                        },
                        "hero": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "image",
                                    "url": "https://jxlmrvwanbkomzpobzqs.supabase.co/storage/v1/object/public/Liff-img/5538edd7-8ce0-41ba-b1ae-df98320cf5e9-blob",
                                    "size": "full",
                                    "aspectMode": "cover"
                                }
                            ],
                            "height": "145px",
                            "justifyContent": "center"
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "14/03/2568 14:29",
                                    "size": "xs",
                                    "align": "start",
                                    "color": "#B7B7B7"
                                },
                                {
                                    "type": "separator"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "align": "end",
                                                    "text": "รหัส",
                                                    "size": "sm"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ประเภท",
                                                    "align": "end",
                                                    "size": "sm"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "หน่วยงาน",
                                                    "align": "end",
                                                    "size": "sm"
                                                }
                                            ],
                                            "flex": 2
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "box",
                                                    "layout": "horizontal",
                                                    "contents": [
                                                        {
                                                            "type": "filler"
                                                        },
                                                        {
                                                            "type": "box",
                                                            "layout": "vertical",
                                                            "contents": [],
                                                            "width": "2px",
                                                            "backgroundColor": "#B7B7B7",
                                                            "cornerRadius": "md"
                                                        },
                                                        {
                                                            "type": "filler"
                                                        }
                                                    ],
                                                    "flex": 1
                                                }
                                            ],
                                            "width": "12px"
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": "I2Akwo",
                                                    "size": "sm"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "ประปา",
                                                    "size": "sm"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "โอปอล์",
                                                    "size": "sm"
                                                }
                                            ],
                                            "flex": 6,
                                            "offsetStart": "5px"
                                        }
                                    ],
                                    "paddingTop": "5px",
                                    "paddingBottom": "5px"
                                },
                                {
                                    "type": "separator"
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "รายละเอียด",
                                            "size": "sm"
                                        },
                                        {
                                            "type": "text",
                                            "text": "6666",
                                            "size": "sm",
                                            "wrap": true
                                        }
                                    ],
                                    "paddingTop": "5px",
                                    "paddingBottom": "5px"
                                },
                                {
                                    "type": "separator"
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [
                                                {
                                                    "type": "filler"
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "cornerRadius": "30px",
                                                    "height": "12px",
                                                    "width": "12px",
                                                    "borderColor": "#EF454D",
                                                    "borderWidth": "2px"
                                                },
                                                {
                                                    "type": "filler"
                                                }
                                            ],
                                            "flex": 0
                                        },
                                        {
                                            "type": "text",
                                            "text": "14/03 14:29",
                                            "size": "xxs",
                                            "gravity": "center",
                                            "align": "center",
                                            "flex": 0
                                        },
                                        {
                                            "type": "text",
                                            "text": "รอรับเรื่อง",
                                            "gravity": "center",
                                            "flex": 0,
                                            "size": "lg",
                                            "color": "#EF454D",
                                            "weight": "bold",
                                            "style": "normal",
                                            "margin": "xxl"
                                        }
                                    ],
                                    "spacing": "lg",
                                    "cornerRadius": "30px",
                                    "margin": "xl"
                                },
                                {
                                    "type": "separator"
                                }
                            ]
                        },
                        "footer": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "button",
                                    "action": {
                                        "type": "uri",
                                        "label": "ดูรายละเอียด",
                                        "uri": "https://liff.line.me/2006898075-J5MxgBNN/StatusById/I2Akwo"
                                    },
                                    "style": "link",
                                    "height": "sm",
                                    "margin": "md"
                                },
                                {
                                    "type": "button",
                                    "action": {
                                        "type": "postback",
                                        "label": "อัปเดตสถานะ",
                                        "data": "updateStatus, I2Akwo"
                                    },
                                    "style": "primary",
                                    "height": "sm",
                                    "margin": "md"
                                }
                            ],
                            "flex": 0
                        }
                    }
                }
            ]);
        }

        try {
            alert("Sending Message");
            sendMessage();
        } catch (error) {
            alert(JSON.stringify(error));
        }
    }

    return (
        <>
            <div>
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </>
    );
}