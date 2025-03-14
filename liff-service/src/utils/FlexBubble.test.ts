import { defaultBubble } from './Flex-message';


const statusData1 = {
    title: 'ยืนยันการแจ้งเข้าระบบ',
    id: '2025-AWXRVT',
    status: [
        {
            status: 'รอรับเรื่อง',
            timeStamp: '2025-03-12T03:29:00Z',
            desc: 'ทดสอบการสร้าง Bubble แบบมีรูปภาพ',
            photoUrl: 'https://images.pexels.com/photos/31000796/pexels-photo-31000796/free-photo-of-flying-indian-nightjar-in-natural-habitat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ],
    type: 'ทดสอบ',
    orgName: 'หน่วยงานทดสอบ',
    timestamp: '2025-03-12T03:29:00Z'
}
const statusData2 = {
    title: 'กำลังดำเนินการ',
    id: '2025-WXRVTA',
    status: [
        {
            status: 'รอรับเรื่อง',
            timeStamp: '2025-03-12T03:29:00Z',
            desc: 'ทดสอบการสร้าง Bubble แบบมีรูปภาพ',
            photoUrl: 'https://images.pexels.com/photos/31000796/pexels-photo-31000796/free-photo-of-flying-indian-nightjar-in-natural-habitat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            status: 'กำลังดำเนินการ',
            timeStamp: '2025-03-12T03:39:00Z',
        }
    ],
    type: 'ทดสอบ',
    orgName: 'หน่วยงานทดสอบ',
    timeStamp: '2025-03-12T03:39:00Z'
}
const statusData3 = {
    title: 'กำลังดำเนินการ',
    id: '2025-WXRVTA',
    status: [
        {
            status: 'รอรับเรื่อง',
            timeStamp: '2025-03-12T03:29:00Z',
            desc: 'ทดสอบการสร้าง Bubble แบบมีรูปภาพ',
            photoUrl: 'https://images.pexels.com/photos/31000796/pexels-photo-31000796/free-photo-of-flying-indian-nightjar-in-natural-habitat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        {
            status: 'กำลังดำเนินการ',
            timeStamp: '2025-03-12T03:39:00Z',
        },
        {
            status: 'เสร็จสิ้น',
            timeStamp: '2025-03-12T03:49:00Z',
            desc: 'ทดสอบการสร้าง Bubble แบบมีรูปภาพ สถานะเสร็จสิ้น',
            photoUrl: 'https://images.pexels.com/photos/31000796/pexels-photo-31000796/free-photo-of-flying-indian-nightjar-in-natural-habitat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
    ],
    type: 'ทดสอบ',
    orgName: 'หน่วยงานทดสอบ',
    timestamp: '2025-03-12T03:49:00Z'
}

const bubble = defaultBubble(
    statusData1.title,
    statusData1.id,
    statusData1.status,
    statusData1.type,
    statusData1.orgName,
    statusData1.timestamp,
    'https://cdn-icons-png.flaticon.com/512/18604/18604789.png',
);

const bubble2 = defaultBubble(
    statusData2.title,
    statusData2.id,
    statusData2.status,
    statusData2.type,
    statusData2.orgName,
    statusData2.timeStamp,
    'https://cdn-icons-png.flaticon.com/512/18604/18604789.png',
);
const bubble3 = defaultBubble(
    statusData3.title,
    statusData3.id,
    statusData3.status,
    statusData3.type,
    statusData3.orgName,
    statusData3.timestamp,
    'https://cdn-icons-png.flaticon.com/512/18604/18604789.png',
);

// console.log(JSON.stringify(bubble, null, 2));
// console.log(JSON.stringify(bubble2, null, 2));
console.log(JSON.stringify(bubble3, null, 2));
// console.log(bubble2);