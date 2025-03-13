import
{
    FlexBubble,
    FlexCarousel,
    FlexComponent,
    FlexMessage,
    FlexBox,
    URIAction,
    Action
} from '@line/bot-sdk';

const BaseUrl = `${import.meta.env.VITE_LIFF_URL}/${import.meta.env.VITE_LIFF_ID}`;

type URIActionWithLabel = URIAction & {
    label: string;
};
type CFlexBubble = Omit<FlexBubble, 'action' | 'contents'> & {
    action?: URIActionWithLabel;
};
type CFlexCarousel = Omit<FlexCarousel, 'contents'> & {
    contents: CFlexBubble[];
};
type CFlexContainer = CFlexBubble | CFlexCarousel;
type CFlexMessage = Omit<FlexMessage, 'contents'> & {
    contents: CFlexContainer;
};

function getStatusInfoColor(status: string): string {
    switch (status) {
        case 'รอรับเรื่อง':
            return '#EF454D';
        case 'กำลังดำเนินการ':
            return '#FFC107';
        case 'เสร็จสิ้น':
            return '#198754';
        default:
            return '#B7B7B7';
    }
};
function getStatusInfo(status: string): string {
    switch (status) {
        case 'รอรับเรื่อง':
            return 'รอหน่วยงานรับเรื่อง';
        case 'กำลังดำเนินการ':
            return 'กำลังดำเนินการ';
        case 'เสร็จสิ้น':
            return 'เสร็จสิ้น';
        default:
            return '';
    }
};

class FlexMessageBuilder {
    altText = 'This is a Flex Message';
    protected Message: CFlexMessage;

    constructor(type: 'bubble' | 'carousel', size: 'nano' | 'micro' | 'kilo' | 'mega' = 'kilo') {
        this.Message = type === 'bubble' ?
        {
            type: 'flex',
            altText: this.altText,
            contents: {
                type: 'bubble',
                size: size,
                body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: []
                }
            }
        } : {
            type: 'flex',
            altText: this.altText,
            contents: {
                type: 'carousel',
                contents: []
            }
        }

    }

    setAltText(altText: string) {
        this.altText = altText;
    }

    build(): CFlexMessage {
        return this.Message;
    }
};

class FlexBubbleBuilder extends FlexMessageBuilder {
    private Bubble: CFlexBubble;
    constructor(size: 'nano' | 'micro' | 'kilo' | 'mega' = 'kilo') {
        super('bubble', size);
        this.Bubble = this.Message.contents as CFlexBubble;
    }

    setHeader(header: FlexBox) {
        this.Bubble.header = header;
    }

    setHero(hero: FlexBox) {
        this.Bubble.hero = hero;
    }

    setBody(body: FlexBox) {
        this.Bubble.body = body;
    }

    setFooter(footer: FlexBox) {
        this.Bubble.footer = footer;
    }

    addHeaderContent(content: FlexComponent) {
        if (this.Bubble.header && this.Bubble.header.contents) {
            this.Bubble.header.contents.push(content);
        }
    }

    addBodyContent(content: FlexComponent) {
        if (this.Bubble.body && this.Bubble.body.contents) {
            this.Bubble.body.contents.push(content);
        }
    }

    addFooterContent(content: FlexComponent) {
        if (this.Bubble.footer && this.Bubble.footer.contents) {
            this.Bubble.footer.contents.push(content);
        }
    }

    getBubble(): CFlexBubble {
        return this.Bubble;
    }

    getContents(): string {
        return JSON.stringify(this.Message.contents, null, 2);
    }
}

interface Status {
    status: string;
    timestamp: string;
    desc?: string;
    photoUrl?: string;
}

function defaultBubble(
    title: string,
    id: string,
    status: Status[],
    type: string,
    orgName: string,
    timestamp: string,
    icon: string = 'https://cdn-icons-png.flaticon.com/512/18604/18604789.png',
): CFlexMessage {
    const bubble = new FlexBubbleBuilder();
    const text = status[status.length - 1].status;
    const statusInfo = getStatusInfo(text);
    const bgColor = getStatusInfoColor(text);
    const photoUrl_0 = status[0].photoUrl || '';
    const desc = status[0].desc || '';

    const separator: FlexComponent =
    {
        "type": "separator"
    };
    const timestampComponent: FlexComponent =
    {
        "type": "text",
        "text": new Date(timestamp).toLocaleTimeString('th-TH',
            {
                timeZone: 'Asia/Bangkok',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
        "size": "xs",
        "align": "start",
        "color": "#B7B7B7"
    };
    const info: FlexComponent =
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
                        // "text": "2025-XXXXXX",
                        "text": id,
                        "size": "sm"
                    },
                    {
                        "type": "text",
                        // "text": "ถังดับเพลิง/ประปาหัวแดง",
                        "text": type,
                        "size": "sm"
                    },
                    {
                        "type": "text",
                        // "text": "ฝ่ายเทศกิจ เขตสาทร",
                        "text": orgName,
                        "size": "sm"
                    }
                ],
                "flex": 6,
                "offsetStart": "5px"
            }
        ],
        "paddingTop": "5px",
        "paddingBottom": "5px"
    };
    const description: FlexComponent =
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
                // "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                "text": desc,
                "size": "sm",
                "wrap": true
            }
        ],
        "paddingTop": "5px",
        "paddingBottom": "5px"
    };
    function statusComponent(
        timestamp: string,
        status: string,
    ): FlexComponent {
        const timestampText = new Date(timestamp).toLocaleTimeString('th-TH',
            {
                timeZone: 'Asia/Bangkok',
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        const statusColor = getStatusInfoColor(status);
        return {
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
                            "borderColor": statusColor,
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
                    // "text": "HH:MM",
                    "text": timestampText,
                    "size": "xxs",
                    "gravity": "center",
                    "align": "center",
                    "flex": 0
                },
                {
                    "type": "text",
                    // "text": "รอรับเรื่อง",
                    "text": status,
                    "gravity": "center",
                    "flex": 0,
                    "size": "lg",
                    "color": statusColor,
                    "weight": "bold",
                    "style": "normal",
                    "margin": "xxl"
                }
            ],
            "spacing": "lg",
            "cornerRadius": "30px",
            "margin": "xl"
        };
    };
    function statusComponentWithDesc(
        photoUrl: string,
        desc: string,
        status: string,
    ): FlexComponent {
        const statusColor = getStatusInfoColor(status);
        return {
            "type": "box",
            "layout": "horizontal",
            "contents": [
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
                                    "backgroundColor": statusColor
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
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "image",
                                    "url": photoUrl,
                                    "size": "full",
                                    "aspectMode": "cover"
                                }
                            ],
                            "height": "96px",
                            "justifyContent": "center"
                        },
                        {
                            "type": "text",
                            "text": desc,
                            "size": "sm",
                            "wrap": true
                        }
                    ]
                }
            ],
            "spacing": "lg",
        };
    };
    function actionButtonComponent(
        label: string,
        id?: string,
        uri?: boolean
    ): FlexComponent {
        const styleWithLabel = label === 'อัปเดตสถานะ' ? 'primary' : 'link';
        const action: Action = uri ?
        {
            "type": "uri",
            "label": label,
            "uri": `${BaseUrl}/StatusById/${id}`
        } :
        {
            "type": "postback",
            "label": label,
            "data": `updateStatus, ${id}`
        };
        return {
            "type": "button",
            "action": action,
            "style": styleWithLabel,
            "height": "sm",
            "margin": "md"
        };
    };

    bubble.setHeader(
        {
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
                                    // "url": "https://cdn-icons-png.flaticon.com/512/18604/18604789.png",
                                    "url": icon,
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
                                    // "text": "ยืนยันการแจ้งเข้าระบบ",
                                    "text": title,
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
                                    // "text": "รอหน่วยงานรับเรื่อง",
                                    "text": statusInfo,
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
            // "backgroundColor": "#FF5E5E",
            "backgroundColor": bgColor,
            "paddingBottom": "16px"
        }
    );
    bubble.setHero(
        {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "image",
                    // "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                    "url": photoUrl_0,
                    "size": "full",
                    "aspectMode": "cover"
                }
            ],
            "height": "145px",
            "justifyContent": "center"
        }
    );
    bubble.setBody(
        {
            "type": "box",
            "layout": "vertical",
            "contents": [],
        }
    );
    bubble.setFooter(
        {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [],
            "flex": 0
        }
    );

    bubble.addBodyContent(timestampComponent);
    bubble.addBodyContent(separator);
    bubble.addBodyContent(info);
    bubble.addBodyContent(separator);
    bubble.addBodyContent(description);
    bubble.addBodyContent(separator);
    status.reverse().forEach((s, i) => {
        bubble.addBodyContent(statusComponent(s.timestamp, s.status));
        if ((i + 1) < status.length && (s.desc || s.photoUrl)) {
            bubble.addBodyContent(statusComponentWithDesc(s.photoUrl || '', s.desc || '', s.status));
        }
    });
    bubble.addBodyContent(separator);

    bubble.addFooterContent(actionButtonComponent('ดูรายละเอียด', id, true));
    bubble.addFooterContent(actionButtonComponent('อัปเดตสถานะ', id));


    return bubble.build();
};

export {
    FlexBubbleBuilder,
    defaultBubble
};
